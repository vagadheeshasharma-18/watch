// Elements
const startBtn = document.getElementById("startBtn");
const sections = document.querySelectorAll("section");
const music = document.getElementById("bgMusic");
const revealBtn = document.getElementById("revealBtn");
const secretText = document.getElementById("secretText");
const timer = document.getElementById("timer");

// STEP-BY-STEP REVEAL
startBtn.addEventListener("click", () => {
  music.play();
    // Confetti blast 🎊
  confetti({
    particleCount: 200,
    spread: 120,
    origin: { y: 0.6 }
  });

  let delay = 0;
  sections.forEach((section, index) => {
    if (index !== 0) {
      setTimeout(() => {
        section.classList.remove("hidden");
        section.scrollIntoView({ behavior: "smooth" });
      }, delay);
      delay += 1200;
    }
  });
});

// SECRET MESSAGE
revealBtn.addEventListener("click", () => {
  secretText.classList.remove("hidden");
  revealBtn.style.display = "none";
});

// COUNTDOWN (change date later)
const birthdayDate = new Date("February 13, 2026 00:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const diff = birthdayDate - now;

  if (diff <= 0) {
    timer.textContent = "🎉 IT'S YOUR BIRTHDAY 🎉";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  timer.textContent = `${days} Days ${hours} Hours ${minutes} Minutes`;
}, 1000);
// Floating hearts & sparkles 💖✨
const heartContainer = document.querySelector(".floating-hearts");

function createHeart() {
  const heart = document.createElement("span");
  heart.innerHTML = Math.random() > 0.5 ? "💖" : "✨";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = (Math.random() * 3 + 4) + "s";
  heart.style.fontSize = (Math.random() * 10 + 16) + "px";
  heartContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 7000);
}

setInterval(createHeart, 500);
