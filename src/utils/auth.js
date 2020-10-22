export const BASE_URL = 'http://api.tiamin.students.nomoreparties.space';
/* export const BASE_URL = 'http://localhost:3000'; */

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return res.json().then((res) => {
        return Promise.reject(res.message);
      });
    });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return res.json().then((res) => {
        return Promise.reject(res.message);
      });
    });
};

export const tokenCheck = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }console.log(res,'ОШЫБКА')
      return res.json().then((res) => {
        return Promise.reject(res.message);
      });
    });
}
