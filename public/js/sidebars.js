const toggleMenu = document.querySelector('.toggle-menu');
const sidebar = document.querySelector('.sidebar');
const content = document.querySelector('.content');
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

toggleMenu.addEventListener('click', () => {
    sidebar.classList.toggle('show');
    content.classList.toggle('shift');
    const icon = toggleMenu.querySelector('i');
    icon.classList.toggle('bi-list');
    icon.classList.toggle('bi-x');
});

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    sidebar.classList.toggle('dark-mode');
    content.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    icon.classList.toggle('bi-sun');
    icon.classList.toggle('bi-moon');
});