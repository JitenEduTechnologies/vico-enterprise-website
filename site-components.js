document.addEventListener("DOMContentLoaded", async () => {
  const DEFAULT_HEADER_HTML = `<style>
:root {
  --vyntra-teal: #087F73;
  --vyntra-teal-dark: #05665D;
  --vyntra-text: #111111;
  --vyntra-muted: #5F6B76;
  --vyntra-bg: #F7FAFA;
  --vyntra-white: #FFFFFF;
  --vyntra-light-teal: #EAF6F4;
  --vyntra-coral: #F36F61;
  --vyntra-border: #E1E7E6;
}
.site-header {
  position: fixed;
  z-index: 1000;
  inset: 0 0 auto;
  height: 66px;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--vyntra-border);
  box-shadow: 0 2px 12px rgba(17, 17, 17, 0.04);
  transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
  will-change: transform;
  transform: translateY(0);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
}
.site-header.is-hidden {
  transform: translateY(-110%);
}
.header-inner {
  height: 100%;
  width: min(1280px, calc(100% - 48px));
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}
@media (max-width: 768px) {
  .header-inner {
    width: min(1280px, calc(100% - 32px));
  }
}
@media (max-width: 480px) {
  .header-inner {
    width: min(1280px, calc(100% - 24px));
  }
}
.brand {
  display: flex;
  align-items: center;
  gap: 9px;
  color: var(--vyntra-text);
  flex: none;
  text-decoration: none;
}
.brand-mark {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: var(--vyntra-coral);
  position: relative;
  transform: rotate(-8deg);
  flex-shrink: 0;
}
.brand-mark:after {
  content: "";
  position: absolute;
  width: 12px;
  height: 12px;
  border: 3px solid #fff;
  border-left-color: transparent;
  border-radius: 50%;
  left: 6px;
  top: 5px;
}
.brand-mark:before {
  content: "";
  position: absolute;
  width: 7px;
  height: 3px;
  background: #fff;
  right: 4px;
  bottom: 6px;
  transform: rotate(-35deg);
}
.brand-word {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--vyntra-text);
}
.nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin-left: auto;
  margin-right: 12px;
}
.nav a {
  font-size: 13.5px;
  font-weight: 500;
  color: var(--vyntra-muted);
  padding: 8px 12px;
  border-radius: 8px;
  white-space: nowrap;
  text-decoration: none;
  transition: color 0.15s ease, background 0.15s ease;
}
.nav a:hover {
  color: var(--vyntra-teal);
  background: var(--vyntra-light-teal);
}
.nav a.active {
  color: var(--vyntra-teal);
  font-weight: 600;
  background: var(--vyntra-light-teal);
}
.header-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 0 18px;
  border: 1px solid transparent;
  border-radius: 10px;
  background: var(--vyntra-teal);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: -0.01em;
  white-space: nowrap;
  text-decoration: none;
  transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 2px 8px rgba(8, 127, 115, 0.2);
  flex-shrink: 0;
}
.header-cta:hover {
  transform: translateY(-1px);
  background: var(--vyntra-teal-dark);
  box-shadow: 0 4px 14px rgba(8, 127, 115, 0.28);
}
.menu-btn {
  display: none;
  margin-left: auto;
  width: 42px;
  height: 42px;
  border-radius: 8px;
  border: 1px solid var(--vyntra-border);
  background: var(--vyntra-bg);
  color: var(--vyntra-text);
  cursor: pointer;
  font-size: 20px;
  line-height: 1;
  align-items: center;
  justify-content: center;
}
@media(max-width:1200px) {
  .nav { gap: 2px; }
  .nav a { font-size: 12.5px; padding: 6px 8px; }
  .header-cta { padding: 0 14px; font-size: 12px; min-height: 38px; }
}
@media(max-width:980px) {
  .nav { gap: 1px; }
  .nav a { font-size: 11.5px; padding: 5px 6px; }
  .header-cta { padding: 0 12px; font-size: 11.5px; min-height: 36px; }
}
@media(max-width:920px) {
  .header-inner { width: calc(100% - 32px); }
  .nav, .header-cta { display: none; }
  .menu-btn { display: flex; }
  .nav.open {
    display: flex;
    position: absolute;
    top: 66px;
    left: 16px;
    right: 16px;
    flex-direction: column;
    gap: 4px;
    background: #ffffff;
    border: 1px solid var(--vyntra-border);
    border-radius: 16px;
    padding: 12px;
    box-shadow: 0 12px 36px rgba(17, 17, 17, 0.12);
  }
  .nav.open a {
    width: 100%;
    min-height: 44px;
    display: flex;
    align-items: center;
    padding: 10px 14px;
    font-size: 14.5px;
    font-weight: 500;
    border-radius: 8px;
    color: var(--vyntra-text);
  }
  .nav.open a:hover,
  .nav.open a.active {
    background: var(--vyntra-light-teal);
    color: var(--vyntra-teal);
    font-weight: 600;
  }
  .nav.open .mobile-cta {
    margin-top: 8px;
    padding: 12px 14px;
    background: var(--vyntra-teal);
    color: #ffffff;
    font-weight: 600;
    justify-content: center;
    text-align: center;
  }
}
@media(max-width:600px) {
  .site-header { height: 60px; }
  .nav.open { top: 60px; }
  .brand-word { font-size: 19px; }
  .brand-mark { width: 26px; height: 26px; }
}
@media(prefers-reduced-motion:reduce) {
  .site-header { transition: transform 0.01s linear!important; }
}
</style>
<header class="site-header" id="siteHeader">
  <div class="header-inner">
    <a class="brand" href="index.html" aria-label="Vyntra home">
      <span class="brand-mark" aria-hidden="true"></span>
      <span class="brand-word" data-site-brand>Vyntra</span>
    </a>
    <nav class="nav" id="mainNav" aria-label="Primary navigation">
      <a href="index.html" data-nav="index.html">Home</a>
      <a href="1-vico-solutions.html" data-nav="1-vico-solutions.html">Solutions</a>
      <a href="services.html" data-nav="services.html">Services</a>
      <a href="our-products.html" data-nav="our-products.html">Our Products</a>
      <a href="industries.html" data-nav="industries.html">Industries</a>
      <a href="careers.html" data-nav="careers.html">SAP Careers</a>
      <a href="contact.html" data-nav="contact.html">Contact Us</a>
    </nav>
    <a class="header-cta" href="contact.html#contact-form" data-site-form-link data-site-contact>
      Contact Us
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
        <span class="footer-eyebrow">Enterprise Advisory</span>
        <h2>Ready to transform your SAP landscape?</h2>
        <p>Connect directly with senior solution architects for practical guidance on S/4HANA moves, BTP integration, and digital core optimization.</p>
      </div>
      <div class="footer-cta-action">
        <a href="contact.html#contact-form" class="footer-btn">Contact Vyntra Advisors →</a>
      </div>
    </div>
    <div class="footer-main-grid">
      <div class="footer-brand-col">
        <a class="brand" href="index.html" aria-label="Vyntra home">
          <span class="brand-mark" aria-hidden="true"></span>
          <span class="brand-word" data-site-brand>Vyntra</span>
        </a>
        <p class="footer-desc">
          SAP services and enterprise transformation designed around practical business outcomes, modern architecture, and continuous value.
        </p>
      </div>
      <div class="footer-nav-groups">
        <div class="footer-nav-group">
          <h3 class="footer-group-title">Company</h3>
          <ul class="footer-link-list">
            <li><a href="index.html">Home</a></li>
            <li><a href="industries.html">Industries</a></li>
            <li><a href="our-products.html">Our Products</a></li>
            <li><a href="careers.html">SAP Careers</a></li>
          </ul>
        </div>
        <div class="footer-nav-group">
          <h3 class="footer-group-title">Capabilities</h3>
          <ul class="footer-link-list">
            <li><a href="1-vico-solutions.html">Solutions</a></li>
            <li><a href="services.html">Services</a></li>
          </ul>
        </div>
        <div class="footer-nav-group">
          <h3 class="footer-group-title">Connect</h3>
          <ul class="footer-link-list">
            <li><a href="contact.html">Contact Us</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-bottom-bar">
      <span class="footer-copy-text" data-site-copyright>
        © 2026 Vyntra — Vision Course. All rights reserved.
      </span>
      <span class="footer-tagline">
        Enterprise Transformation • SAP Services • Digital Operations
      </span>
    </div>
  </div>
</footer>
<style>
.site-footer {
  background: #F7FAFA;
  color: var(--vyntra-text, #111111);
  padding: 64px 0 28px;
  border-top: 1px solid var(--vyntra-border, #E1E7E6);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
}
.footer-wrap { width: min(1280px, calc(100% - 48px)); margin: 0 auto; }
@media (max-width: 768px) {
  .footer-wrap { width: min(1280px, calc(100% - 32px)); }
}
@media (max-width: 480px) {
  .footer-wrap { width: min(1280px, calc(100% - 24px)); }
}
.footer-cta-box {
  background: linear-gradient(135deg, #087F73 0%, #05665D 100%);
  border: 1px solid rgba(8, 127, 115, 0.25);
  border-radius: 18px;
  padding: 36px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  box-shadow: 0 10px 30px rgba(8, 127, 115, 0.14);
  margin-bottom: 56px;
}
.footer-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: #EAF6F4;
  text-transform: uppercase;
  margin-bottom: 8px;
}
.footer-eyebrow:before {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--vyntra-coral, #F36F61);
  flex-shrink: 0;
}
.footer-cta-content h2 {
  font-size: clamp(22px, 2.5vw, 28px);
  line-height: 1.2;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 8px;
  letter-spacing: -0.02em;
}
.footer-cta-content p {
  color: rgba(255, 255, 255, 0.88);
  font-size: 14.5px;
  font-weight: 400;
  line-height: 1.55;
  margin: 0;
  max-width: 620px;
}
.footer-cta-action { flex-shrink: 0; }
.footer-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 24px;
  border-radius: 12px;
  background: #ffffff;
  color: #087F73;
  font-size: 13.5px;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  transition: background 0.2s ease, transform 0.2s ease, color 0.2s ease;
  white-space: nowrap;
}
.footer-btn:hover {
  background: #EAF6F4;
  color: #05665D;
  transform: translateY(-1px);
}
.footer-main-grid {
  display: grid;
  grid-template-columns: 1.4fr 2fr;
  gap: 56px;
  align-items: start;
  padding-bottom: 44px;
  border-bottom: 1px solid var(--vyntra-border, #E1E7E6);
}
.footer-brand-col .brand {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: var(--vyntra-text, #111111);
  text-decoration: none;
}
.footer-brand-col .brand-mark {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: var(--vyntra-coral, #F36F61);
  position: relative;
  transform: rotate(-8deg);
}
.footer-brand-col .brand-mark:after {
  content: "";
  position: absolute;
  width: 12px;
  height: 12px;
  border: 3px solid #fff;
  border-left-color: transparent;
  border-radius: 50%;
  left: 7px;
  top: 6px;
}
.footer-brand-col .brand-mark:before {
  content: "";
  position: absolute;
  width: 8px;
  height: 3.5px;
  background: #fff;
  right: 5px;
  bottom: 7px;
  transform: rotate(-35deg);
}
.footer-brand-col .brand-word {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--vyntra-text, #111111);
}
.footer-desc {
  max-width: 360px;
  margin: 14px 0 0;
  color: var(--vyntra-muted, #5F6B76);
  font-size: 14px;
  font-weight: 400;
  line-height: 1.6;
}
.footer-nav-groups {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}
.footer-group-title {
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: #087F73;
  margin: 0 0 16px;
  text-transform: uppercase;
}
.footer-link-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.footer-link-list a {
  color: var(--vyntra-muted, #5F6B76);
  font-size: 14px;
  font-weight: 400;
  text-decoration: none;
  transition: color 0.15s ease, transform 0.15s ease;
  display: inline-block;
}
.footer-link-list a:hover {
  color: #087F73;
  font-weight: 500;
  transform: translateX(2px);
}
.footer-bottom-bar {
  padding-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  color: var(--vyntra-muted, #5F6B76);
  font-size: 12.5px;
  font-weight: 400;
}
@media(max-width: 992px) {
  .footer-cta-box { flex-direction: column; align-items: flex-start; padding: 28px 28px; }
  .footer-main-grid { grid-template-columns: 1fr; gap: 36px; }
  .footer-nav-groups { gap: 24px; }
}
@media(max-width: 650px) {
  .site-footer { padding: 44px 0 24px; }
  .footer-wrap { width: calc(100% - 32px); }
  .footer-cta-box { padding: 24px 20px; border-radius: 14px; margin-bottom: 36px; }
  .footer-cta-content h2 { font-size: 20px; }
  .footer-btn { width: 100%; min-height: 44px; }
  .footer-nav-groups { grid-template-columns: 1fr; gap: 24px; }
  .footer-link-list { gap: 8px; }
  .footer-link-list a { min-height: 40px; display: flex; align-items: center; font-size: 14.5px; }
  .footer-bottom-bar { flex-direction: column; align-items: flex-start; gap: 6px; font-size: 11.5px; }
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
    document.querySelectorAll("[data-site-form-link]").forEach(el => {
      if (SITE_CONFIG.formLink) el.setAttribute("href", SITE_CONFIG.formLink);
    });
    document.querySelectorAll("[data-site-copyright]").forEach(el => {
      if (SITE_CONFIG.copyright) el.textContent = SITE_CONFIG.copyright;
    });
  }

  const currentPage = window.location.pathname.split("/").pop().toLowerCase().split("#")[0] || "index.html";
  document.querySelectorAll("[data-nav]").forEach(link => {
    const targetPage = link.getAttribute("data-nav").toLowerCase().split("#")[0];
    if (targetPage === currentPage || (targetPage === "index.html" && currentPage === "")) {
      link.classList.add("active");
    }
  });

  document.addEventListener("click", (e) => {
    const formLink = e.target.closest('a[href*="#contact-form"]');
    if (formLink && window.location.pathname.includes("contact.html")) {
      const targetEl = document.getElementById("contact-form") || document.getElementById("formContainer");
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
        history.pushState(null, "", "#contact-form");
      }
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
  const SCROLL_THRESHOLD = 12;

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