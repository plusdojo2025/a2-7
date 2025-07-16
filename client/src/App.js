import logo from './logo.svg';
import Timeline from './js/Timeline';
import './App.css';

import CalendarComponent from './Components/CalendarComponent';
import HomeComponent from './Components/HomeComponent';
import { BrowserRouter,Routes,Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      {/*
      <h2>カレンダー</h2>
       */}

      {/* タグ検索（HomeComponent はカレンダーも日記一覧も含まないように） 
      <HomeComponent />*/}

      {/* カレンダー表示 
      <CalendarComponent />*/}
     

        {/*<img src={logo} className="App-logo" alt="logo" />
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
        </a>
        */}
      
        <BrowserRouter>
          <Routes>
            {/*<Route index element={<BookList></BookList>}></Route>*/}
            
            <Route path="/timeline" element={<Timeline></Timeline>}></Route>

          </Routes>
        </BrowserRouter>
        </header>
       </div>
  );
}

export default App;
