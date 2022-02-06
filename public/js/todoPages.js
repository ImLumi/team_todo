import { loadCompletedTodo, loadPendingTodo } from './todoUtils.js';

const btnPending = document.getElementById('status-pending');
const btnCompleted = document.getElementById('status-completed');

const switchBtn = (pageType) => {
  if (pageType === 'pending') {
    btnPending.classList.add('active');
    btnCompleted.classList.remove('active');
  }
  if (pageType === 'completed') {
    btnCompleted.classList.add('active');
    btnPending.classList.remove('active');
  }
};

export default function loadPage(pageType = 'pending') {
  const todoContainer = document.querySelector('.todo-container');
  todoContainer.innerHTML = '';
  if (pageType === 'pending') {
    switchBtn(pageType);
    loadPendingTodo(todoContainer);
  }
  if (pageType === 'completed') {
    switchBtn(pageType);
    loadCompletedTodo(todoContainer);
  }
}

btnCompleted.addEventListener('click', () => {
  switchBtn('completed');
  loadPage('completed');
});
btnPending.addEventListener('click', () => {
  switchBtn('pending');
  loadPage('pending');
});
