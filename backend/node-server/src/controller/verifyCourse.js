const prisma = require("../../prisma/prisma");

const verifyCourse = async (req, res) => {
    const courseId = parseInt(req.params.id);
    try {
        const course = await prisma.course.findUnique({
            where: {
                id: courseId,
            },
        });
        if (course) {
            await prisma.course.update({
                where: {
                    id: courseId,
                },
                data: {
                    isVerified: !course.isVerified
                }
            });
            const message = !course.isVerified==true ? 'Course Visibility ON':'Course Visibility OFF';
            return res.status(400).json({ message });
        }
    } catch (error) {
        return res.status(400).json({ message: "Internal server error" });
    }
};

module.exports = { verifyCourse };
