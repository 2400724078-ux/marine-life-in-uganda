// =============================================
// MARINE LIFE UGANDA - script.js
// DOM Manipulation, Events, localStorage, try...catch
// =============================================

// -----------------------------------------------
// 1. MOBILE NAV TOGGLE
// -----------------------------------------------
function initMobileNav() {
  const nav = document.querySelector("nav ul");
  const navbar = document.querySelector(".navbar");
  if (!nav || !navbar) return;

  const menuBtn = document.createElement("button");
  menuBtn.className = "menu-toggle";
  menuBtn.innerHTML = "&#9776;";
  navbar.appendChild(menuBtn);

  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("nav-open");
    menuBtn.innerHTML = nav.classList.contains("nav-open") ? "&#10005;" : "&#9776;";
  });
}

// -----------------------------------------------
// 2. ACTIVE NAV LINK
// -----------------------------------------------
function setActiveNav() {
  const links = document.querySelectorAll("nav ul li a");
  links.forEach(link => {
    link.classList.remove("active");
    if (link.href.includes(location.pathname.split("/").pop())) {
      link.classList.add("active");
    }
  });
  if (location.pathname === "/" || location.pathname.endsWith("index.html")) {
    const home = document.querySelector("nav ul li a[href='index.html']");
    if (home) home.classList.add("active");
  }
}

// -----------------------------------------------
// 3. SCROLL FADE ANIMATIONS
// -----------------------------------------------
function initScrollAnimation() {
  const elements = document.querySelectorAll(
    ".species-card, .mission-card, .welcome-images img, .economy-images img, .challenge-point, .challenges-gallery img, .stat-item, .team-card, .contact-form-box, .contact-info-box"
  );

  elements.forEach(el => el.classList.add("fade-hidden"));

  function checkVisibility() {
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        el.classList.add("fade-visible");
        el.classList.remove("fade-hidden");
      }
    });
  }

  window.addEventListener("scroll", checkVisibility);
  checkVisibility();
}

// -----------------------------------------------
// 4. LIGHTBOX FOR IMAGES
// -----------------------------------------------
function initLightbox() {
  const images = document.querySelectorAll(
    ".species-card img, .welcome-images img, .challenges-gallery img, .economy-images img, .map-images img"
  );
  if (images.length === 0) return;

  const overlay = document.createElement("div");
  overlay.className = "lightbox-overlay";

  const img = document.createElement("img");
  img.className = "lightbox-img";

  const closeBtn = document.createElement("button");
  closeBtn.className = "lightbox-close";
  closeBtn.innerHTML = "&#10005;";

  const prevBtn = document.createElement("button");
  prevBtn.className = "lightbox-nav lightbox-prev";
  prevBtn.innerHTML = "&#8249;";

  const nextBtn = document.createElement("button");
  nextBtn.className = "lightbox-nav lightbox-next";
  nextBtn.innerHTML = "&#8250;";

  overlay.appendChild(closeBtn);
  overlay.appendChild(prevBtn);
  overlay.appendChild(img);
  overlay.appendChild(nextBtn);
  document.body.appendChild(overlay);

  let current = 0;

  function open(index) {
    current = index;
    img.src = images[index].src;
    img.alt = images[index].alt;
    overlay.classList.add("lightbox-open");
    document.body.style.overflow = "hidden";
  }

  function close() {
    overlay.classList.remove("lightbox-open");
    document.body.style.overflow = "";
  }

  images.forEach((image, i) => {
    image.style.cursor = "pointer";
    image.addEventListener("click", () => open(i));
  });

  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", e => { if (e.target === overlay) close(); });

  prevBtn.addEventListener("click", e => {
    e.stopPropagation();
    current = (current - 1 + images.length) % images.length;
    img.src = images[current].src;
  });

  nextBtn.addEventListener("click", e => {
    e.stopPropagation();
    current = (current + 1) % images.length;
    img.src = images[current].src;
  });

  document.addEventListener("keydown", e => {
    if (!overlay.classList.contains("lightbox-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") nextBtn.click();
    if (e.key === "ArrowLeft") prevBtn.click();
  });
}

// -----------------------------------------------
// 5. CONTACT FORM VALIDATION (try...catch)
// -----------------------------------------------
function initContactForm() {
  const form = document.getElementById("contact-form") || document.querySelector("form");
  if (!form) return;

  const successMsg = document.createElement("div");
  successMsg.className = "form-success";
  successMsg.innerHTML = "🌊 Thank you! Your message has been received. We'll get back to you soon.";
  successMsg.style.display = "none";
  form.parentNode.insertBefore(successMsg, form.nextSibling);

  form.addEventListener("submit", e => {
    e.preventDefault();
    try {
      const name    = document.getElementById("name").value.trim();
      const email   = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (name === "") throw new Error("Please enter your full name.");
      if (email === "") throw new Error("Please enter your email address.");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Please enter a valid email address.");
      if (message.length < 10) throw new Error("Message must be at least 10 characters.");

      form.style.display = "none";
      successMsg.style.display = "block";
      console.log("Form submitted:", { name, email, message });

    } catch (error) {
      let errorEl = document.getElementById("form-error");
      if (!errorEl) {
        errorEl = document.createElement("p");
        errorEl.id = "form-error";
        errorEl.className = "form-error-msg";
        form.insertBefore(errorEl, form.firstChild);
      }
      errorEl.innerHTML = "⚠️ " + error.message;
      console.error("Form error:", error.message);
    }
  });
}

// -----------------------------------------------
// 6. BACK TO TOP BUTTON
// -----------------------------------------------
function initBackToTop() {
  const btn = document.createElement("button");
  btn.className = "back-to-top";
  btn.innerHTML = "↑";
  btn.title = "Back to top";
  document.body.appendChild(btn);

  window.addEventListener("scroll", () => {
    btn.classList.toggle("btn-visible", window.scrollY > 400);
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// -----------------------------------------------
// 7. NAVBAR SCROLL EFFECT
// -----------------------------------------------
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(2,12,27,0.98)";
    } else {
      navbar.style.background = "rgba(2,12,27,0.85)";
    }
  });
}

// -----------------------------------------------
// INIT
// -----------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  setActiveNav();
  initScrollAnimation();
  initLightbox();
  initContactForm();
  initBackToTop();
  initNavbarScroll();
});
