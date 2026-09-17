import { LoadTechStack } from './components/LoadTechStack.js';
import { LoadWorksAndProjects } from './components/LoadWorksAndProjects.js';

LoadWorksAndProjects();
LoadTechStack();

const PUBLIC_API_WEB3FORMS = 'https://api.web3forms.com/submit';
const ACCESS_KEY_WEB3FORMS = '556e1865-a92d-4f56-888a-5a089af7f94a';

// dom
const topbar = document.querySelector('.topbar');
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileSidebar = document.getElementById('mobileSidebar');
const sidebarLinks = document.querySelectorAll('.sidebar-link');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const body = document.body;
const scrollProgressBar = document.getElementById('scrollProgressBar');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const contactFormResult = document.getElementById('contactFormResult');
const sendEmailBtn = contactForm.querySelector(
  'button.send-email[type="submit"]'
);
const themeBtn = document.querySelectorAll('.theme-btn');

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

// menu topbar
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

// contact form submission
const submitContactForm = async (event) => {
  event.preventDefault();
  contactFormResult.classList.remove('success-color', 'error-color');
  sendEmailBtn.disabled = true;
  sendEmailBtn.textContent = 'Sending...';
  sendEmailBtn.classList.add('btn-submitting');
  contactFormResult.textContent = '';
  const formData = new FormData(contactForm);

  // Web3Forms access key
  formData.append('access_key', ACCESS_KEY_WEB3FORMS);

  try {
    const response = await fetch(PUBLIC_API_WEB3FORMS, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      contactFormResult.textContent = 'Message sent successfully!';
      contactFormResult.classList.add('success-color');
      contactForm.reset();
    } else {
      contactFormResult.textContent =
        data.message || 'Failed to send the message.';
      contactFormResult.classList.add('error-color');
    }
  } catch (error) {
    console.error(error);
    contactFormResult.textContent =
      'Something went wrong. Please try again later.';
    contactFormResult.classList.add('error-color');
  } finally {
    sendEmailBtn.disabled = false;
    sendEmailBtn.textContent = 'Send Message';
    sendEmailBtn.classList.remove('btn-submitting');
  }
};

contactForm.addEventListener('submit', submitContactForm);

const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

const updateTheme = (event) => {
  const theme = event.matches ? 'dark' : 'light';
  const isDark = theme === 'dark';

  document.documentElement.setAttribute('data-theme', theme);
  themeBtn.forEach((btn) => {
    btn.innerHTML = isDark
      ? `<i class="fa-regular fa-sun"></i>`
      : `<i class="fa-solid fa-moon"></i>`;
  });
};

updateTheme(mediaQuery);

const toggleTheme = (e) => {
  e.preventDefault();

  const html = document.documentElement;
  const isDark = html.dataset.theme === 'dark';
  const newTheme = isDark ? 'light' : 'dark';

  html.dataset.theme = newTheme;

  const newIsDark = newTheme === 'dark';

  themeBtn.forEach((btn) => {
    btn.innerHTML = newIsDark
      ? `<i class="fa-regular fa-sun"></i>`
      : `<i class="fa-solid fa-moon"></i>`;
  });
};

mediaQuery.addEventListener('change', updateTheme);
themeBtn.forEach((btn) => {
  btn.addEventListener('click', toggleTheme);
});

// loader
const loadingScreen = document.querySelector('#loadingScreen');

const minimumLoadingTime = 1500;

window.addEventListener('load', () => {
  lenis.stop();
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
    lenis.start();
  }, minimumLoadingTime);
});
