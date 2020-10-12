import React, { useState } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import { authorize } from '../utils/auth.js';

function Login({ onLogin, loggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    authorize(email, password)
      .then((res) => {
        onLogin(true, null, res.token);
      })
      .catch((err) => onLogin(false, err));
  }

  return (
    <Route>
      {
        () => !loggedIn ? (
          <section className="auth">
            <h1 className="auth__title">Вход</h1>
            <form className="auth__form" onSubmit={handleSubmit}>
              <input className="auth__input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input className="auth__input" type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
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
