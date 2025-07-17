import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Signup.css';

function Signup() {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    
    // 仮の登録処理
    if (loginId && password && nickname) {
      console.log("登録完了:", { loginId, password, nickname });

      // 実際にはここでAPIに登録リクエストを送るなどします
      alert("登録が完了しました！");
      navigate('/login');  // 登録後、ログインページへ遷移
    } else {
      alert("すべての項目を入力してください。");
    }
  };

  return (
    <div className="signup_container">
      <h2>新規登録</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>ログインID</label><br />
          <input
            type="text"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            required
          />
        </div>

        <br />
        
        <div>
          <label>パスワード</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label>ニックネーム</label><br />
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
        </div>
        <button id ="signup" type="submit">登録</button>
      </form>

      <a href="/login">トップページに戻る</a>
    </div>
  );
}

export default Signup;