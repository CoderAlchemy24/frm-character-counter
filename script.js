const themeIcon = document.querySelector(".theme__icon");
const logo = document.querySelector(".logo");
const main = document.querySelector(".main");
const textArea = document.querySelector(".textarea");
const pNoChars = document.querySelector(".no-chars");
const lettersContainer = document.querySelector(".letters");
const excluded = document.querySelector(".spaces");
const infoLine = document.querySelector(".info-line");
const hasLimitBox = document.querySelector(".limit");
const limitValueBox = document.querySelector(".limit-value");

let letters = "";
let showAll = false;
const totalCharactersCounter = document.querySelector(".total__num");
const totalWordsCounter = document.querySelector(".words__num");
const totalSentencesCounter = document.querySelector(".sentences__num");
const seeMoreButton = document.querySelector(".see-more-btn");

let theme = "black";
themeIcon.addEventListener("click", ThemeChange);

infoLine.style.display = "flex";

pNoChars.style.display = "block";
seeMoreButton.style.display = "none";
textArea.addEventListener("keyup", calculateAndDisplay);
textArea.addEventListener("cut", calculateAndDisplay);
excluded.addEventListener("change", calculateAndDisplay);
hasLimitBox.addEventListener("change", calculateAndDisplay);

limitValueBox.addEventListener("change", LimitChange);
let limitValue = 999;

function LimitChange() {
  if (hasLimitBox.checked) {
    limitValue = parseInt(limitValueBox.value);
  } else {
    limitValue = 999;
  }

  calculateAndDisplay();
}

function calculateAndDisplay() {
  let text = textArea.value;
  if (text === "") {
    pNoChars.style.display = "block";
    lettersContainer.style.display = "none";
    seeMoreButton.style.display = "none";
    totalCharactersCounter.textContent = 0;
    totalWordsCounter.textContent = 0;
    totalSentencesCounter.textContent = 0;

    return;
  } else {
    pNoChars.style.display = "none";
    lettersContainer.style.display = "flex";
    seeMoreButton.style.display = "block";
  }

  let displayText = text;

  if (excluded.checked) {
    displayText = text.replace(/\s/g, "");
  }
  letters = "";
  if (!hasLimitBox.checked) {
    Counting(displayText);
    textArea.value = displayText;
    letters = letterFrequency(displayText);
  } else {
    limitValue = parseInt(limitValueBox.value);
    if (limitValue <= displayText.length) {
      infoLine.innerHTML = `<p class="limit-info">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" fill="none" viewBox="0 0 14 15"><path fill="#DA3701" d="M7 1.344A5.899 5.899 0 0 0 1.094 7.25 5.882 5.882 0 0 0 7 13.156a5.899 5.899 0 0 0 5.906-5.906c0-3.254-2.68-5.906-5.906-5.906Zm0-.875c3.719 0 6.781 3.062 6.781 6.781 0 3.746-3.062 6.781-6.781 6.781A6.78 6.78 0 0 1 .219 7.25C.219 3.531 3.254.469 7 .469Zm-.984 9.406h.328V6.594h-.328a.316.316 0 0 1-.329-.328v-.22c0-.163.137-.327.329-.327h1.312c.164 0 .328.164.328.328v3.828h.328c.164 0 .329.164.329.328v.219a.332.332 0 0 1-.329.328H6.016a.316.316 0 0 1-.329-.328v-.219c0-.164.137-.328.329-.328ZM7 3.312a.9.9 0 0 1 .875.876c0 .492-.41.875-.875.875a.864.864 0 0 1-.875-.875c0-.465.383-.875.875-.875Z"/></svg>
          Limit reached! Your text exceeds ${limitValue} characters.</p>`;
    } else {
      infoLine.innerHTML = "";
    }

    Counting(displayText.slice(0, limitValue));
    textArea.value = displayText.slice(0, limitValue);

    letters = letterFrequency(displayText.slice(0, limitValue));
  }
  renderLetters(letters);
}

function letterFrequency(fullText) {
  const freq = {};
  for (const char of fullText) {
    if (char.match(/[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ]/)) {
      const lower = char.toLowerCase();
      freq[lower] = (freq[lower] || 0) + 1;
    }
  }
  return Object.entries(freq).sort((a, b) => b[1] - a[1]);
}

// Számold meg az összes betűt a szövegben:
function renderLetters(letters, showAll) {
  // Összes betű előfordulás:
  const total = letters.reduce((sum, [, count]) => sum + count, 0);

  lettersContainer.innerHTML = "";
  let list = showAll ? letters : letters.slice(0, 5);
  list.forEach(([letter, count]) => {
    const li = document.createElement("li");
    li.className = "letter";
    letter = letter.toUpperCase();
    // Most a width arányos lesz az összes betűhöz képest:
    const width = total > 0 ? (count / total) * 100 : 0;
    li.innerHTML = `
      <span class="letter-char">${letter}</span>
      <div class="bar-background"><div class="bar"></div></div>
      <span class="letter-count">${count}/ ${(count / total).toFixed(2)}%</span>
    `;
    li.querySelector(".bar").style.width = `${width}%`;
    lettersContainer.appendChild(li);
  });
  lettersContainer.style.display = "flex";
}

seeMoreButton.addEventListener("click", () => {
  showAll = !showAll;
  const text = textArea.value;
  const letters = letterFrequency(text);
  renderLetters(letters, showAll);
  seeMoreButton.textContent = showAll ? "See less..." : "See more...";
});

function ThemeChange() {
  if (theme === "dark") {
    theme = "light";
    main.style.setProperty("--bg-primary", "white");
    main.style.setProperty("--bg-secondary", "var(--color-neutral-100)");
    main.style.setProperty("--text-primary", "var(--color-neutral-700)");
    main.style.setProperty("--text-secondary", "var(--color-neutral-900)");
    logo.setAttribute("src", "./assets/images/logo-light-theme.svg");
    themeIcon.setAttribute("src", "./assets/images/icon-moon.svg");
  } else {
    theme = "dark";
    main.style.setProperty("--bg-primary", "#12131A");
    main.style.setProperty("--bg-secondary", "#2A2B37");
    main.style.setProperty("--text-primary", "#FFF");
    main.style.setProperty("--text-secondary", "#E4E4EF");
    logo.setAttribute("src", "./assets/images/logo-dark-theme.svg");
    themeIcon.setAttribute("src", "./assets/images/icon-sun.svg");
  }
}

function Counting(text) {
  totalCharactersCounter.textContent = text.length;
  totalWordsCounter.textContent = text
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
  totalSentencesCounter.textContent = text
    .split(/[.!?]+/)
    .filter((sentence) => sentence.trim().length > 0).length;
}
