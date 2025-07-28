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
      const response = await axios.get('/api/diary_search', {
      params: tag ? { tag } : {},
      });

      console.log("取得した日記:", response.data);

  

      // stamp（数字）→ Reaction（絵文字）に変換
      const transformed = response.data.map((diary) => {
        const emoji = emojis.find(e => e.id === Number(diary.stamp));
        return {
          ...diary,
          Reaction: emoji ? emoji.icon : ''
        };
      });

      setDiaries(transformed);
    } catch (error) {
      console.error('日記の取得に失敗しました', error);
    }
  }, [tag]);

  useEffect(() => {
    fetchDiaries(); // 初回マウント時に全件取得
  }, [fetchDiaries]);

  
  

  // 日付クリック時の処理
  const handleDiaryClick = (date) => {
    const diary = diaries.find(d => d.date === date);

    if (diary) {
      navigate(`/diarypage/${diary.diaryId}`); // 詳細画面へ
    } else {
      navigate('/register', { state: { selectedDate: date } }); // 新規登録画面へ
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
        <button onClick={fetchDiaries}>スタンプ検索</button>
      
      </div>

      <Calendar
        onDateClick={handleDiaryClick}
        diaries={diaries}
      />
    </div>
  );
}

export default Home;