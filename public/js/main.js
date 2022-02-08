/* eslint-disable consistent-return */
import { addTodoToLocalStorage } from './todoDbUtils.js';
import TodoElement from './TodoElement.js';
import loadPage from './todoPages.js';
import toogleInfoPopup from './infoPopUp.js';
import { startSpeechRecognition } from './speechRecognition.js';

toogleInfoPopup();
const formTodo = document.querySelector('.form-todo');
const voiceBtn = document.getElementById('create-todo-voice-btn');
loadPage();

voiceBtn.addEventListener('click', () => {
  const input = voiceBtn.parentElement.querySelector('input');
  startSpeechRecognition(voiceBtn, input);
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
