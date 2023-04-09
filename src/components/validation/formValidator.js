export class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form.querySelector(config.selectors.form);
    this._enable = false;
    this._button = this._form.querySelector(this._config.selectors.submitButton);
    this._form.addEventListener('input', (event) => {
      this._onInputHandler(event);
      this.toggleButtonState();
    });
  }

  enableValidation() {
    this._enable = true;
  }

  toggleButtonState() {
    if (!this._form.checkValidity() && this._enable) {
      this.disableSubmitButton();
    } else {
      this._button.classList.remove(this._config.classNames.inactiveButton);
      this._button.disabled = false;
    }
  }

  _getElementsBySelector(parentElement, selector) {
    const elements = Array.from(parentElement.querySelectorAll(selector));
    return elements;
  }

  //* показываем ошибку для определенного инпута
  _showInputError(input) {
    const { classNames } = this._config;
    input.classList.add(classNames.inputError);

    const error = this._form.querySelector(`.${input.id}-error`);
    error.textContent = input.validationMessage;
    error.classList.add(classNames.error);
  }

  //* скрываем ошибку для определенного инпута
  _hideInputError(input) {
    const { classNames } = this._config;

    input.classList.remove(classNames.inputError);

    const error = this._form.querySelector(`.${input.id}-error`);
    if (error) {
      error.textContent = '';
      error.classList.remove(classNames.error);
    }
  }

  _onInputHandler(event) {
    const { target } = event;

    if (target && target.validity && this._enable) {
      if (target.validity.valid) {
        this._hideInputError(target);
      } else {
        this._showInputError(target);
      }
    }
  }

  //* функция смены состояния кнопки сабмит
  disableSubmitButton() {
    this._button.disabled = true;
    this._button.classList.add(this._config.classNames.inactiveButton);
  }

  //* функция удаления ошибок валидации
  removeValidationErrors() {
    const inputs = Array.from(this._form.querySelectorAll(this._config.selectors.input));

    inputs.forEach((input) => {
      this._hideInputError(input);
    });
  }
}
