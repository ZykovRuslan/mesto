import { Popup } from './Popup';
import { actionDeleteCard } from '../../actions';

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._popupButton = this._popupForm.querySelector('.popup__submit-button');
    this._popupButtonTextContent = this._popupButton.textContent;
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
      const result = await actionDeleteCard(this._cardId);
      if (result?.message === 'Пост удалён') {
        this._cardRef.remove();
        this._cardRef = null;
      }
    }
    this.close();
  }
}
