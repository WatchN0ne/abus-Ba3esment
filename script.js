/* MATRIX */
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

let font = 16;
let chars = "01";
let cols = () => Math.floor(canvas.width / font);
let drops = Array.from({ length: cols() }, () => 1);

setInterval(() => {
  ctx.fillStyle = "rgba(0,0,0,0.08)";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "#00ffee";
  ctx.font = font + "px monospace";
  drops.forEach((y,x)=>{
    ctx.fillText(chars[Math.random()*2|0], x*font, y*font);
    if(y*font > canvas.height && Math.random() > 0.97) drops[x]=0;
    drops[x]++;
  });
}, 40);

/* HERO DECODE */
document.querySelectorAll(".decode").forEach(el=>{
  const text = el.dataset.text;
  const rand = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let i = 0;
  function run(){
    el.innerText = text.split("")
      .map((c,x)=> x<i ? c : rand[Math.random()*rand.length|0])
      .join("");
    if(i < text.length){ i+=0.2; requestAnimationFrame(run); }
  }
  setTimeout(run,600);
});

/* TYPEWRITER */
document.querySelectorAll(".typewriter").forEach(el=>{
  const text = el.dataset.text;
  let i = 0, started=false;
  function type(){
    if(i<=text.length){
      el.innerText=text.slice(0,i);
      i++; setTimeout(type,80);
    }
  }
  addEventListener("scroll",()=>{
    if(started) return;
    if(el.getBoundingClientRect().top < innerHeight-120){
      started=true; type();
    }
  });
});

/* REVEAL */
const reveal = () => {
  document.querySelectorAll(".reveal").forEach(el=>{
    if(el.getBoundingClientRect().top < innerHeight-100){
      el.classList.add("show");
    }
  });
};
addEventListener("scroll", reveal);
reveal();

/* HERO PARALLAX (Desktop) */
const heroBox = document.querySelector(".hero-box");
addEventListener("mousemove", e=>{
  if(innerWidth < 900 || !heroBox) return;
  const x = (e.clientX / innerWidth - 0.5) * 10;
  const y = (e.clientY / innerHeight - 0.5) * 10;
  heroBox.style.transform = `translate(${x}px, ${y}px)`;
});

/* NAVBAR ACTIVE + PROGRESS */
const sections = document.querySelectorAll("section");
const links = document.querySelectorAll(".nav-link");
const progress = document.querySelector(".scroll-progress");

addEventListener("scroll", ()=>{
  const scrollTop = scrollY;
  const height = document.body.scrollHeight - innerHeight;
  progress.style.width = (scrollTop / height) * 100 + "%";

  sections.forEach(sec=>{
    const top = sec.offsetTop - 120;
    const bottom = top + sec.offsetHeight;
    if(scrollTop >= top && scrollTop < bottom){
      links.forEach(l=>l.classList.remove("active"));
      const active = document.querySelector(`.nav-link[href="#${sec.id}"]`);
      if(active) active.classList.add("active");
    }
  });
});

/* MOBILE NAV */
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
burger.onclick = () => nav.classList.toggle("show");

document.querySelectorAll(".nav-link").forEach(a=>{
  a.onclick = e=>{
    e.preventDefault();
    document.querySelector(a.getAttribute("href"))
      .scrollIntoView({behavior:"smooth"});
    nav.classList.remove("show");
  };
});
