export function addNewToLocalStorage(keyInLocalStorage, newDatas) {
  const todoList = JSON.parse(localStorage.getItem(keyInLocalStorage));
  todoList.push(newDatas);
  localStorage.setItem(keyInLocalStorage, JSON.stringify(todoList));
}

export function removeTodoFromLocalStorage(keyInLocalStorage, id) {
  const todoList = JSON.parse(localStorage.getItem(keyInLocalStorage));
  if (todoList[id]) {
    todoList.splice(id, 1);
    localStorage.setItem(keyInLocalStorage, JSON.stringify(todoList));
  }
}

export function updateLocalStorageWithEditedTodo(keyInLocalStorage, id, editedContent) {
  const todoList = JSON.parse(localStorage.getItem(keyInLocalStorage));
  if (todoList[id]) {
    todoList[id] = editedContent;
    localStorage.setItem(keyInLocalStorage, JSON.stringify(todoList));
  }
}

export function updateToDoStatusInLocalStorage(keyInLocalStorage, id) {
  const todoList = JSON.parse(localStorage.getItem(keyInLocalStorage));
  if (todoList[id]) {
    todoList[id].isCompleted = true;
    localStorage.setItem(keyInLocalStorage, JSON.stringify(todoList));
  }
}
