import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [tag, setTag] = useState('');
  const [diaries, setDiaries] = useState([]);

  // タグで検索 or 空欄ならすべて取得
  const fetchDiaries = async () => {
    try {
      const response = await axios.get('/diary/search', {
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

  // 感情スタンプを押す（→その日の日記へ移動）
  const handleStampClick = (date) => {
    window.location.href = `/diary/detail?date=${date}`;
  };

  return (
    <div>
      {/* タグ検索ボックス */}
      <input
        type="text"
        placeholder="タグで検索（例: 頑張った）"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      />
      <button onClick={fetchDiaries}>検索</button>

      {/* 日記一覧 */}
     {/* < <h2>日記一覧</h2> */}
      <ul>
        {diaries.map((diary) => (
          <li key={diary.id}>
            <strong>{diary.date}</strong>: {diary.content?.substring(0, 30)}...
            <button onClick={() => handleStampClick(diary.date)}>📅 感情スタンプ</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;