document.addEventListener("DOMContentLoaded",()=>{

const PASSWORD="13022006";

const lockScreen=document.getElementById("lockScreen");
const mainContent=document.getElementById("mainContent");
const unlockBtn=document.getElementById("unlockBtn");
const passwordInput=document.getElementById("passwordInput");
const errorText=document.getElementById("errorText");

const sections=document.querySelectorAll("section");
const startBtn=document.getElementById("startBtn");
const nextBtn=document.getElementById("nextBtn");
const nextWrapper=document.getElementById("nextWrapper");

const music=document.getElementById("bgMusic");
const openFinalBtn=document.getElementById("openFinalBtn");
const finalEnd=document.getElementById("finalEnd");
const dimOverlay=document.getElementById("dimOverlay");

let index=0;

/* 🔐 Unlock */
unlockBtn.onclick=()=>{
  if(passwordInput.value===PASSWORD){
    lockScreen.style.display="none";
    mainContent.classList.remove("hidden");
  }else{
    errorText.classList.remove("hidden");
  }
};

/* ▶ Start */
startBtn.onclick=()=>{
  index=1;
  sections[index].classList.remove("hidden");
  startBtn.style.display="none";
  nextWrapper.classList.remove("hidden");
  sections[index].after(nextWrapper);
  sections[index].scrollIntoView({behavior:"smooth"});
  music.play();
};

/* ➡ Next */
nextBtn.onclick=()=>{
  index++;
  if(index<sections.length){
    sections[index].classList.remove("hidden");
    sections[index].after(nextWrapper);
    sections[index].scrollIntoView({behavior:"smooth"});

    // 🖼️ IMAGE FADE-IN (2s gap)
    if(sections[index].id==="imagesSection"){
      const imgs=document.querySelectorAll(".gallery img");
      imgs.forEach((img,i)=>{
        setTimeout(()=>img.classList.add("show"), i*2000);
      });
    }

  }else{
    nextWrapper.style.display="none";
  }
};

/* 🌟 FINAL MESSAGE + BLAST (unchanged) */
openFinalBtn.onclick=()=>{
  document.body.style.overflow="hidden";
  dimOverlay.classList.add("active");

  finalEnd.classList.remove("hidden");
  finalEnd.scrollIntoView({behavior:"smooth"});

  const end = Date.now() + 3000;
  (function blast(){
    confetti({
      particleCount: 50,
      spread: 180,
      startVelocity: 65,
      origin:{y:0.6}
    });
    if(Date.now() < end){
      requestAnimationFrame(blast);
    }
  })();

  setTimeout(()=>{
    finalEnd.classList.add("showFinal");
    dimOverlay.classList.remove("active");
    document.body.style.overflow="auto";
  },3000);
};

});
