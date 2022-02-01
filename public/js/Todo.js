export default class Todo {
  #todoText;
  #dateTime;
  #isCompleted;
  #todoGroupElement;
  #todoFaceElement;
  #todoMenuElement;

  constructor(todoText, dateTime, isCompeted) {
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
    editBtn.classList.add('btn', 'btn-edit');
    editBtn.textContent = 'Szerk.';
    editBtn.addEventListener('click', () => {
      this.#setTodoText('Sikeres');
      console.dir(this);
    });
    return editBtn;
  }

  #createCompletedBtn() {
    const completedBtn = document.createElement('button');
    completedBtn.classList.add('btn', 'btn-completed');
    completedBtn.textContent = 'Kész';
    completedBtn.addEventListener('click', () => {
      this.#isCompleted = true;
    });
    return completedBtn;
  }

  #createDeleteBtn() {
    const delBtn = document.createElement('button');
    delBtn.classList.add('btn', 'btn-delete');
    delBtn.textContent = 'Töröl';
    delBtn.addEventListener('click', () => {
      console.log(`DELETE Todo: ${this.#todoText}`);
    });
    return delBtn;
  }

  #createShowMenuBtn() {
    const showMenuBtn = document.createElement('button');
    showMenuBtn.classList.add('btn', 'btn-show-menu');
    showMenuBtn.textContent = '...';
    showMenuBtn.addEventListener('click', () => {
      this.#toggleMenuVisibility();
    });
    return showMenuBtn;
  }

  #toggleMenuVisibility() {
    this.#todoMenuElement.classList.toggle('d-none');
  }

  #renderTodoFaceElement() {
    const todoTextP = document.createElement('p');
    todoTextP.textContent = this.#todoText;
    this.#todoFaceElement.innerHTML = '';
    this.#todoFaceElement.appendChild(todoTextP);
    this.#todoFaceElement.appendChild(this.#createShowMenuBtn());
  }

  #createTodoMenuElement() {
    this.#todoMenuElement = document.createElement('div');
    this.#todoMenuElement.classList.add('d-none', 'egyebb-osztaly');

    this.#todoMenuElement.appendChild(this.#createEditBtn());
    this.#todoMenuElement.appendChild(this.#createCompletedBtn());
    this.#todoMenuElement.appendChild(this.#createDeleteBtn());
  }

  #createTodoFaceElement() {
    this.#todoFaceElement = document.createElement('div');
    this.#todoFaceElement.classList.add('mb-3', 'mt-3', 'egyebb-osztaly');
    this.#renderTodoFaceElement();
  }

  #createTodoHTML() {
    this.#createTodoFaceElement();
    this.#createTodoMenuElement();
    this.#todoGroupElement.appendChild(this.#todoFaceElement);
    this.#todoGroupElement.appendChild(this.#todoMenuElement);
  }

  addTodoToHTMLElement(parentElement) {
    this.#createTodoHTML();
    parentElement.appendChild(this.#todoGroupElement);
  }
}
