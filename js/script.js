import { LoadTechStack } from './components/LoadTechStack.js';

LoadTechStack();

// dom
const topbar = document.querySelector('.topbar');
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileSidebar = document.getElementById('mobileSidebar');
const sidebarLinks = document.querySelectorAll('.sidebar-link');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const body = document.body;

const toggleMenu = () => {
  hamburgerBtn.classList.toggle('active');
  mobileSidebar.classList.toggle('open');
  sidebarOverlay.classList.toggle('open');

  if (mobileSidebar.classList.contains('open')) {
    body.style.overflow = 'hidden';
  } else {
    body.style.overflow = '';
  }
};

hamburgerBtn.addEventListener('click', toggleMenu);
sidebarOverlay.addEventListener('click', toggleMenu);

sidebarLinks.forEach((link) => {
  link.addEventListener('click', toggleMenu);
});

const lenis = new Lenis({
  autoRaf: true,
  anchors: true,
});

lenis.on('scroll', () => {
  topbar.classList.toggle('scrolled', lenis.scroll > 100);
});
