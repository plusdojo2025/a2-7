//import logo from './logo.svg';
import Timeline from './js/Timeline';
import UserDiary from './js/UserDiary';
import './App.css';
//import Calendar from './js/Calendar';
import Home from './js/Home';
import { BrowserRouter,Routes,Route,Navigate, useLocation} from 'react-router-dom';
import Signup from './js/Signup';
import Login from './js/Login';
import Graph from './js/Graph';
import Mypage from './js/MyPage';
import Search from './js/Search';
import UserInfo from './js/UserInfo';
import DairyComponent from './Components/DiariesComponentsTest';
import Burger from './js/Burger';



function AppContent() {
 const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
  
    <div className="App">
      <header className="App-header">
        <div className="title">
         <h1 >TagMe</h1>
        </div>
         {/* ログイン・サインアップ画面以外で表示 */}
        {!isAuthPage && <Burger />}

        
        
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
        
      
       
          <Routes>
            {/*<Route index element={<BookList></BookList>}></Route>*/}
             {/* 初期表示時はログインへ */}
            <Route path="/" element={<Navigate to="/login" />} />

            {/* ログイン画面 */}
            <Route path="/login" element={<Login />} />

            {/* マイページ */}
            <Route path="/mypage" element={<Mypage />} />

            {/* 検索 */}
            <Route path="/search" element={<Search />} />

            {/* 新規登録 */}
            <Route path="/signup" element={<Signup />} />

            {/* ホーム画面（タグ検索＋カレンダー含む） */}
            <Route path="/home" element={<Home />} />

            {/* タイムライン画面*/}
            <Route path="/timeline" element={<Timeline/>}/>

            {/* 日記詳細画面*/}
            <Route path="/diarypage" element={<UserDiary/>}/>

            {/* ユーザー情報*/}
            <Route path="/userinfo" element={<UserInfo/>}/>

            {/* グラフ*/}
            <Route path="/graph" element={<Graph/>}/>

            {/* 日記登録*/}
            <Route path="/register" element={<DairyComponent/>}/>

          </Routes>
        
        </header>

        <footer>
          <p>©MoguMogu★Mix</p>
        </footer>
       </div>
  
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
