document.addEventListener("DOMContentLoaded", () => {

  // ===== ELEMENT REFERENCES =====
  const sections = document.querySelectorAll("section");
  const startBtn = document.getElementById("startBtn");
  const nextBtn = document.getElementById("nextBtn");
  const music = document.getElementById("bgMusic");
  const musicBtn = document.getElementById("musicBtn");
  const unlockBtn = document.getElementById("unlockBtn");
  const lockScreen = document.getElementById("lockScreen");
  const mainContent = document.getElementById("mainContent");
  const revealBtn = document.getElementById("revealBtn");
  const secretText = document.getElementById("secretText");
  const timer = document.getElementById("timer");
  const heartContainer = document.querySelector(".floating-hearts");

  // ===== STATE =====
  let currentSectionIndex = 0;
  let isPlaying = false;

  // 🔐 UNLOCK
  unlockBtn.addEventListener("click", () => {
    lockScreen.style.display = "none";
    mainContent.classList.remove("hidden");
    sections[0].scrollIntoView({ behavior: "smooth" });
  });

  // 🎶 MUSIC
  musicBtn.addEventListener("click", () => {
    if (!isPlaying) {
      music.play();
      musicBtn.textContent = "⏸ Pause Music";
    } else {
      music.pause();
      musicBtn.textContent = "🎶 Play Music";
    }
    isPlaying = !isPlaying;
  });

  // 🎁 START SURPRISE
  startBtn.addEventListener("click", () => {
    currentSectionIndex = 1;

    const section = sections[currentSectionIndex];
    section.classList.remove("hidden");

    // Move Next button after the revealed section
    section.after(nextBtn);

    nextBtn.classList.remove("hidden");
    startBtn.style.display = "none";

    section.scrollIntoView({ behavior: "smooth" });

    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.6 }
    });
  });

  // ▶️ NEXT SURPRISE
  nextBtn.addEventListener("click", () => {
    currentSectionIndex++;

    if (currentSectionIndex < sections.length) {
      const section = sections[currentSectionIndex];
      section.classList.remove("hidden");

      // Move button just after this section
      section.after(nextBtn);

      section.scrollIntoView({ behavior: "smooth" });
    } else {
      // End of surprises
      nextBtn.style.display = "none";
    }
  });

  // 🎁 SECRET MESSAGE
  revealBtn.addEventListener("click", () => {
    secretText.classList.remove("hidden");
    revealBtn.style.display = "none";
  });

  // ⏳ COUNTDOWN
  const birthdayDate = new Date("February 13, 2026 12:00:00 AM").getTime();

  setInterval(() => {
    const diff = birthdayDate - Date.now();

    if (diff <= 0) {
      timer.textContent = "🎉 HAPPY BIRTHDAY MADIHA TABASSUM 🎂💖";
      confetti({ particleCount: 300, spread: 160 });
      return;
    }

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff / 3600000) % 24);
    const minutes = Math.floor((diff / 60000) % 60);

    timer.textContent = `${days} Days ${hours} Hours ${minutes} Minutes`;
  }, 1000);

  // 💖 FLOATING HEARTS
  function createHeart() {
    const heart = document.createElement("span");
    heart.innerHTML = Math.random() > 0.5 ? "💖" : "✨";
    heart.style.left = Math.random() * 100 + "vw";
    heartContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 7000);
  }

  setInterval(createHeart, 600);
});
