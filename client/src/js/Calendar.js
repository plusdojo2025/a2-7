import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // 日付クリック対応
import jaLocale from '@fullcalendar/core/locales/ja'; // 日本語ロケール
import '../css/Calendar.css';


const Calendar = () => {
  const [events] = useState([
    { title: '日記あり', date: '2025-07-16' },
    { title: '嬉しかった日', date: '2025-07-20' },
  ]);

  const handleDateClick = (info) => {
    // 感情スタンプの日付クリック → 日記画面へ遷移
    const clickedDate = info.dateStr;
    window.location.href = `/diarypage?date=${clickedDate}`;
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        events={events}
        locale={jaLocale} // 日本語化
        height="auto"
      />
    </div>
  );
};

export default Calendar;