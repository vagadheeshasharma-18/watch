document.addEventListener("DOMContentLoaded",()=>{

const PASSWORD="13022006";
const birthdayDate=new Date("February 13, 2026 00:00:00").getTime();

const lockScreen=document.getElementById("lockScreen");
const mainContent=document.getElementById("mainContent");
const unlockBtn=document.getElementById("unlockBtn");
const passwordInput=document.getElementById("passwordInput");
const errorText=document.getElementById("errorText");

const sections=document.querySelectorAll("section:not(#finalEnd)");
const startBtn=document.getElementById("startBtn");
const nextBtn=document.getElementById("nextBtn");
const nextWrapper=document.getElementById("nextWrapper");

const cake=document.getElementById("cake");
const cakeBox=document.getElementById("cakeBox");
const cakeHint=document.getElementById("cakeHint");
const knife=document.getElementById("knife");

const openFinalBtn=document.getElementById("openFinalBtn");
const finalEnd=document.getElementById("finalEnd");

const music=document.getElementById("bgMusic");
const blastSound=document.getElementById("blastSound");
const dimOverlay=document.getElementById("dimOverlay");
const countdownEl=document.getElementById("countdown");
const floatingContainer=document.getElementById("floating-container");

let index=0;
let musicStarted=false;
let cakeStage=0;

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

  if(!musicStarted){
    music.play();
    musicStarted=true;
  }

  startBtn.style.display="none";
  nextWrapper.classList.remove("hidden");
  sections[index].after(nextWrapper);
  sections[index].scrollIntoView({behavior:"smooth"});
};

/* ➡ Next */
nextBtn.onclick=()=>{
  if(sections[index].id==="cakeSection" && cakeStage<2) return;

  index++;
  if(index<sections.length){
    sections[index].classList.remove("hidden");
    sections[index].after(nextWrapper);
    sections[index].scrollIntoView({behavior:"smooth"});

    if(sections[index].querySelector(".gallery")){
      document.querySelectorAll(".gallery img").forEach((img,i)=>{
        setTimeout(()=>img.classList.add("show"),i*2500);
      });
    }

    if(sections[index].id==="specialMessage"){
      nextWrapper.style.display="none";
    }
  }
};

/* 🎁 Cake Box */
cakeBox.onclick=()=>{
  if(cakeStage!==0) return;
  cakeBox.classList.add("open");
  cake.classList.remove("hidden");
  cakeHint.textContent="Make a wish & tap the cake 🎂";
  cakeStage=1;
};

/* 🔪 Cake Cut */
cake.onclick=()=>{
  if(cakeStage!==1) return;
  cakeStage=2;
  cake.classList.add("cut");
  knife.classList.add("cutting");

  blastSound.play();

  for(let i=0;i<4;i++){
    setTimeout(()=>{
      confetti({
        particleCount:240,
        spread:160,
        origin:{y:0.6}
      });
    },i*350);
  }

  cakeHint.textContent="With all my love 💖";
};

/* 🌸 FINAL MESSAGE */
openFinalBtn.onclick=()=>{
  document.body.style.overflow="hidden";
  dimOverlay.classList.add("active");
  blastSound.play();

  finalEnd.style.display="flex";
  finalEnd.scrollIntoView({behavior:"smooth"});

  const end=Date.now()+3000;
  (function blast(){
    confetti({particleCount:18,spread:140,startVelocity:55});
    if(Date.now()<end) requestAnimationFrame(blast);
  })();

  setTimeout(()=>{
    finalEnd.classList.add("showFinal");
    dimOverlay.classList.remove("active");
    document.body.style.overflow="auto";
  },3000);
};

/* ⏳ Countdown */
setInterval(()=>{
  const diff=birthdayDate-Date.now();
  if(diff<=0){
    countdownEl.textContent="🎉 HAPPY BIRTHDAY 🎂💖";
    return;
  }
  const d=Math.floor(diff/(1000*60*60*24));
  const h=Math.floor((diff/(1000*60*60))%24);
  const m=Math.floor((diff/(1000*60))%60);
  countdownEl.textContent=`${d} Days ${h} Hours ${m} Minutes`;
},1000);

/* 🎈 Floating */
const items=["🎈","💖","✨","💜","🎉"];
setInterval(()=>{
  const s=document.createElement("span");
  s.textContent=items[Math.floor(Math.random()*items.length)];
  s.style.left=Math.random()*100+"vw";
  s.style.fontSize=(Math.random()*24+18)+"px";
  s.style.animationDuration=(Math.random()*8+10)+"s";
  floatingContainer.appendChild(s);
  setTimeout(()=>s.remove(),20000);
},1200);

});
