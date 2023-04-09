import { Popup } from './Popup';

export class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSibmitForm) {
    super(popupSelector);
    this._callbackSibmitForm = callbackSibmitForm;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
  }

  // метод который собирает данные всех полей формы.
  _getInputValues() {
    const result = {};
    Array.from(this._inputList).forEach((input) => {
      result[input.name] = input.value;
    });
    return result;
  }

  // перезаписывает родительский метод setEventListeners.
  // должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const values = this._getInputValues();
      this.changeTextButton('Сохрание...');
      this._callbackSibmitForm(values).then(() => this.changeTextButton('Сохранить'));
    });
  }

  changeTextButton(text) {
    const button = this._popupForm.querySelector('.popup__submit-button');
    if (button) {
      button.textContent = text;
    }
  }

  // перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
  close() {
    super.close();
    this._popupForm.reset();
  }
}
