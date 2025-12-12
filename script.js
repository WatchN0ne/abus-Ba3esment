/* MATRIX */
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");
canvas.width=innerWidth; canvas.height=innerHeight;

let font=16;
let drops=Array.from({length:Math.floor(innerWidth/font)},()=>1);

setInterval(()=>{
  ctx.fillStyle="rgba(0,0,0,0.08)";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle="#00ffee";
  ctx.font=font+"px monospace";
  drops.forEach((y,x)=>{
    ctx.fillText("01"[Math.random()*2|0],x*font,y*font);
    if(y*font>canvas.height && Math.random()>0.97) drops[x]=0;
    drops[x]++;
  });
},40);

/* REVEAL */
const reveals=document.querySelectorAll(".reveal");
function reveal(){
  reveals.forEach(el=>{
    if(el.getBoundingClientRect().top < innerHeight-100){
      el.classList.add("show");
    }
  });
}
addEventListener("scroll",reveal);
reveal();

/* NAV */
const links=document.querySelectorAll(".nav-link");
const indicator=document.querySelector(".nav-indicator");
const sections=document.querySelectorAll("section");

function updateNav(){
  let current="";
  sections.forEach(sec=>{
    if(scrollY>=sec.offsetTop-120) current=sec.id;
  });

  links.forEach(link=>{
    link.classList.remove("active");
    if(link.getAttribute("href")==="#"+current){
      link.classList.add("active");
      const r=link.getBoundingClientRect();
      const p=link.parentElement.getBoundingClientRect();
      indicator.style.width=r.width+"px";
      indicator.style.left=r.left-p.left+"px";
    }
  });
}
addEventListener("scroll",updateNav);
updateNav();

/* MOBILE */
const burger=document.getElementById("burger");
const nav=document.getElementById("nav");
burger.onclick=()=>nav.classList.toggle("show");
