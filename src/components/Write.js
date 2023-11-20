import './Post.css'
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Comment from "./Comment"

function Write(props) {
	const navigate = useNavigate();
	const {boardname} = useParams()
	const [title, setInputTitle] = useState("")
	const [body, setBody] = useState("")

	const handleInputTitle = (e) => {
        setInputTitle(e.target.value)
    }

	const handleBody = (e) => {
		setBody(e.target.value)
	}

	useEffect(() => {
	}, 
	[])

	const onClickBack = (props) => {
		navigate(-1);
	}

	const onClickPosting = (props) => {
		console.log(title, body)
	}

	return (
		<div>
			<div className="Header">
				<button onClick={onClickBack}>뒤로가기</button>
			</div>
			<h2>{boardname}</h2>
			<div className="Body">
				<span>제목: </span><br/>
				<input type="text" name="title" placeholder="제목" required="required" value={title} onChange={handleInputTitle}/><br/>
				<span>본문: </span><br/>
				<textarea name="body" cols={50} rows={30} placeholder="본문" required="required" onChange={handleBody}></textarea><br/>
				<button type='button' onClick={onClickPosting}>글쓰기</button>
			</div>
		</div>
	);
}

export default Write;