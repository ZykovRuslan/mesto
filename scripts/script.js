import { FormValidator, validationConfig } from './validation/index.js';
import { Card, initialCards } from './card/index.js';
const galery = document.querySelector('.galery');
const editProfileButton = document.querySelector('.profile__edit-button');
const addNewCardButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileAboutMe = document.querySelector('.profile__about-me');
const closeButtons = document.querySelectorAll('.popup__close-button'); //* все крестики проекта
//* Переменные попапа для редактирования профиля
const popupEdit = document.querySelector('.popup_type_edit');
const formElementEdit = document.querySelector('.popup__container_type_edit');
const nameInput = formElementEdit.querySelector('.popup__input_data_name');
const jobInput = formElementEdit.querySelector('.popup__input_data_job');
//* Переменные попапа для добавление новых карточек
const popupAdd = document.querySelector('.popup_type_add');
const formElementAdd = document.querySelector('.popup__container_type_add');
const formAddNewCards = document.getElementsByName('popup-form-add-new-card')[0];
const titleInput = formElementAdd.querySelector('.popup__input_data_title');
const photoInput = formElementAdd.querySelector('.popup__input_data_photo');
//* Переменные попапа для открытия фото
const popupCardPhoto = document.querySelector('.popup_type_photo');
const popupPhoto = popupCardPhoto.querySelector('.popup__photo');
const popupSubtitle = popupCardPhoto.querySelector('.popup__subtitle');

//* функция для открытия попап
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByClickEsq);
  document.addEventListener('mousedown', closePopupByClickOutPopup);
}

//* функция для закрытия попап
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByClickEsq);
  document.removeEventListener('mousedown', closePopupByClickOutPopup);
}

//* функция для отправки данных по кнопке сохранить в профиле
function handleFormSubmitEditProfile(evt) {
  evt.preventDefault(); //* отменяет стандартную отправку формы, так мы можем определить свою логику отправки
  profileName.textContent = nameInput.value;
  profileAboutMe.textContent = jobInput.value;
  closePopup(popupEdit);
}

function renderCard(card) {
  galery.prepend(card);
}

function createCard(initialCard) {
  const card = new Card({
    ...initialCard,
    selector: '.card-template',
    callbackZoom: handleZoomCard,
  });
  renderCard(card.getElement());
}

function renderCardInitials() {
  initialCards.forEach(function (initialCard) {
    createCard(initialCard);
  });
}

renderCardInitials();

//* функция для отправки данных по кнопке сохранить в добавление нового места
function handleFormSubmitAddNewCard(evt) {
  evt.preventDefault();
  createCard({ name: titleInput.value, link: photoInput.value });
  closePopup(popupAdd);
  evt.target.reset();
}

//* функция для увеличения фото в карточке
function handleZoomCard(evt, { name, link }) {
  const evtTarget = evt.target.closest('.card__photo');
  if (evtTarget) {
    popupPhoto.src = link;
    popupPhoto.alt = name;
    popupSubtitle.textContent = name;
    openPopup(popupCardPhoto);
  }
}

//* функция для закрытия попапов по кнопке esq
function closePopupByClickEsq(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened'); //* нашли открытый попап
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

//* функция для закрытия попапов по клику вне окна
function closePopupByClickOutPopup(evt) {
  const openedPopup = document.querySelector('.popup_opened'); //* нашли открытый попап
  if (evt.target === openedPopup) {
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

editProfileButton.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileAboutMe.textContent;
  openPopup(popupEdit);
  formEditValidator.disableSubmitButton(); //* публичный метод
  formEditValidator.removeValidationErrors(); //* публичный метод
});

addNewCardButton.addEventListener('click', function () {
  openPopup(popupAdd);
  formAddNewCards.reset();
  formAddValidator.disableSubmitButton(); //* публичный метод
  formAddValidator.removeValidationErrors(); //* публичный метод
});

closeButtons.forEach(function (button) {
  const popup = button.closest('.popup'); //* находим 1 раз ближайший к крестику попап
  button.addEventListener('click', function () {
    closePopup(popup);
  });
});

//* форма элемента  редактирования профиля
formElementEdit.addEventListener('submit', handleFormSubmitEditProfile);
const formEditValidator = new FormValidator(validationConfig, formElementEdit);
formEditValidator.enableValidation();

//* форма элемента добавления нового места
formElementAdd.addEventListener('submit', handleFormSubmitAddNewCard);
const formAddValidator = new FormValidator(validationConfig, formElementAdd);
formAddValidator.enableValidation();
