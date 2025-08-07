const toggleBtn = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
const menuLinks = menu.querySelectorAll('a');

toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('active');
    menu.classList.toggle('active');
});

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        toggleBtn.classList.remove('active');
        menu.classList.remove('active');
    });
});

document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;

    const offset = document.querySelector('nav').offsetHeight; // altura da navbar
    const position = target.offsetTop - offset;

    window.scrollTo({
      top: position,
      behavior: 'smooth'
    });
  });
});

