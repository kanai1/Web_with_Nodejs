exports.getBoard = "SELECT post_num, title, writer_name, date_format(post_time, '%Y-%m-%d %H:%i') as post_time FROM board WHERE boardname = ? ORDER BY post_num ASC"
exports.getPost = "SELECT * FROM board WHERE post_num = ?"
exports.getComment = "SELECT * FROM comment WHERE post_num = ? ORDER BY comment_num ASC, commented ASC"
exports.insertPost = "INSERT INTO board(title, body, writer_id, writer_name,boardname) VALUES(?,?,?,?,?);"
exports.getUseridCount = "SELECT COUNT(*) FROM user_login WHERE id = ?"
exports.loginCheck = "SELECT * FROM user_login WHERE id = ? AND password = ?"
exports.register = "INSERT INTO user_login(id, password, name) values (?, ?, ?)"