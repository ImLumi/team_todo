import todoList from './fakeTodoDb.js';
import TodoElement from './TodoElement.js';

const todoContainer = document.querySelector('.todo-container');

todoContainer.innerHTML = '';
todoList.forEach(({ todoText, time, isCompleted }) => {
  const todoElement = new TodoElement(todoText, time, isCompleted);
  todoElement.addTodoToHTMLElement(todoContainer);
});
