const express = require('express');
const router = express.Router();
const insertSocialHandles = require('../controller/socialHandle/socialHandle')

router.patch('/socialHandle/:id', insertSocialHandles)
// router.patch('/socialHandle', updateSocialHandle)
// router.delete('/socialHandle', deleteSocialHandle)


module.exports = router;