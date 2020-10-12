import React from 'react';
import successImg from '../images/success.svg';
import warningImg from '../images/warning.svg';

function InfoTooltip({ isSuccess, isOpen, name, onClose }) {

  return (
    <div className={`popup ${isOpen ? 'page_opened' : 'page_closed'}`}>
      <form className="popup__container" name="info-tooltip" noValidate>
        <button type="button" className="page__close" onClick={onClose} />
        <div className="popup__message">
          <img
            className="popup__message-image"
            src={isSuccess ? successImg : warningImg}
            alt={isSuccess ? 'Успешная регистрация' : 'Произошла ошибка'}
          />
          <p className="popup__message-text">
            {isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
          </p>
        </div>
      </form>
    </div>
  )
}

export default InfoTooltip;
