import { Popup } from './popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._link = this._container.querySelector('.popup__photo');
    this._name = this._container.querySelector('.popup__subtitle');
  }

  open(evt, values) {
    // console.log(values);
    super.open();
    this._link.src = values.link;
    this._link.alt = values.name;
    this._name.textContent = values.name;
  }
}
