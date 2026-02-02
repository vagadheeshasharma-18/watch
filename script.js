document.addEventListener("DOMContentLoaded",()=>{

const PASSWORD="13022006";

/* 🔐 Lock screen */
const lockScreen=document.getElementById("lockScreen");
const mainContent=document.getElementById("mainContent");
const unlockBtn=document.getElementById("unlockBtn");
const passwordInput=document.getElementById("passwordInput");
const errorText=document.getElementById("errorText");

/* 🎶 Background music */
const bgMusic=document.getElementById("bgMusic");

/* Sections & navigation */
const sections=[...document.querySelectorAll("section")];
const startBtn=document.getElementById("startBtn");
const nextBtn=document.getElementById("nextBtn");
const nextWrapper=document.getElementById("nextWrapper");

/* 🎵 Special song */
const specialSong=document.getElementById("specialSong");
const songToggleBtn=document.getElementById("songToggleBtn");

/* 🎧 Voice messages */
const voicePlayer=document.getElementById("voicePlayer");
const playBtns=document.querySelectorAll(".playBtn");

/* Final & overlay */
const openFinalBtn=document.getElementById("openFinalBtn");
const finalEnd=document.getElementById("finalEnd");
const dimOverlay=document.getElementById("dimOverlay");

/* Floating particles */
const floatingContainer=document.getElementById("floating-container");

/* 🎂 Cake */
const cutBtn=document.getElementById("cutCakeBtn");
const cakeLeft=document.querySelector(".cake-left");
const cakeRight=document.querySelector(".cake-right");
const cakeName=document.getElementById("cakeName");
const smokes=document.querySelectorAll(".smoke");

/* Fun elements */
const fakeBug=document.getElementById("fakeBug");
const dontClickBtn=document.getElementById("dontClickBtn");
const dontClickMsg=document.getElementById("dontClickMsg");

/* Grandma */
const loveMessageSection=document.getElementById("loveMessageSection");
const toGrandmaBtn=document.getElementById("toGrandmaBtn");
const grandmaSection=document.getElementById("grandmaSection");

let index=0;
let cakeFireworksActive=false;
let currentVoiceBtn=null;

/* 🔐 Unlock */
unlockBtn.onclick=()=>{
  if(passwordInput.value===PASSWORD){

    errorText.classList.add("hidden");

    bgMusic.volume=0.35;
    bgMusic.currentTime=0;
    bgMusic.play().catch(()=>{});

    lockScreen.classList.add("lock-exit");

    setTimeout(()=>{
      lockScreen.style.display="none";
      mainContent.classList.remove("hidden");
      requestAnimationFrame(()=>{
        mainContent.classList.add("main-show");
      });
    },900);

  }else{
    errorText.classList.remove("hidden");
    lockScreen.classList.remove("shake");
    void lockScreen.offsetWidth;
    lockScreen.classList.add("shake");
  }
};

/* ▶ Start — INIT BOOK MODE (FIXED) */
startBtn.onclick=()=>{
  document.body.classList.add("book-mode");

  sections.forEach(sec=>{
    sec.classList.add("hidden","page-hidden");
    sec.classList.remove("page-active","page-exit");
  });

  index=1; // letter page
  const firstPage=sections[index];

  firstPage.classList.remove("hidden","page-hidden");
  firstPage.classList.add("page-active");

  startBtn.style.display="none";
  nextWrapper.classList.remove("hidden");
  firstPage.after(nextWrapper);

  initReveal("letterCard");
};

/* ➡ Next — PAGE TURN (FIXED) */
nextBtn.onclick=()=>{
  const current=sections[index];
  const next=sections[index+1];

  if(!next){
    nextWrapper.style.display="none";
    return;
  }

  current.classList.remove("page-active");
  current.classList.add("page-exit");

  next.classList.remove("hidden","page-hidden","page-exit");
  next.classList.add("page-active");

  index++;

  if(next.id==="imagesSection"){
    const imgs=document.querySelectorAll(".gallery img");
    imgs.forEach(img=>img.classList.remove("show"));

    imgs.forEach((img,i)=>{
      setTimeout(()=>{
        img.scrollIntoView({behavior:"smooth",block:"center"});
        img.classList.add("show");

        if(i===imgs.length-1){
          setTimeout(()=>{
            bgMusic.pause();
            bgMusic.currentTime=0;
          },2000);
        }
      },i*2000);
    });
  }
};

/* 🎵 Special song */
songToggleBtn.onclick=()=>{
  bgMusic.pause();
  voicePlayer.pause();
  resetVoiceButtons();

  if(specialSong.paused){
    specialSong.volume=0.7;
    specialSong.play();
    songToggleBtn.textContent="Pause ⏸️";
  }else{
    specialSong.pause();
    songToggleBtn.textContent="Play ▶️";
  }
};

specialSong.onended=()=>songToggleBtn.textContent="Play ▶️";

/* 🎧 Voice messages */
playBtns.forEach(btn=>{
  btn.onclick=()=>{
    const src=btn.dataset.audio;

    bgMusic.pause();
    specialSong.pause();
    songToggleBtn.textContent="Play ▶️";

    if(currentVoiceBtn===btn && !voicePlayer.paused){
      voicePlayer.pause();
      btn.textContent="Play ▶️";
      btn.parentElement.classList.remove("playing");
      currentVoiceBtn=null;
      return;
    }

    resetVoiceButtons();

    voicePlayer.src=src;
    voicePlayer.volume=0.8;
    voicePlayer.play();

    btn.textContent="Pause ⏸️";
    btn.parentElement.classList.add("playing");
    currentVoiceBtn=btn;
  };
});

voicePlayer.onended=resetVoiceButtons;

function resetVoiceButtons(){
  playBtns.forEach(b=>{
    b.textContent="Play ▶️";
    b.parentElement.classList.remove("playing");
  });
  currentVoiceBtn=null;
}

/* 🎂 Cut Cake */
cutBtn.onclick=()=>{
  cakeLeft.classList.add("cut-left");
  cakeRight.classList.add("cut-right");
  cakeName.classList.add("glow");

  smokes.forEach((s,i)=>setTimeout(()=>s.classList.add("show"),i*200));

  cakeFireworksActive=true;
  const end=Date.now()+3500;

  (function blast(){
    if(!cakeFireworksActive) return;
    confetti({particleCount:120,spread:180,startVelocity:70,origin:{y:0.6}});
    if(Date.now()<end) requestAnimationFrame(blast);
  })();

  fakeBug.classList.remove("hidden");
  setTimeout(()=>fakeBug.classList.add("hidden"),2600);
  setTimeout(()=>dontClickBtn.classList.remove("hidden"),2800);

  setTimeout(()=>{
    loveMessageSection.classList.remove("hidden");
    loveMessageSection.classList.add("show");
  },4200);
};

/* 😈 Don't click */
dontClickBtn.onclick=()=>{
  dontClickBtn.classList.add("hidden");
  dontClickMsg.classList.remove("hidden");
};

/* 💌 Grandma */
toGrandmaBtn.onclick=()=>{
  cakeFireworksActive=false;
  grandmaSection.classList.remove("hidden");
  grandmaSection.scrollIntoView({behavior:"smooth"});
  initReveal("grandmaCard");
};

/* 🌟 Final message */
openFinalBtn.onclick=()=>{
  document.body.style.overflow="hidden";
  dimOverlay.classList.add("active");
  finalEnd.classList.remove("hidden");

  const end=Date.now()+3500;
  (function blast(){
    confetti({particleCount:90,spread:180,startVelocity:65,origin:{y:0.6}});
    if(Date.now()<end) requestAnimationFrame(blast);
  })();

  setTimeout(()=>{
    finalEnd.classList.add("showFinal");
    dimOverlay.classList.remove("active");
    document.body.style.overflow="auto";
  },3000);
};

/* ✍️ Reveal text */
function initReveal(cardId){
  const card=document.getElementById(cardId);
  if(!card || card.dataset.revealed) return;

  card.dataset.revealed="true";
  const caret=card.querySelector(".caret");
  const content=card.querySelector(".text-content");
  const blocks=content.innerHTML.split("<br><br>");
  content.innerHTML="";

  setTimeout(()=>caret && caret.remove(),2000);

  blocks.forEach((block,i)=>{
    const line=document.createElement("div");
    line.className="reveal-line";
    line.innerHTML=block;
    content.appendChild(line);
    setTimeout(()=>line.classList.add("show"),2200+i*700);
  });
}

/* ✨ Floating particles */
const particles=["💖","🎈","✨","💜","🎉"];
setInterval(()=>{
  const p=document.createElement("span");
  p.textContent=particles[Math.floor(Math.random()*particles.length)];
  p.style.left=Math.random()*100+"vw";
  p.style.fontSize=(Math.random()*22+16)+"px";
  p.style.animationDuration=(Math.random()*10+12)+"s";
  floatingContainer.appendChild(p);
  setTimeout(()=>p.remove(),20000);
},900);

});
