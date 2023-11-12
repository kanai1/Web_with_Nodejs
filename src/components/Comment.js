import './Board.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useParams} from "react-router-dom";


function Boardnew() {
    const {idx} = useParams()
	const [list, setList] = useState([])
	const time = new Date(Date.now()+32400000).toISOString().split('T')[0];
 
	// 페이지 렌더링 후 가장 처음 호출되는 함수
    useEffect(() => {
        const getPost = async() => {
			const data_json = await axios(`/api/board/comment/${idx}`, {
			method : 'GET',
			headers: new Headers()
			})
			setList(data_json.data.posts)
		}
		getPost()
    },
    [])
 
    return(
		<div>
			<div>
				{list ? list.map( (el, idx) => {
					return(
					<div>댓글코드</div>
					)
				})
				: null}
			</div>
		</div>
	);
};
 
export default Boardnew;