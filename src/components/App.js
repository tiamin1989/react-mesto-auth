import React, { useState } from 'react';
import { Route, Switch, withRouter, Redirect, useHistory } from 'react-router-dom';
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
import ProtectedRoute from './ProtectedRoute.js';
import InfoTooltip from './InfoTooltip.js';
import { tokenCheck, authorize, register } from '../utils/auth.js';

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
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);

  const history = useHistory();

  function handleCardLike(card) {
    const jwt = localStorage.getItem('jwt');
    const isLiked = card.likes.some(likeId => likeId === currentUser._id);
    connectApi.likeCard(`Bearer ${jwt}`, card._id, isLiked, currentUser._id).then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    })
      .catch((err) => {
        setErrorText(err);
      });
  }

  function handleCardDelete() {
    const jwt = localStorage.getItem('jwt');
    connectApi.deleteCardData(`Bearer ${jwt}`, cardId)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== cardId);
        setCards(newCards);
      })
      .catch((err) => {
        setErrorText(err);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    const jwt = localStorage.getItem('jwt');
    connectApi.saveCardData(`Bearer ${jwt}`, newCard)
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
    setInfoTooltipPopupOpen(false);
  }

  function handleCardClick(e) {
    setSelectedCard(e.target.src);
    setImagePopupOpen(true);
  }

  function handleUpdateUser({ name, about, avatar }) {
    const jwt = localStorage.getItem('jwt');
    connectApi.savePersonData(`Bearer ${jwt}`, { name, about })
      .then(() => {
        setCurrentUser({ name, about, avatar });
      })
      .catch((err) => {
        setErrorText(err);
      });
  }

  function handleUpdateAvatar(avatarInfo) {
    const jwt = localStorage.getItem('jwt');
    connectApi.changeAvatar(`Bearer ${jwt}`, avatarInfo)
      .then(res => {
        setCurrentUser({ avatar: avatarInfo });
      })
      .catch((err) => {
        setErrorText(err);
      });
  }

  function handleRegisterSumbit(email, password) {
    register(email, password)
      .then((res) => {
        setErrorText('');
        history.push('/sign-in');
        setIsSuccess(true);
        setInfoTooltipPopupOpen(true);
      })
      .catch((err) => {
        setErrorText(err);
        setIsSuccess(false);
        setInfoTooltipPopupOpen(true);
      });
  }

  function handleLoginSubmit(email, password) {
    authorize(email, password)
      .then((res) => {
        setErrorText('');
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
      })
      .catch((err) => {
        setErrorText(err);
        setIsSuccess(false);
        setInfoTooltipPopupOpen(true);
      });
  }

  function handleClickAction() {
    if (loggedIn) {
      localStorage.removeItem('jwt');
      setLoggedIn(false);
    }
  }

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      tokenCheck(jwt)
        .then((res) => {
          setCurrentUser(res);
          setLoggedIn(true);
        })
        .catch((err) => setErrorText(err));

      connectApi.getInitialCards(`Bearer ${jwt}`)
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
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        onClick={handleClickAction}
        loggedIn={loggedIn}
        currentUser={currentUser}
      />
      <div className="page__divider">{errorText}</div>
      <Switch>

        <Route path="/sign-up">
          <Register
            onRegister={handleRegisterSumbit}
          />
        </Route>

        <Route path="/sign-in">
          {
            () => !loggedIn ? (
              <Login
                onLogin={handleLoginSubmit}
              />
            ) : <Redirect to="./" />
          }
        </Route>

        <ProtectedRoute
          exact path="/"
          loggedIn={loggedIn}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onConfirm={handleConfirmClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          component={Main}
        />
      </Switch>

      <Footer />

      <InfoTooltip
        isOpen={isInfoTooltipPopupOpen}
        onClose={closeAllPopups}
        isSuccess={isSuccess}>
      </InfoTooltip>

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

export default withRouter(App);
