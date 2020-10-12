import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { register } from '../utils/auth.js';

function Register({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    register(email, password)
      .then((res) => {
        onRegister(true, 'Регистрация прошла успешно!', res.email, res._id)
      })
      .catch((err) => onRegister(false, err));
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
