const express = require('express')
const board = require('../../api/board')
const router = express.Router()

router.get('/list', board.list)
router.post('/post', board.post)
router.get('/post/:num', board.get)

module.exports = router