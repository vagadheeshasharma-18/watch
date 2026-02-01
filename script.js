* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

html { scroll-behavior: smooth; }

body {
  background: radial-gradient(circle at top, #14142d, #0a0a12);
  color: #fff;
  text-align: center;
}

.hidden { display: none; }

/* Fake YT */
#fakeYT {
  position: fixed;
  inset: 0;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.yt-card {
  background: #111;
  padding: 30px;
  border-radius: 16px;
}

.yt-thumb {
  width: 280px;
  height: 160px;
  background: #222;
  margin-bottom: 15px;
}

/* Lock */
#lockScreen {
  position: fixed;
  inset: 0;
  background: radial-gradient(circle, #1a1a3a, #0a0a12);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 998;
}

#passwordInput {
  background: transparent;
  border: 1px solid #7b5cff;
  padding: 12px 18px;
  border-radius: 30px;
  color: white;
  margin-bottom: 15px;
}

/* Sections */
section {
  min-height: 100vh;
  padding: 80px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Buttons */
button {
  background: #7b5cff;
  border: none;
  padding: 12px 26px;
  border-radius: 30px;
  color: white;
  margin: 10px;
  cursor: pointer;
}

button.ghost {
  background: transparent;
  border: 1px solid #7b5cff;
}

/* Card */
.card {
  background: rgba(255,255,255,0.08);
  padding: 30px;
  border-radius: 20px;
  max-width: 650px;
  line-height: 1.7;
}

/* Gallery */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 22px;
  max-width: 900px;
  margin-top: 30px;
}

.gallery-grid img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 18px;
  box-shadow: 0 15px 30px rgba(0,0,0,0.6);
  cursor: pointer;
  transition: transform 0.4s ease;
}

.gallery-grid img:hover {
  transform: scale(1.08);
}

/* Lightbox */
#lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

#lightbox img {
  max-width: 90%;
  max-height: 90%;
  border-radius: 20px;
}

#closeLightbox {
  position: absolute;
  top: 20px;
  right: 30px;
  font-size: 30px;
  cursor: pointer;
  color: white;
}
