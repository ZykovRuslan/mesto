import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._link = this._popup.querySelector('.popup__photo');
    this._name = this._popup.querySelector('.popup__subtitle');
  }

  open(values) {
    super.open();
    this._link.src = values.link;
    this._link.alt = values.name;
    this._name.textContent = values.name;
  }
}
