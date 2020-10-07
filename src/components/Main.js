import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onAddPlace, onConfirm, onCardClick, onEditAvatar, onEditProfile, cards, onCardLike }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__images-wrapper">
          <span className="profile__pen" onClick={onEditAvatar} />
          <img src={currentUser.avatar} alt="Аватар" className="profile__photo" />
        </div>
        <div className="profile__person">
          <div className="profile__name-edit" onClick={onEditProfile}>
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit" />
          </div>
          <p className="profile__activity">{currentUser.about}</p>
        </div>
        <button className="profile__photo-add" onClick={onAddPlace} />
      </section>

      <section className="photo-grid">
        {cards.map((item, index) => {
          return (
            <Card
              key={index}
              card={item}
              onCardClick={onCardClick}
              onConfirm={onConfirm}
              onCardLike={onCardLike}
            />);
        })}
      </section>
    </main>
  )
}

export default Main;
