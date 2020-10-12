import React from 'react';
import logo from '../images/logo.svg';

function Header({ loggedIn, userData, onClick }) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип Mesto - Russia" className="header__logo" />
      <div className="header__auth-wrapper">
        <span className="header__auth-email">{loggedIn ? userData.email : ''}</span>
        <a className="header__auth-action" href={loggedIn ? '/' : '/sign-up'} onClick={onClick}>{loggedIn ? 'Выйти' : 'Регистрация'}</a>
      </div>
    </header>
  )
}

export default Header;
