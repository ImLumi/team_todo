/* eslint-disable consistent-return */
import { addTodoToLocalStorage } from './todoDbUtils.js';
import TodoElement from './TodoElement.js';
import speechRecognition from './speechRecognition.js';
import loadPage from './todoPages.js';

const formTodo = document.querySelector('.form-todo');
const voiceBtn = document.getElementById('create-todo-voice-btn');
loadPage();

voiceBtn.addEventListener('click', () => {
  const input = voiceBtn.parentElement.querySelector('input');
  speechRecognition(voiceBtn, input);
});

formTodo.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!e.target.checkValidity()) return undefined;
  const todo = Object.fromEntries(new FormData(e.target));
  const todoElement = new TodoElement(todo.todoText, todo.dateTime);
  addTodoToLocalStorage('todoList', todoElement.toObject());
  loadPage();
  e.target.reset();
});
