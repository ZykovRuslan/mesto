let page = document.querySelector('.page');
let content = document.querySelector('.content');
let popup = content.querySelector('.popup');
let closeButton = content.querySelector('.popup__close-button');
let editButton = content.querySelector('.profile__edit-button');
let submitButton = content.querySelector('.popup__submit-button');
let profileName = document.querySelector('.profile__name');
let profileAboutMe = document.querySelector('.profile__about-me');
let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__input_data_name');
let jobInput = document.querySelector('.popup__input_data_job');

//ФУНКЦИЯ ДЛЯ ВЫЗОВА ВСПЛЫВАЮЩЕГО ОКНА
function addProfile() {
  //Присвоение нового класса (модификатор) popup_opened блоку popup через метод .classList.add
  //В CSS для класса добавляем display: block;
  popup.classList.add('popup_opened');
  let nameInput = document.querySelector('.popup__input_data_name');
  let jobInput = document.querySelector('.popup__input_data_job');
  nameInput.value = profileName.textContent;
  jobInput.value = profileAboutMe.textContent;
  //console.log(nameInput.value);
}

//ФУНКЦИЯ ДЛЯ ЗАКРЫТИЯ ВСПЛЫВАЮЩЕГО ОКНА ПО КНОПКЕ "СОХРАНИТЬ"
function saveProfile() {
  //Для переменной popup используем удаление класса элементу через метод .classList.remove как аргумент передаем методу класс 'popup_opened'
  popup.classList.remove('popup_opened');
}

//ФУНКЦИЯ ДЛЯ ЗАКРЫТИЯ ВСПЛЫВАЮЩЕГО ОКНА ПО КНОПКЕ "ЗАКРЫТЬ"
function closeProfile() {
  //Для переменной popup используем удаление класса элементу через метод .classList.remove как аргумент передаем методу класс 'popup_opened'
  popup.classList.remove('popup_opened');
  let nameInput = document.querySelector('.popup__input_data_name');
  let jobInput = document.querySelector('.popup__input_data_job');
  nameInput.value = profileName.textContent;
  jobInput.value = profileAboutMe.textContent;
}

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  //console.log(evt);
  let job = jobInput.value;
  let name = nameInput.value;
  // Выберите элементы, куда должны быть вставлены значения полей
  profileName = document.querySelector('.profile__name');
  profileAboutMe = document.querySelector('.profile__about-me');

  // Вставьте новые значения с помощью textContent
  profileName.textContent = name;
  profileAboutMe.textContent = job;
}
// Прикрепляем обработчик к форме:
// он будет следить за событием 'submit' - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

//реакция на действия пользователя (редактировать) посредством обрабочика события методом addEventListener
//(click - тип события, addProfile - функция обработчик)
editButton.addEventListener('click', addProfile);
submitButton.addEventListener('click', saveProfile);
closeButton.addEventListener('click', closeProfile);
