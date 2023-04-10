import { Popup } from './Popup';

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, callbackActionDeleteCard) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._popupButton = this._popupForm.querySelector('.popup__submit-button');
    this._popupButtonTextContent = this._popupButton.textContent;
    this._callbackActionDeleteCard = callbackActionDeleteCard;
  }

  setCardData(cardRef, id) {
    this._cardRef = cardRef;
    this._cardId = id;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
    });
  }

  async _handleSubmitCallback() {
    if (this._cardId && this._cardRef) {
      try {
        const result = await this._callbackActionDeleteCard(this._cardId);
        if (result?.message === 'Пост удалён') {
          this._cardRef.remove();
          this._cardRef = null;
        }
      } catch {
        (err) => {
          console.log(err);
        };
      }
    }
    this.close();
  }
}
