/* MATRIX */
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let letters = "01";
let fontSize = 16;
let columns = () => Math.floor(canvas.width / fontSize);
let drops = [];

function initDrops() {
  drops = Array.from({ length: columns() }, () => 1);
}
initDrops();

setInterval(() => {
  ctx.fillStyle = "rgba(0,0,0,0.08)";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  ctx.fillStyle = "#00ffee";
  ctx.font = fontSize + "px monospace";

  drops.forEach((y,x) => {
    ctx.fillText(letters[Math.random()*2|0], x*fontSize, y*fontSize);
    if (y*fontSize > canvas.height && Math.random() > 0.97) drops[x] = 0;
    drops[x]++;
  });
}, 40);

/* DECODE HERO */
document.querySelectorAll(".decode").forEach(el => {
  const text = el.dataset.text;
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let i = 0;

  function animate() {
    el.innerText = text.split("")
      .map((c, idx) => idx < i ? c : chars[Math.random()*chars.length|0])
      .join("");

    if (i < text.length) {
      i += 0.2;
      requestAnimationFrame(animate);
    }
  }
  setTimeout(animate, 600);
});

/* TYPEWRITER */
document.querySelectorAll(".typewriter").forEach(el => {
  const text = el.dataset.text;
  let i = 0;
  let started = false;

  function type() {
    if (i <= text.length) {
      el.innerText = text.slice(0, i);
      i++;
      setTimeout(type, 80);
    }
  }

  window.addEventListener("scroll", () => {
    if (started) return;
    if (el.getBoundingClientRect().top < window.innerHeight - 120) {
      started = true;
      type();
    }
  });
});

/* REVEAL */
function reveal() {
  document.querySelectorAll(".reveal").forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add("show");
    }
  });
}
window.addEventListener("scroll", reveal);
reveal();

/* SMOOTH NAV + MOBILE */
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");

burger.addEventListener("click", () => {
  nav.classList.toggle("show");
});

document.querySelectorAll(".nav-links a").forEach(a => {
  a.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(a.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
    nav.classList.remove("show");
  });
});
