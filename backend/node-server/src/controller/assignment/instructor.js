const { date } = require('joi');
const prisma = require('../../../prisma/prisma')
const validator = require('../../validation/assignment.instructor')

const getAssignments = async (req, res) => {
    const instructorId = parseInt(req.params.instructorId);

    try {
        const assignments = await prisma.assignment.findMany({
            where: {
                instructorId: instructorId,
            },
            include: {
                course: true,
            },
        });

        if (assignments.length > 0) {
            // Log the course titles
            assignments.forEach(assignment => {
               cid =  assignment.course.id;
                assignment.course.thumbnail = 'url';
            });
            

            res.status(200).json({ message: 'Assignments found', data: assignments});
        } else {
            res.status(404).json({ message: "This instructor doesn't have any assignments" });
        }
    } catch (error) {
        console.error('Error fetching assignments:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const createAssignment = async (req,res)=>{
    if (!req.file) return res.status(400).json({ message: 'Assignment file is required' });
    const attachment = req.file.path.replaceAll("\\", "/"); // For windwos device
    const {error,value} = validator.instructorAssignmentCreate.validate({...req.body,attachment})
    // If Joi validation fails, send an error response
    if (error) return res.status(400).json({ message: error.details[0].message });

    try{
        const data = await prisma.assignment.create({
            data:{
                courseId:value.courseId,
                title:value.title,
                instruction:value.instruction,
                deadline:value.deadline,
                points:value.points,
                attachment:attachment,
                instructorId:value.instructorId
            }
        })
        return res.status(200).json({ message: "Assignment Created" ,data})
    }catch(error){
        return res.status(500).json({ message: 'Internal Server Error' ,error});
    }
}

const getCreatedAssignment = async(req,res)=>{
    const id = parseInt(req.params.id)

    try{
        const foundAssignment = await prisma.assignment.findUnique({
            where:{
                id:id
            }
        })
        if(foundAssignment){
            res.status(500).json({ message: 'Assignment found',assignment:foundAssignment });
            return foundAssignment
        }else{
            res.status(500).json({ message: `Assignment Id: ${id} not found`});
        }
        
    }catch(error){
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const updateAssignment = async(req,res)=>{
    if (!req.file) return res.status(400).json({ message: 'Assignment file is required' });
    const attachment = req.file.path.replaceAll("\\", "/"); // For windwos device
    const {error,value} = validator.instructorAssignmentUpdate.validate({...req.body,attachment})
    // If Joi validation fails, send an error response
    if (error) return res.status(400).json({ message: error.details[0].message });

    try{
        const foundAssignment = await prisma.assignment.findUnique({
            where:{
                id:value.assignmentId
            }
        })
        console.log(foundAssignment)
        if(foundAssignment){
            const updatedAssignment = await prisma.assignment.update({
                where:{id:value.assignmentId},
                data:{
                    courseId:value.courseId,
                    title:value.title,
                    instruction:value.instruction,
                    deadline:value.deadline,
                    points:value.points,
                    attachment:value.attachment
                }
            })
           
            return res.status(200).json({ message: "Assignment Updated" })
        }
    }catch(error){
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const deleteAssignment = async(req,res)=>{
    const id = parseInt(req.params.id)
    
    try{
        const foundAssignment = await prisma.assignment.findUnique({
            where:{
                id:id
            }
        })
        if(foundAssignment){
            await prisma.assignment.delete({
                where:{
                    id:id
                }
            })
            return res.status(200).json({ message: "Assignment Deleted" })
        }
    }catch(error){
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const returnAssignment = async(req,res) =>{
    const { error, value } = validator.returnAssignment.validate({
        ...req.body
      });

    console.log(value)
      // If Joi validation fails, send an error response
      if (error) return res.status(400).json({ message: error.details[0].message });

    try{
        const assignment = await prisma.assignmentSubmission.findUnique({
            where:{
                id:value.id
            }
        });
        if(assignment){
            const result = await prisma.assignmentSubmission.update({
                where:{
                    id:value.id
                },
                data:{
                    points:value.points,
                    feedback:value.feedback,
                    returnedAt:new Date(),
                    isReturn:true
                }
            });
            return res.status(200).json({ message: "Assignment Returned", result})
        }
        return res.status(400).json({ message: 'Assignment does\'nt exist' });

    }catch(error){
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });

    }
}

module.exports = {getAssignments,createAssignment,getCreatedAssignment,updateAssignment,deleteAssignment,returnAssignment}