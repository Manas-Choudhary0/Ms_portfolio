/* ═══════════════════════════════════════
   MANAS CHOUDHARY PORTFOLIO - SCRIPT.JS
═══════════════════════════════════════ */

'use strict';

/* ─── STATE ─────────────────────────────────────── */
const sections  = ['home','about','education','skills','achievements','contact'];
const sectionLabels = {
  home:'HOME', about:'ABOUT ME', education:'EDUCATION',
  skills:'SKILLS', achievements:'ACHIEVEMENTS', contact:'CONTACT'
};
let current = 'home';
let isAnimating = false;
let wheelAccum = 0;
let lastWheel = 0;
let touchStartY = 0;
let touchStartX = 0;

/* ─── ELEMENTS ───────────────────────────────────── */
const overlay      = document.getElementById('transitionOverlay');
const carSweep     = document.getElementById('carSweep');
const transText    = document.getElementById('transitionText');
const particleBurst= document.getElementById('particleBurst');
const bgCanvas     = document.getElementById('bgCanvas');
const typedRole    = document.getElementById('typedRole');
const floatingCode = document.getElementById('floatingCode');

/* ─── TYPING EFFECT ─────────────────────────────── */
const roles = [
  'CSE Student @ JECRC',
  'Aspiring Developer',
  'AI Enthusiast',
  'Bug Creator & Fixer',
  'Chess Champion ♟',
  'Code Explorer'
];
let roleIdx = 0, charIdx = 0, deleting = false;
function typeRole(){
  if(!typedRole) return;
  const role = roles[roleIdx];
  if(deleting){
    charIdx--;
    typedRole.textContent = role.substring(0, charIdx);
    if(charIdx === 0){ deleting = false; roleIdx = (roleIdx+1)%roles.length; setTimeout(typeRole,500); return; }
    setTimeout(typeRole, 60);
  } else {
    charIdx++;
    typedRole.textContent = role.substring(0, charIdx);
    if(charIdx === role.length){ setTimeout(()=>{ deleting=true; typeRole(); }, 2000); return; }
    setTimeout(typeRole, 100);
  }
}
setTimeout(typeRole, 800);

/* ─── FLOATING CODE ─────────────────────────────── */
const codeSnippets = [
  'int main(){','  printf("hello");','}','#include<stdio.h>',
  'for(i=0;i<n;i++)','while(true){','return 0;','void init(){',
  'struct Node{','malloc(sizeof(int));','git commit -m "fix"',
  'npm run dev','console.log(me);','AI.learn()','if(coffee>0){',
  'deploy.sh --prod','git push origin main','<div class="hero">',
  'const ai = new AI();','import numpy as np','model.fit(X,y)'
];
function createCodeSnippets(){
  if(!floatingCode) return;
  floatingCode.innerHTML='';
  for(let i=0;i<15;i++){
    const el=document.createElement('div');
    el.className='code-snippet';
    el.textContent=codeSnippets[Math.floor(Math.random()*codeSnippets.length)];
    el.style.left = Math.random()*90+'%';
    el.style.animationDuration = (15+Math.random()*20)+'s';
    el.style.animationDelay = (Math.random()*20)+'s';
    el.style.fontSize = (0.6+Math.random()*0.4)+'rem';
    floatingCode.appendChild(el);
  }
}
createCodeSnippets();

/* ─── BACKGROUND CANVAS ─────────────────────────── */
const ctx = bgCanvas.getContext('2d');
let W,H,stars=[];
function resize(){ W=bgCanvas.width=window.innerWidth; H=bgCanvas.height=window.innerHeight; initStars(); }
function initStars(){
  stars=[];
  for(let i=0;i<120;i++) stars.push({
    x:Math.random()*W, y:Math.random()*H,
    r:Math.random()*1.5+0.3,
    a:Math.random(), da:(Math.random()-0.5)*0.01,
    color:['#00f5ff','#7b2fff','#ff00aa','#00ff88'][Math.floor(Math.random()*4)]
  });
}
function drawBg(){
  ctx.clearRect(0,0,W,H);
  stars.forEach(s=>{
    s.a += s.da;
    if(s.a<=0||s.a>=1) s.da*=-1;
    ctx.beginPath();
    ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
    ctx.fillStyle=s.color;
    ctx.globalAlpha=s.a*0.8;
    ctx.fill();
  });
  ctx.globalAlpha=1;
  requestAnimationFrame(drawBg);
}
window.addEventListener('resize',resize);
resize(); drawBg();

