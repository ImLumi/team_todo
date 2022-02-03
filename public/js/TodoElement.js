import { createMenuBtnHandler, closeAllMenuEventListener } from './menuShowAndHide.js';

export default class TodoElement {
  #todoText;
  #dateTime;
  #isCompleted;
  #todoGroupElement;
  #todoTextElement;
  #todoMenuElement;

  constructor(todoText, dateTime, isCompeted = false) {
    this.#todoText = todoText;
    this.#dateTime = dateTime;
    this.#isCompleted = isCompeted;
    this.#todoGroupElement = document.createElement('div');
  }

  #setTodoText(text) {
    this.#todoText = text;
  }

  #createEditBtn() {
    const editBtn = document.createElement('button');
    editBtn.classList.add('btn');
    editBtn.innerHTML = '<img src="images/edit.svg" alt="edit">Szerkesztés';
    editBtn.addEventListener('click', () => {
      this.#setTodoText('Majd jön valami editálós cucc');
      this.#renderTodo();
      console.dir(this);
    });
    return editBtn;
  }

  #createCompletedBtn() {
    const completedBtn = document.createElement('button');
    completedBtn.classList.add('btn');
    completedBtn.innerHTML = '<img src="images/check.svg" alt="check">Kész';
    completedBtn.addEventListener('click', () => {
      this.#isCompleted = true;
    });
    return completedBtn;
  }

  #createDeleteBtn() {
    const delBtn = document.createElement('button');
    delBtn.classList.add('btn');
    delBtn.innerHTML = '<img src="images/trash.svg" alt="trash">Törlés';
    delBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      console.log(`DELETE Todo: ${this.#todoText}`);
    });
    return delBtn;
  }

  #createShowMenuBtn() {
    const showMenuBtn = document.createElement('div');
    showMenuBtn.classList.add('menu-btn');
    showMenuBtn.innerHTML = '<img src="images/dots.svg" alt="dots">';
    showMenuBtn.addEventListener('click', createMenuBtnHandler(this.#todoMenuElement));
    return showMenuBtn;
  }

  #createTodoMenuElement() {
    this.#todoMenuElement = document.createElement('div');
    this.#todoMenuElement.classList.add('menu', 'd-none');

    this.#todoMenuElement.appendChild(this.#createCompletedBtn());
    this.#todoMenuElement.appendChild(this.#createEditBtn());
    this.#todoMenuElement.appendChild(this.#createDeleteBtn());
  }

  #createTodoTextElement() {
    this.#todoTextElement = document.createElement('div');
    this.#todoTextElement.classList.add('text-content');
  }

  #renderTodo() {
    this.#todoTextElement.textContent = this.#todoText;
  }

  #createTodoHTML() {
    this.#createTodoTextElement();
    this.#createTodoMenuElement();
    this.#todoGroupElement.classList.add('todo');
    this.#todoGroupElement.appendChild(this.#todoTextElement);
    this.#todoGroupElement.appendChild(this.#createShowMenuBtn());
    this.#todoGroupElement.appendChild(this.#todoMenuElement);
  }

  addTodoToHTMLElement(parentElement) {
    closeAllMenuEventListener();
    this.#createTodoHTML();
    this.#renderTodo();
    parentElement.appendChild(this.#todoGroupElement);
  }
}
