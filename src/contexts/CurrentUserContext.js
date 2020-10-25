import React from 'react';
import avatarStub from '../images/avatarStub.png';

export const userContext = {
  _id: '0',
  name: 'Загрузка...',
  about: 'Загрузка...',
  avatar: avatarStub,
  email: ''
}

export const CurrentUserContext = React.createContext(userContext);
