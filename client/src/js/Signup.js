import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Signup.css';

function Signup() {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (loginId && password && nickname) {
      try {
        const confirmResult = window.confirm("登録してもよろしいですか？");
        if (!confirmResult) {
          console.log("登録がキャンセルされました");
          return;
        }

        // Spring BootのAPIにPOST送信
        const response = await axios.post('http://localhost:8080/api/signup', {
           loginId,
           password,
           nickname,
         }, {
           withCredentials: true 
        });

        console.log("登録成功:", response.data);
        alert("登録が完了しました！");
        navigate('/login'); // 登録後ログイン画面へ遷移

      } catch (error) {
        console.error("登録失敗:", error);
        alert("登録に失敗しました。");
      }
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

        <br />

        <div>
          <label>ニックネーム</label><br />
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            maxLength={15}
          />
        </div>

        <button id="signup" type="submit">登録</button>
      </form>

      <p className="Login-link">
        <Link to="/login">トップページに戻る</Link>
      </p>
    </div>
  );
}

export default Signup;