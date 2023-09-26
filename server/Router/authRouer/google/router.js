const express = require('express');
const Login = require('../../../api/googleLogin');
const router = express.Router();

router.get('/login', Login.Login);
router.get('/redirect', Login.Redirect);

module.exports = router;