const questionMarkButton = document.getElementById('help');

questionMarkButton.addEventListener('click', (e) => {
  if (e.target.href === '#popup1') {
    e.target.href = '';
  } else {
    e.target.href = '#popup1';
  }
})