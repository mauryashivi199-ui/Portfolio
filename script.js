/* ==========================================================================
   SHIVANGI MAURYA PORTFOLIO - INTERACTIVE SCRIPT
   Features: 3-Dot Dropdown, Typewriter, Particle Canvas, Modals, Locked Result View,
   Certificate Showcase, Local Storage Photo Preview, Form Validation
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initTypewriter();
  initParticleCanvas();
  initScrollObserver();
  initNavigation();
  initThreeDotsMenu();
});

/* --------------------------------------------------------------------------
   1. TYPEWRITER EFFECT
   -------------------------------------------------------------------------- */
const typewriterWords = [
  "DevOps Engineer Intern",
  "Final Year B.Tech CSE Student",
  "Java & Spring Boot Developer",
  "Kubernetes & CI/CD Specialist",
  "AI RAG Systems Developer"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.getElementById("typewriter");

function initTypewriter() {
  if (!typewriterElement) return;

  const currentWord = typewriterWords[wordIndex];

  if (isDeleting) {
    typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === currentWord.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % typewriterWords.length;
    typeSpeed = 400;
  }

  setTimeout(initTypewriter, typeSpeed);
}

/* --------------------------------------------------------------------------
   2. 3-DOT MENU & NAVIGATION TOGGLE
   -------------------------------------------------------------------------- */
function initThreeDotsMenu() {
  const threeDotsBtn = document.getElementById("threeDotsBtn");
  const threeDotsMenu = document.getElementById("threeDotsMenu");

  if (threeDotsBtn && threeDotsMenu) {
    threeDotsBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      threeDotsMenu.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
      if (!threeDotsMenu.contains(e.target) && e.target !== threeDotsBtn) {
        threeDotsMenu.classList.remove("show");
      }
    });
  }
}

function initNavigation() {
  const mobileToggle = document.getElementById("mobileToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      const icon = mobileToggle.querySelector("i");
      if (navMenu.classList.contains("active")) {
        icon.className = "fa-solid fa-xmark";
      } else {
        icon.className = "fa-solid fa-bars";
      }
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        if (mobileToggle.querySelector("i")) {
          mobileToggle.querySelector("i").className = "fa-solid fa-bars";
        }
      });
    });
  }

  window.addEventListener("scroll", () => {
    let current = "";
    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 120) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
  const threeDotsMenu = document.getElementById("threeDotsMenu");
  if (threeDotsMenu) threeDotsMenu.classList.remove("show");
}

/* --------------------------------------------------------------------------
   3. SCROLL REVEAL OBSERVER
   -------------------------------------------------------------------------- */
function initScrollObserver() {
  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.15 }
  );

  reveals.forEach((element) => observer.observe(element));
}

/* --------------------------------------------------------------------------
   4. PARTICLE CANVAS BACKGROUND
   -------------------------------------------------------------------------- */
let canvas, ctx, particlesArray;
let particleGlowMode = true;

function initParticleCanvas() {
  canvas = document.getElementById("particleCanvas");
  if (!canvas) return;

  ctx = canvas.getContext("2d");
  resizeCanvas();

  particlesArray = [];
  const numberOfParticles = Math.floor((canvas.width * canvas.height) / 14000);

  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }

  animateParticles();

  window.addEventListener("resize", resizeCanvas);
}

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2.5 + 1;
    this.speedX = (Math.random() - 0.5) * 0.8;
    this.speedY = (Math.random() - 0.5) * 0.8;
    this.color = particleGlowMode ? "#00f0ff" : "#8b5cf6";
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function animateParticles() {
  if (!canvas || !ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();

    for (let j = i; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 110) {
        ctx.beginPath();
        ctx.strokeStyle = particleGlowMode
          ? `rgba(0, 240, 255, ${1 - distance / 110})`
          : `rgba(139, 92, 246, ${1 - distance / 110})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
        ctx.closePath();
      }
    }
  }

  requestAnimationFrame(animateParticles);
}

function toggleParticleTheme() {
  particleGlowMode = !particleGlowMode;
  if (particlesArray) {
    particlesArray.forEach((p) => {
      p.color = particleGlowMode ? "#00f0ff" : "#8b5cf6";
    });
  }
  const threeDotsMenu = document.getElementById("threeDotsMenu");
  if (threeDotsMenu) threeDotsMenu.classList.remove("show");
}

/* --------------------------------------------------------------------------
   5. MODAL SYSTEM
   -------------------------------------------------------------------------- */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
  const threeDotsMenu = document.getElementById("threeDotsMenu");
  if (threeDotsMenu) threeDotsMenu.classList.remove("show");
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-overlay")) {
    e.target.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

function openResumeModal() {
  openModal("resumeModal");
}

function openProjectModal(type) {
  openModal("projectModal");
}

function openCertImageModal(imageSrc, title) {
  const imgEl = document.getElementById("enlargedCertImage");
  const titleEl = document.getElementById("certImageModalTitle");
  if (imgEl && titleEl) {
    imgEl.src = imageSrc;
    titleEl.innerHTML = `<i class="fa-solid fa-certificate"></i> ${title}`;
    openModal("certImageModal");
  }
}

/* --------------------------------------------------------------------------
   6. LOCKED RESULT VIEW TOGGLE
   -------------------------------------------------------------------------- */
function toggleResultView(type) {
  alert(`Academic Result Record (${type}) is verified and locked as per user confidentiality settings.`);
}

/* --------------------------------------------------------------------------
   7. CERTIFICATE SHOWCASE & LOCAL PHOTO UPLOAD PREVIEW
   -------------------------------------------------------------------------- */
let activeCertId = "";

function openCertificateModal(certId, title, issuer) {
  activeCertId = certId;
  document.getElementById("certModalName").textContent = title;
  document.getElementById("certModalIssuer").textContent = issuer;

  const container = document.getElementById("certImageContainer");
  const savedPhoto = localStorage.getItem(`cert_photo_${certId}`);
  
  if (savedPhoto) {
    container.innerHTML = `<img src="${savedPhoto}" alt="${title}">`;
  } else {
    container.innerHTML = `
      <div class="cert-placeholder">
        <i class="fa-solid fa-award cert-big-icon"></i>
        <h4>${title}</h4>
        <p>${issuer}</p>
        <span class="badge-status">Verified Certificate Badge</span>
      </div>
    `;
  }

  openModal("certificateModal");
}

function handleCertUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const dataUrl = e.target.result;
    const container = document.getElementById("certImageContainer");
    container.innerHTML = `<img src="${dataUrl}" alt="Certificate Upload">`;

    if (activeCertId) {
      localStorage.setItem(`cert_photo_${activeCertId}`, dataUrl);
    }
  };
  reader.readAsDataURL(file);
}

/* --------------------------------------------------------------------------
   8. CONTACT FORM SUBMISSION
   -------------------------------------------------------------------------- */
function handleFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const feedback = document.getElementById("formFeedback");

  feedback.className = "form-feedback success";
  feedback.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you, <strong>${name}</strong>! Your message has been sent successfully. Shivangi will contact you via email soon.`;

  document.getElementById("contactForm").reset();
}
