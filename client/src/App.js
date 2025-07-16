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
<<<<<<< HEAD
     
        
        {/* <img src={logo} className="App-logo" alt="logo" />
=======
      {/*
      <h2>カレンダー</h2>
       */}

      {/* タグ検索（HomeComponent はカレンダーも日記一覧も含まないように） 
      <HomeComponent />*/}

      {/* カレンダー表示 
      <CalendarComponent />*/}
     

        {/*<img src={logo} className="App-logo" alt="logo" />
>>>>>>> d5e1fe291791363d66c9429985c877f707bd338a
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
<<<<<<< HEAD
        </a> */}
        
=======
        </a>
        */}
>>>>>>> d5e1fe291791363d66c9429985c877f707bd338a
      
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

            <Route path="/timeline" element={<Timeline></Timeline>}></Route>
            <Route path="/diarypage" element={<UserDiary></UserDiary>}></Route>

          </Routes>
        </BrowserRouter>
        </header>
       </div>
  );
}

export default App;
