AOS.init({
  duration: 700,
  easing: "ease-in-out",
  once: false,
  mirror: true
});


// ========================
// FOOTER ANIMATION
// ========================

const footer = document.getElementById("footerAnim");

if (footer) {
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


/// ========================
// HEADER SHRINK + SMOOTH TRANSITION
// exactly like index.html
// ========================

const header = document.getElementById("mainHeader");
const logoBox = document.getElementById("logoBox");
const logoImg = document.getElementById("logoImg");
const logoText = document.getElementById("logoText");
const mainNav = document.getElementById("mainNav");

window.addEventListener("scroll", () => {
  if (!header) return;

  if (window.scrollY > 50) {
    // smooth compact navbar

    header.classList.remove("py-5");
    header.classList.add("py-2");

    header.style.background = "rgba(15, 49, 72, 0.92)";
    header.style.backdropFilter = "blur(12px)";
    header.style.webkitBackdropFilter = "blur(12px)";
    header.style.boxShadow = "0 8px 32px rgba(15, 49, 72, 0.18)";

    if (logoBox) {
      logoBox.classList.remove("px-3", "py-1.5");
      logoBox.classList.add("px-2", "py-1");
    }

    if (logoImg) {
      logoImg.classList.remove("h-8", "md:h-9");
      logoImg.classList.add("h-7", "md:h-8");
    }

    if (logoText) {
      logoText.classList.remove("text-xs", "md:text-sm");
      logoText.classList.add("text-[10px]", "md:text-xs");
    }

    if (mainNav) {
      mainNav.classList.remove("gap-8", "text-sm");
      mainNav.classList.add("gap-6", "text-xs");
    }

  } else {
    // default glass navbar

    header.style.transition = "all 0.45s ease";

    header.classList.remove("py-2");
    header.classList.add("py-5");

    header.style.background = "rgba(255, 255, 255, 0.04)";
    header.style.backdropFilter = "blur(2px)";
    header.style.webkitBackdropFilter = "blur(2px)";
    header.style.boxShadow = "0 8px 32px rgba(15, 49, 72, 0.08)";

    if (logoBox) {
      logoBox.style.transition = "all 0.45s ease";
      logoBox.classList.remove("px-2", "py-1");
      logoBox.classList.add("px-3", "py-1.5");
    }

    if (logoImg) {
      logoImg.style.transition = "all 0.45s ease";
      logoImg.classList.remove("h-7", "md:h-8");
      logoImg.classList.add("h-8", "md:h-9");
    }

    if (logoText) {
      logoText.style.transition = "all 0.45s ease";
      logoText.classList.remove("text-[10px]", "md:text-xs");
      logoText.classList.add("text-xs", "md:text-sm");
    }

    if (mainNav) {
      mainNav.style.transition = "all 0.45s ease";
      mainNav.classList.remove("gap-6", "text-xs");
      mainNav.classList.add("gap-8", "text-sm");
    }
  }
});

// ========================
// PAGE LOAD NAVBAR ANIMATION
// same effect as index.html
// ========================

window.addEventListener("load", () => {
  const header = document.getElementById("mainHeader");

  if (!header) return;

  // стартовое состояние
  header.style.opacity = "0";
  header.style.transform = "translateY(-30px)";
  header.style.transition = "all 0.8s ease";

  // плавное появление
  setTimeout(() => {
    header.style.opacity = "1";
    header.style.transform = "translateY(0)";
  }, 150);
});

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id]");
  const dots = document.querySelectorAll(".nav-dot");

  function activateDot(id) {
    dots.forEach(dot => {
      /* reset */
      dot.style.background = "rgba(255,255,255,0.35)";
      dot.style.transform = "scale(1)";
      dot.style.boxShadow = "none";

      /* active state */
      if (dot.dataset.target === id) {
        dot.style.background = "#ffffff";
        dot.style.transform = "scale(1.35)";
        dot.style.boxShadow = "0 0 14px rgba(255,255,255,0.95)";
      }
    });
  }

  function detectCurrentSection() {
    let current = "";

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;

      if (window.scrollY >= top - 300) {
        current = section.getAttribute("id");
      }
    });

    if (current) {
      activateDot(current);
    }
  }

  window.addEventListener("scroll", detectCurrentSection);

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", () => {
      const id = link.getAttribute("href").replace("#", "");
      activateDot(id);
    });
  });

  /* first section active on page load */
  detectCurrentSection();
});