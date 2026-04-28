let translations = {};
let currentLang = "ru";


// --------------------
// LOAD JSON
// --------------------
async function loadTranslations() {
  try {
    const res = await fetch("./internationalization/translations.json");
    translations = await res.json();

    const saved = localStorage.getItem("lang");
    if (saved) {
      currentLang = saved;
    }

    applyLanguage(currentLang);
    updateLanguageButton(currentLang);

    // красивое появление navbar после загрузки
    animateHeader();

  } catch (err) {
    console.error("Translation load error:", err);
  }
}


// --------------------
// APPLY LANGUAGE
// --------------------
function applyLanguage(lang) {
  if (!translations[lang]) return;

  currentLang = lang;
  const t = translations[lang];

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");

    if (!key || !t[key]) return;

    el.innerHTML = t[key];
  });

  localStorage.setItem("lang", lang);
}


// --------------------
// UPDATE BUTTON UI
// --------------------
function updateLanguageButton(lang) {
  const currentFlag = document.getElementById("currentFlag");
  const currentLangText = document.getElementById("currentLang");

  const languageMap = {
    ru: {
      flag: "https://flagcdn.com/w40/ru.png",
      label: "RU"
    },
    en: {
      flag: "https://flagcdn.com/w40/gb.png",
      label: "EN"
    },
    kz: {
      flag: "https://flagcdn.com/w40/kz.png",
      label: "KZ"
    }
  };

  if (!currentFlag || !currentLangText) return;

  currentFlag.src = languageMap[lang].flag;
  currentFlag.alt = languageMap[lang].label;
  currentLangText.textContent = languageMap[lang].label;
}


// --------------------
// HEADER ANIMATION
// --------------------
// медленнее + премиальнее
function animateHeader() {
  const header = document.getElementById("mainHeader");

  if (!header) return;

  /* почти без сильного смещения */
  header.style.transform = "translateY(-20px)";
  header.style.opacity = "0";
  header.style.filter = "blur(6px)";

  setTimeout(() => {
    header.style.transition =
      "transform 1.8s ease, opacity 1.6s ease, filter 1.6s ease";

    header.style.transform = "translateY(0)";
    header.style.opacity = "1";
    header.style.filter = "blur(0px)";
  }, 300);
}


// --------------------
// SWITCH LANGUAGE
// --------------------
// без белой вспышки + плавная перезагрузка
function switchLanguage(lang) {
  localStorage.setItem("lang", lang);

  const langMenu = document.getElementById("langMenu");

  if (langMenu) {
    langMenu.classList.add("hidden");
  }

  // небольшая пауза для плавности без анимации исчезновения
  setTimeout(() => {
    window.location.reload();
  }, 250);
}


// --------------------
// GLOBAL ACCESS
// --------------------
window.switchLanguage = switchLanguage;


// --------------------
// INIT
// --------------------
window.addEventListener("DOMContentLoaded", () => {
  loadTranslations();

  const langToggle = document.getElementById("langToggle");
  const langMenu = document.getElementById("langMenu");
  const langDropdown = document.getElementById("langDropdown");

  if (!langToggle || !langMenu || !langDropdown) return;

  langToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    langMenu.classList.toggle("hidden");
  });

  window.addEventListener("click", (e) => {
    if (!langDropdown.contains(e.target)) {
      langMenu.classList.add("hidden");
    }
  });
});