import React, { useState, useEffect } from 'react';
import { setCookie } from '../utils/Cookie_util';
 
function Login() {
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')
 
	// input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
    const handleInputId = (e) => {
        setInputId(e.target.value)
    }
 
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }
 
	// login 버튼 클릭 이벤트
    const onClickLogin = (props) => {
        console.log('click login');
        const userData = {
            'id': inputId,
            'password': inputPw,
        };
        fetch("/api/login", { //auth 주소에서 받을 예정
          method: "POST", // method :통신방법
          headers: {      // headers: API 응답에 대한 정보를 담음
            "content-type": "application/json",
          },
          body: JSON.stringify(userData), //userData라는 객체를 보냄
        })
          .then((res) => res.json())
          .then((json) => {            
            if(json.isLogin===true){
              setCookie('token', json.token);
              window.location.href = '/main';
            }
            else {
              alert('로그인 실패')
            }
          });
    }

    const onClickGoogleOauth = (props) => {
      window.location.href='http://localhost:8888/api/auth/google/login'
    }

    // const onClickKaKaoOauth = (props) => {
    //   window.location.href='http://localhost:8888/api/auth/kakao/login'
    // }

    const onClickRegister = (props) => {
      window.location.href = '/register';
    }
 
	// 페이지 렌더링 후 가장 처음 호출되는 함수
    useEffect(() => {
        
    },
    // 페이지 호출 후 처음 한번만 호출될 수 있도록 [] 추가
    [])
 
    return(
        <div style={{
			display: 'flex', justifyContent: 'center', alignItems: 'center',
			width: '100%', height: '100vh', flexDirection: 'column'
		}}>
          <h2>Login</h2><br/>
          <form>
            <div>
              <label htmlFor='input_id'>ID : </label>
              <input type='text' name='input_id' value={inputId} onChange={handleInputId} />
            </div>
            <div>
              <label htmlFor='input_pw'>PW : </label>
              <input type='password' name='input_pw' value={inputPw} onChange={handleInputPw} />
            </div>
            <div>
              <button type='button' onClick={onClickLogin}>Login</button>
            </div>
          </form>
          <button onClick={onClickRegister}>회원가입</button>
          <button onClick={onClickGoogleOauth}>구글로그인</button>
          {/* <button onClick={onClickKaKaoOauth}>카카오로그인</button> */}
        </div>
    )
}
 
export default Login;