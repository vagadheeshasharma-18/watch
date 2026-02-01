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

  const gallery = document.getElementById("gallery");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const closeLightbox = document.getElementById("closeLightbox");

  let index = 0;

  // Unlock
  unlockBtn.onclick = () => {
    if (passwordInput.value === PASSWORD) {
      lockScreen.style.display = "none";
      mainContent.classList.remove("hidden");
    } else {
      errorText.classList.remove("hidden");
    }
  };

  // Load images 1–20
  for (let i = 1; i <= 20; i++) {
    const img = document.createElement("img");
    img.src = `images/photo${i}.jpg`;
    img.onerror = () => img.remove();
    img.onclick = () => {
      lightboxImg.src = img.src;
      lightbox.classList.remove("hidden");
    };
    gallery.appendChild(img);
  }

  closeLightbox.onclick = () => {
    lightbox.classList.add("hidden");
  };

  startBtn.onclick = () => {
    index = 1;
    sections[index].classList.remove("hidden");
    nextBtn.classList.remove("hidden");
    startBtn.style.display = "none";
  };

  nextBtn.onclick = () => {
    index++;
    if (index < sections.length) {
      sections[index].classList.remove("hidden");
    } else {
      nextBtn.style.display = "none";
    }
  };

});
