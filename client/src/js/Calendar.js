import React, { useMemo } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja';
import '../css/Calendar.css';
import { useNavigate } from 'react-router-dom';

const Calendar = ({ diaries, onDateClick }) => {
  const navigate = useNavigate();

  // diaries → FullCalendarのイベント形式に変換
  const events = useMemo(() => {
    return diaries.map(diary => ({
      title: diary.Reaction,  // 😡 😕 😐 🙂 😍 など
      date: diary.date,       // "YYYY-MM-DD"
      id: diary.diary_id,
    }));
  }, [diaries]);

  // 日付クリック時の処理（Homeから関数渡す方式）
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
    onDateClick(clickedDate); // ← 親(Home)から渡された関数を呼び出す
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