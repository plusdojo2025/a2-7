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
      const response = await axios.get('/api/search', {
        
        params: tag ? { tag } : {},//タグが空なら全件取得
      });
      

      

        console.log('取得した日記:', response.data);
      // reactionを感情スタンプに変換して追加
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

  useEffect(() => { //useEffectで初回に全件取得
    fetchDiaries();
  }, [fetchDiaries]);

  // 日付クリックで詳細 or 登録へ
  const handleDiaryClick = (date) => {
    // diariesから該当日の日記を探す
    const diary = diaries.find(d => d.date === date);

    if (diary) {
      // 感情スタンプ付き → 詳細画面へ
      navigate(`/diarypage/${diary.diaryid}`);
    } else {
      // なし → 登録画面へ
      navigate('/register', { state: { selectedDate: date } });
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

      <Calendar
        onDateClick={handleDiaryClick}
        diaries={diaries}
      />
    </div>
  );
}

export default Home;