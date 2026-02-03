document.addEventListener("DOMContentLoaded", () => {
  const line1 = document.getElementById("line1");
  const line2 = document.getElementById("line2");
  const password = document.getElementById("password");
  const hint = document.querySelector(".hint");
  const button = document.getElementById("unlockBtn");
  const volume = document.querySelector(".volume");
  const error = document.getElementById("error");
  const entry = document.getElementById("entry");

  const CORRECT_PASSWORD = "13022006";
  let bgMusic;

  // Initial states
  [line1, line2, password, hint, button, volume, error].forEach(el => {
    el.style.opacity = "0";
    el.style.transition = "opacity 1s ease";
  });

  // Step timings
  setTimeout(() => line1.style.opacity = "1", 1000);
  setTimeout(() => line2.style.opacity = "1", 2500);
  setTimeout(() => {
    password.style.opacity = "1";
    hint.style.opacity = "1";
    button.style.opacity = "1";
    volume.style.opacity = "1";
  }, 4000);

  // Password logic
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

    // ✅ Correct password
    error.textContent = "Unlocked 💖";
    error.style.color = "#b2ffda";
    button.textContent = "Unlocking…";

    // Start background music
    bgMusic = new Audio("bg-music.mp3"); // put file in same folder
    bgMusic.loop = true;
    bgMusic.volume = 0.6;
    bgMusic.play();

    // Fade out Section 1
    setTimeout(() => {
      entry.style.transition = "opacity 1.2s ease";
      // Fade out Section 1
entry.style.transition = "opacity 1.2s ease";
entry.style.opacity = "0";

// After fade, show Section 2
setTimeout(() => {
  entry.style.display = "none";

  // ACTIVATE SECTION 2
  letterSection.classList.remove("hidden");
  letterSection.classList.add("active");
}, 1200);
;
    }, 600);

    // Section 1 ends here
    // Next section will be shown later
  });
});
/* ===============================
   SECTION 2 — LONG LETTER LOGIC
=============================== */

const letterSection = document.getElementById("letter-section");
const envelope = document.getElementById("envelope");
const letterPaper = document.getElementById("letter-paper");
const letterContent = document.getElementById("letter-content");
const memoriesBtn = document.getElementById("memories-btn");

/* ---------------------------------
   1️⃣ SHOW SECTION 2 (CROSSFADE)
---------------------------------- */

// This function should be called
// AFTER Section 1 fades out
function showSection2() {
  // Make section 2 participate in layout
  letterSection.classList.remove("hidden");

  // Small delay for smooth crossfade
  setTimeout(() => {
    letterSection.style.opacity = "1";
  }, 50);
}

/* ⚠️ IMPORTANT:
   In Section 1 JS, after entry fades out,
   CALL this function like:

   showSection2();
*/

/* ---------------------------------
   2️⃣ ENVELOPE TAP → OPEN
---------------------------------- */

let envelopeOpened = false;

envelope.addEventListener("click", () => {
  if (envelopeOpened) return;
  envelopeOpened = true;

  // Open envelope flap
  envelope.classList.add("open");

  // Reveal letter paper after envelope opens
  setTimeout(() => {
    letterPaper.classList.remove("hidden");
    startLetterTyping();
  }, 800);
});

/* ---------------------------------
   3️⃣ LOAD LETTER.TXT
---------------------------------- */

async function loadLetterText() {
  const response = await fetch("letter.txt");
  const text = await response.text();
  return text;
}

/* ---------------------------------
   4️⃣ TYPEWRITER EFFECT (SLOW)
---------------------------------- */

async function startLetterTyping() {
  const fullText = await loadLetterText();

  let index = 0;
  const speed = 35; // slow & emotional

  function typeNextChar() {
    if (index < fullText.length) {
      letterContent.textContent += fullText.charAt(index);
      index++;

      setTimeout(typeNextChar, speed);
    } else {
      enableScrollCheck();
    }
  }

  typeNextChar();
}

/* ---------------------------------
   5️⃣ SCROLL TO BOTTOM → SHOW BUTTON
---------------------------------- */

function enableScrollCheck() {
  letterPaper.addEventListener("scroll", () => {
    const nearBottom =
      letterPaper.scrollTop + letterPaper.clientHeight >=
      letterPaper.scrollHeight - 10;

    if (nearBottom) {
      memoriesBtn.classList.remove("hidden");
    }
  });
}
