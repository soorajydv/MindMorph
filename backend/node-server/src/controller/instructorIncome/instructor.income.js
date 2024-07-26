const prisma = require('../../../prisma/prisma')

const income = async (req, res) => {
    const instructorId = parseInt(req.params.id);
    try {
        
        const courses = await prisma.course.findMany({
            where: {
                authorId: instructorId
            },
            select: { id: true }
        });

        if (courses.length === 0) {
            return res.status(404).json({ message: "No courses found for this instructor" });
        }

        const courseIds = courses.map(course => course.id);
        const sold_courses = await prisma.payment.findMany({
            where:{
                courseId:{
                    in:courseIds
                }
            }
        })
        if (sold_courses.length === 0) {
            return res.status(400).json({ message: "Your courses haven't been purchased yet" });
        }
        const sum = await prisma.payment.aggregate({
            _sum: {
                amount: true,
            },
            where: {
                courseId: {
                    in: courseIds,
                },
            },
        });
        res.status(200).json({ totalIncome: sum._sum.amount });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Internal server error", error: error.message });
    }
};


module.exports = {income}