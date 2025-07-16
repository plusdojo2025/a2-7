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
<<<<<<< Updated upstream

     
        
        {/* <img src={logo} className="App-logo" alt="logo" />

     

        {/*<img src={logo} className="App-logo" alt="logo" />

=======
     
        
        {/* <img src={logo} className="App-logo" alt="logo" />
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream

        </a> */}
=======
        </a> */}
        
>>>>>>> Stashed changes
      
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

<<<<<<< Updated upstream
             {/* ホーム画面（タグ検索＋カレンダー含む） */}
            <Route path="/calendar" element={<Calendar />} />

            <Route path="/timeline" element={<Timeline></Timeline>}></Route>
            <Route path="/diarypage" element={<UserDiary></UserDiary>}></Route>
=======
            {/* タイムライン画面*/}
            <Route path="/timeline" element={<Timeline/>}/>

            {/* 日記詳細画面*/}
            <Route path="/diarypage" element={<UserDiary/>}/>
>>>>>>> Stashed changes

          </Routes>
        </BrowserRouter>
        </header>
       </div>
  );
}

export default App;
