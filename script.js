document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     SECTION 1 ELEMENTS
  =============================== */
  const line1 = document.getElementById("line1");
  const line2 = document.getElementById("line2");
  const password = document.getElementById("password");
  const hint = document.querySelector(".hint");
  const button = document.getElementById("unlockBtn");
  const volume = document.querySelector(".volume");
  const error = document.getElementById("error");
  const entry = document.getElementById("entry");

  // Lock scroll initially (Section 1)
  document.body.classList.add("lock-scroll");

  /* ===============================
     SECTION 2 ELEMENTS
  =============================== */
  const letterSection = document.getElementById("letter-section");
  const envelope = document.getElementById("envelope");
  const letterPaper = document.getElementById("letter-paper");
  const letterContent = document.getElementById("letter-content");
  const memoriesBtn = document.getElementById("memories-btn");

  /* ===============================
     SECTION 3 ELEMENTS
  =============================== */
  const imagesSection = document.getElementById("images-section");
  const memoryImage = document.getElementById("memory-image");
let heartInterval;
let sparkleInterval;
let cameraInterval;

  const CORRECT_PASSWORD = "13022006";
  let bgMusic;
  let envelopeOpened = false;

  /* ===============================
     SECTION 1 INITIAL STATE
  =============================== */
  [line1, line2, password, hint, button, volume, error].forEach(el => {
    el.style.opacity = "0";
    el.style.transition = "opacity 1s ease";
  });

  /* ===============================
     SECTION 1 TIMELINE
  =============================== */
  setTimeout(() => line1.style.opacity = "1", 1000);
  setTimeout(() => line2.style.opacity = "1", 2500);

  setTimeout(() => {
    password.style.opacity = "1";
    hint.style.opacity = "1";
    button.style.opacity = "1";
    volume.style.opacity = "1";
  }, 4000);

  /* ===============================
     PASSWORD CHECK
  =============================== */
  button.addEventListener("click", () => {
    const entered = password.value.trim();
    error.style.opacity = "1";

    if (entered !== CORRECT_PASSWORD) {
      error.textContent = "Oops 👀";
      error.style.color = "#ffb3b3";
      password.classList.add("shake");
      setTimeout(() => password.classList.remove("shake"), 400);
      return;
    }

    error.textContent = "Unlocked 💖";
    error.style.color = "#b2ffda";
    button.textContent = "Unlocking…";

    bgMusic = new Audio("./bg-music.mp3");
    bgMusic.loop = true;
    bgMusic.volume = 0.6;
    bgMusic.play().catch(() => {});

    entry.style.transition = "opacity 1.2s ease";
    entry.style.opacity = "0";

    setTimeout(() => {
      entry.style.display = "none";

      // Enable scrolling for Section 2
      document.body.classList.remove("lock-scroll");

      letterSection.classList.remove("hidden");
      letterSection.classList.add("active");
    }, 1200);
  });

  /* ===============================
     LOAD LETTER.TXT
  =============================== */
  async function loadLetterText() {
    const response = await fetch("./letter.txt");
    return await response.text();
  }

  /* ===============================
     SCROLL → SHOW MEMORIES BUTTON
  =============================== */
  function enableScrollForButton() {
  // If content is NOT scrollable, show button immediately
  if (letterPaper.scrollHeight <= letterPaper.clientHeight + 5) {
    memoriesBtn.classList.remove("hidden");
    return;
  }

  // Otherwise, wait for scroll
  letterPaper.addEventListener("scroll", () => {
    const nearBottom =
      letterPaper.scrollTop + letterPaper.clientHeight >=
      letterPaper.scrollHeight - 15;

    if (nearBottom) {
      memoriesBtn.classList.remove("hidden");
    }
  });
}

  /* ===============================
     TYPEWRITER EFFECT
  =============================== */
  async function startTypewriter() {
    const text = await loadLetterText();
    letterContent.textContent = "";

    let index = 0;
    const speed = 35;

    function typeChar() {
      if (index < text.length) {
        letterContent.textContent += text.charAt(index);
        index++;
        setTimeout(typeChar, speed);
      } else {
        enableScrollForButton();
      }
    }

    typeChar();
  }

  /* ===============================
   FLOATING HEARTS, SPARKLES & CAMERAS
=============================== */

function createFloatingElement(type) {
  const el = document.createElement("div");
  el.classList.add("floating", type);

  if (type === "heart") el.textContent = "❤️";
  else if (type === "sparkle") el.textContent = "✨";
  else if (type === "camera") el.textContent = "📸";

  el.style.left = Math.random() * 100 + "vw";
  el.style.fontSize = Math.random() * 10 + 14 + "px";
  el.style.animationDuration = Math.random() * 3 + 5 + "s";

  document.body.appendChild(el);
  setTimeout(() => el.remove(), 8000);
}

/* Hearts & sparkles — Section 2 */
function startFloatingEffects() {
  heartInterval = setInterval(() => {
    createFloatingElement("heart");
    if (Math.random() > 0.5) createFloatingElement("heart");
  }, 1400);

  sparkleInterval = setInterval(() => {
    createFloatingElement("sparkle");
    if (Math.random() > 0.6) createFloatingElement("sparkle");
  }, 1200);
}

function stopFloatingEffects() {
  clearInterval(heartInterval);
  clearInterval(sparkleInterval);
}

/* Cameras — Section 3 */
function startCameraFloating() {
  cameraInterval = setInterval(() => {
    createFloatingElement("camera");
  }, 1800);
}

function stopCameraFloating() {
  clearInterval(cameraInterval);
}


  /* ===============================
     ENVELOPE OPEN
  =============================== */
  envelope.addEventListener("click", () => {
    if (envelopeOpened) return;
    envelopeOpened = true;

    envelope.classList.add("open");

    const tapText = document.querySelector(".tap-text");
    if (tapText) tapText.style.opacity = "0";

    setTimeout(() => {
      letterPaper.classList.remove("hidden");
      letterPaper.classList.add("show");
      startTypewriter();
      startFloatingEffects();
    }, 800);
  });

  /* ===============================
     SECTION 3 — IMAGE SEQUENCE
  =============================== */
  const totalImages = 15;
  let currentImageIndex = 1;

  function showImagesSection() {
  // Lock scroll
  document.body.classList.add("lock-scroll");

  // Stop hearts & sparkles
  stopFloatingEffects();

  // Remove Section 2
  letterSection.style.display = "none";

  // Show Section 3
  imagesSection.classList.remove("hidden");
  imagesSection.classList.add("active");

  // Start camera floating
  startCameraFloating();

  playNextImage();
}

  function playNextImage() {
    if (currentImageIndex > totalImages) {
      memoryImage.classList.add("last");
      return;
    }

    memoryImage.classList.remove("show", "last");

    setTimeout(() => {
      memoryImage.src = `images/img${currentImageIndex}.jpg`;
      memoryImage.classList.add("show");
      currentImageIndex++;
    }, 400);

    setTimeout(playNextImage, 2000);
  }

  memoriesBtn.addEventListener("click", showImagesSection);

});
