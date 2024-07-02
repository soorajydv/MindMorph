const express = require('express')
const router = express.Router()
const esewarequest = require('../controller/esewa')

router.get('/esewa',esewarequest)

module.exports=router