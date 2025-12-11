/* MATRIX CODE */
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let chars = "01";
chars = chars.split("");

let fontSize = 16;
let columns = canvas.width / fontSize;

let drops = Array.from({length: columns}, () => 1);

function draw() {
    ctx.fillStyle = "rgba(0,0,0,0.08)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "#00ffee";
    ctx.font = fontSize + "px monospace";

    drops.forEach((y, x)=>{
        const text = chars[Math.floor(Math.random()*chars.length)];
        ctx.fillText(text, x * fontSize, y * fontSize);

        if(y * fontSize > canvas.height && Math.random() > 0.975) drops[x] = 0;
        drops[x]++;
    });
}
setInterval(draw, 40);

/* DECODE EFFECT */
document.querySelectorAll(".decode").forEach(el => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const original = el.dataset.text;
    let i = 0;

    function animate() {
        el.innerText = original.split("")
        .map((c, idx)=> idx < i ? c : letters[Math.floor(Math.random()*letters.length)])
        .join("");

        if (i < original.length) {
            i += 0.12;
            requestAnimationFrame(animate);
        }
    }
    setTimeout(animate, 900);
});

/* SMOOTH SCROLL (funktioniert überall, butterweich!)*/
document.querySelectorAll("[data-link]").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    const offset = 80;

    window.scrollTo({
      top: target.offsetTop - offset,
      behavior: "smooth"
    });
  });
});

/* REVEAL */
window.addEventListener("scroll", () => {
  document.querySelectorAll(".reveal").forEach(el => {
    if(el.getBoundingClientRect().top < window.innerHeight - 100){
      el.classList.add("show");
    }
  });
});

/* PARALLAX HERO */
document.addEventListener("mousemove", e => {
  const hero = document.querySelector(".hero");
  hero.style.backgroundPosition = `${50 + (e.clientX - window.innerWidth/2)/80}% 
                                   ${50 + (e.clientY - window.innerHeight/2)/80}%`;
});
