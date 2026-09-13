// dom
const topbar = document.querySelector('.topbar');
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileSidebar = document.getElementById('mobileSidebar');
const sidebarLinks = document.querySelectorAll('.sidebar-link');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const body = document.body;

document.addEventListener('DOMContentLoaded', () => {
  const toggleMenu = () => {
    // tambahkan jika tidak ada, hapus jika ada
    hamburgerBtn.classList.toggle('active');
    mobileSidebar.classList.toggle('open');
    sidebarOverlay.classList.toggle('open');

    // jika sidebar terbuka matikan scroller
    if (mobileSidebar.classList.contains('open')) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = '';
    }
  };

  // tambahkan onClick hamburgerBtn dengan toggleMenu
  hamburgerBtn.addEventListener('click', toggleMenu);
  sidebarOverlay.addEventListener('click', toggleMenu);

  // kita ingin ketika klik link otomatis tertutup jadi tambahkan ke tiap link
  sidebarLinks.forEach((link) => {
    link.addEventListener('click', () => {
      toggleMenu();
    });
  });
});

// lenis
// Initialize Lenis
const lenis = new Lenis({
  autoRaf: true,
  anchors: true,
});

// Listen for the scroll event and log the event data
lenis.on('scroll', (e) => {
  console.log(e);
});

// jika discroll >100px hidupkan background topbar
window.addEventListener('scroll', () => {
  topbar.classList.toggle('scrolled', window.scrollY > 100);
});
