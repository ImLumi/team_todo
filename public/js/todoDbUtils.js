export function addTodoToLocalStorage(keyInLocalStorage, todo) {
  const todoList = JSON.parse(localStorage.getItem(keyInLocalStorage)) || [];
  todoList.push(todo);
  localStorage.setItem(keyInLocalStorage, JSON.stringify(todoList));
}

export function removeTodoFromLocalStorage(keyInLocalStorage, id) {
  let todoList = JSON.parse(localStorage.getItem(keyInLocalStorage));
  todoList = todoList.filter((todo) => todo.id !== id);
  localStorage.setItem(keyInLocalStorage, JSON.stringify(todoList));
}

export function updateLocalStorageWithEditedTodo(keyInLocalStorage, editedTodo) {
  const todoList = JSON.parse(localStorage.getItem(keyInLocalStorage));
  if (editedTodo.id) {
    const selectedTodo = todoList.find((todo) => todo.id === editedTodo.id);
    selectedTodo.todoText = editedTodo.todoText;
    selectedTodo.dateTime = editedTodo.dateTime;
    selectedTodo.isCompleted = editedTodo.isCompleted;
    localStorage.setItem(keyInLocalStorage, JSON.stringify(todoList));
  }
}

export function getAllTodoFromLocalStorage(keyInLocalStorage) {
  const todoList = JSON.parse(localStorage.getItem(keyInLocalStorage)) || [];
  return todoList;
}
