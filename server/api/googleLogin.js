require('dotenv').config();
const jwt_utils = require('./jwt_utils');
const axios = require('axios');

const GOOGLE_LOGIN_REDIRECT_URL = `${process.env.BACKEND_DOMAIN}/api/auth/google/redirect`
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token'
const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo'

let googleLogin = {
	Login: function(req, res) {
		let url = 'https://accounts.google.com/o/oauth2/v2/auth';
		url += `?client_id=${process.env.GOOGLE_OAUTH_ID}`
		url += `&redirect_uri=${GOOGLE_LOGIN_REDIRECT_URL}`
		url += '&response_type=code'
		url += '&scope=email profile'
		res.redirect(url);
	},

	Redirect: async function(req, res) {
		const { code } = req.query;

		const resp = await axios.post(GOOGLE_TOKEN_URL, {
			code,
			client_id: process.env.GOOGLE_OAUTH_ID,
			client_secret: process.env.GOOGLE_OAUTH_SECRET,
			redirectUri: GOOGLE_LOGIN_REDIRECT_URL,
			grant_type: 'authorization_code',
		})
		console.log(resp.data);
		
		const resp2 = await axios.get(GOOGLE_USERINFO_URL, {
		  headers: {
			  Authorization: `Bearer ${resp.data.access_token}`,
		  },
	  });
		console.log(resp2.data); // google계정정보
		const jwt = jwt_utils.genarateAccessToken(resp2.data.id, resp2.data.name)
		res.cookie('token', jwt);
		res.redirect(process.env.FRONTEND_DOMAIN)
	}
}

module.exports = googleLogin;