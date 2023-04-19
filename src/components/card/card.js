export class Card {
  constructor({
    selector,
    name,
    link,
    userId,
    callbackZoom,
    callbackConfirmation,
    callbackActionLikeCard,
    ...props
  }) {
    this._userId = userId;
    this._element = this._cloneCard(selector, { name, link });

    const hasLike = this._checkLikeById(props.likes || []);
    this._data = { name, link, hasLike, ...props };
    this.btnLike = this._element.querySelector('.card__like-button');
    this.counter = this._element.querySelector('.card__counter');

    this._setCardData(this._data);

    this._callbackZoom = callbackZoom;
    this._callbackConfirmation = callbackConfirmation;
    this._setEventListeners();

    this._cardButtonDelete = this._element.querySelector('.card__delete-button');
    this._removeBtnDeleteCard();

    this._callbackActionLikeCard = callbackActionLikeCard;
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
  _setCardData(data) {
    this._setTitleData(data);
    this._setImageData(data);
    this._setLikeData(data);
  }

  _setImageData({ name, link }) {
    this._data = { ...this._data, name, link };
    // Отрисовка картинки
    const image = this._element.querySelector('.card__photo');
    if (image) {
      image.src = link;
      image.alt = name;
    }
  }

  _removeBtnDeleteCard() {
    if (this._data.owner._id !== this._userId) {
      this._cardButtonDelete.remove();
    }
  }

  _setLikeData({ hasLike, likes }) {
    this._data = { ...this._data, hasLike };
    // Отрисовка like
    if (this.btnLike) {
      if (hasLike) {
        this.btnLike.classList.add('card__like-button_active');
      } else {
        this.btnLike.classList.remove('card__like-button_active');
      }
    }
    if (this.counter && likes.length) {
      this.counter.textContent = likes.length;
    } else {
      this.counter.textContent = '';
    }
  }

  _setTitleData({ name }) {
    this._data = { ...this._data, name };
    // Отрисовка названия
    const title = this._element.querySelector('.card__title');
    if (title) {
      title.textContent = name;
    }
  }

  _checkLikeById(likes) {
    if (this._userId) {
      return likes.some((like) => like._id === this._userId);
    }
    return false;
  }

  //* метод удаления карточки
  async _handleClickDelete(evt) {
    if (evt.target.classList.contains('card__delete-button')) {
      this._callbackConfirmation(this._element, this._data._id);
    }
  }

  //* метод лайка карточки
  async _handleClickLike(evt) {
    const buttonLike = evt.target;
    if (buttonLike.classList.contains('card__like-button')) {
      try {
        const result = await this._callbackActionLikeCard(this._data._id, this._data.hasLike);
        const hasLike = this._checkLikeById(result.likes || []);
        this._setLikeData({ hasLike, likes: result?.likes || [] });
      } catch {
        (err) => {
          console.log(err);
        };
      }
    }
  }

  _handleClickZoom(evt) {
    const evtTarget = evt.target.closest('.card__photo');
    if (evtTarget) {
      this._callbackZoom(this._data);
    }
  }

  _setEventListeners() {
    this._element.addEventListener('click', (evt) => {
      //! для сохранения контекста использовать только стрелочные функциии
      this._handleClickDelete(evt);
      this._handleClickLike(evt);
      this._handleClickZoom(evt);
    });
  }
}
