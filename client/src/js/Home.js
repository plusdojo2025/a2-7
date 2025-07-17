import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Calendar from './Calendar';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css';

function Home() {
  const [tag, setTag] = useState('');
  const [diaries, setDiaries] = useState([]);
  const navigate = useNavigate();

  // タグで検索 or 空欄ならすべて取得
  const fetchDiaries = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/diary/search', {
        params: tag ? { tag } : {},
      });
      setDiaries(response.data);
    } catch (error) {
      console.error('日記の取得に失敗しました', error);
    }
  };

  useEffect(() => {
    fetchDiaries();
  }, []);

  // 感情スタンプを押す（→その日の日記へ移動）実際の処理部分は「その日の日記があるか確認して、画面遷移を分岐する」役割
  const handleDiaryClick = async (date) => {
  const res = await fetch(`http://localhost:8080/api/diary?date=${date}`);
  const data = await res.json();

  if (data) {
    navigate(`/diarypage?date=${date}`); // 日記詳細画面へ
  } else {
    navigate(`/diary?date=${date}`); // 日記登録画面へ
  }
};

  return (
    <div className="home_container">
      <div className="home_box">
      {/* タグ検索ボックス */}
      <input
        type="text"
        placeholder="タグで検索（例: 頑張った）"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      />
      <button onClick={fetchDiaries}>検索</button>
      </div>

      {/* 検索結果の表示 */}
      <ul>
        {diaries.map((diary) => (
          <li key={diary.id}>{diary.content}</li>
        ))}
      </ul>

      {/* 日記一覧 */}
     {/* < <h2>日記一覧</h2>   一覧側は「日付を渡して関数を呼び出すだけ」、*/}
      <ul>
        {diaries.map((diary) => (
          <li key={diary.id}>
            <strong>{diary.date}</strong>: {diary.content?.substring}...
            <button onClick={() => handleDiaryClick(diary.date)}>📅 感情スタンプ</button>
          </li>
        ))}
      </ul>

      {/* カレンダーを表示 */}
      <Calendar />
    </div>
  );
}

export default Home;