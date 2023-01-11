let page = document.querySelector('.page');
let content = document.querySelector('.content');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button');
let editButton = document.querySelector('.profile__edit-button');
let profileName = document.querySelector('.profile__name');
let profileAboutMe = document.querySelector('.profile__about-me');
let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__input_data_name');
let jobInput = document.querySelector('.popup__input_data_job');

//ФУНКЦИЯ ДЛЯ ВЫЗОВА ВСПЛЫВАЮЩЕГО ОКНА
function openPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileAboutMe.textContent;
  //Присвоение нового класса (модификатор) popup_opened блоку popup через метод .classList.add
  //В CSS для класса добавляем display: flex;
  popup.classList.add('popup_opened');
}

//ФУНКЦИЯ ДЛЯ ЗАКРЫТИЯ ВСПЛЫВАЮЩЕГО ОКНА ПО КНОПКЕ "СОХРАНИТЬ"
function closePopup() {
  //Для переменной popup используем удаление класса элементу через метод .classList.remove как аргумент передаем методу класс 'popup_opened'
  popup.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  let job = jobInput.value;
  let name = nameInput.value;

  // Вставьте новые значения с помощью textContent
  profileName.textContent = name;
  profileAboutMe.textContent = job;

  closePopup();
}
// Прикрепляем обработчик к форме:
// он будет следить за событием 'submit' - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

//реакция на действия пользователя (редактировать) посредством обрабочика события методом addEventListener
//(click - тип события, openPopup - функция обработчик)
editButton.addEventListener('click', openPopup);
formElement.addEventListener('submit', closePopup);
closeButton.addEventListener('click', closePopup);