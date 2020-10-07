import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
    onClose();
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}>
      <input
        id="card-link"
        name="url"
        type="url"
        ref={avatarRef}
        className="popup__input"
        placeholder="Ссылка на картинку"
        required
      />
      <span
        id="card-link-error"
        className="popup__error"
      />
      <input
        type="submit"
        value="Сохранить"
        className="popup__save-button"
      />
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
