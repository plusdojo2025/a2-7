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
      title: diary.stamp,  // 😡 😕 😐 🙂 😍 など
      start: diary.diaryTime,       // "YYYY-MM-DD"
      end: "",
      id: diary.diaryId,
    }));
  }, [diaries]);
  console.log("イベント：");
  console.log(diaries);

  // 日付クリック時の処理（Homeから関数渡す方式）
  const handleDateClick = (info) => {
    const clickedDate = info.dateStr;
    onDateClick(clickedDate); // ← 親(Home)から渡された関数を呼び出す
  };

  const handleEventContent = (arg) => {
    
    let stamp = '';
    switch(arg.event.title){
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

    }
    console.log("stamp:"+stamp);
    return {
      html: '<span>'+stamp+'</span>'
    };
  }

   // 日付クリックで詳細 or 登録へ
  const handleDiaryClick = (date) => {
    // diariesから該当日の日記を探す
    const diary = diaries.find(d => d.date === date);

    if (diary) {
      // 感情スタンプ付き → 詳細画面へ
      navigate("/diarypage/:id");
    } else {
      // なし → 登録画面へ
      navigate('/register', { state: { selectedDate: date } });
    }
  };

  return (
    <div className="calendar_container">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        events={events}
        eventContent={handleEventContent}
        locale={jaLocale}
        height="auto"
      />
    </div>
  );
};

export default Calendar;