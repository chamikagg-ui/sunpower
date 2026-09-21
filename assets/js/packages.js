/**
 * SunPower Lanka - Solar Packages Catalog & Interactive Configurator
 */

document.addEventListener("DOMContentLoaded", () => {
  renderPackages("all");
  initPackageFilters();
});

function initPackageFilters() {
  const filterButtons = document.querySelectorAll(".pkg-filter-btn");
  if (filterButtons.length === 0) return;

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => {
        b.classList.remove("bg-amber-500", "text-slate-900", "font-bold", "shadow-lg");
        b.classList.add("bg-slate-800", "text-slate-300");
      });
      btn.classList.remove("bg-slate-800", "text-slate-300");
      btn.classList.add("bg-amber-500", "text-slate-900", "font-bold", "shadow-lg");

      const category = btn.getAttribute("data-filter");
      renderPackages(category);
    });
  });
}

function renderPackages(filterCategory = "all") {
  const container = document.getElementById("packages-grid");
  if (!container) return;

  const packages = SUNPOWER_DATA.packages;
  const filtered = filterCategory === "all" 
    ? packages 
    : packages.filter(p => p.type === filterCategory);

  container.innerHTML = "";

  filtered.forEach(pkg => {
    const card = document.createElement("div");
    card.className = `relative rounded-2xl bg-slate-900/90 border transition-all duration-300 hover:-translate-y-1.5 flex flex-col p-6 lg:p-7 ${
      pkg.popular 
        ? "border-amber-400/80 shadow-2xl shadow-amber-500/15" 
        : "border-slate-800 hover:border-slate-700 shadow-xl"
    }`;

    // Popular ribbon
    let badgeHtml = "";
    if (pkg.badge) {
      badgeHtml = `<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide ${
        pkg.popular ? "bg-amber-500 text-slate-950" : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
      }">${pkg.badge}</span>`;
    }

    const batterySection = pkg.battery ? `
      <div class="mt-3 p-3 rounded-xl bg-slate-800/70 border border-slate-700/50 flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        </div>
        <div>
          <span class="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">Battery Storage</span>
          <span class="text-xs font-bold text-slate-200">${pkg.battery}</span>
        </div>
      </div>
    ` : '';

    const featuresList = pkg.features.map(f => `
      <li class="flex items-start gap-2.5 text-xs text-slate-300">
        <svg class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
        <span>${f}</span>
      </li>
    `).join("");

    card.innerHTML = `
      <div class="flex items-start justify-between gap-2 mb-4">
        <div>
          <span class="text-xs font-semibold text-amber-400 uppercase tracking-wider">${pkg.category}</span>
          <h3 class="text-2xl font-bold text-white mt-1">${pkg.name}</h3>
        </div>
        ${badgeHtml}
      </div>

      <div class="my-4 p-4 rounded-xl bg-slate-800/40 border border-slate-800">
        <div class="flex justify-between items-baseline mb-1">
          <span class="text-xs text-slate-400">System Capacity:</span>
          <span class="text-lg font-extrabold text-amber-400">${pkg.systemCapacity}</span>
        </div>
        <div class="flex justify-between items-baseline mb-1">
          <span class="text-xs text-slate-400">Monthly Yield:</span>
          <span class="text-sm font-semibold text-emerald-400">${pkg.monthlyGeneration}</span>
        </div>
        <div class="flex justify-between items-baseline">
          <span class="text-xs text-slate-400">Ideal CEB Bill:</span>
          <span class="text-xs font-medium text-slate-300">${pkg.idealForBill}</span>
        </div>
      </div>

      <div class="text-xs text-slate-400 space-y-1.5 mb-4">
        <p><strong class="text-slate-300">PV Modules:</strong> ${pkg.panels}</p>
        <p><strong class="text-slate-300">Inverter:</strong> ${pkg.inverter}</p>
      </div>

      ${batterySection}

      <hr class="border-slate-800 my-4">

      <ul class="space-y-2 mb-6 flex-1">
        ${featuresList}
      </ul>

      <div class="pt-4 border-t border-slate-800/80 mt-auto">
        <div class="mb-4">
          <span class="text-[11px] uppercase tracking-wider text-slate-400 block font-medium">Estimated Package Price</span>
          <span class="text-xl font-black text-white">${pkg.priceRange}</span>
          <span class="text-[10px] text-slate-400 block">*Subject to final site survey & cable lengths</span>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <a href="https://wa.me/94740222175?text=${encodeURIComponent('Hello SunPower Lanka, I am interested in the ' + pkg.name + ' (' + pkg.systemCapacity + ')')}" target="_blank" class="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition">
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
            WhatsApp
          </a>
          <button data-system="${pkg.name}" class="btn-open-quote-modal flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition shadow-md">
            Order / Quote
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  // Re-bind quote modal buttons for newly rendered elements
  document.querySelectorAll(".btn-open-quote-modal").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const sys = btn.getAttribute("data-system") || "";
      const modal = document.getElementById("global-quote-modal");
      const quoteForm = document.getElementById("global-quote-form");
      if (modal) {
        modal.classList.add("active");
        document.body.classList.add("overflow-hidden");
        if (sys && quoteForm) {
          const sysSelect = quoteForm.querySelector('select[name="systemType"]');
          if (sysSelect) sysSelect.value = sys;
        }
      }
    });
  });
}
