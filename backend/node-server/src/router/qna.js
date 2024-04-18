const express = require('express')
const router = express.Router();
const { createQna, deleteQna } = require('../controller/qna')

router.post('/question', createQna)
router.post('/question/:id', createQna)
router.delete('/question/:id', deleteQna)



module.exports = router