import { FormValidator, validationConfig } from './validation/index.js';
import { Card, initialCards } from './card/index.js';
import { Section } from './section.js';
import { PopupWithImage } from './popupWithImage.js';
import { Popup } from './popup.js';

const editProfileButton = document.querySelector('.profile__edit-button');
const addNewCardButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileAboutMe = document.querySelector('.profile__about-me');
//* Переменные попапа для редактирования профиля
const formElementEdit = document.querySelector('.popup__container_type_edit');
const nameInput = formElementEdit.querySelector('.popup__input_data_name');
const jobInput = formElementEdit.querySelector('.popup__input_data_job');
//* Переменные попапа для добавление новых карточек
const formElementAdd = document.querySelector('.popup__container_type_add');
const formAddNewCards = document.getElementsByName('popup-form-add-new-card')[0];
const titleInput = formElementAdd.querySelector('.popup__input_data_title');
const photoInput = formElementAdd.querySelector('.popup__input_data_photo');

const popupEditProfile = new Popup('.popup_type_edit');
const popupAddCard = new Popup('.popup_type_add');

popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();

const popupZoomCard = new PopupWithImage('.popup_type_photo');
popupZoomCard.setEventListeners();

//* функция для отправки данных по кнопке сохранить в профиле
function handleFormSubmitEditProfile(evt) {
  evt.preventDefault(); //* отменяет стандартную отправку формы, так мы можем определить свою логику отправки
  profileName.textContent = nameInput.value;
  profileAboutMe.textContent = jobInput.value;
  popupEditProfile.close();
  //closePopup(popupEdit); //!
}

const createCard = (initialCard) => {
  const card = new Card({
    ...initialCard,
    selector: '.card-template',
    callbackZoom: (evt, props) => {
      const evtTarget = evt.target.closest('.card__photo');
      if (evtTarget) {
        popupZoomCard.open(evt, props);
      }
    },
  });
  section.addItem(card.getElement());
};

const section = new Section({ items: initialCards, renderer: createCard }, '.galery');

section.renderItems();

//* функция для отправки данных по кнопке сохранить в добавление нового места
function handleFormSubmitAddNewCard(evt) {
  evt.preventDefault();
  createCard({ name: titleInput.value, link: photoInput.value });
  popupAddCard.close();
  //closePopup(popupAdd); //!
  evt.target.reset();
}

editProfileButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileAboutMe.textContent;
  popupEditProfile.open();
  //openPopup(popupEdit); //!
  formEditValidator.disableSubmitButton(); //* публичный метод
  formEditValidator.removeValidationErrors(); //* публичный метод
});

addNewCardButton.addEventListener('click', () => {
  popupAddCard.open();
  //openPopup(popupAdd); //!
  formAddNewCards.reset();
  formAddValidator.disableSubmitButton(); //* публичный метод
  formAddValidator.removeValidationErrors(); //* публичный метод
});

//* форма элемента  редактирования профиля
formElementEdit.addEventListener('submit', handleFormSubmitEditProfile);
const formEditValidator = new FormValidator(validationConfig, formElementEdit);
formEditValidator.enableValidation();

//* форма элемента добавления нового места
formElementAdd.addEventListener('submit', handleFormSubmitAddNewCard);
const formAddValidator = new FormValidator(validationConfig, formElementAdd);
formAddValidator.enableValidation();
