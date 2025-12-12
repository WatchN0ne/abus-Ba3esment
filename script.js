/* MATRIX */
const c = document.getElementById("matrix");
const ctx = c.getContext("2d");
function resize(){ c.width=innerWidth; c.height=innerHeight }
resize(); addEventListener("resize",resize);

let chars="01", font=16;
let cols=()=>Math.floor(c.width/font);
let drops=Array.from({length:cols()},()=>1);

setInterval(()=>{
  ctx.fillStyle="rgba(0,0,0,0.08)";
  ctx.fillRect(0,0,c.width,c.height);
  ctx.fillStyle="#00ffee";
  ctx.font=font+"px monospace";
  drops.forEach((y,x)=>{
    ctx.fillText(chars[Math.random()*2|0],x*font,y*font);
    if(y*font>c.height&&Math.random()>0.97)drops[x]=0;
    drops[x]++;
  });
},40);

/* DECODE HERO */
document.querySelectorAll(".decode").forEach(el=>{
  let t=el.dataset.text, i=0;
  let chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  function run(){
    el.innerText=t.split("").map((c,x)=>x<i?c:chars[Math.random()*chars.length|0]).join("");
    if(i<t.length){i+=0.15;requestAnimationFrame(run);}
  }
  setTimeout(run,800);
});

/* TYPE TITLES */
document.querySelectorAll(".type-title").forEach(title=>{
  const text=title.dataset.text;
  let i=0, started=false;

  function type(){
    if(i<=text.length){
      title.innerText=text.slice(0,i);
      i++; setTimeout(type,70);
    }
  }

  window.addEventListener("scroll",()=>{
    if(started) return;
    if(title.getBoundingClientRect().top < innerHeight-120){
      started=true; type();
    }
  });
});

/* SMOOTH SCROLL */
document.querySelectorAll("[data-link]").forEach(a=>{
  a.onclick=e=>{
    e.preventDefault();
    document.querySelector(a.getAttribute("href"))
      .scrollIntoView({behavior:"smooth"});
  };
});

/* MOBILE NAV */
const nav=document.querySelector(".nav-links");
const ham=document.getElementById("hamburger");
if(ham){
  ham.onclick=()=>nav.classList.toggle("show");
}

/* EASTER EGG – LONG PRESS */
let timer;
document.addEventListener("touchstart",()=> {
  timer=setTimeout(()=>document.getElementById("easter").classList.add("show"),3000);
});
document.addEventListener("touchend",()=>clearTimeout(timer));
