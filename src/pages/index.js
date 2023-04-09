import {
  FormValidator,
  validationConfig,
  Card,
  initialCards,
  Section,
  PopupWithImage,
  UserInfo,
  PopupWithForm,
  PopupWithConfirmation,
} from '../components';
import './index.css';
import {
  actionGetUserInfo,
  actionGetInitialCards,
  actionSetUserInfo,
  actionAddNewCard,
  actionSetUserAvatar,
} from '../actions';

const editProfileButton = document.querySelector('.profile__edit-button');
const addNewCardButton = document.querySelector('.profile__add-button');
const editAvatarButton = document.querySelector('.profile__change-button');
//* Переменные попапа для редактирования профиля
const formElementEdit = document.querySelector('.popup__container_type_edit');
const formElementAvatar = document.querySelector('.popup__container_type_avatar');
const formEditAvatar = document.getElementsByName('popup-form-change-avatar')[0];
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
  avatarSelector: '.profile__avatar',
});

const popupZoomCard = new PopupWithImage('.popup_type_photo');
popupZoomCard.setEventListeners();

const popupEditProfile = new PopupWithForm('.popup_type_edit', handleFormSubmitEditProfile);
popupEditProfile.setEventListeners();

//* функция для отправки данных по кнопке сохранить в профиле
async function handleFormSubmitEditProfile(values) {
  const data = {
    name: values['input-name'],
    about: values['input-job'],
  };

  const result = await actionSetUserInfo(data);
  if (result._id) {
    userInfo.setUserInfo(result);
    popupEditProfile.close();
  }
}

const formEditAvatarValidator = new FormValidator(validationConfig, formElementAvatar);
formEditAvatarValidator.enableValidation();

const popupEditAvatar = new PopupWithForm('.popup_type_avatar', handleFormSubmitEditAvatar);
popupEditAvatar.setEventListeners();

async function handleFormSubmitEditAvatar(values) {
  const data = {
    avatar: values['input-link'],
  };
  const result = await actionSetUserAvatar(data);
  if (result.avatar) {
    userInfo.setUserInfo(result);
    popupEditAvatar.close();
  }
}

editAvatarButton.addEventListener('click', () => {
  popupEditAvatar.open();
  formEditAvatar.reset();
  formEditAvatarValidator.disableSubmitButton();
  formEditAvatarValidator.removeValidationErrors();
});

const popupWithConfirmation = new PopupWithConfirmation('.popup_type_confirmation');
popupWithConfirmation.setEventListeners();

const popupAddCard = new PopupWithForm('.popup_type_add', handleFormSubmitAddNewCard);
popupAddCard.setEventListeners();

//* функция для отправки данных по кнопке сохранить
async function handleFormSubmitAddNewCard() {
  const result = await actionAddNewCard({ name: titleInput.value, link: photoInput.value });
  if (result?._id) {
    createCard(result);
    popupAddCard.close();
  }
}

const createCard = (initialCard) => {
  const userId = userInfo.getUserId();

  const card = new Card({
    ...initialCard,
    userId: userId,
    selector: '.card-template',
    callbackZoom: (props) => popupZoomCard.open(props),
    callbackConfirmation: (ref, id) => {
      popupWithConfirmation.open();
      popupWithConfirmation.setCardData(ref, id);
    },
  });
  section.addItem(card.getElement());
};

const section = new Section({ renderer: createCard }, '.galery');

const formEditProfilValidator = new FormValidator(validationConfig, formElementEdit);
formEditProfilValidator.enableValidation();

//* получение данных с карточки пользователя в попап редактирования профиля
function getUserInfoInPopup() {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  aboutInput.value = userData.about;
}

editProfileButton.addEventListener('click', () => {
  getUserInfoInPopup();
  popupEditProfile.open();
  formEditProfilValidator.disableSubmitButton();
  formEditProfilValidator.removeValidationErrors();
});

const formAddNewCardValidator = new FormValidator(validationConfig, formElementAdd);
formAddNewCardValidator.enableValidation();

addNewCardButton.addEventListener('click', () => {
  popupAddCard.open();
  formAddNewCards.reset();
  formAddNewCardValidator.disableSubmitButton();
  formAddNewCardValidator.removeValidationErrors();
});

actionGetUserInfo((props) => userInfo.setUserInfo(props));

actionGetInitialCards((cards) => section.renderItems(cards));
