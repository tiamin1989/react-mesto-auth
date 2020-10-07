import React from 'react';

function PopupWithForm({ children, isOpen, name, onClose, title, onSubmit }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'page_opened' : 'page_closed'}`}>
      <form className="popup__container" name={name} onSubmit={onSubmit} noValidate>
        <button type="button" className="page__close" onClick={onClose} />
        <h2 className="popup__title">{title}</h2>
        {children}
      </form>
    </div>
  )
}

export default PopupWithForm;
