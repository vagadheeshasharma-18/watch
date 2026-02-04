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

  /* ===============================
     SECTION 4 — VIDEO ELEMENTS
  =============================== */
  const videoSection = document.getElementById("video-section");
  const video = document.getElementById("surprise-video");
  const videoOverlay = document.getElementById("video-overlay");
  const videoPlayBtn = document.getElementById("video-play");
  const videoContinue = document.getElementById("video-continue");

  let heartInterval;
  let sparkleInterval;
  let cameraInterval;

  const CORRECT_PASSWORD = "13022006";
  let bgMusic;
  let envelopeOpened = false;
// SECTION 5 — SONG ELEMENTS
const songSection = document.getElementById("song-section");
const songAudio = document.getElementById("fav-song");
const songPlayBtn = document.getElementById("song-play");
const songNextBtn = document.getElementById("song-next");

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
  // If content fits without scrolling → show immediately
  if (letterPaper.scrollHeight <= letterPaper.clientHeight + 5) {
    memoriesBtn.classList.remove("hidden");
    return;
  }

  letterPaper.addEventListener("scroll", () => {
    const nearBottom =
      letterPaper.scrollTop + letterPaper.clientHeight >=
      letterPaper.scrollHeight - 10;

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
     FLOATING ELEMENTS
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
   
    stopFloatingEffects();

    letterSection.style.display = "none";

    imagesSection.classList.remove("hidden");
    imagesSection.classList.add("active");

    startCameraFloating();
    playNextImage();
  }

  function playNextImage() {
    if (currentImageIndex > totalImages) {
      memoryImage.classList.add("last");

      setTimeout(() => {
        stopCameraFloating();
        showVideoSection();
      }, 2000);

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

  /* ===============================
     SECTION 4 — VIDEO
  =============================== */
  /* ---------- VIDEO PLAY BUTTON ---------- */
videoPlayBtn.addEventListener("click", () => {
  video.play();
  videoOverlay.classList.add("hidden");
});

/* ---------- VIDEO END ---------- */
video.addEventListener("ended", () => {
  video.pause();
  videoOverlay.classList.add("hidden");   // no play icon after end
  videoContinue.classList.remove("hidden");
});

  function showVideoSection() {
  imagesSection.classList.remove("active");
  imagesSection.classList.add("hidden");

  // RESET VIDEO STATE 👇
  video.pause();
  video.currentTime = 0;
  videoOverlay.classList.remove("hidden");
  videoContinue.classList.add("hidden");

  videoSection.classList.remove("hidden");
  videoSection.classList.add("active");
}
videoContinue.addEventListener("click", () => {
  videoSection.style.opacity = "0";

  setTimeout(() => {
    videoSection.classList.remove("active");
    videoSection.classList.add("hidden");
    showSongSection();
  }, 1200);
});



video.addEventListener("ended", () => {
  video.pause();

  // hide overlay play icon
  videoOverlay.classList.add("hidden");

  // show continue button only
  videoContinue.classList.remove("hidden");
});


/* ===============================
   SECTION 5 — SONG SECTION
=============================== */

// Show Song Section (called after video)
function showSongSection() {
  // Stop background music completely
  if (bgMusic) {
    bgMusic.pause();
    bgMusic.currentTime = 0;
  }

  // Reset song state
  songAudio.pause();
  songAudio.currentTime = 0;

  // Show song section
  songSection.classList.remove("hidden");
  songSection.classList.add("active");
}
let musicInterval;

function createMusicNote() {
  const note = document.createElement("div");

  const symbols = ["🎵", "🎶", "💖", "✨"];
  note.textContent = symbols[Math.floor(Math.random() * symbols.length)];

  note.className = "floating-music";

  note.style.left = Math.random() * 90 + "vw";
  note.style.fontSize = Math.random() * 14 + 24 + "px"; // BIGGER
  note.style.opacity = Math.random() * 0.4 + 0.6;

  document.body.appendChild(note);

  setTimeout(() => note.remove(), 9000);
}

function startMusicFloating() {
  musicInterval = setInterval(createMusicNote, 700); // MORE
}

function stopMusicFloating() {
  clearInterval(musicInterval);
}


/* ---------- Play / Pause ---------- */
songPlayBtn.addEventListener("click", () => {
  if (songAudio.paused) {
    songAudio.play();
    songSection.classList.add("playing");

    // ✅ SHOW NEXT BUTTON IMMEDIATELY
    songNextBtn.classList.remove("hidden");

  } else {
    songAudio.pause();
    songSection.classList.remove("playing");
  }
});



/* ---------- Next Button ---------- */
songNextBtn.addEventListener("click", () => {
  songAudio.pause();
  songAudio.currentTime = 0;

  songSection.style.opacity = "0";

  setTimeout(() => {
    songSection.classList.remove("active");
    songSection.classList.add("hidden");
    // 🔜 Next section (voice notes) will be connected here
  }, 1200);
});

/* ---------- CONNECT VIDEO → SONG ---------- */


// Show next button after 10 sec of song playing


// Move to Voice Notes
songNextBtn.addEventListener("click", () => {
  songAudio.pause();
  songAudio.currentTime = 0;
  showVoiceSection();
});

/* ===============================
   SECTION 6 — VOICE NOTES
=============================== */

const voiceSection = document.getElementById("voice-section");
const voiceAudios = voiceSection.querySelectorAll("audio");

/* Show Voice Notes Section */
function showVoiceSection() {
  // Hide song section smoothly
  songSection.style.opacity = "0";

  setTimeout(() => {
    songSection.classList.remove("active");
    songSection.classList.add("hidden");

    // Show voice notes
    voiceSection.classList.remove("hidden");
    voiceSection.classList.add("active");
    voiceSection.style.opacity = "1";
  }, 1200);
}

/* 🔒 Allow only ONE voice to play at a time */
voiceAudios.forEach(currentAudio => {
  currentAudio.addEventListener("play", () => {
    voiceAudios.forEach(otherAudio => {
      if (otherAudio !== currentAudio) {
        otherAudio.pause();
        otherAudio.currentTime = 0;
      }
    });
  });
});

/* Optional: stop all voices when leaving section */
function stopAllVoices() {
  voiceAudios.forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });
}
const notesToCakeBtn = document.getElementById("notes-to-cake");

notesToCakeBtn.addEventListener("click", () => {
  stopAllVoices();              // stop any playing voice
  voiceSection.style.opacity = "0";

  setTimeout(() => {
    voiceSection.classList.remove("active");
    voiceSection.classList.add("hidden");
    showCakeSection();          // 🔥 move to cake
  }, 1000);
});

/* ===============================
   SECTION 7 — CAKE CUTTING
=============================== */

const cakeSection = document.getElementById("cake-section");
const cake = document.getElementById("cake");
const candle = cake.querySelector(".candle");
const cakeNextBtn = document.getElementById("cake-next");
const cutCakeBtn = document.getElementById("cut-cake");

cutCakeBtn.addEventListener("click", () => {
  // 🔪 Cut cake visually
  cake.classList.add("cut");

  // 🔥 Blow off candle
  candle.classList.add("off");

  // 🎉 Button text
  cutCakeBtn.textContent = "🎉 Happy Birthday 🎉";

  // 🎊 Full screen paper blast
  startPaperBlast();
  setTimeout(stopPaperBlast, 3500);

  // 💖 Hearts & sparkles
  startFloatingEffects();

  // 👉 Show next button
  setTimeout(() => {
    cakeNextBtn.classList.remove("hidden");
  }, 1800);
});


function launchConfetti() {

  // FIRST BIG BLAST 💥
  for (let i = 0; i < 80; i++) {
    createConfetti();
  }

  // SECOND BLAST after 400ms 💥
  setTimeout(() => {
    for (let i = 0; i < 60; i++) {
      createConfetti();
    }
  }, 400);

  // THIRD BLAST after 900ms 💥
  setTimeout(() => {
    for (let i = 0; i < 50; i++) {
      createConfetti();
    }
  }, 900);
}

/* Helper */
function createConfetti() {
  const confetti = document.createElement("div");

  const emojis = ["🎉", "🎊", "✨", "💖", "💫", "🧻"];
  confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];

  confetti.style.position = "fixed";
  confetti.style.left = Math.random() * 100 + "vw";
  confetti.style.top = "-30px";
  confetti.style.fontSize = Math.random() * 22 + 18 + "px";
  confetti.style.animation = "confettiFall 3.2s linear forwards";
  confetti.style.zIndex = "30";

  document.body.appendChild(confetti);
  setTimeout(() => confetti.remove(), 3200);
}

let blastInterval;

function startPaperBlast() {
  blastInterval = setInterval(() => {
    for (let i = 0; i < 12; i++) {
      createConfetti();
    }
  }, 120);
}

function stopPaperBlast() {
  clearInterval(blastInterval);
}


function showCakeSection() {
  // Hide voice notes
  voiceSection.style.opacity = "0";

  setTimeout(() => {
    voiceSection.classList.remove("active");
    voiceSection.classList.add("hidden");

    cakeSection.classList.remove("hidden");
    cakeSection.classList.add("active");
  }, 1200);
}
cakeNextBtn.addEventListener("click", () => {
  stopFloatingEffects();

  cakeSection.style.opacity = "0";

  setTimeout(() => {
    cakeSection.classList.remove("active");
    cakeSection.classList.add("hidden");

    showFinalMessageSection();
  }, 1200);
});

function showFinalMessageSection() {
  alert("Final emotional message section will open here 💖");
}

})
