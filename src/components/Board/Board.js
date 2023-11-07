import './Board.css'
import React, { Component } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

class Board extends Component
{
	constructor(props) {
		super(props)
		this.state = {
			boardname: "",
			data : [],
		}
		this.time = new Date(Date.now()+32400000).toISOString().split('T')[0];
	}
	
	componentDidMount() {
		this._getBoardData();
	}

	_getBoardData = async function() {
		const data_json = await axios('/api/board/list', {
		method : 'GET',
		headers: new Headers()
		})

		console.log(data_json)

		this.setState({ data : data_json.data.posts })
		this.setState({ boardname: data_json.data.boardname})
	}

	onClickPost = function(post_num){
		window.location.href=`/post/${post_num}`;
	}

	render() {
		const list = this.state.data;

		return(
			<div>
				<div>
					<h3>{this.state.boardname}게시판</h3>
				</div>
				<div class="outers">
					<table class="board_table">
						<thead>
							<tr>
								<th class="post_num">번호</th>
								<th class="post_title">제목</th>
								<th class="user_name">아이디</th>
								<th class="post_time">작성일시</th>
							</tr>
						</thead>
						<tbody>
						{list ? list.map( (el) => {
							return(
							<tr>
								<td class="post_num">{el.post_num}</td>
								<td class="post_title"><Link to={`/post/${el.post_num}`}>{el.title}</Link></td>
								<td class="user_name">{el.writer_name}</td>
								<td class="post_time">{this.time==el.post_time.split(' ')[0]?el.post_time.split(' ')[1]:this.time}</td>
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
}

export default Board;