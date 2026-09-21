/**
 * SunPower Lanka - Main Navigation, UI & Shared Utilities
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initMobileMenu();
  initCounters();
  initGlobalQuoteModal();
});

// Sticky glass navbar effect on scroll
function initNavbar() {
  const nav = document.getElementById("main-nav");
  if (!nav) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      nav.classList.add("shadow-xl", "bg-slate-900/95");
      nav.classList.remove("bg-slate-900/80");
    } else {
      nav.classList.remove("shadow-xl", "bg-slate-900/95");
      nav.classList.add("bg-slate-900/80");
    }
  });
}

// Mobile drawer menu toggle
function initMobileMenu() {
  const menuBtn = document.getElementById("mobile-menu-btn");
  const mobileDrawer = document.getElementById("mobile-drawer");
  const closeBtn = document.getElementById("close-mobile-menu");

  if (!menuBtn || !mobileDrawer) return;

  function toggleMenu(show) {
    if (show) {
      mobileDrawer.classList.remove("hidden");
      document.body.classList.add("overflow-hidden");
    } else {
      mobileDrawer.classList.add("hidden");
      document.body.classList.remove("overflow-hidden");
    }
  }

  menuBtn.addEventListener("click", () => toggleMenu(true));
  if (closeBtn) closeBtn.addEventListener("click", () => toggleMenu(false));

  // Close when clicking any mobile nav link
  mobileDrawer.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => toggleMenu(false));
  });
}

// Animated stats counter
function initCounters() {
  const counters = document.querySelectorAll(".stat-counter");
  if (counters.length === 0) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute("data-target")) || 0;
        const duration = 1800; // ms
        const startTime = performance.now();
        const isDecimal = target % 1 !== 0;

        function update(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out expo
          const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const current = easeProgress * target;

          el.innerText = isDecimal ? current.toFixed(1) : Math.floor(current);

          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            el.innerText = isDecimal ? target.toFixed(1) : target;
          }
        }

        requestAnimationFrame(update);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  counters.forEach(counter => observer.observe(counter));
}

// Toast notification helper
function showToast(title, message, type = "success") {
  let toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.className = "fixed bottom-5 left-5 z-[9999] flex flex-col gap-2 max-w-sm pointer-events-none";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className = `pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-2xl border text-white transition-all transform translate-y-4 opacity-0 duration-300 ${
    type === "success" 
      ? "bg-slate-900/95 border-emerald-500/80 shadow-emerald-950/50" 
      : "bg-slate-900/95 border-amber-500/80 shadow-amber-950/50"
  }`;

  const iconSvg = type === "success" 
    ? `<svg class="w-6 h-6 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
    : `<svg class="w-6 h-6 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>`;

  toast.innerHTML = `
    ${iconSvg}
    <div class="flex-1">
      <h4 class="font-bold text-sm text-slate-100">${title}</h4>
      <p class="text-xs text-slate-300 mt-0.5">${message}</p>
    </div>
    <button class="text-slate-400 hover:text-white text-xs font-bold shrink-0 ml-2" onclick="this.parentElement.remove()">✕</button>
  `;

  toastContainer.appendChild(toast);

  // Animate in
  setTimeout(() => {
    toast.classList.remove("translate-y-4", "opacity-0");
  }, 10);

  // Auto dismiss
  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-y-2");
    setTimeout(() => toast.remove(), 300);
  }, 5000);
}

// Global Quote Modal Handler
function initGlobalQuoteModal() {
  const modal = document.getElementById("global-quote-modal");
  const openButtons = document.querySelectorAll(".btn-open-quote-modal");
  const closeButtons = document.querySelectorAll(".btn-close-quote-modal");
  const quoteForm = document.getElementById("global-quote-form");

  if (!modal) return;

  function openModal(prefillSystem = "") {
    modal.classList.add("active");
    document.body.classList.add("overflow-hidden");
    if (prefillSystem && quoteForm) {
      const systemSelect = quoteForm.querySelector('select[name="systemType"]');
      if (systemSelect) systemSelect.value = prefillSystem;
    }
  }

  function closeModal() {
    modal.classList.remove("active");
    document.body.classList.remove("overflow-hidden");
  }

  openButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const systemType = btn.getAttribute("data-system") || "";
      openModal(systemType);
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener("click", closeModal);
  });

  // Background click to close
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Submit quote request
  if (quoteForm) {
    quoteForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(quoteForm);

      const newLead = {
        id: "LEAD-" + Math.floor(10000 + Math.random() * 90000),
        customerName: formData.get("customerName") || "Valued Client",
        phoneFull: formData.get("phone") || "077 000 0000",
        phoneMasked: (formData.get("phone") || "077").substring(0, 7) + " **** (Unlock to view)",
        district: formData.get("district") || "Colombo",
        city: formData.get("city") || "N/A",
        systemType: formData.get("systemType") || "5kW Hybrid System",
        roofType: formData.get("roofType") || "Tile Roof",
        monthlyBill: formData.get("monthlyBill") ? `Rs. ${parseInt(formData.get("monthlyBill")).toLocaleString()}` : "Rs. 35,000",
        urgency: "High (New Online Request)",
        notes: formData.get("notes") || "Customer requested a free site inspection & quotation via SunPower Lanka website.",
        status: "Available",
        datePosted: "Just Now",
        verified: true
      };

      // Save to localStorage for Dealer Portal!
      saveNewLead(newLead);

      closeModal();
      quoteForm.reset();

      showToast(
        "Request Submitted Successfully!",
        "Our solar engineers and certified district installers have received your request. We'll contact you within 2 business hours!",
        "success"
      );
    });
  }
}