/* ─── PARTICLES ─────────────────────────────────── */
function spawnParticles(count=30){
  for(let i=0;i<count;i++){
    const p=document.createElement('div');
    p.className='particle';
    const colors=['#00f5ff','#ff00aa','#7b2fff','#00ff88','#ffe600'];
    p.style.cssText=`
      left:${30+Math.random()*40}%;
      top:${30+Math.random()*40}%;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      box-shadow:0 0 6px ${colors[Math.floor(Math.random()*colors.length)]};
      --tx:${(Math.random()-0.5)*300}px;
      --ty:${(Math.random()-0.5)*300}px;
      --dur:${0.6+Math.random()*0.8}s;
    `;
    particleBurst.appendChild(p);
    setTimeout(()=>p.remove(),1500);
  }
}

/* ─── SUPERCAR SVG for overlay sweep ────────────── */
function buildCarSVG(color){
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 200" width="500" height="200">
    <ellipse cx="120" cy="160" rx="50" ry="30" fill="none" stroke="${color}" stroke-width="4"/>
    <ellipse cx="380" cy="160" rx="50" ry="30" fill="none" stroke="${color}" stroke-width="4"/>
    <path d="M60 160 Q70 80 200 60 Q280 40 350 60 Q420 70 440 160" fill="none" stroke="${color}" stroke-width="4"/>
    <path d="M200 60 Q220 20 300 20 Q360 20 380 60" fill="none" stroke="${color}" stroke-width="3"/>
    <path d="M60 160 L440 160" stroke="${color}" stroke-width="2.5"/>
    <line x1="100" y1="100" x2="130" y2="70" stroke="${color}" stroke-width="2"/>
    <line x1="350" y1="70" x2="390" y2="90" stroke="${color}" stroke-width="2"/>
    <rect x="140" y="55" width="80" height="30" rx="4" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.5"/>
    <rect x="250" y="50" width="70" height="28" rx="4" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.5"/>
  </svg>`;
}

function buildBikeSVG(color){
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 160" width="300" height="160">
    <circle cx="60" cy="120" r="35" fill="none" stroke="${color}" stroke-width="4"/>
    <circle cx="240" cy="120" r="35" fill="none" stroke="${color}" stroke-width="4"/>
    <path d="M60 120 L100 60 L180 50 L240 120" fill="none" stroke="${color}" stroke-width="4"/>
    <path d="M100 60 L160 40 L200 60 L180 50" fill="none" stroke="${color}" stroke-width="3"/>
    <path d="M60 120 L80 70" stroke="${color}" stroke-width="3"/>
    <circle cx="150" cy="80" r="10" fill="none" stroke="${color}" stroke-width="2.5"/>
    <line x1="230" y1="70" x2="250" y2="55" stroke="${color}" stroke-width="2.5"/>
  </svg>`;
}

/* ─── TRANSITION ENGINE ──────────────────────────── */
const transitionStyles = {
  home:       { color:'#00f5ff', vehicle:'car',   label:'HOME BASE'         },
  about:      { color:'#ff00aa', vehicle:'bike',  label:'ABOUT ME'          },
  education:  { color:'#00ff88', vehicle:'car',   label:'EDU PATH'          },
  skills:     { color:'#7b2fff', vehicle:'bike',  label:'SKILL MATRIX'      },
  achievements:{ color:'#ffe600',vehicle:'car',   label:'TROPHY VAULT'      },
  contact:    { color:'#00f5ff', vehicle:'bike',  label:'CONNECT SYS'       }
};

