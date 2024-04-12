// const { date } = require('joi');
const prisma = require('../../../prisma/prisma');
const courseSchema = require('../../validation/course')

// Create a new course
const createCourse = async (req, res) => {
    const { error, value } = courseSchema.course.validate(req.body);

     // If Joi validation fails, send an error response
  if (error) return res.status(400).json({ message: error.details[0].message });
    
  try {
    // Insert a new user in the database using Prisma ORM
    const thumbnailPath = req.file.path.replaceAll('\\', '/'); // For windwos device

    await prisma.course.create({
      data: { ...value, thumbnail: thumbnailPath}}
    );
    // Send a success response with the created user object
    res.status(201).json({
      message: 'Course Created',
      data: { ...value, thumbnail: thumbnailPath, syllabus:JSON.parse(value.syllabus)},
    });
  } catch (e) {
    console.error(e);
    // const { status, message } = serverError.signupHandler(e);
    return res.status(400).json({ message: 'Error Occured', error:e });
  }
};

// Update an existing course
const updateCourse = async (req, res) => {
    const { id } = req.params;
    const courseData = req.body;

    try {
        // Update the course
        const updatedCourse = await prisma.course.update({
            where: { id: parseInt(id) },
            data: courseData,
        });

        res.json(updatedCourse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update course' });
    }
};

// Delete an existing course
const deleteCourse = async (req, res) => {
    const { id } = req.params;

    try {
        // Delete the course
        await prisma.course.delete({
            where: { id: parseInt(id) },
        });

        res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete course' });
    }
};

module.exports = {
    createCourse,
    updateCourse,
    deleteCourse,
};
