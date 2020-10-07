import React from 'react';

function Login() {
  return (
    <section className="auth">
      <h1 className="auth__title">Вход</h1>
      <form className="auth__form">
        <input className="auth__input" type="email" placeholder="Email" />
        <input className="auth__input" type="password" placeholder="Пароль" />
        <input className="auth__submit" type="submit" value="Войти" />
      </form>
      <a className="auth__sentence" href="/sign-up">Еще не зарегистрированы? Регистрация</a>
    </section>
  )
}

export default Login;
