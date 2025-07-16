import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // 小文字始まりが慣習です

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginId === 'user' && password === 'pass') {
      navigate('/home'); // ここも小文字
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
        新規登録は<Link to="/signup">こちら</Link>
      </p>
    </div>
  );
}

export default Login;