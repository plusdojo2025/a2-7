import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import '../css/Burger.css';

const Burger = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <>
      <div className="custom-burger-button" onClick={handleToggle}>
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
      </div>

      <Menu isOpen={isOpen} onStateChange={({ isOpen }) => setIsOpen(isOpen)} noOverlay right>
        <a className="menu-item" href="/home">ホーム</a>
        <a className="menu-item" href="/graph">グラフ分析</a>
        <a className="menu-item" href="/timeline">タイムライン</a>
        <a className="menu-item" href="/mypage">マイページ</a>
        <a className="menu-item" href="/login">ログアウト</a>
      </Menu>
    </>
  );
};

export default Burger;