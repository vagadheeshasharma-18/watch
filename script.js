document.addEventListener("DOMContentLoaded", () => {
  const line1 = document.getElementById("line1");
  const line2 = document.getElementById("line2");
  const password = document.getElementById("password");
  const hint = document.querySelector(".hint");
  const button = document.getElementById("unlockBtn");
  const volume = document.querySelector(".volume");

  // Initial states
  [line1, line2, password, hint, button, volume].forEach(el => {
    el.style.opacity = "0";
    el.style.transition = "opacity 1s ease";
  });

  // Show first line
  setTimeout(() => {
    line1.style.opacity = "1";
  }, 1000);

  // Show second line
  setTimeout(() => {
    line2.style.opacity = "1";
  }, 2500);

  // Show input + controls
  setTimeout(() => {
    password.style.opacity = "1";
    hint.style.opacity = "1";
    button.style.opacity = "1";
    volume.style.opacity = "1";
  }, 4000);
});
