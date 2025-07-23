import { useLocation } from 'react-router-dom';
import DiariesComponentTest from './DiariesComponentsTest';

const DiaryWrapper = () => {
  const location = useLocation();
  const selectedDate = location.state?.selectedDate;

  console.log('🧭 selectedDate passed to DiaryWrapper:', selectedDate);

  return <DiariesComponentTest key={selectedDate} selectedDate={selectedDate} />;
};

export default DiaryWrapper;
