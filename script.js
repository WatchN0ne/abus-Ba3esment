/* SCROLL REVEAL */
const reveals = document.querySelectorAll(".reveal");
function revealOnScroll(){
  reveals.forEach(el=>{
    if(el.getBoundingClientRect().top < innerHeight - 120){
      el.classList.add("show");
    }
  });
}
addEventListener("scroll", revealOnScroll);
revealOnScroll();

/* HERO MOUSE PARALLAX */
const hero = document.querySelector(".hero");
if(window.matchMedia("(hover:hover)").matches){
  hero.addEventListener("mousemove", e=>{
    const x=(e.clientX/innerWidth-.5)*30;
    const y=(e.clientY/innerHeight-.5)*30;
    hero.style.backgroundPosition=`calc(50% + ${x}px) calc(50% + ${y}px)`;
  });
}
