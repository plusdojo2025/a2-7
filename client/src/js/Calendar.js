import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja';
import '../css/Calendar.css';
import { useNavigate } from 'react-router-dom';

const Calendar = () => {
  const [diaries, setDiaries] = useState([]);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  // APIから感情付き日記を取得
  // useEffect(() => {
  //   const fetchDiaries = async () => {
  //     try {
  //       const response = await fetch('http://localhost:8080/api/diaries');
  //       const data = await response.json();
  //       setDiaries(data);

  //       // 感情スタンプ付き日記を FullCalendar イベント形式に変換
  //       const newEvents = data.map(diary => ({
  //         title: diary.emotion,    // 😊など
  //         date: diary.date,        // YYYY-MM-DD形式
  //         id: diary.id,
  //       }));
  //       setEvents(newEvents);
  //     } catch (error) {
  //       console.error('日記の取得に失敗しました:', error);
  //     }
  //   };

  //   fetchDiaries();
  // }, []);

  // 日付クリック時の画面遷移ロジック
  const handleDateClick = (info) => {
    const clickedDate = info.dateStr;

    const hasDiary = diaries.some(
      (diary) => diary.date === clickedDate && diary.emotion
    );

    if (hasDiary) {
      navigate(`/diarypage/${clickedDate}`);
    } else {
      navigate(`/register`, { state: { selectedDate: clickedDate } });
      
console.log("Clicked date:", clickedDate);

    }
  };

  return (
    <div className="calendar_container">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        events={events}
        locale={jaLocale}
        height="auto"
      />
    </div>
  );
};

export default Calendar;