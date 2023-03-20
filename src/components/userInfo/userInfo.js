export class UserInfo {
  constructor({ nameSelector, aboutSelector }) {
    this._profileName = document.querySelector(nameSelector);
    this._profileAboutMe = document.querySelector(aboutSelector);
  }

  //публичный метод getUserInfo, который возвращает объект с данными пользователя.
  getUserInfo() {
    this._userData = {
      name: this._profileName.textContent,
      about: this._profileAboutMe.textContent,
    };
    return this._userData;
  }

  //публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(values) {
    this._profileName.textContent = values['input-name'];
    this._profileAboutMe.textContent = values['input-job'];
  }
}