async function switchSection(nextId){
  if(isAnimating || nextId===current) return;
  isAnimating = true;
  spawnParticles(25);

  const style = transitionStyles[nextId];
  const c = style.color;

  /* 1. Fade in overlay */
  overlay.classList.add('active');
  overlay.style.transition='opacity 0.25s ease';
  overlay.style.opacity='1';

  /* 2. Show glitch lines */
  overlay.querySelector('.glitch-lines').style.opacity='1';

  /* 3. Sweep car/bike across */
  const isForward = sections.indexOf(nextId) > sections.indexOf(current);
  const vSVG = style.vehicle==='car' ? buildCarSVG(c) : buildBikeSVG(c);
  carSweep.innerHTML = vSVG;
  carSweep.style.filter=`drop-shadow(0 0 20px ${c})`;
  carSweep.style.transition='none';
  carSweep.style.opacity='1';

  if(isForward){
    carSweep.style.bottom='-20px';
    carSweep.style.left='-600px';
    carSweep.style.right='auto';
    await sleep(50);
    carSweep.style.transition='left 0.7s cubic-bezier(0.4,0,0.2,1)';
    carSweep.style.left='110vw';
  } else {
    carSweep.style.bottom='-20px';
    carSweep.style.left='auto';
    carSweep.style.right='-600px';
    await sleep(50);
    carSweep.style.transition='right 0.7s cubic-bezier(0.4,0,0.2,1)';
    carSweep.style.right='110vw';
  }

  /* 4. Show section label */
  transText.textContent = style.label;
  transText.style.color = c;
  transText.style.textShadow=`0 0 40px ${c},0 0 80px ${c}`;
  transText.style.transition='opacity 0.3s, transform 0.3s';
  transText.style.opacity='1';
  transText.style.transform='scale(1)';

  await sleep(300);

  /* 5. Switch sections */
  const oldSection = document.getElementById(current);
  const newSection = document.getElementById(nextId);

  oldSection.classList.remove('active-section');
  oldSection.style.transform = isForward ? 'translateY(-60px)' : 'translateY(60px)';
  oldSection.style.opacity = '0';

  newSection.style.transform = isForward ? 'translateY(60px)' : 'translateY(-60px)';
  newSection.classList.add('active-section');
  await sleep(50);
  newSection.style.transform = 'translateY(0)';
  newSection.style.opacity = '1';

  current = nextId;
  updateNav(nextId);

  /* Animate skill bars when skills section shown */
  if(nextId==='skills') setTimeout(animateSkillBars, 400);
  if(nextId==='about')  setTimeout(animateStats, 400);

  /* 6. Fade out overlay */
  await sleep(400);
  transText.style.opacity='0';
  transText.style.transform='scale(0.5)';
  overlay.querySelector('.glitch-lines').style.opacity='0';

  await sleep(200);
  overlay.style.opacity='0';
  await sleep(300);
  overlay.classList.remove('active');
  oldSection.style.transform='';
  oldSection.style.opacity='';
  carSweep.style.opacity='0';
  isAnimating = false;
}

function sleep(ms){ return new Promise(r=>setTimeout(r,ms)); }

/* ─── UPDATE NAV ─────────────────────────────────── */
function updateNav(id){
  document.querySelectorAll('.nav-item').forEach(item=>{
    item.classList.toggle('active', item.dataset.section===id);
  });
}

/* ─── NAV CLICK ──────────────────────────────────── */
document.querySelectorAll('.nav-item').forEach(item=>{
  item.addEventListener('click',()=>switchSection(item.dataset.section));
});

/* ─── QUICK BOX CLICK ────────────────────────────── */
document.querySelectorAll('.quick-box[data-target]').forEach(box=>{
  box.addEventListener('click',()=>switchSection(box.dataset.target));
});

/* ─── MOUSE WHEEL ────────────────────────────────── */
window.addEventListener('wheel', e=>{
  e.preventDefault();
  const now = Date.now();
  if(now - lastWheel < 100){ wheelAccum += e.deltaY; }
  else { wheelAccum = e.deltaY; }
  lastWheel = now;
  if(Math.abs(wheelAccum) < 80) return;
  const dir = wheelAccum > 0 ? 1 : -1;
  wheelAccum = 0;
  const idx = sections.indexOf(current);
  const next = sections[idx+dir];
  if(next) switchSection(next);
}, {passive:false});

/* ─── TOUCH ──────────────────────────────────────── */
window.addEventListener('touchstart', e=>{
  touchStartY = e.touches[0].clientY;
  touchStartX = e.touches[0].clientX;
},{passive:true});
window.addEventListener('touchend', e=>{
  const dy = touchStartY - e.changedTouches[0].clientY;
  const dx = touchStartX - e.changedTouches[0].clientX;
  if(Math.abs(dy)<50 && Math.abs(dx)<50) return;
  if(Math.abs(dy)>Math.abs(dx)){
    const dir = dy>0?1:-1;
    const idx = sections.indexOf(current);
    const next = sections[idx+dir];
    if(next) switchSection(next);
  }
},{passive:true});

