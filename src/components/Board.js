import './Board.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useParams, BrowserRouter as Router, Route, Routes} from "react-router-dom";


function Board(props) {
    const {boardname} = useParams()
	const [list, setList] = useState([])
	const [isLogin, setIsLogin] = useState(false)
	const time = new Date(Date.now()+32400000).toISOString().split('T')[0];
 
	// 페이지 렌더링 후 가장 처음 호출되는 함수
    useEffect(() => {
		setIsLogin(props.isLogin)

        const getPost = async() => {
			const data_json = await axios(`/api/board/list/${boardname}`, {
			method : 'GET',
			headers: new Headers()
			})
			setList(data_json.data.posts)
		}
		getPost()
    },
    [])

	const onClickWrite = (props) => {
		window.location.href += '/post'
	}
 
    return(
		<div>
			<div>
				<h3>{boardname}게시판</h3>
				{ isLogin?
					<button onClick={onClickWrite}>글쓰기</button>
					:null
				}
			</div>
			<div className="outers">
				<table className="board_table">
					<thead>
						<tr>
							<th className="post_num">번호</th>
							<th className="post_title">제목</th>
							<th className="user_name">아이디</th>
							<th className="post_time">작성일시</th>
						</tr>
					</thead>
					<tbody>
					{list ? list.map( (el, idx) => {
						return(
						<tr>
							<td className="post_num">{idx + 1}</td>
							<td className="post_title"><Link to={`/post/${el.post_num}`}>{el.title}</Link></td>
							<td className="user_name">{el.writer_name}</td>
							<td className="post_time">{time==el.post_time.split(' ')[0]?el.post_time.split(' ')[1]:time}</td>
						</tr>
						)
					})
					: null }
					</tbody>
				</table>
			</div>
		</div>
	);
};
 
export default Board;