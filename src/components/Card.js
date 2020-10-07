import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onConfirm, onCardLike }) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(like => like._id === currentUser._id);
  const cardLikeButtonClassName = `${isLiked ? 'photo-grid__heart photo-grid__heart_liked' : 'photo-grid__heart'}`;

  function handleClick(e) {
    onCardClick(e);
  }

  function handleLikeClick(card) {
    onCardLike(card);
  }

  return (
    <article className="photo-grid__item">
      {isOwn && (<button className="photo-grid__delete" onClick={() => onConfirm(card._id)} />)}
      <img src={card.link} alt={card.name} className="photo-grid__photo" onClick={handleClick} />
      <div className="photo-grid__item-info">
        <h2 className="photo-grid__title">{card.name}</h2>
        <div className="photo-grid__likes-wrapper">
          <button className={cardLikeButtonClassName} onClick={() => handleLikeClick(card)} />
          <span className="photo-grid__like-count">{card.likes.length}</span>
        </div>
      </div>
    </article>
  )
}

export default Card;
