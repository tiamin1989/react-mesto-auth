import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
      avatar: currentUser.avatar
    });
    onClose();
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}>
      <input
        onChange={e => setName(e.target.value)}
        id="profile-name"
        name="name"
        type="text"
        defaultValue={name}
        className="popup__input"
        minLength="2"
        maxLength="40"
        pattern="[А-Яа-я\w -]+"
        required />
      <span
        id="profile-name-error"
        className="popup__error"
      />
      <input
        onChange={e => setDescription(e.target.value)}
        id="profile-activity"
        name="about"
        type="text"
        defaultValue={description}
        className="popup__input"
        minLength="2"
        maxLength="200"
        pattern="[А-Яа-я\w -]+"
        required
      />
      <span
        id="profile-activity-error"
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

export default EditProfilePopup;
