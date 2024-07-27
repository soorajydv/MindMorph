const prisma = require('../../../prisma/prisma')
const validator = require('../../validation/assignment.student')

const submitAssignment = async(req,res)=>{
    const filePath = req.file.path.replaceAll("\\", "/"); // For windwos device
    const {error,value} = validator.assignmentSubmition.validate({...req.body})
    console.log(value);
    // If Joi validation fails, send an error response
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const existingAssignment = await prisma.assignmentSubmission.findFirst({
            where:{
                assignmentId:value.assignmentId,
                studentId: value.studentId,
            }
        })
        if(!existingAssignment){
            const assignment = await prisma.assignmentSubmission.create({
                data: {
                    assignmentId: value.assignmentId,
                    studentId: value.studentId,
                    attachment: filePath,
                    comment: value.comment
                }
            })
            if (assignment) {
                return res.status(200).json({ message: "Assignment Submitted" });
            }
        }else{
            return res.status(200).json({ message: "Assignment Already Submitted" });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    
}

const getAllAssignments = async (req, res) => {
    const studentId = parseInt(req.params.studentId);

    if (isNaN(studentId)) {
        return res.status(400).json({ message: 'Invalid student ID' });
    }

    try {
        // Fetch enrolled courses for the student
        const enrolledCourses = await prisma.payment.findMany({
            where: {
                userId: studentId
            },
            select: {
                courseId: true
            }
        });

        const enrolledCourseIds = enrolledCourses.map(payment => payment.courseId);

        if(enrolledCourseIds>0){
            // Fetch all assignments submitted by the student
        const submittedAssignments = await prisma.assignmentSubmission.findMany({
            where: {
                studentId: studentId
            }
        });

        const submittedAssignmentIds = submittedAssignments.map(assignmentSubmission => assignmentSubmission.assignmentId);

        // Get the current date and time
        const now = new Date();

        // Fetch assignments that are not yet submitted and whose deadline has not crossed
        const newAssignments = await prisma.assignment.findMany({
            where: {
                courseId: {
                    in: enrolledCourseIds
                },
                id: {
                    notIn: submittedAssignmentIds
                },
                deadline: {
                    gte: now
                }
            },
            select: {
                id: true,
                title: true,
                deadline: true
            }
        });

        // Fetch assignments that are not yet submitted and whose deadline has crossed
        const dueAssignments = await prisma.assignment.findMany({
            where: {
                courseId: {
                    in: enrolledCourseIds
                },
                id: {
                    notIn: submittedAssignmentIds
                },
                deadline: {
                    lt: now
                }
            },
            select: {
                id: true,
                title: true,
                deadline: true
            }
        });

        // Fetch assignments returned by the teacher
        const returnedAssignments = await prisma.assignmentSubmission.findMany({
            where: {
                studentId: studentId,
                isReturn: true
            },
            select: {
                assignmentId: true
            }
        });

        // Fetch assignments submitted but not yet returned
        const pendingAssignments = await prisma.assignmentSubmission.findMany({
            where: {
                studentId: studentId,
                isReturn: false
            },
            select: {
                assignmentId: true
            }
        });

        // Fetch all assignments for enrolled courses
        const allAssignments = await prisma.assignment.findMany({
            where: {
                courseId: {
                    in: enrolledCourseIds
                }
            },
            select: {
                id: true,
                title: true,
                deadline: true
            }
        });
        console.log(allAssignments);

        // Respond with all categories of assignments
        return res.status(200).json({
            newAssignments,
            dueAssignments,
            returnedAssignments,
            pendingAssignments,
            allAssignments
        });
        }else{
            return res.status(500).json({ message: 'No course enrolled' });
        }
    } catch (error) {
        console.error('Error fetching assignments:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};



const updateAssignment = async (req, res) => {
    const { error, value } = validator.assignmentSubmition.validate({ ...req.body });
    // If Joi validation fails, send an error response
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const getassignment = await prisma.assignmentSubmission.findFirst({
            where: {
                assignmentId: value.assignmentId,
                studentId: value.studentId
            }
        });

        if (getassignment) {
            const assignment = await prisma.assignmentSubmission.update({
                where: {
                    id: getassignment.id // Use the unique identifier
                },
                data: {
                    attachment: value.attachment,
                    comment: value.comment
                }
            });

            if (assignment) {
                return res.status(200).json({ message: "Assignment Updated" });
            }
        } else {
            return res.status(404).json({ message: "Assignment not found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


module.exports = {submitAssignment,getAllAssignments,updateAssignment}