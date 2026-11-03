const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.top-links');
if(toggle&&nav){
  toggle.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded',String(open));
  });
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');
  }));
}
const sections=[...document.querySelectorAll('main section[id]')];
const dockLinks=[...document.querySelectorAll('.dock-item')];
function setActive(id){dockLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')==='#'+id));}
if('IntersectionObserver'in window){
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{if(entry.isIntersecting)setActive(entry.target.id);});
  },{rootMargin:'-35% 0px -55% 0px'});
  sections.forEach(section=>observer.observe(section));
  const revealObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target);}});
  },{threshold:.12});
  document.querySelectorAll('.section-heading,.project-card,.experience-card,.toolkit-grid article,.about-copy,.about-image').forEach(el=>{
    el.classList.add('reveal-on-scroll');revealObserver.observe(el);
  });
}
document.querySelectorAll('.dock-item').forEach(link=>{
  link.addEventListener('click',()=>setActive((link.getAttribute('href')||'#home').slice(1)));
});
document.querySelectorAll('.project-card').forEach(card=>{
  card.addEventListener('mouseenter',()=>card.classList.add('is-hovered'));
  card.addEventListener('mouseleave',()=>card.classList.remove('is-hovered'));
});
