import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // useNavigateを追加
import '../css/Login.css';
function Login() {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // ナビゲーション関数を取得

  const handleLogin = (e) => {
    e.preventDefault();
    // 仮のログイン処理。ここをAPI呼び出しなどに変えてください
    //if (loginId === 'user' && password === 'pass')

    if(!loginId || !password ){
      alert('ログインIDとパスワードを入力してください');
      return;
    }

    if (loginId && password) {
      // ログイン成功したらホーム画面へ遷移
      navigate('/home');
    } else {
      alert('ログインIDまたはパスワードが違います');
    }

  };

  return (
    <div className="login_container">
      <h2>ログイン</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>ログインID</label><br />
          <input
            type="text"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
          
          />
        </div>
        <br />
        <div>
          <label>パスワード</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            maxLength={10}

          />
        </div>
        <button id="login" type="submit">ログイン</button>
      </form>
      <p className="Signup-link">
        <Link to="/signup">新規登録はこちら</Link> 
      </p>
    </div>
  );
}

export default Login;