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
      const response = await axios.get('http://localhost:8080/api/search', {
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

  // 感情スタンプや日付クリック → 該当日の日記があるか確認し、画面を分岐
  const handleDiaryClick = async (date) => {
    try {
      const res = await fetch(`http://localhost:8080/api/diarypage?date=${date}`);
      const data = await res.json();

      if (data) {
        navigate(`/diarypage?date=${date}`); // 詳細画面へ
      } else {
        navigate(`/regist?date=${date}`); // 登録画面へ
      }
    } catch (error) {
      console.error('日記確認に失敗しました', error);
    }
  };

  return (
    <div className="home_container">
      <div className="home_box">
        <input
          type="text"
          placeholder="タグで検索（例: 頑張った）"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <button onClick={fetchDiaries}>検索</button>
      </div>

      <ul>
        {diaries.map((diary) => (
          <li key={diary.id}>
            <strong>{diary.date}</strong>: {diary.content}
            <button onClick={() => navigate(`/diarypage?date=${diary.date}`)}>詳細へ</button>
            <button onClick={() => handleDiaryClick(diary.date)}>📅 感情スタンプ</button>
          </li>
        ))}
      </ul>

      {/* カレンダーにクリック処理を渡す */}
      <Calendar onDateClick={handleDiaryClick} />
    </div>
  );
}

export default Home;