export class Card {
  constructor({ selector, name, link, callbackZoom }) {
    this._element = this._cloneCard(selector);
    this._setCardData(name, link);
    this._data = { name, link };
    this._callbackZoom = callbackZoom;
    this._setEventListeners();
  }

  //* публичный метод, для получения dom элемента карточки
  getElement() {
    return this._element;
  }

  //* метод для получения шаблона карточки и наполнение данными
  _cloneCard(selector) {
    const card = document.querySelector(selector).content.querySelector('.card').cloneNode(true);

    return card;
  }

  //* метод наполнение данными карточки
  _setCardData(name, link) {
    this._setTitleData(name);
    this._setImageData(name, link);
  }

  _setImageData(name, link) {
    const image = this._element.querySelector('.card__photo');
    if (image) {
      image.src = link;
      image.alt = name;
    }
  }

  _setTitleData(name) {
    const title = this._element.querySelector('.card__title');
    if (title) {
      title.textContent = name;
    }
  }

  //* метод удаления карточки
  _deleteCard(evt) {
    if (evt.target.classList.contains('card__delete-button')) {
      const eventTarget = evt.target.closest('.card');
      eventTarget.remove();
    }
  }

  //* метод лайка карточки
  _handleLikeCard(evt) {
    const buttonLike = evt.target;
    if (buttonLike.classList.contains('card__like-button')) {
      buttonLike.classList.toggle('card__like-button_active');
    }
  }

  _setEventListeners() {
    this._element.addEventListener('click', (evt) => {
      //! для сохранения контекста использовать только стрелочные функциии
      this._deleteCard(evt);
      this._handleLikeCard(evt);
      this._callbackZoom(evt, this._data);
    });
  }
}
