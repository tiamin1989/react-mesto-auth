import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function ConfirmPopup({ card, onClose, isOpen, onConfirm }) {

  function handleSubmit(e) {
    e.preventDefault();
    onConfirm(card);
    onClose();
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="confirm"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}>
      <input
        type="submit"
        value="Да"
        className="popup__save-button"
      />
    </PopupWithForm>
  )
}

export default ConfirmPopup;
