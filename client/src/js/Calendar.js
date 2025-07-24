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
      title: diary.stamp,  // 数値（1〜5）が格納されている想定
      start: diary.diaryTime, // "YYYY-MM-DD"
      id: diary.diaryId,      // ← クリック時に参照される
    }));
  }, [diaries]);

  // 日付クリック時の処理（親から関数を呼び出す）
  const handleDateClick = (info) => {
    const clickedDate = info.dateStr;
    onDateClick(clickedDate); // ← Homeから渡された関数を呼び出す
  };

  // 感情スタンプの表示を絵文字に変換
  const handleEventContent = (arg) => {
    let stamp = '';
    switch (arg.event.title) {
      case '1':
        stamp = "😡";
        break;
      case '2':
        stamp = "😕";
        break;
      case '3':
        stamp = "😐";
        break;
      case '4':
        stamp = "🙂";
        break;
      case '5':
        stamp = "😍";
        break;
      default:
        stamp = "";
    }

    return {
      html: `<span>${stamp}</span>`
    };
  };

  // 感情スタンプ（イベント）クリック時に詳細ページへ遷移
  const handleEventClick = (info) => {
    const diaryId = info.event.id;
    navigate(`/diarypage/${diaryId}`);
  };

  return (
    <div className="calendar_container">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        events={events}
        eventContent={handleEventContent}
        eventClick={handleEventClick} // ← イベントクリックで詳細へ
        locale={jaLocale}
        height="auto"
      />
    </div>
  );
};

export default Calendar;