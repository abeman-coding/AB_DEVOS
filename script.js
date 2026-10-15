// Reveal sections as they enter the viewport.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

// Mobile navigation.
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.innerHTML = isOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
  if (window.lucide) window.lucide.createIcons();
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.innerHTML = '<i data-lucide="menu"></i>';
    if (window.lucide) window.lucide.createIcons();
  });
});

// Highlight the section currently in view.
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");
const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach((section) => activeObserver.observe(section));

// Light/dark theme toggle.
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeToggle.innerHTML = document.body.classList.contains("light") ? '<i data-lucide="moon"></i>' : '<i data-lucide="sun-moon"></i>';
  if (window.lucide) window.lucide.createIcons();
});

// Mouse tilt for the photo/orbit effect.
const avatarStage = document.getElementById("avatarStage");
const heroVisual = document.querySelector(".hero-visual");
heroVisual.addEventListener("pointermove", (event) => {
  if (window.matchMedia("(max-width: 900px)").matches) return;
  const rect = heroVisual.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;
  avatarStage.style.transform = `rotateY(${x * 16}deg) rotateX(${-y * 12}deg)`;
});
heroVisual.addEventListener("pointerleave", () => {
  avatarStage.style.transform = "rotateY(0deg) rotateX(0deg)";
});

// Welcome button: displays the brand message with a small animation.
const welcomeButton = document.getElementById("welcomeButton");
const welcomeMessage = document.getElementById("welcomeMessage");
welcomeButton.addEventListener("click", () => {
  welcomeMessage.textContent = "🎉 Welcome to AB_devos! Thanks for visiting my portfolio.";
  welcomeMessage.classList.remove("welcome-message");
  void welcomeMessage.offsetWidth;
  welcomeMessage.classList.add("welcome-message");
});

// Current year and icon initialization.
document.getElementById("year").textContent = new Date().getFullYear();
if (window.lucide) window.lucide.createIcons();
