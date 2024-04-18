const prisma = require('../../prisma/prisma')
const qnaSchema = require('../validation/qna')

const createQna = async (req, res) => {
    const { error, value } = qnaSchema.qna.validate({
        ...req.body
    });
    const id = parseInt(req.params.id);
    // If Joi validation fails, send an error response
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        let result;
        // Check if id is provided, if not, it's a question
        if (!id) {
            result = await prisma.qnA.create({
                data: value
            });
        } else {
            // It's a reply, update responseCount for the parent question
            result = await prisma.$transaction([
                prisma.qnA.create({
                    data: {
                        userId: value.userId,
                        courseId: value.courseId,
                        title: value.title,
                        description: value.description,
                        idQnA: id
                    }
                }),
                prisma.qnA.update({
                    where: { id },
                    data: { responseCount: { increment: 1 } }
                })
            ]);
        }
        return res.status(201).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


const deleteQna = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        // Check if the QnA entry exists
        const qnaEntry = await prisma.qnA.findUnique({ where: { id } });
        if (!qnaEntry) {
            return res.status(404).json({ message: 'QnA entry not found' });
        }

        // If it's a question (idQnA is null), delete all its replies
        if (!qnaEntry.idQnA) {
            await prisma.qnA.deleteMany({ where: { idQnA: id } });
        }

        // Delete the QnA entry
        await prisma.qnA.delete({ where: { id } });

        return res.status(200).json({ message: 'QnA entry deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { createQna, deleteQna }