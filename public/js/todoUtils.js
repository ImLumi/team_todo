import { addTodoToLocalStorage, getAllTodoFromLocalStorage } from './todoDbUtils.js';
import TodoElement from './TodoElement.js';

export function loadTodo(todoContainer) {
  const todoList = getAllTodoFromLocalStorage('todoList');
  todoList.forEach(({
    todoText, dateTime, isCompleted, id,
  }) => {
    const todoElement = new TodoElement(todoText, dateTime, isCompleted, id);
    todoElement.addTodoToHTMLElement(todoContainer);
  });
}

export function addTodo(parentElement, todoObj) {
  addTodoToLocalStorage('todoList', todoObj);
  new TodoElement(todoObj.text, todoObj.dateTime).addTodoToHTMLElement(parentElement);
}
