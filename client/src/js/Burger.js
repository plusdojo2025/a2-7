import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import '../css/Burger.css';

const Burger = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => {
    setMenuOpen(prev => !prev);
  };

  const handleStateChange = (state) => {
    setMenuOpen(state.isOpen);
  };

  return (
    <>
      <div
        className={`custom-burger-button ${menuOpen ? 'open' : ''}`}
        onClick={handleToggle}
      >
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
      </div>

      <Menu
        isOpen={menuOpen}
        onStateChange={handleStateChange}
        noOverlay
        right
      >
        <a className="menu-item" href="/home">ホーム</a>
        <a className="menu-item" href="/search">検索</a>
        <a className="menu-item" href="/graph">グラフ分析</a>
        <a className="menu-item" href="/timeline">タイムライン</a>
        <a className="menu-item" href="/mypage">マイページ</a>
        <a className="menu-item" href="/userinfo">パスワード変更</a>
        <a className="menu-item" href="/login">ログアウト</a>
      </Menu>
    </>
  );
};

export default Burger;
