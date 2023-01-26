import { initialCards } from './cards.js';
const galery = document.querySelector('.galery');
const editProfileButton = document.querySelector('.profile__edit-button');
const addNewCardButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileAboutMe = document.querySelector('.profile__about-me');
//Переменные попапа для редактирования профиля
const popupEdit = document.querySelector('.popup_type_edit');
const formElementEdit = document.querySelector('.popup__container_type_edit');
const nameInput = formElementEdit.querySelector('.popup__input_data_name');
const jobInput = formElementEdit.querySelector('.popup__input_data_job');
const closeButtonEdit = document.querySelector('.popup__close-button_type_edit');
//Переменные попапа для добавление новых карточек
const popupAdd = document.querySelector('.popup_type_add');
const formElementAdd = document.querySelector('.popup__container_type_add');
const titleInput = formElementAdd.querySelector('.popup__input_data_title');
const photoInput = formElementAdd.querySelector('.popup__input_data_photo');
const closeButtonAdd = document.querySelector('.popup__close-button_type_add');
//Переменные попапа для открытия фото
const popupCardPhoto = document.querySelector('.popup_type_photo');
const popupPhoto = popupCardPhoto.querySelector('.popup__photo');
const popupSubtitle = popupCardPhoto.querySelector('.popup__subtitle');
const popupCloseButtonPhoto = popupCardPhoto.querySelector('.popup__close-button_type_photo');

//ФУНКЦИЯ ДЛЯ ОТКРЫТИЯ ВСПЛЫВАЮЩЕГО ОКНА
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

//ФУНКЦИЯ ДЛЯ ЗАКРЫТИЯ ВСПЛЫВАЮЩЕГО ОКНА
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

//ФУНКЦИЯ ДЛЯ ОТПРАВКИ ДАННЫХ ПО КНОПКЕ СОХРАНИТЬ ПРИ ИЗМЕНЕНИИ ПРОФИЛЯ
function handleFormSubmitEditProfile(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки.
  profileName.textContent = nameInput.value;
  profileAboutMe.textContent = jobInput.value;
  closePopup(popupEdit);
}

//ФУНКЦИЯ ДЛЯ ОТПРАВКИ ДАННЫХ ПО КНОПКЕ СОХРАНИТЬ ПРИ ДОБАВЛЕНИИ НОВОЙ КАРТОЧКИ
function handleFormSubmitAddNewCard(evt) {
  evt.preventDefault();
  addNewCard();
  closePopup(popupAdd);
  photoInput.value = '';
  titleInput.value = '';
}

//ФУНКЦИЯ ДЛЯ ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
function addNewCard() {
  const cardTemplate = document.querySelector('.card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__photo').src = photoInput.value;
  cardElement.querySelector('.card__photo').alt = titleInput.value;
  cardElement.querySelector('.card__title').textContent = titleInput.value;
  galery.prepend(cardElement);
}

//ФУНКЦИЯ ДЛЯ УДАЛЕНИЯ КАРТОЧКИ
function deleteCard(evt) {
  if (evt.target.classList.contains('card__delete-button')) {
    const eventTarget = evt.target.closest('.card');
    eventTarget.remove();
  }
}

//ФУНКЦИЯ ДЛЯ ЛАЙКА КАРТОЧКИ
function handleLikeCard(evt) {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_active');
  }
}

//ФУНКЦИЯ ДЛЯ УВЕЛИЧЕНИЯ ФОТО
function handleZoomCard(evt) {
  const evtTarget = evt.target.closest('.card__photo');
  //когда кликнули на удаление
  if (evtTarget) {
    popupPhoto.src = evtTarget.src;
    popupPhoto.alt = evtTarget.alt;
    popupSubtitle.textContent = evtTarget.alt;
    openPopup(popupCardPhoto);
  }
}

//ФУНКЦИЯ ДЛЯ ОПРЕДЕЛЕНИЯ ПОВЕДЕНИЯ КАРТОЧКИ
function handleClickCard(evt) {
  if (evt.target.classList.contains('card__delete-button')) {
    deleteCard(evt);
  } else if (evt.target.classList.contains('card__like-button')) {
    handleLikeCard(evt);
  } else {
    handleZoomCard(evt);
  }
}

editProfileButton.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileAboutMe.textContent;
  openPopup(popupEdit);
});

addNewCardButton.addEventListener('click', function () {
  openPopup(popupAdd);
});

closeButtonEdit.addEventListener('click', function () {
  closePopup(popupEdit);
});

closeButtonAdd.addEventListener('click', function () {
  closePopup(popupAdd);
  photoInput.value = '';
  titleInput.value = '';
});

popupCloseButtonPhoto.addEventListener('click', function () {
  closePopup(popupCardPhoto);
});

formElementEdit.addEventListener('submit', handleFormSubmitEditProfile);

formElementAdd.addEventListener('submit', handleFormSubmitAddNewCard);

galery.addEventListener('click', handleClickCard); 

//добавление карточек в галерею из массива initalCards
initialCards.forEach(function (element) { 
  const cardTemplate = document.querySelector('.card-template').content;
  const initialCardsElement = cardTemplate.querySelector('.card').cloneNode(true); //клонируем содержание template
  initialCardsElement.querySelector('.card__photo').src = element.link; //заполняем значение <img src="">
  initialCardsElement.querySelector('.card__photo').alt = element.name; //заполняем значение <img alt="">
  initialCardsElement.querySelector('.card__title').textContent = element.name; //заполняем значение <h2>
  galery.append(initialCardsElement); //добавляем содержимое в конец галерии
});

//ФУНКЦИЯ ДЛЯ ЗАКРЫТИЯ ПОПАПОВ ПО ESC
document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape') {
    closePopup(popupCardPhoto);
    closePopup(popupEdit);
    closePopup(popupAdd);
    photoInput.value = '';
    titleInput.value = '';
  }
});
