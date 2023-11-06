const connection = require('../lib/DB');
const dbQuery = require('../lib/DB-query')
let board = {
	list: async function(req, res, next) {
		try{
			const [rows] = await connection.execute(dbQuery.getBoard)
			console.log(rows)
			res.send(rows)
			next('route')
		} catch (err) {
			next(err)
		}
	},
	
	get: async function(req, res, next) {
		try{
			const [rows] = await connection.execute(dbQuery.getPost, [req.params.num])
			if(req.jwt.isLogin && req.jwt.id == rows[0].id) rows[0].isMine = true
			else rows[0].isMine = false
			console.log(rows[0])
			res.send(rows[0])
			next()
		} catch(err) {
			next(err)
		}
	},

	post: async function(req, res, next) { /*not Tested: Have to make FrontPage*/
		if(req.jwt.isLogin == false) {
			res.send({result: false, message: "Login Require"});
		}
		else {
			const title = req.body.title;
			const body = req.body.body;
			const writer_id = req.jwt.id;
			const writer_name = req.jwt.name;
			
			const values = [title, body, writer_id, writer_name];

			try{
				const log = await connection.query(dbQuery.insertPost, values)
				console.log(log)
				res.send({result: true, post_num: log.insertId})
			} catch(err) {
				next(err)
			}
		}
	}
}

module.exports = board;