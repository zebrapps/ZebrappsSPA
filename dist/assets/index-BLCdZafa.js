(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&l(d)}).observe(document,{childList:!0,subtree:!0});function u(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function l(o){if(o.ep)return;o.ep=!0;const a=u(o);fetch(o.href,a)}})();(function(){emailjs.init("YOUR_PUBLIC_KEY")})();function v(c){const r=document.getElementById(c);if(r){const u=document.querySelector(".nav").offsetHeight,l=r.offsetTop-u;window.scrollTo({top:l,behavior:"smooth"})}}document.addEventListener("DOMContentLoaded",function(){const c=document.getElementById("nav"),r=document.querySelectorAll(".nav-link"),u=document.querySelectorAll("section"),l=document.getElementById("nav-toggle"),o=document.getElementById("nav-menu");window.addEventListener("scroll",function(){window.scrollY>50?c.classList.add("scrolled"):c.classList.remove("scrolled");let e="";u.forEach(t=>{const n=t.offsetTop;t.clientHeight,window.scrollY>=n-100&&(e=t.getAttribute("id"))}),r.forEach(t=>{t.classList.remove("active"),t.getAttribute("href")===`#${e}`&&t.classList.add("active")})}),r.forEach(e=>{e.addEventListener("click",function(t){t.preventDefault();const n=this.getAttribute("href").substring(1);v(n),o.classList.contains("active")&&(o.classList.remove("active"),l.classList.remove("active"))})}),l.addEventListener("click",function(){o.classList.toggle("active"),this.classList.toggle("active")}),document.addEventListener("click",function(e){o.classList.contains("active")&&!o.contains(e.target)&&!l.contains(e.target)&&(o.classList.remove("active"),l.classList.remove("active"))});const a={threshold:.1,rootMargin:"0px 0px -50px 0px"},d=new IntersectionObserver(function(e){e.forEach(t=>{t.isIntersecting&&(t.target.style.opacity="1",t.target.style.transform="translateY(0)")})},a);document.querySelectorAll(".stat-item, .content-item, .curriculum-module, .testimonial-item").forEach(e=>{e.style.opacity="0",e.style.transform="translateY(30px)",e.style.transition="opacity 0.6s ease, transform 0.6s ease",d.observe(e)});const m=document.getElementById("registrationForm");m&&m.addEventListener("submit",function(e){e.preventDefault();const t=this.querySelector('input[name="name"]').value.trim(),n=this.querySelector('input[name="email"]').value.trim(),s=this.querySelector('input[name="phone"]').value.trim();if(!t||!n||!s){alert('אנא מלא את כל השדות הנדרשים: שם מלא, כתובת דוא"ל ומספר טלפון');return}const i=new FormData(this),p={name:i.get("name"),email:i.get("email"),phone:i.get("phone"),position:i.get("position")||"לא צוין",expectations:i.get("expectations")||"לא צוין"};w(p)}),document.querySelectorAll(".form:not(#registrationForm)").forEach(e=>{e.addEventListener("submit",function(t){t.preventDefault(),new FormData(this),b(),this.reset()})});function b(e){const t="תודה על פנייתך! נחזור אליך תוך 24 שעות.",n=document.createElement("div");n.className="success-popup",n.innerHTML=`
            <div class="popup-content">
                <div class="popup-icon">✅</div>
                <h3>הצלחה!</h3>
                <p>${t}</p>
                <button onclick="this.parentElement.parentElement.remove()">סגור</button>
            </div>
        `,document.body.appendChild(n),setTimeout(()=>{n.parentElement&&n.remove()},5e3)}window.addEventListener("scroll",function(){const e=window.pageYOffset,t=document.querySelector(".hero-background");t&&(t.style.transform=`translateY(${e*.5}px)`)}),document.querySelectorAll(".node").forEach((e,t)=>{setInterval(()=>{const n=Math.random()*10-5,s=Math.random()*10-5;e.style.transform=`translate(${n}px, ${s}px)`},2e3+t*500)});function x(e,t,n=100){let s=0;e.innerHTML="";function i(){s<t.length&&(e.innerHTML+=t.charAt(s),s++,setTimeout(i,n))}i()}setTimeout(()=>{const e=document.querySelector(".hero-title-main");if(e){const t=e.textContent;x(e,t,80)}},1e3);function E(e,t,n=2e3,s=!1){let i=0;const p=t/(n/16);function h(){i<t?(i+=p,t===1/0?e.textContent="∞":e.textContent=Math.ceil(i)+(s?"%":""),requestAnimationFrame(h)):e.textContent=(t===1/0?"∞":t)+(s?"%":"")}h()}const f=new IntersectionObserver(function(e){e.forEach(t=>{if(t.isIntersecting){const n=t.target.querySelector("h3"),s=n.textContent;if(s==="∞")n.textContent="∞";else{const i=s.includes("%"),p=parseInt(s);E(n,p,2e3,i)}f.unobserve(t.target)}})},{threshold:.5});document.querySelectorAll(".stat-item").forEach(e=>{f.observe(e)});const g=document.querySelectorAll(".faq-item");g.forEach(e=>{e.querySelector(".faq-question").addEventListener("click",()=>{g.forEach(n=>{n!==e&&n.classList.remove("active")}),e.classList.toggle("active")})})});async function w(c){const r=document.querySelector('#registrationForm button[type="submit"]'),u=r.textContent;r.textContent="שולח נתונים...",r.disabled=!0;try{const o=await(await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:c.name,email:c.email,message:`הרשמה לקורס בינה מלאכותית

פרטי ההרשמה:
שם: ${c.name}
אימייל: ${c.email}
טלפון: ${c.phone}
תפקיד: ${c.position}
ציפיות: ${c.expectations}

הלקוח מעוניין להירשם לקורס הבינה המלאכותית שמתחיל ב-15 לאוקטובר.`})})).json();o.ok?(showSuccessMessage("registration"),document.getElementById("registrationForm").reset(),setTimeout(()=>{window.location.href="https://payments.payplus.co.il/36b25027-8b92-41e4-8ba4-5a28e5498add"},2e3)):showErrorMessage(o.error||"שגיאה בשליחת הנתונים")}catch(l){console.error("Registration error:",l),showErrorMessage("שגיאה בחיבור לשרת. אנא נסה שוב.")}finally{r.textContent=u,r.disabled=!1}}const L=`
    .success-popup,
    .error-popup {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        animation: popupFadeIn 0.3s ease forwards;
    }

    .popup-content {
        background: white;
        padding: 40px;
        border-radius: 16px;
        text-align: center;
        max-width: 400px;
        margin: 20px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        transform: scale(0.9);
        animation: popupScaleIn 0.3s ease forwards 0.1s;
        direction: rtl;
    }

    .error-content {
        border-top: 4px solid #dc3545;
    }

    .popup-icon {
        font-size: 48px;
        margin-bottom: 20px;
    }

    .popup-content h3 {
        font-size: 24px;
        font-weight: 600;
        color: #1d1d1f;
        margin-bottom: 16px;
    }

    .error-content h3 {
        color: #dc3545;
    }

    .popup-content p {
        color: #86868b;
        margin-bottom: 24px;
        line-height: 1.5;
    }

    .error-content p {
        color: #721c24;
    }

    .popup-content button {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.2s ease;
    }

    .error-content button {
        background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
    }

    .popup-content button:hover {
        transform: translateY(-2px);
    }

    @keyframes popupFadeIn {
        to { opacity: 1; }
    }

    @keyframes popupScaleIn {
        to { transform: scale(1); }
    }
`,y=document.createElement("style");y.textContent=L;document.head.appendChild(y);window.scrollToSection=v;
