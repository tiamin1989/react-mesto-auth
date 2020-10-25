import Api from './api.js';

export const connectApi = new Api({
  /* baseUrl: 'https://api.tiamin.students.nomoreparties.space', */
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});
