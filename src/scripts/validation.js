export const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const showInputError = (formEl, inputEl, errorMsg, config) => {
  const errorMsgID = inputEl.id + "-error";
  const errorMsgEL = formEl.querySelector("#" + errorMsgID);
  errorMsgEL.textContent = errorMsg;
  errorMsgEL.classList.add(config.errorClass);
  inputEl.classList.add(config.inputErrorClass);
};

const hideInputError = (formEl, inputEl, settings) => {
  const errorMsgID = inputEl.id + "-error";
  const errorMsgEL = formEl.querySelector("#" + errorMsgID);
  errorMsgEL.textContent = "";
  errorMsgEL.classList.remove(settings.errorClass);
  inputEl.classList.remove(settings.inputErrorClass);
};

const checkInputValidity = (formEl, inputEl, config) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, config);
  } else {
    hideInputError(formEl, inputEl, config);
  }
};

const hasInvalidInput = (inputList) =>
  inputList.some((input) => !input.validity.valid);

const toggleButtonState = (inputList, button, settings) => {
  if (hasInvalidInput(inputList)) {
    disableButton(button, settings);
  } else {
    enableButton(button, settings);
  }
};

export const disableButton = (button, config) => {
  button.disabled = true;
  button.classList.add(config.inactiveButtonClass);
};






const enableButton = (button, config) => {
  button.disabled = false;
  button.classList.remove(config.inactiveButtonClass);
};

const resetValidation = (formElement, settings) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector) 
  );
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector
  );

  inputList.forEach((inputEl) => {
    hideInputError(formElement, inputEl, settings);
  });

  toggleButtonState(inputList, buttonElement, settings);
};

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector
  );

  toggleButtonState(inputList, buttonElement, settings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });

  formElement.addEventListener("submit", (event) => {
    event.preventDefault();
  });
};

export const enableValidation = (settings) => {
  const formList = document.querySelectorAll(settings.formSelector);
  formList.forEach((formEl) => {
    setEventListeners(formEl, settings);
  });
};

export { resetValidation };

enableValidation(settings);
