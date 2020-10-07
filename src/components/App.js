import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import ConfirmPopup from './ConfirmPopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import { connectApi } from '../utils/utils.js';
import { CurrentUserContext, userContext } from '../contexts/CurrentUserContext.js';
import Register from './Register.js';
import Login from './Login.js';

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState('');
  const [cardId, setCardId] = useState('');
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(userContext);
  const [cards, setCards] = useState([]);
  const [errorText, setErrorText] = useState('');
  const [loggedIn, setSoggedIn] = useState(true);

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    connectApi.likeCard(card._id, isLiked).then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    })
      .catch((err) => {
        setErrorText(err);
      });
  }

  function handleCardDelete() {
    connectApi.deleteCardData(cardId)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== cardId);
        setCards(newCards);
      })
      .catch((err) => {
        setErrorText(err);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    connectApi.saveCardData(newCard)
      .then(res => {
        setCards(
          [...cards, res]
        );
      })
      .catch((err) => {
        setErrorText(err);
      });
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleConfirmClick(cardId) {
    setCardId(cardId);
    setConfirmPopupOpen(true);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setConfirmPopupOpen(false);
    setImagePopupOpen(false);
  }

  function handleCardClick(e) {
    setSelectedCard(e.target.src);
    setImagePopupOpen(true);
  }

  function handleUpdateUser({ name, about, avatar }) {
    connectApi.savePersonData({ name, about })
      .then(() => {
        setCurrentUser({ name, about, avatar });
      })
      .catch((err) => {
        setErrorText(err);
      });
  }

  function handleUpdateAvatar(avatarInfo) {
    connectApi.changeAvatar(avatarInfo)
      .then(res => {
        setCurrentUser(res);
      })
      .catch((err) => {
        setErrorText(err);
      });
  }

  React.useEffect(() => {
    connectApi.getInitialCards()
      .then(res => {
        setCards(
          res.map(item => ({
            likes: item.likes,
            link: item.link,
            name: item.name,
            owner: item.owner,
            _id: item._id
          }))
        )
      })
      .catch((err) => {
        setErrorText(err);
      });
  }, [cards]);

  React.useEffect(() => {
    connectApi.getPersonData()
      .then(res => {
        setCurrentUser(res);
      })
      .catch((err) => {
        setErrorText(err);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <div className="page__divider">{errorText}</div>
      <BrowserRouter>
        <Switch>
          <Route path="/sign-up">
            <Register />
          </Route>
          <Route path="/sign-in">
            <Login />
          </Route>
          <Route path="/">
            {<Redirect to={`/${loggedIn ? '' : 'sign-in'}`} />}
          </Route>
        </Switch>
      </BrowserRouter>
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onConfirm={handleConfirmClick}
        onCardClick={handleCardClick}
        cards={cards}
        onCardLike={handleCardLike}
      />
      <Footer />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <ImagePopup
        isOpen={isImagePopupOpen}
        card={selectedCard}
        onClose={closeAllPopups}
      />

      <ConfirmPopup
        isOpen={isConfirmPopupOpen}
        onClose={closeAllPopups}
        onConfirm={handleCardDelete}
        card={cardId}
      />

    </CurrentUserContext.Provider>
  );
}

export default App;
