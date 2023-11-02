const connection = require('../lib/DB');
const dbQuery = require('../lib/DB-query')
const jwt_utils = require('./jwt_utils');

function idDoubleCheck(id) {
	var values = [id];
	var result = true;

	connection.query(dbQuery.getUseridCount, values, (error, rows) => {
		if(error) throw error;
		if(rows[0]['COUNT(*)'] == 0) result = true;
		else result = false;
	})

	return result;
}

let Login = {

	login: function (req, res, next) {
		const sendData = {isLogin: ""};

		var id = req.body.id;
		var password = req.body.password;

		var values = [id, password];

		connection.query(dbQuery.loginCheck, values, (error, rows) => {
			if (error) throw error;
			console.log('User info is: ', rows);
			if(rows.length > 0)
			{
				var token = jwt_utils.genarateAccessToken(rows[0]['id'], rows[0]['name']);
				sendData.isLogin = true;
				sendData.token = token;
				res.send(sendData);
				console.log(sendData);
				return next()
			}
			else
			{
				sendData.isLogin = false;
				res.send(sendData)
				console.log(sendData);
				return next()
			}
		});
	},

	register: function(req, res) {
		var id = req.body.id;
		var password = req.body.password;
		var username = req.body.username;
		
		var values = [id, password, username];

		if(idDoubleCheck(id)) {
			connection.query(dbQuery.register, values, (error, log) => {
				if(error) {
					console.log(error);
					throw error;
				}
				res.send({result: true});
			});
		} else {
			console.log('이미 존재하는 아이디입니다.');
			res.send({error: 'idDoubleCheckError'});
		}
	}
}

module.exports = Login;