/* ============= MATRIX RAIN ============= */
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

function resizeMatrix() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeMatrix();
window.addEventListener("resize", resizeMatrix);

let chars = "01";
chars = chars.split("");

let fontSize = 16;
let columns = () => Math.floor(canvas.width / fontSize);
let drops = [];

function initDrops() {
  drops = Array.from({ length: columns() }, () => 1);
}
initDrops();

function draw() {
  ctx.fillStyle = "rgba(0,0,0,0.08)";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  ctx.fillStyle = "#00ffee";
  ctx.font = fontSize + "px monospace";

  drops.forEach((y, x) => {
    const text = chars[Math.floor(Math.random()*chars.length)];
    ctx.fillText(text, x * fontSize, y * fontSize);

    if (y * fontSize > canvas.height && Math.random() > 0.975) drops[x] = 0;
    drops[x]++;
  });
}
setInterval(draw, 40);

/* ============= DECODE EFFECT ============= */
document.querySelectorAll(".decode").forEach(el => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const original = el.dataset.text || el.innerText;
  let i = 0;

  function animate() {
    el.innerText = original.split("")
      .map((c, idx) => idx < i ? original[idx] : letters[Math.floor(Math.random()*letters.length)])
      .join("");

    if (i < original.length) {
      i += 0.12;
      requestAnimationFrame(animate);
    }
  }

  setTimeout(animate, 900);
});

/* ============= SMOOTH SCROLL ============= */
document.querySelectorAll("[data-link]").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    const offset = 80;

    window.scrollTo({
      top: target.offsetTop - offset,
      behavior: "smooth"
    });
  });
});

/* ============= REVEAL ON SCROLL ============= */
function handleReveal() {
  document.querySelectorAll(".reveal").forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("show");
    }
  });
}
window.addEventListener("scroll", handleReveal);
window.addEventListener("load", handleReveal);

/* ============= HERO PARALLAX (DESKTOP) ============= */
const hero = document.querySelector(".hero");
if (hero) {
  document.addEventListener("mousemove", e => {
    if (window.innerWidth < 900) return; // nur Desktop
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    hero.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
  });
}

/* ============= 3D TILT CARDS ============= */
document.querySelectorAll(".tilt").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 6; // Grenze
    const rotateY = ((x - centerX) / centerX) * -6;
    card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

/* ============= TERMINAL KONSOLE ============= */
const termInput = document.getElementById("terminal-input");
const termOutput = document.getElementById("terminal-output");

if (termInput && termOutput) {
  const printLine = (text) => {
    const div = document.createElement("div");
    div.className = "line";
    div.innerHTML = text;
    termOutput.appendChild(div);
    termOutput.scrollTop = termOutput.scrollHeight;
  };

  const commands = {
    help: () => {
      printLine("available commands:");
      printLine("- <span class='cmd'>help</span>");
      printLine("- <span class='cmd'>about</span>");
      printLine("- <span class='cmd'>projects</span>");
      printLine("- <span class='cmd'>clear</span>");
      printLine("- <span class='cmd'>dedsec</span>");
    },
    about: () => {
      printLine("you: aspiring web dev, building futuristic experiences.");
    },
    projects: () => {
      printLine("check the projects section above for more visuals.");
    },
    clear: () => {
      termOutput.innerHTML = "";
    },
    dedsec: () => {
      printLine("DEDSEC protocol engaged. stay vigilant.");
    }
  };

  termInput.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      const value = termInput.value.trim();
      if (!value) return;
      printLine("&gt; " + value);
      const cmd = value.toLowerCase();
      if (commands[cmd]) {
        commands[cmd]();
      } else {
        printLine("unknown command. type <span class='cmd'>help</span>.");
      }
      termInput.value = "";
    }
  });
}

/* ============= KONAMI CODE EASTER EGG ============= */
const breach = document.getElementById("breach-overlay");
const konami = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
let buffer = [];

window.addEventListener("keydown", e => {
  buffer.push(e.key);
  if (buffer.length > konami.length) buffer.shift();

  if (konami.every((k, i) => k === buffer[i])) {
    if (breach) {
      breach.classList.add("show");
      setTimeout(() => {
        breach.classList.remove("show");
      }, 3500);
    }
    buffer = [];
  }
});

/* ============= MOBILE NAV ============= */
const mobNav = document.querySelector(".nav-links");
const burger = document.getElementById("hamburger");

if (burger && mobNav) {
  burger.addEventListener("click", () => {
    mobNav.classList.toggle("show");
    burger.classList.toggle("active");
  });

  document.querySelectorAll(".nav-links a").forEach(a => {
    a.addEventListener("click", () => {
      mobNav.classList.remove("show");
      burger.classList.remove("active");
    });
  });
}
