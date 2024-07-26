const express = require('express');
const router = express.Router();
const uploadFile = require('../middleware/imageUpload');
const { createGame, getGameByCourseCategory, updateGameByGameId, deleteGameByGameId } = require('../controller/game');

// Route to get a game by course category ID
router.get('/:userId', getGameByCourseCategory);

// Route to create a new game with image upload
router.post('/', uploadFile('gameImage', 'image'), createGame);

// Route to update an existing game with image upload
router.patch('/', uploadFile('gameImage', 'image'), updateGameByGameId);

// Route to delete a game by its ID
router.delete('/:id', deleteGameByGameId);

module.exports = router;
    