const express = require('express');
const googleRouter = require('./google/router');
const kakaoRouter = require('./kakao/router')
const router = express.Router();

router.use('/google', googleRouter);
router.use('/kakao', kakaoRouter);

module.exports = router;