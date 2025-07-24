import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Calendar from './Calendar';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css';

const emojis = [
  { id: 1, icon: '😡', label: 'Angry' },
  { id: 2, icon: '😕', label: 'Sad' },
  { id: 3, icon: '😐', label: 'Neutral' },
  { id: 4, icon: '🙂', label: 'Happy' },
  { id: 5, icon: '😍', label: 'Love' }
];

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

      // reactionを感情スタンプに変換して追加
      const transformed = response.data.map((diary) => ({
        ...diary,
        Reaction: emojis[Number(diary.reaction)] || '', // 絵文字付加
      }));

      setDiaries(transformed);
    } catch (error) {
      console.error('日記の取得に失敗しました', error);
    }
  }, [tag]);

  useEffect(() => {
    fetchDiaries();
  }, [fetchDiaries]);

  // 日付クリックで詳細 or 登録へ
  const handleDiaryClick = async (date) => {
    try {
      const res = await fetch(`http://localhost:8080/api/diarypage?date=${date}`);
      const data = await res.json();

      if (data) {
        navigate(`/diarypage/${diaries.diary_id}`);
      } else {
        navigate(`/register`, { state: { selectedDate: date } });
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

      <Calendar
        onDateClick={handleDiaryClick}
        diaries={diaries}
      />
    </div>
  );
}

export default Home;