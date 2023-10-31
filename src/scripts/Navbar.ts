const nav = document.querySelectorAll("a");
const currentURL = window.location.href;

nav.forEach((link) => {
  if (link.href === currentURL) {
    link.classList.add("active");
  }
});
