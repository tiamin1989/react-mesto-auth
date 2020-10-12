import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { register } from '../utils/auth.js';

function Register({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChange(e) {
    e.target.type === 'email' ?
      setEmail(e.target.value) :
      setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    register(email, password).then((res) => {
      if (res.ok) {
        res.json().then(() => {
          onRegister(true, 'Регистрация прошла успешно!', email, password)
        });
      } else {
        res.json().then((res) => onRegister(false, res.error));
      }
    });
  }

  return (
    <section className="auth">
      <h1 className="auth__title">Регистрация</h1>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input className="auth__input" type="email" placeholder="Email" onChange={handleChange} />
        <input className="auth__input" type="password" placeholder="Пароль" onChange={handleChange} />
        <input className="auth__submit" type="submit" value="Зарегистрироваться" />
      </form>
      <Link to='sign-in' className='auth__sentence'>Уже зарегистрированы? Войти</Link>
    </section>
  )
}

export default Register;
