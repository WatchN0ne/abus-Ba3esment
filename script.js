/* MATRIX */
const c = document.getElementById("matrix");
const ctx = c.getContext("2d");

function resize() {
  c.width = innerWidth;
  c.height = innerHeight;
}
resize();
addEventListener("resize", resize);

let letters = "01";
let font = 16;
let cols = () => Math.floor(c.width / font);
let drops = Array.from({ length: cols() }, () => 1);

setInterval(() => {
  ctx.fillStyle = "rgba(0,0,0,0.08)";
  ctx.fillRect(0,0,c.width,c.height);
  ctx.fillStyle = "#00ffee";
  ctx.font = font + "px monospace";
  drops.forEach((y,x)=>{
    ctx.fillText(letters[Math.random()*2|0],x*font,y*font);
    if(y*font > c.height && Math.random() > 0.98) drops[x] = 0;
    drops[x]++;
  });
}, 40);

/* DECODE HERO */
document.querySelectorAll(".decode").forEach(el=>{
  const text = el.dataset.text;
  let i = 0;
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  function run(){
    el.innerText = text.split("")
      .map((c,x)=> x<i ? c : chars[Math.random()*chars.length|0])
      .join("");
    if(i < text.length){ i+=0.2; requestAnimationFrame(run); }
  }
  setTimeout(run,600);
});

/* TYPEWRITER (KLARER TEXT) */
document.querySelectorAll(".typewriter").forEach(el=>{
  const text = el.dataset.text;
  let i = 0;
  let started = false;

  function type(){
    if(i <= text.length){
      el.innerText = text.slice(0,i);
      i++;
      setTimeout(type,80);
    }
  }

  window.addEventListener("scroll",()=>{
    if(started) return;
    if(el.getBoundingClientRect().top < innerHeight - 120){
      started = true;
      type();
    }
  });
});

/* REVEAL */
const reveal = () => {
  document.querySelectorAll(".reveal").forEach(el=>{
    if(el.getBoundingClientRect().top < innerHeight - 100){
      el.classList.add("show");
    }
  });
};
addEventListener("scroll", reveal);
reveal();

/* SMOOTH NAV */
document.querySelectorAll(".nav-links a").forEach(a=>{
  a.onclick = e => {
    e.preventDefault();
    document.querySelector(a.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
    nav.classList.remove("show");
  };
});

/* MOBILE NAV */
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");

burger.onclick = () => nav.classList.toggle("show");
