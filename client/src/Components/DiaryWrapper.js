import { useLocation } from 'react-router-dom';
import DiariesComponentTest from './DiariesComponentsTest';

const DiaryWrapper = () => {
  const location = useLocation();
  const selectedDate = location.state?.selectedDate; // Get passed date
  return <DiariesComponentTest selectedDate={selectedDate} />;
};

export default DiaryWrapper;
