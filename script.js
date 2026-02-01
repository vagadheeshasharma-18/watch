document.addEventListener("DOMContentLoaded", () => {

  const PASSWORD = "13022006";
  const birthdayDate = new Date("February 13, 2026 00:00:00").getTime();

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
  const countdownEl = document.getElementById("countdown");
  const finalSection = document.getElementById("finalSection");

  let index = 0;
  let musicStarted = false;
  let finalConfettiDone = false;

  // Unlock
  unlockBtn.onclick = () => {
    if (passwordInput.value === PASSWORD) {
      lockScreen.style.display = "none";
      mainContent.classList.remove("hidden");
    } else {
      errorText.classList.remove("hidden");
    }
  };

  // Start
  startBtn.onclick = () => {
    index = 1;
    sections[index].classList.remove("hidden");

    if (!musicStarted) {
      music.play();
      musicStarted = true;
    }

    startBtn.style.display = "none";
    nextWrapper.classList.remove("hidden");

    sections[index].after(nextWrapper);
    sections[index].scrollIntoView({ behavior: "smooth" });
  };

  // Next
  nextBtn.onclick = () => {
    index++;
    if (index < sections.length) {
      sections[index].classList.remove("hidden");
      sections[index].after(nextWrapper);
      sections[index].scrollIntoView({ behavior: "smooth" });

      // 🎉 Confetti on final
      if (sections[index] === finalSection && !finalConfettiDone) {
        finalConfettiDone = true;
        confetti({ particleCount: 200, spread: 120, origin: { y: 0.6 } });
      }
    } else {
      nextWrapper.style.display = "none";
    }
  };

  // Countdown logic
  setInterval(() => {
    const now = Date.now();
    const diff = birthdayDate - now;

    if (diff <= 0) {
      countdownEl.textContent = "🎉 HAPPY BIRTHDAY 🎂💖";
      confetti({ particleCount: 300, spread: 160 });
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);

    countdownEl.textContent = `${d} Days ${h} Hours ${m} Minutes`;
  }, 1000);

  // Floating magic
  const symbols = ["💖","🎈","✨","💜","🎉"];
  setInterval(() => {
    const s = document.createElement("span");
    s.textContent = symbols[Math.floor(Math.random()*symbols.length)];
    s.style.left = Math.random()*100+"vw";
    s.style.fontSize = Math.random()*20+18+"px";
    s.style.animationDuration = Math.random()*6+6+"s";
    floatingContainer.appendChild(s);
    setTimeout(()=>s.remove(),12000);
  }, 500);

});
