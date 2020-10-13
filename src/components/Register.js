import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password);
  }

  return (
    <section className="auth">
      <h1 className="auth__title">Регистрация</h1>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input className="auth__input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="auth__input" type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input className="auth__submit" type="submit" value="Зарегистрироваться" />
      </form>
      <Link to='sign-in' className='auth__sentence'>Уже зарегистрированы? Войти</Link>
    </section>
  )
}

export default Register;
