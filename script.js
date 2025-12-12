/* CURSOR */
const c=document.querySelector(".cursor");
const t=document.querySelector(".cursor-trail");
addEventListener("mousemove",e=>{
  c.style.transform=`translate(${e.clientX}px,${e.clientY}px)`;
  t.style.transform=`translate(${e.clientX-8}px,${e.clientY-8}px)`;
});

/* SCROLL */
const r=document.querySelectorAll(".reveal");
function scrollReveal(){
  r.forEach(el=>{
    if(el.getBoundingClientRect().top<innerHeight-120){
      el.classList.add("show");
    }
  });
}
addEventListener("scroll",scrollReveal);scrollReveal();

/* PARALLAX */
const hero=document.querySelector(".hero");
if(matchMedia("(hover:hover)").matches){
  hero.addEventListener("mousemove",e=>{
    const x=(e.clientX/innerWidth-.5)*30;
    const y=(e.clientY/innerHeight-.5)*30;
    hero.style.backgroundPosition=
      `calc(50% + ${x}px) calc(50% + ${y}px)`;
  });
}

/* SECRET DARK / LIGHT */
const toggle=document.getElementById("themeToggle");
toggle.addEventListener("click",()=>{
  document.body.classList.toggle("light");
});
