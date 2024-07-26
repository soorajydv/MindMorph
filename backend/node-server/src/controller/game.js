const prisma = require('../../prisma/prisma');
const { createGameSchema, updateGameByGameIdSchema } = require('../validation/game');

// Function to get a game by course category and ensure the user hasn't seen it before
const getGameByCourseCategory = async (req, res) => {
    const userId = parseInt(req.params.userId); // Assuming user ID is provided in req.params

    try {
        // Step 1: Fetch course IDs from the Payment model
        const payments = await prisma.payment.findMany({
            where: { userId: userId },
            select: { courseId: true }
        });

        // If no paid courses are found, get games from any available category
        if (payments.length === 0) {
            console.log("No paid courses found. Showing a random game from any available category.");

            // Step 4: Fetch all available games (not filtered by category)
            const allAvailableGames = await prisma.game.findMany({
                include: {
                    gamificationData: true, // Include gamificationData
                }
            });

            // Step 5: Optionally select a random game from all available games
            if (allAvailableGames.length === 0) {
                return res.status(404).json({ message: "No games found in the database" });
            }

            const gameToShow = allAvailableGames[Math.floor(Math.random() * allAvailableGames.length)];

            const data = await prisma.gameView.findFirst({
                where: {
                    userId: userId
                }
            })
            if (!data) {
                // Record that the user has seen this game
                await prisma.gameView.create({
                    data: {
                        userId: userId,
                        gameId: gameToShow.id,
                        viewTime: new Date().toISOString()
                    }
                });

                return res.status(200).json({ game: gameToShow });
            } else {
                return res.status(200).json({ Message: "No games availible" });
            }
        }

        // Extract course IDs from the payments
        const courseIds = payments.map(payment => payment.courseId);

        // Step 2: Fetch the courseCategoryId for each course
        const courses = await prisma.course.findMany({
            where: { id: { in: courseIds } },
            select: { courseCategoryId: true }
        });

        // Get unique courseCategoryIds from the courses
        const courseCategoryIds = [...new Set(courses.map(course => course.courseCategoryId))];

        if (courseCategoryIds.length === 0) {
            return res.status(404).json({ message: "No categories found for the paid courses" });
        }

        // Step 3: Fetch all games for these categories
        const allGames = await prisma.game.findMany({
            where: {
                courseCategoryId: {
                    in: courseCategoryIds,
                },
            },
            include: {
                gamificationData: true, // Include gamificationData
            }
        });

        // Step 4: Fetch IDs of games the user has already seen
        const seenGameIds = await prisma.gameView.findMany({
            where: { userId: userId },
            select: { gameId: true }
        }).then(results => results.map(result => result.gameId));

        // Filter out games that have been seen by the user
        const availableGames = allGames.filter(game => !seenGameIds.includes(game.id));

        if (availableGames.length === 0) {
            return res.status(404).json({ message: "No games availiable for your enrolled courses" });
        }

        // Step 5: Optionally select a random game from available ones
        const gameToShow = availableGames[Math.floor(Math.random() * availableGames.length)];

        // Record that the user has seen this game
        await prisma.gameView.create({
            data: {
                userId: userId,
                gameId: gameToShow.id,
                viewTime: new Date().toISOString()
            }
        });

        res.status(200).json({ game: gameToShow });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Error occurred while fetching the game", error: error.message });
    }
}




// Function to create a game with its gamification data
const createGame = async (req, res) => {
    const { error, value } = createGameSchema.validate(req.body);

    if (error) return res.status(400).json({ message: error.details[0].message });

    const imagePath = req.file.path.replaceAll('\\', '/');

    try {
        // Create the game along with its gamification data
        const newGame = await prisma.game.create({
            data: {
                courseCategoryId: value.courseCategoryId,
                gamificationData: {
                    create: {
                        text: value.text,
                        imageUrl: imagePath
                    }
                }
            },
            include: {
                gamificationData: true
            }
        });

        res.status(201).json({ game: newGame });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Error occurred while creating the game", error: error.message });
    }
}

// Function to update a game by its ID
const updateGameByGameId = async (req, res) => {
    const { error, value } = await updateGameByGameIdSchema.validate(req.body);

    if (error) return res.status(400).json({ message: error.details[0].message });

    const imagePath = req.file.path.replaceAll('\\', '/');
    try {
        // Check if the game exists
        const existingGame = await prisma.game.findUnique({
            where: { id: value.gameId },
            include:{courseCategory:true}
        });

        if (!existingGame) return res.status(404).json({ message: "Game not found" });

        const gamificationData = await prisma.gamificationData.findFirst({where:{gameId:value.gameId}})
        // Update the game and its gamification data
        const updatedGame = await prisma.game.update({
            where: { id: value.gameId },
            data: {
                courseCategoryId: existingGame.courseCategoryId,
                gamificationData: {
                    update: {
                        where: { id:gamificationData.id },
                        data: {
                            text: value.text,
                            imageUrl: imagePath
                        }
                    }
                }
            },
            include: { gamificationData: true }
        });
        res.status(200).json({ message: 'Game and related data updated successfully', updatedGame });
    } catch (error) {
        console.error('Error updating game:', error);
        res.status(500).json({ message: 'An error occurred while updating the game', error: error.message });
    }
}

// Function to delete a game by its ID
const deleteGameByGameId = async (req, res) => {
    const gameId = parseInt(req.params.id);

    try {
        // Check if the game exists
        const existingGame = await prisma.game.findUnique({
            where: { id: gameId }
        });

        if (!existingGame) return res.status(404).json({ message: "Game not found" });

        // Delete the game and its associated gamificationData
        const deletedGame = await prisma.game.delete({
            where: { id: gameId },
            include: {
                gamificationData: true,
                GameView: true
            }
        });

        res.status(200).json({
            message: 'Game and related data deleted successfully',
            deletedGame
        });
    } catch (error) {
        console.error('Error deleting game:', error);
        res.status(500).json({ message: 'An error occurred while deleting the game', error: error.message });
    }
}

module.exports = { createGame, getGameByCourseCategory, updateGameByGameId, deleteGameByGameId };
