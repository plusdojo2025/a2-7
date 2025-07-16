import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // useNavigateを追加

function Login() {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // ナビゲーション関数を取得

  const handleLogin = (e) => {
    e.preventDefault();
    // 仮のログイン処理。ここをAPI呼び出しなどに変えてください
    //if (loginId === 'user' && password === 'pass')
    if (loginId && password) {
      // ログイン成功したらホーム画面へ遷移
      navigate('/home');
    } else {
      alert('ログインIDまたはパスワードが違います');
    }
  };

  return (
    <div className="login-container">
      <h2>ログイン</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>ログインID:</label><br />
          <input
            type="text"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>パスワード:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">ログイン</button>
      </form>
      <p className="Signup-link">
        新規登録は<Link to="/signup">こちら</Link> {/* 小文字のほうが無難です */}
      </p>
    </div>
  );
}

export default Login;