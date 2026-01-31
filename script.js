document.addEventListener("DOMContentLoaded", () => {

  // ===== ELEMENT REFERENCES =====
  const startBtn = document.getElementById("startBtn");
  const sections = document.querySelectorAll("section");
  const music = document.getElementById("bgMusic");
  const musicBtn = document.getElementById("musicBtn");
  const revealBtn = document.getElementById("revealBtn");
  const secretText = document.getElementById("secretText");
  const timer = document.getElementById("timer");
  const unlockBtn = document.getElementById("unlockBtn");
  const lockScreen = document.getElementById("lockScreen");
  const mainContent = document.getElementById("mainContent");
  const heartContainer = document.querySelector(".floating-hearts");

  // ===== MUSIC CONTROL =====
  let isPlaying = false;

  musicBtn.addEventListener("click", () => {
    if (!isPlaying) {
      music.play().catch(e => console.log(e));
      musicBtn.textContent = "⏸ Pause Music";
    } else {
      music.pause();
      musicBtn.textContent = "🎶 Play Music";
    }
    isPlaying = !isPlaying;
  });

  // ===== LOCK SCREEN =====
  unlockBtn.addEventListener("click", () => {
    lockScreen.style.display = "none";
    mainContent.classList.remove("hidden");
  });

  // ===== START SURPRISE =====
  startBtn.addEventListener("click", () => {

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
        delay += 1500; // slowed for clarity
      }
    });
  });

  // ===== SECRET MESSAGE =====
  revealBtn.addEventListener("click", () => {
    secretText.classList.remove("hidden");
    revealBtn.style.display = "none";
  });

  // ===== COUNTDOWN =====
  const birthdayDate = new Date("February 13, 2026 12:00:00 AM").getTime();

  setInterval(() => {
    const now = new Date().getTime();
    const diff = birthdayDate - now;

    if (diff <= 0) {
      timer.textContent = "🎉 HAPPY BIRTHDAY MADIHA TABASSUM 🎂💖";
      confetti({
        particleCount: 300,
        spread: 160,
        origin: { y: 0.6 }
      });
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    timer.textContent = `${days} Days ${hours} Hours ${minutes} Minutes`;
  }, 1000);

  // ===== FLOATING HEARTS =====
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

  setInterval(createHeart, 600);
});