/* ─── KEYBOARD ────────────────────────────────────── */
window.addEventListener('keydown', e=>{
  const idx = sections.indexOf(current);
  if(['ArrowDown','PageDown'].includes(e.key)){
    e.preventDefault();
    if(sections[idx+1]) switchSection(sections[idx+1]);
  }
  if(['ArrowUp','PageUp'].includes(e.key)){
    e.preventDefault();
    if(sections[idx-1]) switchSection(sections[idx-1]);
  }
  const numMap={'1':'home','2':'about','3':'education','4':'skills','5':'achievements','6':'contact'};
  if(numMap[e.key]) switchSection(numMap[e.key]);
});

/* ─── SKILL BARS ─────────────────────────────────── */
function animateSkillBars(){
  document.querySelectorAll('.skill-fill').forEach(bar=>{
    bar.style.width = bar.dataset.width + '%';
  });
}

/* ─── STATS COUNTER ──────────────────────────────── */
function animateStats(){
  document.querySelectorAll('.stat-num[data-target]').forEach(el=>{
    const target = parseInt(el.dataset.target);
    const duration = 1500;
    const start = Date.now();
    function update(){
      const elapsed = Date.now()-start;
      const progress = Math.min(elapsed/duration, 1);
      const eased = 1-Math.pow(1-progress,3);
      el.textContent = Math.round(eased*target);
      if(progress<1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

/* ─── NAV TOOLTIP ────────────────────────────────── */
document.querySelectorAll('.nav-item').forEach(item=>{
  item.title = sectionLabels[item.dataset.section]||'';
});

/* ─── INIT HOME ANIMATIONS ───────────────────────── */
window.addEventListener('load',()=>{
  document.getElementById('home').classList.add('active-section');
  document.querySelector('[data-section="home"]').classList.add('active');
  /* Scroll hint */
  const hint = document.createElement('div');
  hint.style.cssText=`
    position:fixed;bottom:20px;left:50%;transform:translateX(-50%);
    font-family:'Share Tech Mono',monospace;font-size:0.65rem;
    color:rgba(0,245,255,0.4);letter-spacing:0.2em;z-index:50;
    animation:hintFade 4s ease 2s forwards;pointer-events:none;
  `;
  hint.textContent='SCROLL OR USE ARROW KEYS TO NAVIGATE';
  const style=document.createElement('style');
  style.textContent='@keyframes hintFade{0%{opacity:1}80%{opacity:1}100%{opacity:0}}';
  document.head.appendChild(style);
  document.body.appendChild(hint);
  setTimeout(()=>hint.remove(),7000);
});

/* ─── CURSOR TRAIL (subtle) ──────────────────────── */
let trailTimer=null;
document.addEventListener('mousemove', e=>{
  if(trailTimer) return;
  trailTimer=setTimeout(()=>{
    trailTimer=null;
    const dot=document.createElement('div');
    dot.style.cssText=`
      position:fixed;left:${e.clientX}px;top:${e.clientY}px;
      width:4px;height:4px;border-radius:50%;
      background:rgba(0,245,255,0.6);
      box-shadow:0 0 6px rgba(0,245,255,0.8);
      pointer-events:none;z-index:9998;
      animation:dotFade 0.8s ease forwards;
    `;
    const s=document.createElement('style');
    if(!document.getElementById('dotFadeStyle')){
      s.id='dotFadeStyle';
      s.textContent='@keyframes dotFade{0%{transform:scale(1);opacity:0.8}100%{transform:scale(0);opacity:0}}';
      document.head.appendChild(s);
    }
    document.body.appendChild(dot);
    setTimeout(()=>dot.remove(),800);
  },30);
});

/* ─── SECTION SCROLL within content ─────────────── */
document.querySelectorAll('.section-content').forEach(sc=>{
  sc.addEventListener('wheel', e=>{ e.stopPropagation(); },{passive:true});
  sc.addEventListener('touchstart', e=>{ e.stopPropagation(); },{passive:true});
  sc.addEventListener('touchmove',  e=>{ e.stopPropagation(); },{passive:true});
});

/* ─── CARD TILT ON HOVER ─────────────────────────── */
document.querySelectorAll('.about-card,.edu-card,.ach-box,.contact-card,.skill-box').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-0.5;
    const y=(e.clientY-r.top)/r.height-0.5;
    card.style.transform=`perspective(600px) rotateY(${x*8}deg) rotateX(${-y*8}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave',()=>{
    card.style.transform='';
  });
});

console.log('%c MANAS CHOUDHARY PORTFOLIO ','background:#050510;color:#00f5ff;font-family:Orbitron;font-size:1rem;border:1px solid #00f5ff;padding:8px 16px;');
console.log('%c Built with passion & caffeine ','color:#7b2fff;');
