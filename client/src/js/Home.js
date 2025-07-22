import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Calendar from './Calendar';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css';

const emojiMap = {
      1:'😡',
      2:'😕',
      3:'😐',
      4:'🙂',
      5:'😍'
};

function Home() {
  const [tag, setTag] = useState('');
  const [diaries, setDiaries] = useState([]);
  const navigate = useNavigate();

  // タグ検索 or 全件取得
  const fetchDiaries = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/search', {
        params: tag ? { tag } : {},
      });
      setDiaries(response.data);
    } catch (error) {
      console.error('日記の取得に失敗しました', error);
    }
  }, [tag]);

  useEffect(() => {
    fetchDiaries();
  }, [fetchDiaries]);

  // 日付クリック → 詳細 or 登録へ遷移
  const handleDiaryClick = async (date) => {
    try {
      const res = await fetch(`http://localhost:8080/api/diarypage?date=${date}`);
      const data = await res.json();

      if (data) {
        navigate(`/diarypage?date=${date}`);
      } else {
        navigate(`/register`);
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
          placeholder="タグで検索（例: #頑張った）"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <button onClick={fetchDiaries}>検索</button>
      </div>

      <ul>
        {diaries.map((diary) => (
          <li key={diary.id}>
            <strong>{diary.date}</strong>: {diary.content}{' '}
            <span style={{ marginLeft: '10px' }}>
              {emojiMap[Number(diary.emotion)] || ''}
            </span>
            <button onClick={() => navigate(`/diarypage?date=${diary.date}`)}>詳細へ</button>
            <button onClick={() => handleDiaryClick(diary.date)}>📅 感情スタンプ</button>
          </li>
        ))}
      </ul>

      <Calendar
        onDateClick={handleDiaryClick}
        diaries={diaries.map(diary => ({
          ...diary,
          emotion: emojiMap[Number(diary.emotion)] || '',
        }))}
      />
    </div>
  );
}

export default Home;