import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Login.css';

function Login() {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginId || !password) {
      alert('ログインIDとパスワードを入力してください');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          loginId,
          password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert(data.message);  // ログイン成功メッセージ
        navigate('/home');    // ホーム画面に遷移
      } else {
        alert(data.message);  // エラーメッセージ
      }

    } catch (error) {
      console.error('ログインエラー:', error);
      alert('通信エラーが発生しました');
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

