// Téma váltó
function initTheme() {
  const toggleBtn = document.getElementById("theme-toggle");
  const root = document.documentElement;

  // Mentett téma betöltése
  const savedTheme = localStorage.getItem("theme") || "light";
  root.setAttribute("data-theme", savedTheme);
  updateButton(savedTheme);

  // Klikk esemény
  toggleBtn.addEventListener("click", () => {
    const currentTheme = root.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    root.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateButton(newTheme);
  });
}

function updateButton(theme) {
  const btn = document.getElementById("theme-toggle");
  btn.textContent = theme === "dark" ? "☀️ Light" : "🌙 Dark";
}

// Inicializálás
document.addEventListener("DOMContentLoaded", initTheme);
