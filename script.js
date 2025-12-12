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
let drops = Array.from({ length: Math.floor(innerWidth / font) }, () => 1);

setInterval(() => {
  ctx.fillStyle = "rgba(0,0,0,0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#00ffee";
  ctx.font = font + "px monospace";
  drops.forEach((y, x) => {
    ctx.fillText("01"[Math.random() * 2 | 0], x * font, y * font);
    if (y * font > canvas.height && Math.random() > 0.97) drops[x] = 0;
    drops[x]++;
  });
}, 50);

/* REVEAL ON SCROLL */
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach(el => {
    if (el.getBoundingClientRect().top < innerHeight - 100) {
      el.classList.add("show");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();
