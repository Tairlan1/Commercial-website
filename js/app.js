// ========================
// AOS INIT
// ========================
AOS.init({
  duration: 700,
  easing: "ease-in-out",
  once: false,
  mirror: true
});


// ========================
// DOM ELEMENTS
// ========================
const header = document.getElementById("mainHeader");
const logoBox = document.getElementById("logoBox");
const logoWrapper = document.getElementById("logoWrapper");
const logoImg = document.getElementById("logoImg");
const logoText = document.getElementById("logoText");
const mainNav = document.getElementById("mainNav");
const footer = document.getElementById("footerAnim");


// ========================
// FOOTER ANIMATION
// ========================
function initFooterAnimation() {
  if (!footer) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        footer.classList.remove("opacity-0", "translate-y-6");
        footer.classList.add("opacity-100", "translate-y-0");
      } else {
        footer.classList.add("opacity-0", "translate-y-6");
        footer.classList.remove("opacity-100", "translate-y-0");
      }
    });
  }, {
    threshold: 0.25
  });

  observer.observe(footer);
}


// ========================
// HEADER SHRINK + SMOOTH TRANSITION
// ========================
function updateHeaderState() {
  if (!header) return;

  const isScrolled = window.scrollY > 60;
  const smoothTransition = "all 0.9s cubic-bezier(0.22, 1, 0.36, 1)";

  [header, logoBox, logoWrapper, logoImg, logoText, mainNav]
    .filter(Boolean)
    .forEach((el) => {
      el.style.transition = smoothTransition;
    });

  if (isScrolled) {
    header.style.paddingTop = "8px";
    header.style.paddingBottom = "8px";
    header.style.background = "rgba(15, 49, 72, 0.92)";
    header.style.backdropFilter = "blur(12px)";
    header.style.webkitBackdropFilter = "blur(12px)";
    header.style.boxShadow = "0 8px 32px rgba(15, 49, 72, 0.18)";

    if (logoBox) logoBox.style.padding = "4px 4px";

    if (logoWrapper) {
      logoWrapper.style.width = window.innerWidth >= 768 ? "95px" : "78px";
      logoWrapper.style.height = window.innerWidth >= 768 ? "40px" : "34px";
    }

    if (logoImg) {
      logoImg.style.height = window.innerWidth >= 768 ? "30px" : "20px";
    }
    if (logoText) logoText.style.fontSize = "10px";

    if (mainNav) {
      mainNav.style.gap = "24px";
      mainNav.style.fontSize = "13px";
    }
  } else {
    header.style.paddingTop = "20px";
    header.style.paddingBottom = "20px";
    header.style.background = "rgba(255, 255, 255, 0.04)";
    header.style.backdropFilter = "blur(2px)";
    header.style.webkitBackdropFilter = "blur(2px)";
    header.style.boxShadow = "0 8px 32px rgba(15, 49, 72, 0.08)";

    if (logoBox) logoBox.style.padding = "2px 4px";

    if (logoWrapper) {
      logoWrapper.style.width = "120px";
      logoWrapper.style.height = "60px";
    }

    if (logoImg) {
      logoImg.style.height = window.innerWidth >= 768 ? "42px" : "35px";
      logoImg.style.paddingTop = window.innerWidth >= 768 ? "1px" : "0px";
    }
    if (logoText) logoText.style.fontSize = "12px";

    if (mainNav) {
      mainNav.style.gap = "32px";
      mainNav.style.fontSize = "14px";
    }
  }
}


// ========================
// PAGE LOAD NAVBAR ANIMATION
// ========================
function initHeaderLoadAnimation() {
  if (!header) return;

  header.style.opacity = "0";
  header.style.transform = "translateY(-30px)";
  header.style.transition = "all 0.7s cubic-bezier(0.22, 1, 0.36, 1)";

  setTimeout(() => {
    header.style.opacity = "1";
    header.style.transform = "translateY(0)";
  }, 150);
}

// ========================
// SIDE NAV LINKS ACTIVE STATE
// ========================
function initSideNavLinksActive() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.side-nav-menu a[href^="#"]');

  if (!sections.length || !navLinks.length) return;

  function activateLink(id) {
    navLinks.forEach((link) => {
      const href = link.getAttribute("href").replace("#", "");

      link.classList.remove("active");

      if (href === id) {
        link.classList.add("active");
      }
    });
  }

  function detectCurrentSection() {
    let current = "";

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;

      if (
        window.scrollY >= top - 250 &&
        window.scrollY < top + height - 250
      ) {
        current = section.getAttribute("id");
      }
    });

    if (current) {
      activateLink(current);
    }
  }

  window.addEventListener("scroll", detectCurrentSection);

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const id = link.getAttribute("href").replace("#", "");
      activateLink(id);
    });
  });

  detectCurrentSection();
}


// ========================
// SIDE NAV DOT ACTIVE STATE
// ========================
function initSideNavDots() {
  const sections = document.querySelectorAll("section[id]");
  const dots = document.querySelectorAll(".nav-dot");

  if (!sections.length || !dots.length) return;

  function activateDot(id) {
    dots.forEach((dot) => {
      dot.style.background = "rgba(255,255,255,0.35)";
      dot.style.transform = "scale(1)";
      dot.style.boxShadow = "none";

      if (dot.dataset.target === id) {
        dot.style.background = "#ffffff";
        dot.style.transform = "scale(1.25)";
        dot.style.boxShadow = "0 0 18px rgba(255,255,255,0.98)";
      }
    });
  }

  function detectCurrentSection() {
    let current = "";

    sections.forEach((section) => {
      const top = section.offsetTop;

      if (window.scrollY >= top - 300) {
        current = section.getAttribute("id");
      }
    });

    if (current) activateDot(current);
  }

  window.addEventListener("scroll", detectCurrentSection);

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      const id = link.getAttribute("href").replace("#", "");
      activateDot(id);
    });
  });

  detectCurrentSection();
}


// ========================
// MOBILE MENU
// ========================
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (!mobileMenuBtn || !mobileMenu) return;

  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

// ========================
// CLOSE SIDE NAV ON OUTSIDE CLICK
// ========================
function initSideNavOutsideClose() {
  const sideNavToggle = document.getElementById("sideNavToggle");

  if (!sideNavToggle) return;

  document.addEventListener("click", (e) => {
    const navBlock = e.target.closest("#sideNavToggle") ||
                     e.target.closest('label[for="sideNavToggle"]') ||
                     e.target.closest(".side-nav-menu");

    // если клик НЕ по меню → закрываем
    if (!navBlock) {
      sideNavToggle.checked = false;
    }
  });
}



// ========================
// INIT
// ========================
document.addEventListener("DOMContentLoaded", () => {
  initFooterAnimation();
  initHeaderLoadAnimation();
  initSideNavDots();
  initMobileMenu();
  initSideNavOutsideClose();
  initSideNavLinksActive();
  updateHeaderState();

  window.addEventListener("scroll", updateHeaderState);
});
