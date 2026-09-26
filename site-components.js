document.addEventListener("DOMContentLoaded", async () => {
const DEFAULT_HEADER_HTML = `<style>
.site-header {
position: fixed;
z-index: 1000;
inset: 0 0 auto;
height: 76px;
background: rgba(255, 255, 255, .88);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
border-bottom: 1px solid rgba(0, 0, 0, .08);
box-shadow: 0 4px 20px rgba(0, 0, 0, .03);
transition: transform .42s cubic-bezier(.2, .8, .2, 1);
will-change: transform;
transform: translateY(0);
}
.site-header.is-hidden {
transform: translateY(-110%);
}
.header-inner {
height: 100%;
width: min(1420px, calc(100% - 48px));
margin: auto;
display: flex;
align-items: center;
gap: 30px;
}
.brand {
display: flex;
align-items: center;
gap: 10px;
color: #111827;
flex: none;
text-decoration: none;
}
.brand-mark {
width: 35px;
height: 35px;
border-radius: 11px;
background: #f26b5b;
position: relative;
transform: rotate(-8deg);
}
.brand-mark:after {
content: "";
position: absolute;
width: 15px;
height: 15px;
border: 4px solid #fff;
border-left-color: transparent;
border-radius: 50%;
left: 8px;
top: 6px;
}
.brand-mark:before {
content: "";
position: absolute;
width: 10px;
height: 4px;
background: #fff;
right: 5px;
bottom: 7px;
transform: rotate(-35deg);
}
.brand-word {
font-size: 27px;
font-weight: 850;
letter-spacing: -.07em;
color: #111827;
}
.nav {
display: flex;
align-items: center;
justify-content: center;
gap: 20px;
margin-left: auto;
}
.nav a {
font-size: 13px;
font-weight: 720;
color: #374151;
white-space: nowrap;
text-decoration: none;
transition: color .25s ease;
}
.nav a:hover,
.nav a.active {
color: #087b70;
}
.header-cta {
padding: 12px 20px;
border: 1px solid transparent;
border-radius: 999px;
background: #087b70;
color: #fff;
font-size: 12px;
font-weight: 850;
letter-spacing: .05em;
white-space: nowrap;
text-decoration: none;
transition: transform .2s ease, background .2s ease, box-shadow .2s ease;
box-shadow: 0 4px 14px rgba(8, 123, 112, .25);
}
.header-cta:hover {
transform: translateY(-1px);
background: #06665d;
box-shadow: 0 6px 18px rgba(8, 123, 112, .35);
}
.menu-btn {
display: none;
margin-left: auto;
width: 44px;
height: 44px;
border-radius: 50%;
border: 1px solid rgba(0, 0, 0, .12);
background: rgba(0, 0, 0, .04);
color: #111827;
cursor: pointer;
font-size: 20px;
line-height: 1;
align-items: center;
justify-content: center;
}
@media(max-width:1120px) {
.nav { gap: 14px; }
.nav a { font-size: 11px; }
.header-cta { padding: 10px 14px; font-size: 11px; }
}
@media(max-width:920px) {
.header-inner { width: calc(100% - 32px); }
.nav, .header-cta { display: none; }
.menu-btn { display: flex; }
.nav.open {
display: flex;
position: absolute;
top: 76px;
left: 12px;
right: 12px;
flex-direction: column;
gap: 4px;
background: rgba(255, 255, 255, .98);
border: 1px solid rgba(0, 0, 0, .1);
border-radius: 20px;
padding: 12px;
box-shadow: 0 20px 50px rgba(0, 0, 0, .15);
}
.nav.open a {
width: 100%;
min-height: 44px;
display: flex;
align-items: center;
padding: 10px 16px;
font-size: 14px;
border-radius: 12px;
color: #1f2937;
}
.nav.open a:hover,
.nav.open a.active {
background: rgba(8, 123, 112, .08);
color: #087b70;
}
}
@media(max-width:600px) {
.site-header { height: 68px; }
.nav.open { top: 68px; }
.brand-word { font-size: 24px; }
.brand-mark { width: 32px; height: 32px; }
}
@media(prefers-reduced-motion:reduce) {
.site-header { transition: transform .01s linear!important; }
}
</style>
<header class="site-header" id="siteHeader">
<div class="header-inner">
<a class="brand" href="index.html" aria-label="Website home">
<span class="brand-mark" aria-hidden="true"></span>
<span class="brand-word" data-site-brand>Vico</span>
</a>
<nav class="nav" id="mainNav" aria-label="Primary navigation">
<a href="index.html" data-nav="index.html">Home</a>
<a href="1-vico-solutions.html" data-nav="1-vico-solutions.html#solutions">Solutions</a>
<a href="services.html" data-nav="services.html">Services</a>
<a href="our-products.html" data-nav="our-products.html">Our Products</a>
<a href="industries.html" data-nav="industries.html">Industries</a>
<a href="careers.html" data-nav="careers.html">SAP Careers</a>
<a href="contact.html" data-nav="contact.html">Contact Us</a>
</nav>
<a class="header-cta" href="contact.html" data-site-contact>
CONTACT US
</a>
<button class="menu-btn" id="menuBtn" type="button" aria-label="Open menu" aria-expanded="false">
☰
</button>
</div>
</header>`;
const DEFAULT_FOOTER_HTML = `<footer class="site-footer">
<div class="footer-wrap">
<div class="footer-cta-box">
<div class="footer-cta-content">
<span class="footer-eyebrow">ENTERPRISE ADVISORY</span>
<h2>Ready to transform your SAP landscape?</h2>
<p>Connect directly with senior solution architects for practical guidance on S/4HANA moves, BTP integration, and digital core optimization.</p>
</div>
<div class="footer-cta-action">
<a href="contact.html" class="footer-btn">Contact Vico Advisors →</a>
</div>
</div>
<div class="footer-main-grid">
<div class="footer-brand-col">
<a class="brand" href="index.html" aria-label="Vico home">
<span class="brand-mark" aria-hidden="true"></span>
<span class="brand-word" data-site-brand>Vico</span>
</a>
<p class="footer-desc">
SAP services and enterprise transformation designed around practical business outcomes, modern architecture, and continuous value.
</p>
</div>
<div class="footer-nav-groups">
<div class="footer-nav-group">
<h3 class="footer-group-title">COMPANY</h3>
<ul class="footer-link-list">
<li><a href="index.html">Home</a></li>
<li><a href="industries.html">Industries</a></li>
<li><a href="our-products.html">Our Products</a></li>
<li><a href="careers.html">SAP Careers</a></li>
</ul>
</div>
<div class="footer-nav-group">
<h3 class="footer-group-title">SOLUTIONS</h3>
<ul class="footer-link-list">
<li><a href="1-vico-solutions.html">Solutions</a></li>
<li><a href="services.html">Services</a></li>
</ul>
</div>
<div class="footer-nav-group">
<h3 class="footer-group-title">GET IN TOUCH</h3>
<ul class="footer-link-list">
<li><a href="contact.html">Contact Us</a></li>
</ul>
</div>
</div>
</div>
<div class="footer-bottom-bar">
<span class="footer-copy-text" data-site-copyright>
© 2026 Vico — Vision Course. All rights reserved.
</span>
<span class="footer-tagline">
Enterprise Transformation • SAP Services • Digital Operations
</span>
</div>
</div>
</footer>
<style>
.site-footer {
background: #f8faf9;
color: #1f2937;
padding: 70px 0 30px;
border-top: 1px solid rgba(0, 0, 0, .08);
font-family: Inter, ui-sans-serif, system-ui, -apple-system, sans-serif;
-webkit-font-smoothing: antialiased;
}
.footer-wrap { width: min(1320px, calc(100% - 48px)); margin: 0 auto; }
.footer-cta-box {
background: linear-gradient(135deg, #087b70 0%, #0d9a8a 100%);
border: 1px solid rgba(8, 123, 112, .2);
border-radius: 24px;
padding: 38px 44px;
display: flex;
align-items: center;
justify-content: space-between;
gap: 32px;
box-shadow: 0 16px 45px rgba(8, 123, 112, .18);
margin-bottom: 60px;
}
.footer-eyebrow { display: inline-block; font-size: 11px; font-weight: 900; letter-spacing: .16em; color: #dcefe8; text-transform: uppercase; margin-bottom: 8px; }
.footer-cta-content h2 { font-size: clamp(22px, 2.5vw, 32px); line-height: 1.1; color: #fff; margin: 0 0 8px; letter-spacing: -.03em; }
.footer-cta-content p { color: rgba(255, 255, 255, .88); font-size: 14px; line-height: 1.55; margin: 0; max-width: 620px; }
.footer-cta-action { flex-shrink: 0; }
.footer-btn { display: inline-flex; align-items: center; justify-content: center; min-height: 52px; padding: 0 28px; border-radius: 999px; background: #ffffff; color: #087b70; font-size: 13px; font-weight: 850; text-decoration: none; box-shadow: 0 8px 25px rgba(0, 0, 0, .12); transition: all .25s ease; white-space: nowrap; }
.footer-btn:hover { background: #f26b5b; color: #ffffff; transform: translateY(-2px); box-shadow: 0 12px 30px rgba(242, 107, 91, .35); }
.footer-main-grid { display: grid; grid-template-columns: 1.4fr 2fr; gap: 60px; align-items: start; padding-bottom: 50px; border-bottom: 1px solid rgba(0, 0, 0, .08); }
.footer-brand-col .brand { display: inline-flex; align-items: center; gap: 10px; color: #111827; text-decoration: none; }
.footer-brand-col .brand-mark { width: 34px; height: 34px; border-radius: 10px; background: #f26b5b; position: relative; transform: rotate(-8deg); }
.footer-brand-col .brand-mark:after { content: ""; position: absolute; width: 14px; height: 14px; border: 3.5px solid #fff; border-left-color: transparent; border-radius: 50%; left: 8px; top: 6px; }
.footer-brand-col .brand-mark:before { content: ""; position: absolute; width: 9px; height: 4px; background: #fff; right: 5px; bottom: 7px; transform: rotate(-35deg); }
.footer-brand-col .brand-word { font-size: 26px; font-weight: 850; letter-spacing: -.07em; color: #111827; }
.footer-desc { max-width: 380px; margin: 16px 0 0; color: #6b7280; font-size: 14px; line-height: 1.65; }
.footer-nav-groups { display: grid; grid-template-columns: repeat(3, 1fr); gap: 36px; }
.footer-group-title { font-size: 11px; font-weight: 850; letter-spacing: .14em; color: #087b70; margin: 0 0 18px; text-transform: uppercase; }
.footer-link-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
.footer-link-list a { color: #4b5563; font-size: 14px; font-weight: 600; text-decoration: none; transition: color .2s ease, transform .2s ease; display: inline-block; }
.footer-link-list a:hover { color: #087b70; transform: translateX(3px); }
.footer-bottom-bar { padding-top: 25px; display: flex; justify-content: space-between; align-items: center; gap: 20px; color: #6b7280; font-size: 12px; }
@media(max-width: 992px) {
.footer-cta-box { flex-direction: column; align-items: flex-start; padding: 30px 32px; }
.footer-main-grid { grid-template-columns: 1fr; gap: 40px; }
.footer-nav-groups { gap: 24px; }
}
@media(max-width: 650px) {
.site-footer { padding: 50px 0 25px; }
.footer-wrap { width: calc(100% - 32px); }
.footer-cta-box { padding: 24px 20px; border-radius: 18px; margin-bottom: 40px; }
.footer-cta-content h2 { font-size: 22px; }
.footer-btn { width: 100%; min-height: 48px; }
.footer-nav-groups { grid-template-columns: 1fr; gap: 28px; }
.footer-link-list { gap: 8px; }
.footer-link-list a { min-height: 44px; display: flex; align-items: center; font-size: 15px; padding: 4px 0; }
.footer-bottom-bar { flex-direction: column; align-items: flex-start; gap: 8px; font-size: 11px; }
}
</style>`;
const headerContainer = document.getElementById("site-header");
const footerContainer = document.getElementById("site-footer");
if (headerContainer && (!headerContainer.firstElementChild || headerContainer.innerHTML.trim() === "")) {
headerContainer.innerHTML = DEFAULT_HEADER_HTML;
}
if (footerContainer && (!footerContainer.firstElementChild || footerContainer.innerHTML.trim() === "")) {
footerContainer.innerHTML = DEFAULT_FOOTER_HTML;
}
async function loadComponent(file, container, fallbackHtml) {
if (!container) return;
try {
const response = await fetch(file, { cache: "no-cache" });
if (!response.ok) throw new Error(`Could not load ${file}: ${response.status}`);
const html = await response.text();
if (html && html.trim() !== "" && container.innerHTML.trim() !== html.trim()) {
container.innerHTML = html;
}
} catch (error) {
if (fallbackHtml && (!container.firstElementChild || container.innerHTML.trim() === "")) {
container.innerHTML = fallbackHtml;
}
}
}
await loadComponent("header.html", headerContainer, DEFAULT_HEADER_HTML);
await loadComponent("footer.html", footerContainer, DEFAULT_FOOTER_HTML);
if (typeof SITE_CONFIG !== "undefined") {
document.querySelectorAll("[data-site-brand]").forEach(el => {
if (SITE_CONFIG.brandName) el.textContent = SITE_CONFIG.brandName;
});
document.querySelectorAll("[data-site-contact]").forEach(el => {
if (SITE_CONFIG.contactText) el.textContent = SITE_CONFIG.contactText;
});
document.querySelectorAll("[data-site-copyright]").forEach(el => {
if (SITE_CONFIG.copyright) el.textContent = SITE_CONFIG.copyright;
});
}
const currentPage = window.location.pathname.split("/").pop().toLowerCase() || "index.html";
document.querySelectorAll("[data-nav]").forEach(link => {
const targetPage = link.getAttribute("data-nav").toLowerCase();
if (targetPage === currentPage || (targetPage === "index.html" && (currentPage === "" || currentPage === "1-vico-solutions.html"))) {
link.classList.add("active");
}
});
function initMobileMenu() {
const menuButton = document.getElementById("menuBtn");
const mainNav = document.getElementById("mainNav");
const siteHeader = document.getElementById("siteHeader") || document.querySelector(".site-header");
if (menuButton && mainNav) {
mainNav.classList.remove("open");
menuButton.setAttribute("aria-expanded", "false");
menuButton.setAttribute("aria-label", "Open menu");
menuButton.onclick = (e) => {
e.stopPropagation();
const isOpen = mainNav.classList.toggle("open");
menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
if (isOpen && siteHeader) {
siteHeader.classList.remove("is-hidden");
}
};
mainNav.querySelectorAll("a").forEach(link => {
link.onclick = () => {
mainNav.classList.remove("open");
menuButton.setAttribute("aria-expanded", "false");
menuButton.setAttribute("aria-label", "Open menu");
};
});
document.addEventListener("click", (e) => {
if (mainNav.classList.contains("open") && !mainNav.contains(e.target) && !menuButton.contains(e.target)) {
mainNav.classList.remove("open");
menuButton.setAttribute("aria-expanded", "false");
menuButton.setAttribute("aria-label", "Open menu");
}
});
}
}
initMobileMenu();
let lastScrollY = window.scrollY || 0;
let scrollTicking = false;
const SCROLL_THRESHOLD = 12; // 12px dead-zone threshold to prevent micro-touch jitter
function handleScrollDirection() {
const currentScrollY = window.scrollY || 0;
const siteHeader = document.getElementById("siteHeader") || document.querySelector(".site-header");
const mainNav = document.getElementById("mainNav");
if (!siteHeader) {
scrollTicking = false;
return;
}
if (mainNav && mainNav.classList.contains("open")) {
siteHeader.classList.remove("is-hidden");
lastScrollY = currentScrollY;
scrollTicking = false;
return;
}
if (currentScrollY <= 30) {
siteHeader.classList.remove("is-hidden");
lastScrollY = currentScrollY;
scrollTicking = false;
return;
}
const diff = currentScrollY - lastScrollY;
if (Math.abs(diff) >= SCROLL_THRESHOLD) {
if (diff > 0) {
siteHeader.classList.add("is-hidden");
} else {
siteHeader.classList.remove("is-hidden");
}
lastScrollY = currentScrollY;
}
scrollTicking = false;
}
window.addEventListener("scroll", () => {
if (!scrollTicking) {
window.requestAnimationFrame(handleScrollDirection);
scrollTicking = true;
}
}, { passive: true });
document.addEventListener("contextmenu", (e) => e.preventDefault(), false);
document.addEventListener("keydown", (e) => {
if (e.ctrlKey && (e.key === "u" || e.key === "U" || e.keyCode === 85)) {
e.preventDefault();
return false;
}
if (e.key === "F12" || e.keyCode === 123) {
e.preventDefault();
return false;
}
if (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i" || e.key === "J" || e.key === "j" || e.key === "C" || e.key === "c")) {
e.preventDefault();
return false;
}
if (e.ctrlKey && (e.key === "s" || e.key === "S" || e.keyCode === 83)) {
e.preventDefault();
return false;
}
}, false);
});