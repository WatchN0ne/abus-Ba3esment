/* CURSOR */
const cursor=document.querySelector(".cursor");
const trail=document.querySelector(".cursor-trail");

document.addEventListener("mousemove",e=>{
  cursor.style.transform=`translate(${e.clientX}px,${e.clientY}px)`;
  trail.style.transform=`translate(${e.clientX-8}px,${e.clientY-8}px)`;
});

/* SCROLL REVEAL */
const reveals=document.querySelectorAll(".reveal");
function revealOnScroll(){
  reveals.forEach(el=>{
    if(el.getBoundingClientRect().top<innerHeight-120){
      el.classList.add("show");
    }
  });
}
addEventListener("scroll",revealOnScroll);
revealOnScroll();

/* HERO PARALLAX */
const hero=document.querySelector(".hero");
if(matchMedia("(hover:hover)").matches){
  hero.addEventListener("mousemove",e=>{
    const x=(e.clientX/innerWidth-.5)*30;
    const y=(e.clientY/innerHeight-.5)*30;
    hero.style.backgroundPosition=
      `calc(50% + ${x}px) calc(50% + ${y}px)`;
  });
}

/* EASTER EGG */
let keys=[];
const konami="ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba";
addEventListener("keydown",e=>{
  keys.push(e.key);
  if(keys.join("").includes(konami)){
    alert("DEDSEC // ACCESS GRANTED");
    keys=[];
  }
});
