document.addEventListener("DOMContentLoaded",()=> {
 const menu=document.getElementById("menu"),nav=document.getElementById("navLinks");
 if(menu&&nav){menu.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(open));});nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menu.setAttribute("aria-expanded","false");}));}
 const progress=document.getElementById("progress");
 const update=()=>{if(!progress)return;const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?scrollY/max*100:0)+"%";};
 addEventListener("scroll",update,{passive:true});update();
 const items=document.querySelectorAll(".skill,.project,.timeline-item,.section-head,.about .split>div:last-child");
 if("IntersectionObserver"in window){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target);}}),{threshold:.12});items.forEach(el=>{el.classList.add("reveal");observer.observe(el);});}
 const sections=document.querySelectorAll("main section[id]"),links=document.querySelectorAll(".nav-links a[href^='#']");
 if("IntersectionObserver"in window){const navObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+e.target.id));}),{rootMargin:"-35% 0px -55% 0px"});sections.forEach(s=>navObserver.observe(s));}
 const year=document.getElementById("year");if(year)year.textContent=new Date().getFullYear();
});