import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja';
import '../css/Calendar.css';

const Calendar = ({ onDateClick, diaries }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // diaries を FullCalendar 用の event に変換
    const newEvents = diaries
      .filter(diary => diary.emotion) // 感情があるものだけ
      .map(diary => ({
        title: diary.emotion,        // 例: 😊
        date: diary.date,            // 例: 2025-07-21
        id: diary.id,                // 任意: 識別用
      }));
    setEvents(newEvents);
  }, [diaries]);

  const handleDateClick = (info) => {
    const clickedDate = info.dateStr;
    onDateClick(clickedDate); // 親に通知（画面遷移）
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