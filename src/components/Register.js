import React from 'react';

function Register() {
  return (
    <section className="auth">
      <h1 className="auth__title">Регистрация</h1>
      <form className="auth__form">
        <input className="auth__input" type="email" placeholder="Email" />
        <input className="auth__input" type="password" placeholder="Пароль" />
        <input className="auth__submit" type="submit" value="Зарегистрироваться" />
      </form>
      <a className="auth__sentence" href="/sign-in">Уже зарегистрированы? Войти</a>
    </section>
  )
}

export default Register;
