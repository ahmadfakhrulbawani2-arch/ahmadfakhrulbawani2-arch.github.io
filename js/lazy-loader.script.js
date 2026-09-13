const loadingScreen = document.querySelector('#loadingScreen');

const minimumLoadingTime = 1500;

window.addEventListener('load', () => {
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
  }, minimumLoadingTime);
});
