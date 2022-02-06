import { getAllTodoFromLocalStorage } from './todoDbUtils.js';
import TodoElement from './TodoElement.js';

const sortingByDate = (firstTodo, secondTodo) => {
  let [firstDateTime, secondDateTime] = [firstTodo.dateTime, secondTodo.dateTime];
  firstDateTime = (!firstDateTime) ? '999999-02-19T17:55' : firstDateTime;
  secondDateTime = (!secondDateTime) ? '999999-02-19T17:55' : secondDateTime;
  if (firstDateTime < secondDateTime) return -1;
  if (firstDateTime > secondDateTime) return 1;
  return 0;
};

export function loadPendingTodo(todoContainer) {
  const todoList = getAllTodoFromLocalStorage('todoList');
  todoList.sort(sortingByDate).forEach(({
    todoText, dateTime, isCompleted, id,
  }) => {
    if (isCompleted === false) {
      const todoElement = new TodoElement(todoText, dateTime, isCompleted, id);
      todoElement.addTodoToHTMLElement(todoContainer);
    }
  });
}

export function loadCompletedTodo(todoContainer) {
  const todoList = getAllTodoFromLocalStorage('todoList');
  todoList.sort(sortingByDate).forEach(({
    todoText, dateTime, isCompleted, id,
  }) => {
    if (isCompleted) {
      const todoElement = new TodoElement(todoText, dateTime, isCompleted, id);
      todoElement.addTodoToHTMLElement(todoContainer);
    }
  });
}
