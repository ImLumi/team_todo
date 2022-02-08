const hideClassName = 'd-none';

export function closeAllMenu() {
  const dotsButtons = document.querySelectorAll('.menu-btn-active');
  dotsButtons.forEach((btn) => btn.classList.remove('menu-btn-active'));
  const menuButtons = document.querySelectorAll('.menu');
  menuButtons.forEach((btn) => {
    btn.classList.add(hideClassName);
  });
}

export function closeAllMenuEventListener() {
  window.onclick = () => {
    closeAllMenu();
  };
}

export function toggleMenuVisibility(menuElement) {
  menuElement.classList.toggle(hideClassName);
}

export function createMenuBtnHandler(MenuElement) {
  const handler = (e) => {
    e.stopPropagation();
    const isClosed = MenuElement.classList.contains(hideClassName);
    closeAllMenu();
    if (isClosed) {
      toggleMenuVisibility(MenuElement);
      e.currentTarget.classList.add('menu-btn-active');
    }
  };
  return handler;
}
