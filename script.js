document.addEventListener("DOMContentLoaded",()=>{

const PASSWORD="13022006";
const AGE=20;

const lockScreen=document.getElementById("lockScreen");
const mainContent=document.getElementById("mainContent");
const unlockBtn=document.getElementById("unlockBtn");
const passwordInput=document.getElementById("passwordInput");
const errorText=document.getElementById("errorText");

const sections=document.querySelectorAll("section");
const startBtn=document.getElementById("startBtn");
const nextBtn=document.getElementById("nextBtn");
const nextWrapper=document.getElementById("nextWrapper");

const truck=document.getElementById("truck");
const parcel=document.getElementById("parcel");
const cake=document.getElementById("cake");
const cakeHint=document.getElementById("cakeHint");
const candles=document.getElementById("candles");
const knife=document.getElementById("knife");

const openFinalBtn=document.getElementById("openFinalBtn");
const finalEnd=document.getElementById("finalEnd");

const music=document.getElementById("bgMusic");
const blastSound=document.getElementById("blastSound");

let index=0;
let cakeStage=0;

/* 🔐 Unlock */
unlockBtn.onclick=()=>{
  if(passwordInput.value===PASSWORD){
    lockScreen.style.display="none";
    mainContent.classList.remove("hidden");
  } else errorText.classList.remove("hidden");
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
  if(sections[index].id==="cakeSection" && cakeStage<2) return;

  index++;
  if(index<sections.length){
    sections[index].classList.remove("hidden");
    sections[index].after(nextWrapper);

    sections[index].scrollIntoView({
      behavior:"smooth",
      block:"center"
    });

    if(sections[index].id==="cakeSection"){
      setTimeout(()=>{
        truck.classList.add("arrived");
        parcel.style.display="block";
      },800);
    }
  }
};

/* 📦 Parcel */
parcel.onclick=()=>{
  if(cakeStage!==0) return;
  parcel.style.display="none";
  cake.classList.remove("hidden");
  cakeHint.textContent="Candles lighting up… 🕯️";

  for(let i=0;i<AGE;i++){
    const c=document.createElement("span");
    candles.appendChild(c);
    setTimeout(()=>c.classList.add("lit"),i*200);
  }
  cakeStage=1;
};

/* 🔪 Cake cut */
cake.onclick=()=>{
  if(cakeStage!==1) return;
  cakeStage=2;
  knife.classList.add("cutting");
  blastSound.play();

  for(let i=0;i<6;i++){
    setTimeout(()=>confetti({particleCount:300,spread:170}),i*300);
  }

  cakeHint.textContent="With all my love 💖";
};

/* 🌸 Final Message */
openFinalBtn.onclick=()=>{
  finalEnd.classList.remove("hidden");
  finalEnd.scrollIntoView({behavior:"smooth"});
  blastSound.play();

  const end=Date.now()+2500;
  (function blast(){
    confetti({particleCount:20,spread:140});
    if(Date.now()<end) requestAnimationFrame(blast);
  })();
};

});
