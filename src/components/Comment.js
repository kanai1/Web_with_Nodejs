import React, { Component } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

class Comment extends Component
{
	constructor(props) {
		super(props)
		this.state = {
			boardname: props.boardname,
			postnum: props.post_num,
			data : [],
		}
		this.time = new Date(Date.now()+32400000).toISOString().split('T')[0];
	}
	
	componentDidMount() {
		this._getBoardData();
	}

	_getBoardData = async function() {
		const data_json = await axios(`/api/board/comment/${state.post_num}`, {
		method : 'GET',
		headers: new Headers()
		})

		console.log(data_json)

		this.setState({ data : data_json.data })
	}

	onClickPost = function(post_num){
		window.location.href=`/post/${post_num}`;
	}

	render() {
		const list = this.state.data;

		return(
			<div>
				<div>
					{list ? list.map( (el) => {
						return(
						<div>
							{/* 댓글 코드 */}
						</div>
						)
					})
					: null }
				</div>
			</div>
		);
	};
}

export default Comment;