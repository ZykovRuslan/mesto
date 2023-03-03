export class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form.querySelector(config.selectors.form);
    this._enable = false;

    this._form.addEventListener('input', (event) => {
      this._onInputHandler(event);
      this._toggleButtonState();
    });
  }

  enableValidation() {
    this._enable = true;
  }

  _toggleButtonState() {
    const { classNames, selectors } = this._config;
    const button = this._form.querySelector(selectors.submitButton);

    if (!this._form.checkValidity() && this._enable) {
      button.classList.add(classNames.inactiveButton);
      button.disabled = true;
    } else {
      button.classList.remove(classNames.inactiveButton);
      button.disabled = false;
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
    error.textContent = '';
    error.classList.remove(classNames.error);
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
}
