import React, { useState, useEffect } from 'react';
import { removeCookie } from '../utils/Cookie_util';

function Mypage(props) {

	const onClickLogin = (props) => {
		window.location.href = '/login'
	}

	const onClickMypage = (props) => {
		window.location.href = '/mypage'
	}

	const onClickLogout = (props) => {
		removeCookie('token');
		window.location.href = '/main';
	}

	if(props.isLogin == true) return (
		<div align="right">
			<button onClick={onClickMypage}>마이페이지</button>
			<button onClick={onClickLogout}>로그아웃</button>
		</div>
	)
	else return (
		<div align="right">
			<button onClick={onClickLogin}>로그인</button>
		</div>
	)
}

export default Mypage;