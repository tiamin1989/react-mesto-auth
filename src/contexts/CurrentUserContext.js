import React from 'react';
import avatarStub from '../images/avatarStub.png';

export const CurrentUserContext = React.createContext();

export const userContext = {
  name: 'Загрузка...',
  about: 'Загрузка...',
  avatar: avatarStub
}
