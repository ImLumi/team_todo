/* eslint-disable consistent-return */
import { addTodoToLocalStorage } from './todoDbUtils.js';
import { loadTodo } from './todoUtils.js';
import TodoElement from './TodoElement.js';

const todoContainer = document.querySelector('.todo-container');
const formTodo = document.querySelector('.form-todo');

formTodo.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!e.target.checkValidity()) return undefined;
  const todo = Object.fromEntries(new FormData(e.target));
  const todoElement = new TodoElement(todo.todoText, todo.dateTime);
  todoElement.addTodoToHTMLElement(todoContainer);
  addTodoToLocalStorage('todoList', todoElement.toObject());
  e.target.reset();
});

todoContainer.innerHTML = '';

loadTodo(todoContainer);
