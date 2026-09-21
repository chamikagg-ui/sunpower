/**
 * SunPower Lanka - Dealer Portal & Customer Leads Marketplace
 * Empowers solar dealers/installers to find leads, claim inquiries, and register
 */

document.addEventListener("DOMContentLoaded", () => {
  renderLeads();
  renderDealersDirectory();
  initDistrictLeadFilter();
  initDealerSignupForm();
  initCustomerPostRequirementForm();
});

// Render customer leads for dealers
function renderLeads(districtFilter = "all") {
  const container = document.getElementById("dealer-leads-list");
  const leadCountBadge = document.getElementById("lead-count-badge");
  if (!container) return;

  const leads = getStoredLeads();
  const filtered = districtFilter === "all" 
    ? leads 
    : leads.filter(l => l.district.toLowerCase() === districtFilter.toLowerCase());

  if (leadCountBadge) {
    leadCountBadge.innerText = `${filtered.length} Active Leads Available`;
  }

  container.innerHTML = "";

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-12 p-8 bg-slate-900/60 rounded-2xl border border-slate-800">
        <svg class="w-12 h-12 text-slate-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <h4 class="text-lg font-bold text-white mb-1">No customer leads found for this district</h4>
        <p class="text-xs text-slate-400">Select "All Districts" or check back shortly as new customer requests arrive!</p>
      </div>
    `;
    return;
  }

  filtered.forEach(lead => {
    const card = document.createElement("div");
    card.className = "bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-amber-500/50 transition-all flex flex-col justify-between shadow-xl";

    const isClaimed = lead.status === "Claimed";

    card.innerHTML = `
      <div>
        <div class="flex items-start justify-between gap-2 mb-3">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
              ${lead.id}
            </span>
            <span class="text-[11px] text-slate-400 font-medium">${lead.datePosted}</span>
          </div>
          <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
            isClaimed 
              ? "bg-slate-800 text-slate-400 border border-slate-700" 
              : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
          }">
            <span class="w-1.5 h-1.5 rounded-full ${isClaimed ? 'bg-slate-500' : 'bg-emerald-400 animate-pulse'}"></span>
            ${lead.status}
          </span>
        </div>

        <h4 class="text-lg font-bold text-white mb-1">${lead.customerName}</h4>
        
        <div class="flex items-center gap-2 text-xs text-slate-400 mb-4">
          <svg class="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          <span class="font-semibold text-slate-200">${lead.district}</span> (${lead.city})
        </div>

        <div class="grid grid-cols-2 gap-2 text-xs bg-slate-800/60 p-3 rounded-xl mb-4 border border-slate-700/50">
          <div>
            <span class="text-slate-400 text-[10px] uppercase font-bold block">System Desired</span>
            <span class="font-semibold text-amber-300">${lead.systemType}</span>
          </div>
          <div>
            <span class="text-slate-400 text-[10px] uppercase font-bold block">Current Bill</span>
            <span class="font-semibold text-emerald-400">${lead.monthlyBill}</span>
          </div>
          <div>
            <span class="text-slate-400 text-[10px] uppercase font-bold block">Roof Material</span>
            <span class="text-slate-300">${lead.roofType}</span>
          </div>
          <div>
            <span class="text-slate-400 text-[10px] uppercase font-bold block">Timeline</span>
            <span class="text-slate-300">${lead.urgency}</span>
          </div>
        </div>

        <p class="text-xs text-slate-300 italic mb-4 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/60">
          "${lead.notes}"
        </p>
      </div>

      <div class="pt-3 border-t border-slate-800/80">
        <div class="flex items-center justify-between gap-2">
          <div class="text-xs">
            <span class="text-slate-400 text-[10px] block">Contact Number:</span>
            <span id="phone-${lead.id}" class="font-mono text-slate-200 font-semibold">${isClaimed ? lead.phoneFull : lead.phoneMasked}</span>
          </div>
          <button 
            data-lead-id="${lead.id}" 
            class="btn-claim-lead px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md ${
              isClaimed 
                ? "bg-slate-800 text-slate-400 cursor-not-allowed" 
                : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950"
            }"
            ${isClaimed ? "disabled" : ""}
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path></svg>
            ${isClaimed ? "Claimed" : "Unlock & Claim Lead"}
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  // Attach claim lead click listeners
  container.querySelectorAll(".btn-claim-lead").forEach(btn => {
    btn.addEventListener("click", () => {
      const leadId = btn.getAttribute("data-lead-id");
      unlockLead(leadId, btn);
    });
  });
}

function unlockLead(leadId, btnElement) {
  const leads = getStoredLeads();
  const targetLead = leads.find(l => l.id === leadId);
  if (!targetLead) return;

  targetLead.status = "Claimed";
  localStorage.setItem("sunpower_leads", JSON.stringify(leads));

  // Reveal full phone in card
  const phoneSpan = document.getElementById(`phone-${leadId}`);
  if (phoneSpan) {
    phoneSpan.innerText = targetLead.phoneFull;
    phoneSpan.classList.add("text-emerald-400");
  }

  btnElement.innerText = "Claimed";
  btnElement.disabled = true;
  btnElement.className = "btn-claim-lead px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-400 cursor-not-allowed";

  showToast(
    "Customer Lead Unlocked!",
    `You have claimed lead ${leadId}. Full customer contact is: ${targetLead.phoneFull}. Call or WhatsApp immediately to secure the installation!`,
    "success"
  );
}

// Filter leads by District
function initDistrictLeadFilter() {
  const districtSelect = document.getElementById("lead-district-filter");
  if (!districtSelect) return;

  districtSelect.addEventListener("change", (e) => {
    renderLeads(e.target.value);
  });
}

