/* Shared nav + footer, injected on every page.
   BASE is "" for root pages, "../" for pages one level deep. */
(function(){
  const BASE = window.SS_BASE || "";


  const nav = `
  <nav class="topnav">
    <div class="topnav-in">
      <a class="brand" href="${BASE}index.html" style="text-decoration:none;display:flex;align-items:center;gap:8px">
        <svg width="140" height="34" viewBox="0 0 140 34" xmlns="http://www.w3.org/2000/svg" style="display:block;flex-shrink:0">
          <defs><linearGradient id="slg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#F5A623"/><stop offset="100%" style="stop-color:#F07C00"/></linearGradient></defs>
          <circle cx="14" cy="10" r="6" fill="url(#slg)"/>
          <g stroke="#F5A623" stroke-width="1.4" stroke-linecap="round"><line x1="14" y1="1" x2="14" y2="0"/><line x1="14" y1="19" x2="14" y2="20"/><line x1="5" y1="10" x2="4" y2="10"/><line x1="23" y1="10" x2="24" y2="10"/><line x1="8" y1="4" x2="7" y2="3"/><line x1="20" y1="16" x2="21" y2="17"/><line x1="20" y1="4" x2="21" y2="3"/><line x1="8" y1="16" x2="7" y2="17"/></g>
          <rect x="2" y="22" width="24" height="8" rx="1.5" fill="#1D9E75"/>
          <g stroke="rgba(255,255,255,0.3)" stroke-width="0.5"><line x1="10" y1="22" x2="10" y2="30"/><line x1="18" y1="22" x2="18" y2="30"/><line x1="2" y1="26" x2="26" y2="26"/></g>
          <text x="34" y="19" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif" font-size="15" font-weight="800" letter-spacing="-0.3" fill="#191B17">Solar</text><text x="79" y="19" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif" font-size="15" font-weight="800" letter-spacing="-0.3" fill="#1D9E75">Sense</text>
          <text x="34" y="30" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif" font-size="8" fill="#8B8F86" letter-spacing="0.3">INDIA</text>
        </svg>
      </a>
      <button class="menu-btn" aria-label="Menu" onclick="document.getElementById('nl').classList.toggle('open')">☰</button>
      <div class="navlinks" id="nl">
        <a href="${BASE}calculator.html">Calculator</a>
        <a href="${BASE}guides/index.html">Guides</a>
        <a href="${BASE}subsidy.html">Subsidy</a>
        <a href="${BASE}tariffs/index.html">State Tariffs</a>
        <a class="cta" href="${BASE}calculator.html">Estimate savings →</a>
      </div>
    </div>
  </nav>`;

  const footer = `
  <footer>
    <div class="foot-in">
      <div>
        <div class="foot-brand" style="margin-bottom:6px"><a href="${BASE}index.html" style="text-decoration:none">
          <svg width="120" height="28" viewBox="0 0 140 34" xmlns="http://www.w3.org/2000/svg" style="display:block">
            <defs><linearGradient id="flg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#F5A623"/><stop offset="100%" style="stop-color:#F07C00"/></linearGradient></defs>
            <circle cx="14" cy="10" r="6" fill="url(#flg)"/>
            <g stroke="#F5A623" stroke-width="1.4" stroke-linecap="round"><line x1="14" y1="1" x2="14" y2="0"/><line x1="14" y1="19" x2="14" y2="20"/><line x1="5" y1="10" x2="4" y2="10"/><line x1="23" y1="10" x2="24" y2="10"/><line x1="8" y1="4" x2="7" y2="3"/><line x1="20" y1="16" x2="21" y2="17"/><line x1="20" y1="4" x2="21" y2="3"/><line x1="8" y1="16" x2="7" y2="17"/></g>
            <rect x="2" y="22" width="24" height="8" rx="1.5" fill="#1D9E75"/>
            <text x="34" y="19" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif" font-size="15" font-weight="800" letter-spacing="-0.3" fill="#191B17">Solar</text><text x="79" y="19" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif" font-size="15" font-weight="800" letter-spacing="-0.3" fill="#1D9E75">Sense</text>
            <text x="34" y="30" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif" font-size="8" fill="#8B8F86" letter-spacing="0.3">INDIA</text>
          </svg>
        </a></div>
        <div class="foot-note">Free tools to help Indian homeowners and businesses understand rooftop solar — costs, subsidy, savings, and how to earn from surplus space. Figures are indicative; always get quotes from certified installers.</div>
      </div>
      <div class="foot-col">
        <h4>Tools</h4>
        <a href="${BASE}calculator.html">Solar Calculator</a>
        <a href="${BASE}subsidy.html">PM Surya Ghar Subsidy</a>
        <a href="${BASE}tariffs/index.html">State Tariffs</a>
      </div>
      <div class="foot-col">
        <h4>Learn</h4>
        <a href="${BASE}guides/on-grid.html">On-Grid Solar</a>
        <a href="${BASE}guides/off-grid.html">Off-Grid Solar</a>
        <a href="${BASE}guides/surplus-space.html">Earn from Surplus Space</a>
        <a href="${BASE}privacy.html">Privacy Policy</a>
      </div>
    </div>
    <div class="foot-bottom">© ${new Date().getFullYear()} SolarSense India · <a href="${BASE}privacy.html">Privacy Policy</a> · This site provides general information only and is not financial or engineering advice.</div>
  </footer>`;

  document.addEventListener('DOMContentLoaded', function(){
    const n = document.getElementById('site-nav');    if(n) n.outerHTML = nav;
    const f = document.getElementById('site-footer'); if(f) f.outerHTML = footer;
  });
})();
