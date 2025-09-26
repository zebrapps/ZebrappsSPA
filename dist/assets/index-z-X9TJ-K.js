(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const d of c.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&l(d)}).observe(document,{childList:!0,subtree:!0});function u(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerPolicy&&(c.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?c.credentials="include":o.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function l(o){if(o.ep)return;o.ep=!0;const c=u(o);fetch(o.href,c)}})();(function(){emailjs.init("YOUR_PUBLIC_KEY")})();function y(a){const i=document.getElementById(a);if(i){const u=document.querySelector(".nav").offsetHeight,l=i.offsetTop-u;window.scrollTo({top:l,behavior:"smooth"})}}document.addEventListener("DOMContentLoaded",function(){const a=document.getElementById("nav"),i=document.querySelectorAll(".nav-link"),u=document.querySelectorAll("section"),l=document.getElementById("nav-toggle"),o=document.getElementById("nav-menu");window.addEventListener("scroll",function(){window.scrollY>50?a.classList.add("scrolled"):a.classList.remove("scrolled");let t="";u.forEach(e=>{const n=e.offsetTop;e.clientHeight,window.scrollY>=n-100&&(t=e.getAttribute("id"))}),i.forEach(e=>{e.classList.remove("active"),e.getAttribute("href")===`#${t}`&&e.classList.add("active")})}),i.forEach(t=>{t.addEventListener("click",function(e){e.preventDefault();const n=this.getAttribute("href").substring(1);y(n)})}),l.addEventListener("click",function(){o.classList.toggle("active"),this.classList.toggle("active")});const c={threshold:.1,rootMargin:"0px 0px -50px 0px"},d=new IntersectionObserver(function(t){t.forEach(e=>{e.isIntersecting&&(e.target.style.opacity="1",e.target.style.transform="translateY(0)")})},c);document.querySelectorAll(".stat-item, .content-item, .curriculum-module, .testimonial-item").forEach(t=>{t.style.opacity="0",t.style.transform="translateY(30px)",t.style.transition="opacity 0.6s ease, transform 0.6s ease",d.observe(t)});const m=document.getElementById("registrationForm");m&&m.addEventListener("submit",function(t){t.preventDefault();const e=this.querySelector('input[name="name"]').value.trim(),n=this.querySelector('input[name="email"]').value.trim(),r=this.querySelector('input[name="phone"]').value.trim();if(!e||!n||!r){alert('אנא מלא את כל השדות הנדרשים: שם מלא, כתובת דוא"ל ומספר טלפון');return}const s=new FormData(this),p={name:s.get("name"),email:s.get("email"),phone:s.get("phone"),position:s.get("position")||"לא צוין",expectations:s.get("expectations")||"לא צוין"};w(p)}),document.querySelectorAll(".form:not(#registrationForm)").forEach(t=>{t.addEventListener("submit",function(e){e.preventDefault(),new FormData(this),b(),this.reset()})});function b(t){const e="תודה על פנייתך! נחזור אליך תוך 24 שעות.",n=document.createElement("div");n.className="success-popup",n.innerHTML=`
            <div class="popup-content">
                <div class="popup-icon">✅</div>
                <h3>הצלחה!</h3>
                <p>${e}</p>
                <button onclick="this.parentElement.parentElement.remove()">סגור</button>
            </div>
        `,document.body.appendChild(n),setTimeout(()=>{n.parentElement&&n.remove()},5e3)}window.addEventListener("scroll",function(){const t=window.pageYOffset,e=document.querySelector(".hero-background");e&&(e.style.transform=`translateY(${t*.5}px)`)}),document.querySelectorAll(".node").forEach((t,e)=>{setInterval(()=>{const n=Math.random()*10-5,r=Math.random()*10-5;t.style.transform=`translate(${n}px, ${r}px)`},2e3+e*500)});function x(t,e,n=100){let r=0;t.innerHTML="";function s(){r<e.length&&(t.innerHTML+=e.charAt(r),r++,setTimeout(s,n))}s()}setTimeout(()=>{const t=document.querySelector(".hero-title-main");if(t){const e=t.textContent;x(t,e,80)}},1e3);function E(t,e,n=2e3,r=!1){let s=0;const p=e/(n/16);function h(){s<e?(s+=p,e===1/0?t.textContent="∞":t.textContent=Math.ceil(s)+(r?"%":""),requestAnimationFrame(h)):t.textContent=(e===1/0?"∞":e)+(r?"%":"")}h()}const f=new IntersectionObserver(function(t){t.forEach(e=>{if(e.isIntersecting){const n=e.target.querySelector("h3"),r=n.textContent;if(r==="∞")n.textContent="∞";else{const s=r.includes("%"),p=parseInt(r);E(n,p,2e3,s)}f.unobserve(e.target)}})},{threshold:.5});document.querySelectorAll(".stat-item").forEach(t=>{f.observe(t)});const g=document.querySelectorAll(".faq-item");g.forEach(t=>{t.querySelector(".faq-question").addEventListener("click",()=>{g.forEach(n=>{n!==t&&n.classList.remove("active")}),t.classList.toggle("active")})})});function w(a){const i=document.querySelector('#registrationForm button[type="submit"]');i.textContent,i.textContent="מעביר לתשלום...",i.disabled=!0,console.log("Registration data:",a),setTimeout(()=>{alert("תודה על הרשמתך! מעביר אותך לעמוד התשלום..."),document.getElementById("registrationForm").reset(),window.location.href="https://payments.payplus.co.il/b59d2594-a16c-445a-a633-223048ea9286"},1e3)}const L=`
    .success-popup {
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

    .popup-content p {
        color: #86868b;
        margin-bottom: 24px;
        line-height: 1.5;
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

    .popup-content button:hover {
        transform: translateY(-2px);
    }

    @keyframes popupFadeIn {
        to { opacity: 1; }
    }

    @keyframes popupScaleIn {
        to { transform: scale(1); }
    }
`,v=document.createElement("style");v.textContent=L;document.head.appendChild(v);window.scrollToSection=y;
