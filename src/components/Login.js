import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(email, password);
  }

  return (
    <section className="auth">
      <h1 className="auth__title">Вход</h1>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input className="auth__input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="auth__input" type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input className="auth__submit" type="submit" value="Войти" />
      </form>
      <Link to="/sign-up" className="auth__sentence">Еще не зарегистрированы? Регистрация</Link>
    </section>
  )
}

export default Login;
