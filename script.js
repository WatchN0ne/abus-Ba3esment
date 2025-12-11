/* MATRIX RAIN */
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let chars = "01";
chars = chars.split("");

let fontSize = 16;
let columns = canvas.width / fontSize;

let drops = [];
for (let i = 0; i < columns; i++) drops[i] = 1;

function draw() {
    ctx.fillStyle = "rgba(0,0,0,0.07)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "#00ffee";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        let text = chars[Math.floor(Math.random()*chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;

        drops[i]++;
    }
}
setInterval(draw, 40);


/* DECODE EFFECT */
document.querySelectorAll(".decode").forEach(title => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const original = title.dataset.text;
    let iteration = 0;

    function animate() {
        title.innerText = original.split("")
            .map((char, i) => (i < iteration ? original[i] : letters[Math.floor(Math.random()*letters.length)]))
            .join("");

        if (iteration < original.length) {
            iteration += 0.15;
            requestAnimationFrame(animate);
        }
    }

    setTimeout(animate, 800); 
});


/* SCROLL REVEAL */
window.addEventListener("scroll", () => {
    document.querySelectorAll(".reveal").forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 120) el.classList.add("show");
    });
});
