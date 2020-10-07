import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const nameRef = React.useRef();
  const linkRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name: nameRef.current.value, link: linkRef.current.value });
    onClose();
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}>
      <input
        ref={nameRef}
        id="card-name"
        name="name"
        type="text"
        className="popup__input"
        placeholder="Название"
        minLength="2"
        maxLength="40"
        pattern="[А-Яа-я\w -]+"
        required />
      <span
        id="card-name-error"
        className="popup__error" />
      <input
        ref={linkRef}
        id="card-link"
        name="link"
        type="url"
        className="popup__input"
        placeholder="Ссылка на картинку"
        required />
      <span
        id="card-link-error"
        className="popup__error"
      />
      <input
        type="submit"
        value="Создать"
        className="popup__save-button"
      />
    </PopupWithForm>
  )
}

export default AddPlacePopup;
