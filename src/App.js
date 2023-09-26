import './App.css';
import {Main, Login, Register, Post, Mypage} from './components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react'; 

function App() {
	const [isLogin, setisLogin] = useState(false);

  useEffect(() => {
		fetch('/api/main', {
			method: "GET",
		})
        .then(res => res.json())
		.then((json) => {
			if(json.isLogin){
				setisLogin(true);
			}
		})
        .catch()
    },
    // 페이지 호출 후 처음 한번만 호출될 수 있도록 [] 추가
    [])

  return (
    <div className="App">
      <Mypage isLogin={isLogin} />
      <Router>
        <Routes>
          <Route path="/" element={<Main/>}></Route>
          <Route path="/main" element={<Main/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/post/:idx" element={<Post/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
