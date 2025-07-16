//import logo from './logo.svg';
import Timeline from './js/Timeline';
import UserDiary from './js/UserDiary';
import './App.css';

import Calendar from './js/Calendar';
import Home from './js/Home';
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom';
import Signup from './js/Signup';
import Login from './js/Login';


function App() {
  return (
    <div className="App">
      <header className="App-header">
     
        
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        
      
        <BrowserRouter>
          <Routes>
            {/*<Route index element={<BookList></BookList>}></Route>*/}
             {/* 初期表示時はログインへ */}
            <Route path="/" element={<Navigate to="/login" />} />

            {/* ログイン画面 */}
            <Route path="/login" element={<Login />} />

            {/* 新規登録 */}
            <Route path="/signup" element={<Signup />} />

            {/* ホーム画面（タグ検索＋カレンダー含む） */}
            <Route path="/home" element={<Home />} />

            {/* タイムライン画面*/}
            <Route path="/timeline" element={<Timeline/>}/>

            {/* 日記詳細画面*/}
            <Route path="/diarypage" element={<UserDiary/>}/>

          </Routes>
        </BrowserRouter>
        </header>
       </div>
  );
}

export default App;
