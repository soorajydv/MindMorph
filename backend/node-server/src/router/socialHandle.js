const express = require('express');
const router = express.Router();
const { createSocialHandles, updateSocialHandles, deleteSocialHandles } = require('../controller/socialHandle/socialHandle')

router.post('/socialHandle/', createSocialHandles)
router.patch('/socialHandle/', updateSocialHandles)
router.delete('/socialHandle/', deleteSocialHandles)


module.exports = router;