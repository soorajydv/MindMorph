const prisma = require("../../../prisma/prisma");
const socialSchema = require("../../validation/socialHandle");

const insertSocialHandles = async (req, res) => {
    const { id, ...socialHandles } = req.body; // Assuming user ID is available in req.body

    try {
        // If no social handles are provided, send an error response
        if (Object.keys(socialHandles).length === 0) {
            return res.status(400).json({ message: "Please provide at least one social handle" });
        }

        // Validate social handles
        const { error, value } = socialSchema.validate(socialHandles);

        // If Joi validation fails, send an error response
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // Fetch the user's existing social handles
        const existingSocialHandles = await prisma.socialHandle.findUnique({
            where: { userId: id }
        });

        // Loop through the validated social handles and update the database accordingly
        const updatedSocialHandles = {};

        Object.keys(value).forEach(key => {
            if (value[key]) { // Check if the social handle exists
                updatedSocialHandles[key] = value[key];
            }
        });

        // Create or update each social handle individually
        await Promise.all(Object.keys(updatedSocialHandles).map(async (key) => {
            await prisma.socialHandle.upsert({
                where: { userId: id },
                update: { [key]: updatedSocialHandles[key] },
                create: {
                    userId: id,
                    [key]: updatedSocialHandles[key]
                }
            });
        }));

        // Send a success response
        res.status(201).json({
            message: "Social handles inserted/updated",
            data: updatedSocialHandles,
        });
    } catch (e) {
        console.error(e);
        return res.status(400).json({ message: "Error occurred while inserting/updating social handles", error: e });
    }
};
module.exports = insertSocialHandles;
