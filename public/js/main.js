import todoList from './fakeTodoDb.js';
import Todo from './Todo.js';

const todoContainer = document.querySelector('.todo-container');
todoContainer.innerHTML = '';

todoList.forEach(({ todoText, time, isCompleted }) => {
  const todoElement = new Todo(todoText, time, isCompleted);
  todoElement.addTodoToHTMLElement(todoContainer);
});
