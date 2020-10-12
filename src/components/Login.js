import React, { useState } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import { authorize } from '../utils/auth.js';

function Login({ onLogin, loggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChange(e) {
    e.target.type === 'email' ?
      setEmail(e.target.value) :
      setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    authorize(email, password).then((res) => {
      if (res.ok) {
        res.json().then((res) => {
          onLogin(true, null, res.token);
        });
      } else {
        res.json().then((res) => {
          onLogin(false, res.message);
        });
      }
    });
  }

  return (
    <Route>
      {
        () => !loggedIn ? (
          <section className="auth">
            <h1 className="auth__title">Вход</h1>
            <form className="auth__form" onSubmit={handleSubmit}>
              <input className="auth__input" type="email" placeholder="Email" onChange={handleChange} />
              <input className="auth__input" type="password" placeholder="Пароль" onChange={handleChange} />
              <input className="auth__submit" type="submit" value="Войти" />
            </form>
            <Link to="/sign-up" className="auth__sentence">Еще не зарегистрированы? Регистрация</Link>
          </section>
        ) : <Redirect to="./" />
      }
    </Route>
  )
}

export default Login;
