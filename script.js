document.addEventListener("DOMContentLoaded", () => {

  const PASSWORD = "13022006";

  const lockScreen = document.getElementById("lockScreen");
  const mainContent = document.getElementById("mainContent");
  const unlockBtn = document.getElementById("unlockBtn");
  const passwordInput = document.getElementById("passwordInput");
  const errorText = document.getElementById("errorText");

  const sections = document.querySelectorAll("section");
  const startBtn = document.getElementById("startBtn");
  const nextBtn = document.getElementById("nextBtn");
  const nextWrapper = document.getElementById("nextWrapper");

  const music = document.getElementById("bgMusic");
  const floatingContainer = document.getElementById("floating-container");

  let currentIndex = 0;
  let musicStarted = false;

  // 🔐 Unlock
  unlockBtn.addEventListener("click", () => {
    if (passwordInput.value === PASSWORD) {
      lockScreen.style.display = "none";
      mainContent.classList.remove("hidden");
    } else {
      errorText.classList.remove("hidden");
    }
  });

  // ▶️ Start Surprise
  startBtn.addEventListener("click", () => {
    currentIndex = 1;
    sections[currentIndex].classList.remove("hidden");

    if (!musicStarted) {
      music.play();
      musicStarted = true;
    }

    startBtn.style.display = "none";
    nextWrapper.classList.remove("hidden");

    sections[currentIndex].after(nextWrapper);
    sections[currentIndex].scrollIntoView({ behavior: "smooth" });
  });

  // ▶️ Next Surprise
  nextBtn.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex < sections.length) {
      sections[currentIndex].classList.remove("hidden");
      sections[currentIndex].after(nextWrapper);
      sections[currentIndex].scrollIntoView({ behavior: "smooth" });
    } else {
      nextWrapper.style.display = "none";
    }
  });

  // 🎈 FLOATING MAGIC
  const symbols = ["💖", "🎈", "✨", "💜", "🎉"];

  function createFloating() {
    const span = document.createElement("span");
    span.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    span.style.left = Math.random() * 100 + "vw";
    span.style.fontSize = Math.random() * 20 + 18 + "px";
    span.style.animationDuration = Math.random() * 6 + 6 + "s";

    floatingContainer.appendChild(span);

    setTimeout(() => span.remove(), 12000);
  }

  setInterval(createFloating, 500);

});
