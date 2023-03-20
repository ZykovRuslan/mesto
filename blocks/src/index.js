import {
  FormValidator,
  validationConfig,
  Card,
  initialCards,
  Section,
  PopupWithImage,
  UserInfo,
  PopupWithForm,
} from './components';
import './index.css';

const editProfileButton = document.querySelector('.profile__edit-button');
const addNewCardButton = document.querySelector('.profile__add-button');
//* Переменные попапа для редактирования профиля
const formElementEdit = document.querySelector('.popup__container_type_edit');
const nameInput = formElementEdit.querySelector('.popup__input_data_name');
const aboutInput = formElementEdit.querySelector('.popup__input_data_job');
//* Переменные попапа для добавление новых карточек
const formElementAdd = document.querySelector('.popup__container_type_add');
const formAddNewCards = document.getElementsByName('popup-form-add-new-card')[0];
const titleInput = formElementAdd.querySelector('.popup__input_data_title');
const photoInput = formElementAdd.querySelector('.popup__input_data_photo');

export const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about-me',
});

const popupZoomCard = new PopupWithImage('.popup_type_photo');
popupZoomCard.setEventListeners();

const popupEditProfile = new PopupWithForm('.popup_type_edit', handleFormSubmitEditProfile);
popupEditProfile.setEventListeners();

//* функция для отправки данных по кнопке сохранить в профиле
function handleFormSubmitEditProfile(values) {
  userInfo.setUserInfo(values);
  popupEditProfile.close();
}

const popupAddCard = new PopupWithForm('.popup_type_add', handleFormSubmitAddNewCard);
popupAddCard.setEventListeners();

//* функция для отправки данных по кнопке сохранить
function handleFormSubmitAddNewCard() {
  createCard({ name: titleInput.value, link: photoInput.value });
  popupAddCard.close();
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

const formEditValidator = new FormValidator(validationConfig, formElementEdit);
formEditValidator.enableValidation();

editProfileButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  aboutInput.value = userData.about;
  popupEditProfile.open();
  formEditValidator.disableSubmitButton();
  formEditValidator.removeValidationErrors();
});

const formAddValidator = new FormValidator(validationConfig, formElementAdd);
formAddValidator.enableValidation();

addNewCardButton.addEventListener('click', () => {
  popupAddCard.open();
  formAddNewCards.reset();
  formAddValidator.disableSubmitButton();
  formAddValidator.removeValidationErrors();
});
