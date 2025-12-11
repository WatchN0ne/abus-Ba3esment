/* ================= MATRIX ANIMATION ================= */
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let letters = "01";
letters = letters.split("");

let fontSize = 16;
let columns = canvas.width / fontSize;

let drops = [];
for (let x = 0; x < columns; x++) drops[x] = 1;

function draw() {
    ctx.fillStyle = "rgba(0,0,0,0.07)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "#00ffee";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        let text = letters[Math.floor(Math.random()*letters.length)];
        ctx.fillText(text, i*fontSize, drops[i]*fontSize);

        if (drops[i]*fontSize > canvas.height && Math.random() > 0.975)
            drops[i] = 0;

        drops[i]++;
    }
}

setInterval(draw, 40);

/* ================= DECODE EFFECT ================= */
document.querySelectorAll(".decode").forEach((el) => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let original = el.dataset.text;
    let iteration = 0;

    function decode() {
        el.innerText = original.split("")
            .map((char, idx) => {
                if (idx < iteration) return original[idx];
                return letters[Math.floor(Math.random() * letters.length)];
            })
            .join("");

        if (iteration < original.length) {
            iteration += 0.05;
            requestAnimationFrame(decode);
        }
    }

    setTimeout(decode, 400);
});

/* ================= HAMBURGER MENU ================= */
const burger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav-links");

burger.addEventListener("click", () => {
    nav.classList.toggle("show");
});

/* ================= REVEAL ON SCROLL ================= */
window.addEventListener("scroll", () => {
    document.querySelectorAll(".reveal").forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 120) {
            el.classList.add("show");
        }
    });
});

/* ================= GSAP HERO PARALLAX ================= */
gsap.to(".hero", {
    backgroundPosition: "center 20%",
    ease: "none",
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        scrub: 1
    }
});


