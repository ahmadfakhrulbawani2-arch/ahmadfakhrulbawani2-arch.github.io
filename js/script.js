import { LoadTechStack } from './components/LoadTechStack.js';
import { LoadWorksAndProjects } from './components/LoadWorksAndProjects.js';

LoadWorksAndProjects();
LoadTechStack();

// dom
const topbar = document.querySelector('.topbar');
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileSidebar = document.getElementById('mobileSidebar');
const sidebarLinks = document.querySelectorAll('.sidebar-link');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const body = document.body;
const scrollProgressBar = document.getElementById('scrollProgressBar');
const backToTop = document.getElementById('backToTop');

// lenis
// Initialize Lenis
const lenis = new Lenis({
  autoRaf: true,
  anchors: true,
});

// Listen for the scroll event and log the event data
lenis.on('scroll', ({ progress, scroll }) => {
  topbar.classList.toggle('scrolled', scroll > 100);
  backToTop.classList.toggle('show', scroll > 100);
  scrollProgressBar.style.width = `${progress * 100}%`;
});

const toggleMenu = () => {
  hamburgerBtn.classList.toggle('active');
  mobileSidebar.classList.toggle('open');
  sidebarOverlay.classList.toggle('open');

  if (mobileSidebar.classList.contains('open')) {
    body.style.overflow = 'hidden';
    lenis.stop();
  } else {
    body.style.overflow = '';
    lenis.start();
  }
};

hamburgerBtn.addEventListener('click', toggleMenu);
sidebarOverlay.addEventListener('click', toggleMenu);

sidebarLinks.forEach((link) => {
  link.addEventListener('click', toggleMenu);
});
