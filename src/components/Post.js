import './Post.css'
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Post(props) {
	const navigate = useNavigate();
	const { idx } = useParams();
	const [board, setBoard] = useState({});
	const [isMine, setIsMine] = useState(false);

	useEffect(() => {
		fetch(`/api/board/post/${idx}`, {
			method: "GET"
		})
		.then(res => res.json())
		.then((json) => {
			setIsMine(json.isMine);
			setBoard(json);
		})
		.catch()
		
	}, 
	[])

	const onClickBack = (props) => {
		navigate(-1);
	}

	return (
		<div>
			<div class="Header">
				<button onClick={onClickBack}>뒤로가기</button>
			</div>
			<div class="Body">
				<h2>{board.title}</h2>
				<p>{board.body}</p>
			</div>
		</div>
	);
}

export default Post;