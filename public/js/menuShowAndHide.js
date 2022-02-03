const hideClassName = 'd-none';

export function closeAllMenu() {
  const menuButtons = document.querySelectorAll('.menu');
  menuButtons.forEach((btn) => {
    btn.classList.add(hideClassName);
  });
}

export function closeAllMenuEventListener() {
  document.body.addEventListener('click', () => {
    closeAllMenu();
  });
}

export function toggleMenuVisibility(menuElement) {
  menuElement.classList.toggle(hideClassName);
}

export function createMenuBtnHandler(MenuElement) {
  const handler = (e) => {
    e.stopPropagation();
    const isClosed = MenuElement.classList.contains(hideClassName);
    closeAllMenu();
    if (isClosed) toggleMenuVisibility(MenuElement);
  };
  return handler;
}
