import { startSpeechRecognition } from './speechRecognition.js';
import { updateLocalStorageWithEditedTodo } from './todoDbUtils.js';
import loadPage from './todoPages.js';

/* eslint-disable consistent-return */
export default class TodoEditElement {
  #editFormElement;
  #textInputElement;
  #dateTimeElement;
  #todoElement;

  constructor(inputText, dateTime, todoElement) {
    this.#textInputElement = TodoEditElement.#createTextInputElement(inputText);
    this.#dateTimeElement = TodoEditElement.#createDateTimeInputElement(dateTime);
    this.#todoElement = todoElement;
    this.#createEditFormElement();
  }

  static #createTextInputElement(value = '') {
    const input = document.createElement('input');
    input.type = 'text';
    input.required = true;
    input.name = 'todoText';
    input.value = value;
    return input;
  }

  static #createDateTimeInputElement(value = ' ') {
    const input = document.createElement('input');
    input.type = 'datetime-local';
    input.name = 'dateTime';
    input.value = value;
    return input;
  }

  static #createBtnElement(innerHTML, classList = [], isSubmit = false) {
    const btn = document.createElement('button');
    btn.type = isSubmit ? 'submit' : 'button';
    btn.classList.add(...classList);
    btn.innerHTML = innerHTML;
    return btn;
  }

  #addSubmitEventListener() {
    this.#editFormElement.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!e.target.checkValidity()) return undefined;
      const formDataObj = Object.fromEntries(new FormData(e.target));
      this.#todoElement.setDateTime(formDataObj.dateTime);
      this.#todoElement.setTodoText(formDataObj.todoText);
      updateLocalStorageWithEditedTodo('todoList', this.#todoElement.toObject());
      loadPage();
    });
  }

  #addCancelBtnEventListener(btn) {
    btn.addEventListener('click', () => {
      this.#editFormElement.classList.add('d-none');
      this.#todoElement.renderTodo();
    });
  }

  #addSpeechRecognition(btn) {
    btn.addEventListener('click', () => {
      startSpeechRecognition(btn, this.#textInputElement);
    });
  }

  #createEditFormElement() {
    const form = document.createElement('form');
    this.#editFormElement = form;
    form.noValidate = true;
    form.className = 'edit-form d-none';
    const textInputGroup = document.createElement('div');
    textInputGroup.className = 'edit-text-input';
    textInputGroup.appendChild(this.#textInputElement);
    const btnMic = TodoEditElement.#createBtnElement(
      '<img src="images/mic.svg" alt="microphone" class="input-icon mic">',
      ['btn-voice'],
    );
    textInputGroup.appendChild(btnMic);
    this.#addSpeechRecognition(btnMic);

    const btnSubmit = TodoEditElement.#createBtnElement(
      '<img src="images/check-edit.svg" alt="plus" class="edit-icon">',
      ['btn-edit'],
      true,
    );
    const btnCancel = TodoEditElement.#createBtnElement(
      '<img src="images/close.svg" alt="close" class="edit-icon">',
      ['btn-close'],
    );

    form.appendChild(textInputGroup);
    form.appendChild(this.#dateTimeElement);
    form.appendChild(btnSubmit);
    form.appendChild(btnCancel);
    this.#addCancelBtnEventListener(btnCancel);
    this.#addSubmitEventListener();
  }

  showFormElement() {
    this.#editFormElement.classList.remove('d-none');
  }

  getEditFormElement() {
    return this.#editFormElement;
  }
}
