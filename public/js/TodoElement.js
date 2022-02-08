import { removeTodoFromLocalStorage, updateLocalStorageWithEditedTodo } from './todoDbUtils.js';
import { createMenuBtnHandler, closeAllMenuEventListener, toggleMenuVisibility } from './menuShowAndHide.js';
import { createUID } from './utils.js';
import TodoEditElement from './TodoEditElement.js';

export default class TodoElement {
  #todoText;
  #dateTime;
  #isCompleted;
  #id;
  #todoEditForm;
  #todoGroupElement;
  #todoTextElement;
  #todoShowMenuBtnElement;
  #todoMenuElement;

  constructor(todoText, dateTime, isCompeted = false, id = null) {
    this.#todoText = todoText;
    this.#dateTime = dateTime;
    this.#isCompleted = isCompeted;
    this.#id = id || createUID();
    this.#todoGroupElement = document.createElement('div');
  }

  setTodoText(text) {
    this.#todoText = text;
  }

  setDateTime(dateTime) {
    this.#dateTime = dateTime;
  }

  #showEditFormElement() {
    this.#todoEditForm.showFormElement();
    this.#todoTextElement.classList.add('d-none');
    this.#todoShowMenuBtnElement.classList.add('d-none');
  }

  #createEditBtn() {
    const editBtn = document.createElement('button');
    editBtn.classList.add('btn');
    editBtn.innerHTML = '<img src="images/edit.svg" alt="edit">Szerkesztés';
    editBtn.addEventListener('click', () => {
      this.#showEditFormElement();
    });
    return editBtn;
  }

  #createToggleCompletedBtn() {
    const completedBtn = document.createElement('button');
    completedBtn.classList.add('btn');
    if (this.#isCompleted) {
      completedBtn.innerHTML = '<img src="images/undo.svg" alt="check">Vissszaállítás';
    } else {
      completedBtn.innerHTML = '<img src="images/check.svg" alt="check">Kész';
    }
    completedBtn.addEventListener('click', () => {
      this.#isCompleted = !this.#isCompleted;
      updateLocalStorageWithEditedTodo('todoList', this.toObject());
      this.#todoGroupElement.remove();
    });
    return completedBtn;
  }

  #createDeleteBtn() {
    const delBtn = document.createElement('button');
    delBtn.classList.add('btn');
    delBtn.innerHTML = '<img src="images/trash.svg" alt="trash">Törlés';
    delBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenuVisibility(this.#todoMenuElement);
      this.#removeTodo();
    });
    return delBtn;
  }

  #createShowMenuBtn() {
    const showMenuBtn = document.createElement('div');
    showMenuBtn.classList.add('menu-btn');
    showMenuBtn.innerHTML = '<img src="images/dots.svg" alt="dots">';
    showMenuBtn.addEventListener('click', createMenuBtnHandler(this.#todoMenuElement));
    this.#todoShowMenuBtnElement = showMenuBtn;
  }

  #createTodoMenuElement() {
    this.#todoMenuElement = document.createElement('div');
    this.#todoMenuElement.classList.add('menu', 'd-none');

    this.#todoMenuElement.appendChild(this.#createToggleCompletedBtn());
    if (this.#isCompleted === false) this.#todoMenuElement.appendChild(this.#createEditBtn());
    this.#todoMenuElement.appendChild(this.#createDeleteBtn());
  }

  #createTodoTextElement() {
    this.#todoTextElement = document.createElement('div');
    this.#todoTextElement.classList.add('text-content');
  }

  #removeTodo() {
    this.#todoGroupElement.classList.add('undo');
    const timeOutId = setTimeout(() => {
      removeTodoFromLocalStorage('todoList', this.#id);
      this.#todoGroupElement.remove();
    }, 3000);
    const handlerUndo = () => {
      clearTimeout(timeOutId);
      this.#todoGroupElement.classList.remove('undo');
      this.#todoGroupElement.removeEventListener('click', handlerUndo);
    };
    this.#todoGroupElement.addEventListener('click', handlerUndo);
  }

  renderTodo() {
    this.#todoTextElement.textContent = this.#todoText;
    this.#todoTextElement.classList.remove('d-none');
    this.#todoShowMenuBtnElement.classList.remove('d-none');
  }

  #createTodoHTML() {
    this.#createTodoTextElement();
    this.#createTodoMenuElement();
    this.#createShowMenuBtn();
    this.#todoEditForm = new TodoEditElement(this.#todoText, this.#dateTime, this);
    const dateTimeString = (this.#dateTime) ? this.#dateTime.split('T').join('&nbsp;&nbsp;') : '--:--';
    this.#todoGroupElement.innerHTML += `<span>Visszavonás</span> <div class="deadline">${dateTimeString}</div>`;
    this.#todoGroupElement.classList.add('todo');
    this.#todoGroupElement.appendChild(this.#todoTextElement);
    this.#todoGroupElement.appendChild(this.#todoShowMenuBtnElement);
    this.#todoGroupElement.appendChild(this.#todoMenuElement);
    this.#todoGroupElement.appendChild(this.#todoEditForm.getEditFormElement());
  }

  addTodoToHTMLElement(parentElement) {
    closeAllMenuEventListener();
    this.#createTodoHTML();
    this.renderTodo();
    parentElement.appendChild(this.#todoGroupElement);
  }

  toObject() {
    return {
      todoText: this.#todoText,
      dateTime: this.#dateTime,
      isCompleted: this.#isCompleted,
      id: this.#id,
    };
  }
}
