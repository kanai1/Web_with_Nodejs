const connection = require('./DB');

let board = {
	list: function(req, res, next) {
		const sql = "SELECT post_num, title, writer_name, date_format(post_time, '%Y-%m-%d %H:%i') as post_time FROM board";
		connection.query(sql, (err, rows) => {
			if(err) next(err);
			else {
				console.log(rows);
				res.send(rows);
				next('route');
			}
		})
	},
	
	get: function(req, res, next) {
		const sql = "SELECT * FROM board WHERE post_num = ?";
		connection.query(sql, [req.params.num], (err, rows) => {
			if(err) return next(err);
			else{
				if(req.jwt.isLogin && req.jwt.id == rows[0].id) rows[0].isMine = true;
				else rows[0].isMine = false;
				console.log(rows[0]);
				res.send(rows[0]);
				next();
			}
		});
	},

	post: function(req, res, next) {
		if(req.jwt.isLogin == false) {
			res.send({result: false, message: "Login Require"});
		}
		else {
			const title = req.body.title;
			const body = req.body.body;
			const writer_id = req.jwt.id;
			const writer_name = req.jwt.name;

			const sql = "INSERT INTO board(title, body, writer_id, writer_name) VALUES(?,?,?,?);";
			const values = [title, body, writer_id, writer_name];

			connection.query(sql, values, (err, log) => {
				if(err) return next(err);
				else {
					res.send({result: true, post_num: log.insertId})
				}
			})
		}
	}
}

module.exports = board;