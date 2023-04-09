export default class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _fetch(path, method, data) {
    let body = data;
    if ((method === 'PATCH' || method === 'POST') && data) {
      body = JSON.stringify(data);
    }

    return fetch(this._url + path, {
      method,
      headers: this._headers,
      body,
    })
      .then(this._checkResponse)
      .catch((err) => console.log(err));
  }

  getUserInfo() {
    return this._fetch('/users/me', 'GET');
  }

  setUserInfo(data) {
    return this._fetch('/users/me', 'PATCH', data);
  }

  addNewCard(data) {
    return this._fetch('/cards', 'POST', data);
  }

  getInitialCards() {
    return this._fetch('/cards', 'GET');
  }

  likeCard(id) {
    return this._fetch(`/cards/likes/${id}`, 'PUT');
  }

  dislikeCard(id) {
    return this._fetch(`/cards/likes/${id}`, 'DELETE');
  }

  deleteCard(id) {
    return this._fetch(`/cards/${id}`, 'DELETE');
  }

  setUserAvatar(data) {
    return this._fetch(`/users/me/avatar`, 'PATCH', data);
  }
}

export const api = new Api({
  url: `https://mesto.nomoreparties.co/v1/cohort-63`,
  headers: {
    authorization: 'e2050b48-b9af-478f-bd01-da5552cfcb90',
    'Content-Type': 'application/json',
  },
});
