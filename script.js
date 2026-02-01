document.addEventListener("DOMContentLoaded",()=>{

const PASSWORD="13022006";
const birthdayDate=new Date("February 13, 2026 00:00:00").getTime();

const lockScreen=document.getElementById("lockScreen");
const mainContent=document.getElementById("mainContent");
const unlockBtn=document.getElementById("unlockBtn");
const passwordInput=document.getElementById("passwordInput");
const errorText=document.getElementById("errorText");

const sections=document.querySelectorAll("section");
const startBtn=document.getElementById("startBtn");
const nextBtn=document.getElementById("nextBtn");
const nextWrapper=document.getElementById("nextWrapper");

const openFinalBtn=document.getElementById("openFinalBtn");
const finalEnd=document.getElementById("finalEnd");

const music=document.getElementById("bgMusic");
const countdownEl=document.getElementById("countdown");
const floatingContainer=document.getElementById("floating-container");

let index=0;
let musicStarted=false;

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
  index++;
  if(index<sections.length){
    sections[index].classList.remove("hidden");
    sections[index].after(nextWrapper);
    sections[index].scrollIntoView({behavior:"smooth"});

    if(sections[index].querySelector(".gallery")){
      const imgs=document.querySelectorAll(".gallery img");
      imgs.forEach((img,i)=>{
        setTimeout(()=>img.classList.add("show"),i*2500);
      });
    }

    /* stop Next button after special message */
    if(sections[index].id==="specialMessage"){
      nextWrapper.style.display="none";
    }

  }
};

/* 🌸 Open Final Message */
openFinalBtn.onclick=()=>{
  finalEnd.classList.remove("hidden");
  finalEnd.scrollIntoView({behavior:"smooth"});

  setTimeout(()=>{
    confetti({
      particleCount:180,
      spread:90,
      startVelocity:45,
      gravity:0.8,
      ticks:300,
      colors:["#ffffff","#ffd6ff","#cdb4ff"]
    });
  },500);
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

/* 🎈 Floating magic */
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
