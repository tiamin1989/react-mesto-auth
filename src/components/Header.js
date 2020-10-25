import React, { useContext } from 'react';
import logo from '../images/logo.svg';
import { useLocation, Link } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Header({ loggedIn, onClick }) {
  const location = useLocation();
  const {currentUser} = useContext(CurrentUserContext);
  return (
    <header className="header">
      <img src={logo} alt="Логотип Mesto - Russia" className="header__logo" />
      <div className="header__auth-wrapper">
        <span className="header__auth-email">{loggedIn ? currentUser.email : ''}</span>
        {!loggedIn ?
          (<Link to={location.pathname === '/sign-in' ? '/sign-up' : '/sign-in'} className="header__auth-action">{location.pathname === '/sign-in' ? 'Регистрация' : 'Войти'}</Link>) :
          (<Link to="/" className="header__auth-action" onClick={onClick}>Выйти</Link>)
        }
      </div>
    </header>
  )
}

export default Header;
