/*************************************************
 * GLOBAL SECTION CONTROL
 *************************************************/
const sections = document.querySelectorAll(".section");
let currentSectionIndex = 0;

function showSection(index) {
  sections.forEach(section => section.classList.remove("active"));
  sections[index].classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/*************************************************
 * ENTRY / PASSWORD LOGIC
 *************************************************/
const unlockBtn = document.getElementById("unlockBtn");
const passwordInput = document.getElementById("password");
const errorText = document.getElementById("error");

const CORRECT_PASSWORD = "13022006";

let bgMusic = null;

unlockBtn.addEventListener("click", () => {
  const enteredPassword = passwordInput.value.trim();

  if (enteredPassword === CORRECT_PASSWORD) {
    errorText.innerText = "";

    // Start background music
    bgMusic = new Audio("assets/audio/bg-music.mp3");
    bgMusic.loop = true;
    bgMusic.volume = 0.6;
    bgMusic.play();

    // Move to long letter section
    currentSectionIndex = 1;
    showSection(currentSectionIndex);
  } else {
    errorText.innerText = "Oops 👀";
    passwordInput.classList.add("shake");
    setTimeout(() => passwordInput.classList.remove("shake"), 400);
  }
});

/*************************************************
 * NEXT BUTTON NAVIGATION (GENERAL)
 *************************************************/
const nextButtons = document.querySelectorAll(".next");

nextButtons.forEach(button => {
  button.addEventListener("click", () => {
    currentSectionIndex++;
    showSection(currentSectionIndex);
  });
});

/*************************************************
 * IMAGES SECTION — POLAROID SLIDESHOW
 *************************************************/
const slideshowImg = document.getElementById("slideshow");
let imageIndex = 1;
const TOTAL_IMAGES = 15;

if (slideshowImg) {
  setInterval(() => {
    imageIndex++;
    if (imageIndex > TOTAL_IMAGES) imageIndex = 1;
    slideshowImg.src = `assets/images/img${imageIndex}.jpg`;
  }, 2000);
}

/*************************************************
 * VIDEO SECTION LOGIC
 *************************************************/
const videoElement = document.getElementById("memoryVideo");

if (videoElement) {
  videoElement.addEventListener("ended", () => {
    // Video pauses on last frame automatically
    // Continue button already visible via HTML/CSS
  });
}

// Stop background music AFTER video section
const videoContinueBtn = document.querySelector("#video .next");
if (videoContinueBtn) {
  videoContinueBtn.addEventListener("click", () => {
    if (bgMusic) {
      bgMusic.pause();
      bgMusic.currentTime = 0;
      bgMusic = null;
    }
  });
}

/*************************************************
 * SONG SECTION
 * (No background music here — only song audio)
 *************************************************/
// No JS needed — browser handles play/pause via controls

/*************************************************
 * VOICE RECORDINGS SECTION
 * (No background music — silence + voice only)
 *************************************************/
// No JS needed — handled by HTML audio controls

/*************************************************
 * CAKE CUTTING INTERACTION
 *************************************************/
const cutCakeBtn = document.getElementById("cutCake");
const wishText = document.getElementById("wish");
const cakeNextBtn = document.querySelector("#cake .next");

if (cutCakeBtn) {
  cutCakeBtn.addEventListener("click", () => {
    wishText.innerText = "Make a wish 💖";

    // Play celebration sound
    const cheer = new Audio("assets/audio/cheer.mp3");
    cheer.volume = 0.9;
    cheer.play();

    // Reveal next button
    cakeNextBtn.classList.remove("hidden");
  });
}

/*************************************************
 * FUN SECTION — MINI GAME
 *************************************************/
const funBtn = document.getElementById("funBtn");
const funText = document.getElementById("funText");
const funNextBtn = document.querySelector("#fun .next");

if (funBtn) {
  funBtn.addEventListener("click", () => {
    const punchLines = [
      "Okay okay… you’re officially too cute 😌",
      "No escape… you’re special 😏",
      "Yep. Confirmed. Best human ever 💖"
    ];

    const randomLine =
      punchLines[Math.floor(Math.random() * punchLines.length)];

    funText.innerText = randomLine;
    funNextBtn.classList.remove("hidden");
  });
}

/*************************************************
 * GRANDMA SECTION
 * (Respectful — no extra JS, just timing)
 *************************************************/
// Holding silence + emotion — no interaction logic needed

/*************************************************
 * FINAL SECTION
 * (Quiet fade handled via CSS)
 *************************************************/
// No JS required

/*************************************************
 * INITIAL LOAD
 *************************************************/
showSection(0);