// Certified Dealers Directory
function renderDealersDirectory(district = "all") {
  const container = document.getElementById("dealers-directory-grid");
  if (!container) return;

  const dealers = getStoredDealers();
  const filtered = district === "all"
    ? dealers
    : dealers.filter(d => d.districts.some(dist => dist.toLowerCase() === district.toLowerCase()));

  container.innerHTML = "";

  filtered.forEach(dealer => {
    const card = document.createElement("div");
    card.className = "bg-slate-900/85 border border-slate-800 rounded-2xl p-6 hover:border-emerald-500/50 transition-all flex flex-col justify-between shadow-xl";

    const districtBadges = dealer.districts.map(dist => 
      `<span class="px-2 py-0.5 rounded-md bg-slate-800 text-[11px] font-medium text-slate-300">${dist}</span>`
    ).join(" ");

    card.innerHTML = `
      <div>
        <div class="flex items-start justify-between gap-2 mb-3">
          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            ${dealer.badge}
          </span>
          <div class="flex items-center gap-1 text-amber-400 text-xs font-bold">
            <span>★</span> ${dealer.rating} <span class="text-slate-400 font-normal">(${dealer.reviewCount})</span>
          </div>
        </div>

        <h4 class="text-xl font-bold text-white mb-1">${dealer.companyName}</h4>
        <p class="text-xs text-slate-400 mb-3">${dealer.director}</p>

        <div class="space-y-2 mb-4 text-xs text-slate-300 bg-slate-800/40 p-3 rounded-xl border border-slate-800">
          <div class="flex justify-between">
            <span class="text-slate-400">Total Installed:</span>
            <span class="font-bold text-emerald-400">${dealer.installedKw} kW</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-400">Completed Projects:</span>
            <span class="font-bold text-slate-200">${dealer.completedJobs} Sites</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-400">Partner Tier:</span>
            <span class="font-bold text-amber-400">${dealer.tier}</span>
          </div>
        </div>

        <div class="mb-4">
          <span class="text-[11px] text-slate-400 uppercase font-semibold block mb-1.5">Coverage Districts:</span>
          <div class="flex flex-wrap gap-1.5">
            ${districtBadges}
          </div>
        </div>

        <p class="text-[11px] text-slate-400 flex items-center gap-1.5 mb-5">
          <svg class="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
          ${dealer.address}
        </p>
      </div>

      <div class="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800">
        <a href="tel:${dealer.mobile}" class="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition">
          <svg class="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
          Call
        </a>
        <a href="https://wa.me/${dealer.whatsapp}?text=${encodeURIComponent('Hello ' + dealer.companyName + ', I found your profile on SunPower Lanka. I want a solar quote.')}" target="_blank" class="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition">
          <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
          WhatsApp
        </a>
      </div>
    `;

    container.appendChild(card);
  });
}

// Dealer Registration Form
function initDealerSignupForm() {
  const form = document.getElementById("dealer-signup-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const newDealer = {
      id: "DLR-" + Math.floor(100 + Math.random() * 900),
      companyName: formData.get("companyName") || "Solar Partner",
      director: formData.get("contactPerson") + " (Installer Lead)",
      districts: [formData.get("districtPrimary") || "Colombo", formData.get("districtSecondary") || "Gampaha"],
      phone: formData.get("officePhone") || "011-0000000",
      mobile: formData.get("mobileNumber") || "077-0000000",
      whatsapp: (formData.get("mobileNumber") || "0770000000").replace(/\D/g, ""),
      rating: 5.0,
      reviewCount: 1,
      installedKw: parseInt(formData.get("priorExperienceKw")) || 15,
      completedJobs: parseInt(formData.get("priorJobs")) || 5,
      badge: "Verified Local Installer",
      tier: "New Certified Partner",
      address: formData.get("city") + ", Sri Lanka",
      verified: true
    };

    saveNewDealer(newDealer);
    form.reset();

    showToast(
      "Dealer Registration Approved!",
      "Welcome to the SunPower Lanka Partner Network! Your company profile is now active and you can access local customer leads.",
      "success"
    );

    // Refresh directory
    renderDealersDirectory();
  });
}

// Customer Posting Requirement Form on Dealer page
function initCustomerPostRequirementForm() {
  const form = document.getElementById("customer-post-req-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const lead = {
      id: "LEAD-" + Math.floor(10000 + Math.random() * 90000),
      customerName: formData.get("name") || "Residential Client",
      phoneFull: formData.get("phone") || "077 000 0000",
      phoneMasked: (formData.get("phone") || "077").substring(0, 7) + " **** (Unlock to view)",
      district: formData.get("district") || "Colombo",
      city: formData.get("city") || "Capital",
      systemType: formData.get("systemType") || "5kW Hybrid System",
      roofType: formData.get("roofType") || "Tile Roof",
      monthlyBill: formData.get("monthlyBill") ? `Rs. ${parseInt(formData.get("monthlyBill")).toLocaleString()}` : "Rs. 30,000",
      urgency: formData.get("urgency") || "Immediate",
      notes: formData.get("notes") || "Customer posted direct inquiry for certified local dealers.",
      status: "Available",
      datePosted: "Just Now",
      verified: true
    };

    saveNewLead(lead);
    form.reset();

    showToast(
      "Solar Requirement Broadcasted!",
      "Your requirement has been listed on our Dealer Network. Local certified installers in your district will prepare competitive proposals.",
      "success"
    );

    // Re-render leads
    renderLeads();
  });
}
