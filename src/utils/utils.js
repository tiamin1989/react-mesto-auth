import Api from './api.js';

export const connectApi = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-13',
  /* baseUrl: 'http://localhost:3000', */
  headers: {
    authorization: '246303c7-23cd-4e0a-b8c9-2c009047ffb2',
    'Content-Type': 'application/json'
  }
});
