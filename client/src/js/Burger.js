import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import '../css/Burger.css';

class Burger extends React.Component {
  showSettings (event) {
    event.preventDefault();
  }

  render () {
    return (
      <Menu noOverlay right>
        <a id="home" className="menu-item" href="/home">ホーム</a>
        <a id="graph" className="menu-item" href="/graph">グラフ分析</a>
        <a id="timeline" className="menu-item" href="/timeline">タイムライン</a>
        <a id="mypage" className="menu-item" href="/mypage">マイページ</a>
        <a id="logout" className="menu-item" href="/login">ログアウト</a>
      </Menu>
    );
  }
}
export default Burger;

