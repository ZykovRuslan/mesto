export class Popup {
  constructor(popupSelector) {
    this._container = document.querySelector(popupSelector);
    this.closeButtons = document.querySelectorAll('.popup__close-button');
    this._openedPopup = document.querySelector('.popup_opened');
  }

  open() {
    // console.log(this);
    this._container.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    document.addEventListener('mousedown', this._handleOverlayClose.bind(this));
  }

  close() {
    this._container.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
    document.removeEventListener('mousedown', this._handleOverlayClose.bind(this));
  }

  /*Содержит приватный метод _handleEscClose, который содержит 
    логику закрытия попапа клавишей Esc.*/
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    this._openedPopup = document.querySelector('.popup_opened'); //* нашли открытый попап
    if (evt.target === this._openedPopup) {
      if (this._openedPopup) {
        this.close(this._openedPopup);
      }
    }
  }

  /*Содержит публичный метод setEventListeners, 
    который добавляет слушатель клика иконке закрытия попапа. 
    Модальное окно также закрывается при клике на затемнённую 
    область вокруг формы*/
  setEventListeners() {
    this.closeButtons.forEach((button) => {
      const popup = button.closest('.popup'); //* находим 1 раз ближайший к крестику попап
      button.addEventListener('click', () => {
        this.close(popup);
      });
    });
  }
}
