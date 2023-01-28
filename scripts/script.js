import { initialCards } from './cards.js';
const galery = document.querySelector('.galery');
const editProfileButton = document.querySelector('.profile__edit-button');
const addNewCardButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileAboutMe = document.querySelector('.profile__about-me');
const closeButtons = document.querySelectorAll('.popup__close-button'); //все крестики проектаы
//Переменные попапа для редактирования профиля
const popupEdit = document.querySelector('.popup_type_edit');
const formElementEdit = document.querySelector('.popup__container_type_edit');
const nameInput = formElementEdit.querySelector('.popup__input_data_name');
const jobInput = formElementEdit.querySelector('.popup__input_data_job');
//Переменные попапа для добавление новых карточек
const cardTemplate = document.querySelector('.card-template').content;
const popupAdd = document.querySelector('.popup_type_add');
const formElementAdd = document.querySelector('.popup__container_type_add');
const titleInput = formElementAdd.querySelector('.popup__input_data_title');
const photoInput = formElementAdd.querySelector('.popup__input_data_photo');
//Переменные попапа для открытия фото
const popupCardPhoto = document.querySelector('.popup_type_photo');
const popupPhoto = popupCardPhoto.querySelector('.popup__photo');
const popupSubtitle = popupCardPhoto.querySelector('.popup__subtitle');

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

//ФУНКЦИЯ ДЛЯ СОЗДАНИЯ НОВОЙ КАРТОЧКИ
function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__photo').src = link;
  cardElement.querySelector('.card__photo').alt = name;
  cardElement.querySelector('.card__title').textContent = name;
  return cardElement;
}

//ФУНКЦИЯ ДЛЯ ВИЗУАЛИЗАЦИИ НОВОЙ КАРТОЧКИ
function renderCard() {
  const name = titleInput.value;
  const link = photoInput.value;
  const card = createCard(name, link);
  galery.prepend(card);
}

//ФУНКЦИЯ ДЛЯ ОТПРАВКИ ДАННЫХ ПО КНОПКЕ СОХРАНИТЬ ПРИ ДОБАВЛЕНИИ НОВОЙ КАРТОЧКИ
function handleFormSubmitAddNewCard(evt) {
  evt.preventDefault();
  renderCard();
  closePopup(popupAdd);
  evt.target.reset();
}

//ФУНКЦИЯ ДЛЯ ВИЗУАЛИЗАЦИИ НОВЫХ КАРТОЧЕК ИЗ МАССИВА
function renderCardArray() {
    initialCards.forEach(function (initialCard) {
      const name = initialCard.name;
      const link = initialCard.link;
      const card = createCard(name, link);
    galery.append(card);
  })
}

renderCardArray();

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

//ФУНКЦИЯ ДЛЯ ЗАКРЫТИЯ ПОПАПОВ ПО ESC
document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened'); //нашли открытый попап
    closePopup(openedPopup);
  }
});

editProfileButton.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileAboutMe.textContent;
  openPopup(popupEdit);
});

addNewCardButton.addEventListener('click', function () {
  photoInput.value = '';
  titleInput.value = '';
  openPopup(popupAdd);
});

closeButtons.forEach(function (button) {
  const popup = button.closest('.popup'); // находим 1 раз ближайший к крестику попап
  button.addEventListener('click', function () {
    closePopup(popup);
  });
});

formElementEdit.addEventListener('submit', handleFormSubmitEditProfile);

formElementAdd.addEventListener('submit', handleFormSubmitAddNewCard);

galery.addEventListener('click', handleClickCard);