const express = require('express');
const Login = require('../api/localLogin');
const authRouer = require('./authRouer/router');
const boardRouter = require('./board/router');
const router = express.Router();

router.post('/login', Login.login);
router.get('/main', (req, res) => {console.log('Middleware: return jwt');res.send(req.jwt)});
// router.get('/userinfo/:id', Login.userinfo);
router.post('/register', Login.register);
router.use('/board',boardRouter);
router.use('/auth', authRouer);

module.exports = router;