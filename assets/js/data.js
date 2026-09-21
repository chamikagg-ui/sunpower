/**
 * SunPower Lanka - Central Data Repository
 * Holds initial dealer leads, certified installers, standard solar packages, and Sri Lanka CEB tariffs
 */

const SUNPOWER_DATA = {
  // Company Official Contact & Chairman
  company: {
    name: "SunPower Lanka (Pvt) Ltd",
    hotline: "074 022 2175",
    hotlineRaw: "0740222175",
    whatsapp: "94740222175",
    whatsappFormatted: "+94 74 022 2175",
    email: "info@sunpowerlanka.lk",
    address: "No. 128, Galle Road, Colombo 03, Sri Lanka",
    chairman: {
      name: "Chaminda Silva",
      title: "Chairman & Managing Director",
      image: "assets/images/chairman.jpg",
      quote: "Our mission at SunPower Lanka is not merely installing solar panels—it is about liberating Sri Lankan families and businesses from unpredictable power tariffs while building national energy sovereignty with world-class engineering.",
      message: "Crossing the 1 Megawatt (1,145+ kW) landmark is a testament to the trust our 560+ clients have placed in us. We are proud to run Sri Lanka's fastest growing solar dealer network, connecting certified local installers with everyday homeowners."
    },
    history: [
      {
        year: "2021",
        title: "The Genesis & Core Vision",
        description: "Founded with a mission to bring transparent, high-efficiency solar energy solutions to Sri Lanka during severe national energy challenges."
      },
      {
        year: "2022",
        title: "CEB / LECO Grid Accreditation",
        description: "Achieved full renewable vendor certification; pioneered zero-outage Smart Hybrid installations with advanced LiFePO4 battery banks."
      },
      {
        year: "2023",
        title: "Bank Solar Financing Alliances",
        description: "Partnered with Commercial Bank, HNB, and Sampath Bank to offer customized low-interest green solar loans with 0% down payments."
      },
      {
        year: "2024",
        title: "Islandwide Dealer Network",
        description: "Launched the SunPower Partner Network connecting certified regional engineers and installers across all 18 districts with verified customer leads."
      },
      {
        year: "2025 - 2026",
        title: "Surpassing the 1 Megawatt Milestone",
        description: "Officially exceeded 1,145 kWp installed capacity across 560+ domestic rooftops, highland tea factories, and industrial export plants."
      }
    ]
  },

  // 1MW+ Milestone Facts
  milestone: {
    totalKw: 1145, // 1.145 MW installed
    totalProjects: 560,
    annualEnergySavedLkr: "Rs. 52,000,000+",
    co2OffsetTons: 1380,
    treesPlantedEquivalent: 22800,
    districtsCovered: 18
  },

  // Standard Solar Packages
  packages: [
    {
      id: "pkg-3kw-ongrid",
      name: "3kWp Eco Starter",
      type: "ongrid",
      category: "Residential",
      badge: "Best for Small Homes",
      systemCapacity: "3 kWp",
      monthlyGeneration: "360 - 400 Units (kWh)",
      idealForBill: "Rs. 18,000 - 28,000 / mo",
      priceRange: "Rs. 760,000 - 850,000",
      panels: "6x 550W Tier-1 N-Type TOPCon Bifacial Panels (Jinko / JA Solar)",
      inverter: "1x 3kW Single Phase On-Grid Inverter (Growatt / Solis / Huawei)",
      warranty: "25-Yr Panel Linear Output, 10-Yr Inverter, 5-Yr Comprehensive",
      features: [
        "CEB / LECO Net Metering & Net Accounting compliant",
        "WiFi Smart Energy Monitoring via Mobile App",
        "High-grade Anodized Aluminium Mountings",
        "Type 2 AC/DC Surge Protection & Earthing",
        "Free Engineering Site Survey & Approvals handling"
      ],
      popular: false
    },
    {
      id: "pkg-5kw-hybrid",
      name: "5kWp Smart Hybrid Pro",
      type: "hybrid",
      category: "Residential & Small Business",
      badge: "Most Popular in Sri Lanka ⭐",
      systemCapacity: "5 kWp + Battery Backup",
      monthlyGeneration: "600 - 650 Units (kWh)",
      idealForBill: "Rs. 32,000 - 55,000 / mo",
      priceRange: "Rs. 1,650,000 - 1,890,000",
      panels: "9x 550W Tier-1 N-Type TOPCon Panels",
      inverter: "1x 5kW Hybrid Inverter (Deye / Luxpower / Growatt) with UPS switchover",
      battery: "5.12 kWh LiFePO4 Lithium Battery (6000+ Cycles, 10-Yr Warranty)",
      warranty: "25-Yr Panel Output, 10-Yr Inverter, 10-Yr Battery",
      features: [
        "Uninterrupted 24/7 Power during CEB grid power cuts",
        "Powers Inverter AC, Refrigerators, Lights, Fans & Computers seamlessly",
        "Automatic zero-transfer UPS switch (< 10ms)",
        "CEB Net Accounting & Export support",
        "Cloud App remote monitoring & backup priority settings"
      ],
      popular: true
    },
    {
      id: "pkg-10kw-executive",
      name: "10kWp Executive PowerHouse",
      type: "hybrid",
      category: "Luxury Residential / Villa",
      badge: "High Capacity 3-Phase",
      systemCapacity: "10 kWp + 10.24 kWh Battery",
      monthlyGeneration: "1,200 - 1,350 Units (kWh)",
      idealForBill: "Rs. 65,000 - 120,000 / mo",
      priceRange: "Rs. 3,150,000 - 3,500,000",
      panels: "18x 585W Tier-1 High-Efficiency Bifacial Panels",
      inverter: "1x 10kW 3-Phase Hybrid Inverter (Deye / Huawei / GoodWe)",
      battery: "10.24 kWh LiFePO4 High-Capacity Lithium Bank",
      warranty: "25-Yr Panel Performance, 10-Yr Inverter, 10-Yr Battery",
      features: [
        "Complete energy independence for multi-story luxury residences",
        "Operates multiple Air Conditioners, Water Pumps, & EV Chargers",
        "3-Phase balanced CEB export generation",
        "Lightning arrestor & industrial-grade SPD protection",
        "Priority 24/7 VIP Maintenance Hotline"
      ],
      popular: false
    },
    {
      id: "pkg-20kw-commercial",
      name: "20kWp Commercial Enterprise",
      type: "ongrid",
      category: "Commercial & Offices",
      badge: "Business ROI Optimizer",
      systemCapacity: "20 kWp (3-Phase)",
      monthlyGeneration: "2,400 - 2,650 Units (kWh)",
      idealForBill: "Rs. 150,000 - 250,000 / mo",
      priceRange: "Rs. 4,200,000 - 4,750,000",
      panels: "36x 585W Tier-1 Industrial Bifacial PV Modules",
      inverter: "1x 20kW 3-Phase Commercial Inverter (Huawei / Growatt MAX)",
      warranty: "25-Yr Panel Output, 10-Yr Inverter, 10-Yr Workmanship",
      features: [
        "Rapid payback period: 2.8 - 3.2 Years",
        "Slash peak commercial tariff rates significantly",
        "CEB Net Plus / Net Accounting eligible with industrial grid synchronization",
        "Comprehensive single-line engineering drawings & CEB compliance package",
        "Quarterly drone thermal inspection included for Year 1"
      ],
      popular: false
    },
    {
      id: "pkg-50kw-industrial",
      name: "50kWp - 250kWp Industrial Plant",
      type: "commercial",
      category: "Factories & Warehouses",
      badge: "1MW+ Proven Tier",
      systemCapacity: "50 kWp - 250 kWp Custom",
      monthlyGeneration: "6,000 - 30,000+ Units (kWh)",
      idealForBill: "Rs. 400,000 - 2,000,000+ / mo",
      priceRange: "Custom Corporate Quotation (Wholesale pricing)",
      panels: "Tier-1 Longi / Jinko 585W - 610W Solar Modules",
      inverter: "Commercial string inverters (Huawei SUN2000 / Sungrow)",
      warranty: "25-Yr Linear Power Guarantee, 10-Yr String Inverter",
      features: [
        "Engineered for zinc-alum, concrete, or tile industrial roofs",
        "Full SCADA remote telemetry & live generation dashboard",
        "Assistance with Green Energy Corporate Bank financing (HNB, Commercial Bank, DFCC)",
        "Zero-capex PPA (Power Purchase Agreement) options available",
        "Contributes to corporate carbon neutrality & ISO 14001 compliance"
      ],
      popular: false
    },
    {
      id: "pkg-agri-waterpump",
      name: "AgriSolar Water Pumping & Off-Grid",
      type: "offgrid",
      category: "Agriculture & Farms",
      badge: "Zero Electricity Bill",
      systemCapacity: "3kW - 7.5kW Solar Pump Drive",
      monthlyGeneration: "Independent Off-Grid",
      idealForBill: "Farms, Estates, Remote Locations without CEB",
      priceRange: "Rs. 890,000 - 1,450,000",
      panels: "Tier-1 Mono PERC Solar Panels",
      inverter: "VFD Solar Pump Controller (Submersible / Surface pumps)",
      warranty: "25-Yr Panel, 5-Yr Pump Drive Controller",
      features: [
        "Runs directly from sunlight with NO batteries required",
        "Pumps water even on overcast days using MPPT variable frequency",
        "Automatic dry-run protection and water level sensor controls",
        "Immune to diesel price hikes and CEB power cuts",
        "Ideal for Paddy, Coconut, Cinnamon, and Dragon Fruit plantations"
      ],
      popular: false
    }
  ],

  // Pre-loaded Customer Inquiries for Dealers Leads Portal
  initialLeads: [
    {
      id: "LEAD-78901",
      customerName: "Dr. Janaka Wickramasinghe",
      phoneMasked: "077 452 **** (Unlock to view)",
      phoneFull: "077 452 8912",
      district: "Colombo",
      city: "Rajagiriya",
      systemType: "5kW Hybrid (Lithium Backup)",
      roofType: "Tile Roof",
      monthlyBill: "Rs. 48,000",
      urgency: "High (Ready this month)",
      notes: "Frequent power interruptions in the area. Wants battery backup for medical refrigeration and home AC.",
      status: "Available",
      datePosted: "Today, 10:15 AM",
      verified: true
    },
    {
      id: "LEAD-78902",
      customerName: "Mohamed Razeek",
      phoneMasked: "071 893 **** (Unlock to view)",
      phoneFull: "071 893 2190",
      district: "Kandy",
      city: "Peradeniya",
      systemType: "10kW On-Grid 3-Phase",
      roofType: "Zinc-Alum Sheet",
      monthlyBill: "Rs. 75,000",
      urgency: "Immediate",
      notes: "Large 2-story building. Has 3-phase CEB connection. Wants maximum Net Accounting export.",
      status: "Available",
      datePosted: "Today, 08:45 AM",
      verified: true
    },
    {
      id: "LEAD-78903",
      customerName: "Sanath Karunaratne (Factory Owner)",
      phoneMasked: "076 112 **** (Unlock to view)",
      phoneFull: "076 112 7741",
      district: "Gampaha",
      city: "Biyagama",
      systemType: "30kW Commercial 3-Phase",
      roofType: "Asbestos Roof",
      monthlyBill: "Rs. 240,000",
      urgency: "Within 2 Weeks",
      notes: "Small manufacturing warehouse. Needs site visit and bank loan feasibility report for Commercial Bank.",
      status: "Available",
      datePosted: "Yesterday",
      verified: true
    },
    {
      id: "LEAD-78904",
      customerName: "Niroshan De Silva",
      phoneMasked: "075 621 **** (Unlock to view)",
      phoneFull: "075 621 3390",
      district: "Galle",
      city: "Unawatuna",
      systemType: "5kW Hybrid System",
      roofType: "Concrete Slab",
      monthlyBill: "Rs. 38,000",
      urgency: "Medium",
      notes: "Boutique guest villa. Needs quiet battery backup for tourists during power cuts.",
      status: "Available",
      datePosted: "Yesterday",
      verified: true
    },
    {
      id: "LEAD-78905",
      customerName: "Priyanka Jayawardena",
      phoneMasked: "077 905 **** (Unlock to view)",
      phoneFull: "077 905 4418",
      district: "Kurunegala",
      city: "Wariyapola",
      systemType: "3kW On-Grid System",
      roofType: "Tile Roof",
      monthlyBill: "Rs. 22,000",
      urgency: "High",
      notes: "Single phase home. Wants to reduce CEB electricity bill to zero. Ready to pay cash or 12-month card installment.",
      status: "Available",
      datePosted: "2 days ago",
      verified: true
    },
    {
      id: "LEAD-78906",
      customerName: "Dharmasena Ranatunga",
      phoneMasked: "070 334 **** (Unlock to view)",
      phoneFull: "070 334 1255",
      district: "Kalutara",
      city: "Panadura",
      systemType: "5kW On-Grid System",
      roofType: "Tile Roof",
      monthlyBill: "Rs. 35,000",
      urgency: "This Month",
      notes: "Needs roof inspection. Inquiring about HNB Green Solar Loan.",
      status: "Available",
      datePosted: "3 days ago",
      verified: true
    }
  ],

  // Certified Solar Dealers & Installers across Sri Lanka
  dealers: [
    {
      id: "DLR-101",
      companyName: "Lanka Solar Solutions & Engineering",
      director: "Eng. Kasun Bandara (CEB Certified)",
      districts: ["Colombo", "Gampaha", "Kalutara"],
      phone: "011-2856400",
      mobile: "077-1234567",
      whatsapp: "94771234567",
      rating: 4.9,
      reviewCount: 78,
      installedKw: 380,
      completedJobs: 142,
      badge: "Master Tier-1 Installer",
      tier: "Gold Partner",
      address: "No. 45, High Level Road, Maharagama",
      verified: true
    },
    {
      id: "DLR-102",
      companyName: "Central Hills Renewable Energy",
      director: "Ruwan Senanayake (B.Sc. Eng)",
      districts: ["Kandy", "Matale", "Nuwara Eliya"],
      phone: "081-2234900",
      mobile: "071-8899221",
      whatsapp: "94718899221",
      rating: 4.8,
      reviewCount: 62,
      installedKw: 240,
      completedJobs: 89,
      badge: "Highland Solar Specialist",
      tier: "Gold Partner",
      address: "William Gopallawa Mawatha, Kandy",
      verified: true
    },
    {
      id: "DLR-103",
      companyName: "Southern Green Power Technologies",
      director: "Ashen Mendis",
      districts: ["Galle", "Matara", "Hambantota"],
      phone: "091-2244800",
      mobile: "076-5544332",
      whatsapp: "94765544332",
      rating: 4.9,
      reviewCount: 54,
      installedKw: 195,
      completedJobs: 71,
      badge: "Coastal Anti-Corrosion Expert",
      tier: "Silver Partner",
      address: "Main Street, Galle Fort Entrance, Galle",
      verified: true
    },
    {
      id: "DLR-104",
      companyName: "Wayamba Solar Dynamics",
      director: "Tissa Wijeratne",
      districts: ["Kurunegala", "Puttalam"],
      phone: "037-2289100",
      mobile: "070-9988776",
      whatsapp: "94709988776",
      rating: 4.7,
      reviewCount: 41,
      installedKw: 165,
      completedJobs: 64,
      badge: "Agri & Commercial Solar Lead",
      tier: "Silver Partner",
      address: "Colombo Road, Kurunegala",
      verified: true
    },
    {
      id: "DLR-105",
      companyName: "Rajarata Eco Energy",
      director: "Sunil Jayasundara",
      districts: ["Anuradhapura", "Polonnaruwa"],
      phone: "025-2233110",
      mobile: "077-4455667",
      whatsapp: "94774455667",
      rating: 4.8,
      reviewCount: 36,
      installedKw: 140,
      completedJobs: 53,
      badge: "High-Sun Zone Certified",
      tier: "Authorized Partner",
      address: "Bank Town, Anuradhapura",
      verified: true
    }
  ],

  // 1MW+ Major Projects Showcase
  projects: [
    {
      title: "250 kW Industrial Rooftop - Nuwara Eliya Tea Factory",
      category: "Industrial",
      district: "Nuwara Eliya",
      capacity: "250 kWp",
      panels: "450x Tier-1 Bifacial PV Modules",
      inverters: "2x 110kW Huawei String Inverters",
      annualGeneration: "360,000 kWh / year",
      annualSavings: "Rs. 13,500,000 / year",
      description: "Replaced high-tariff grid electricity during morning processing peak hours. One of the highest altitude solar rooftop installations in Sri Lanka.",
      image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "150 kW Garment & Textile Complex - Biyagama EPZ",
      category: "Commercial",
      district: "Gampaha",
      capacity: "150 kWp",
      panels: "270x 555W Mono PERC Panels",
      inverters: "Growatt MAX 3-Phase Commercial System",
      annualGeneration: "216,000 kWh / year",
      annualSavings: "Rs. 8,200,000 / year",
      description: "Full rooftop coverage with zero structural vibration. Enabled European export compliance for green carbon credentials.",
      image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "80 kW Eco-Resort & Luxury Villas - Bentota",
      category: "Hospitality / Hybrid",
      district: "Galle",
      capacity: "80 kWp + 60 kWh LiFePO4 Storage",
      panels: "High-grade Marine Anodized Mountings",
      inverters: "Modular Deye Multi-Parallel Hybrid",
      annualGeneration: "115,000 kWh / year",
      annualSavings: "Rs. 4,600,000 / year",
      description: "Provides silent, odor-free luxury experience for international guests without noisy diesel generators during CEB grid outages.",
      image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "40 kW Cold Storage & Agricultural Warehouse - Dambulla",
      category: "Agriculture",
      district: "Matale",
      capacity: "40 kWp (3-Phase)",
      panels: "Tier-1 Half-Cut Solar Cells",
      inverters: "Solis 3-Phase Industrial Drive",
      annualGeneration: "58,000 kWh / year",
      annualSavings: "Rs. 2,400,000 / year",
      description: "Slashes heavy cold storage refrigeration costs during daytime peak sunlight hours, preserving vegetable produce with zero electricity stress.",
      image: "https://images.unsplash.com/photo-1508873696983-2df5703bc222?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "15 kW Multi-Storey Residence - Colombo 07",
      category: "Residential",
      district: "Colombo",
      capacity: "15 kWp Hybrid + 15 kWh Battery",
      panels: "All-Black Aesthetic Rooftop Modules",
      inverters: "Luxury Grade Smart Hybrid with EV Charger Integration",
      annualGeneration: "21,600 kWh / year",
      annualSavings: "Rs. 1,440,000 / year",
      description: "Powers 5 dual-inverter ACs, home theater, electric vehicle charging, and smart home automation effortlessly.",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Over 500+ Residential Rooftops Islandwide (3kW - 10kW)",
      category: "Islandwide Milestone",
      district: "All 18 Districts",
      capacity: "610+ kWp Combined",
      panels: "Tier-1 Bloomberg Approved Panels",
      inverters: "Growatt, Deye & Solis Grid-Tied Systems",
      annualGeneration: "878,000 kWh / year",
      annualSavings: "Rs. 32,000,000+ / year",
      description: "Hundreds of everyday Sri Lankan homeowners saving millions while contributing to our nation's renewable energy independence.",
      image: "https://images.unsplash.com/photo-1545209179-a5dd553896e2?auto=format&fit=crop&w=800&q=80"
    }
  ]
};

// LocalStorage helpers to allow dynamic leads submission & claiming
function getStoredLeads() {
  const stored = localStorage.getItem("sunpower_leads");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error("Error parsing stored leads", e);
    }
  }
  // Initialize with default verified leads
  localStorage.setItem("sunpower_leads", JSON.stringify(SUNPOWER_DATA.initialLeads));
  return SUNPOWER_DATA.initialLeads;
}

function saveNewLead(leadObj) {
  const current = getStoredLeads();
  current.unshift(leadObj);
  localStorage.setItem("sunpower_leads", JSON.stringify(current));
  return current;
}

function getStoredDealers() {
  const stored = localStorage.getItem("sunpower_dealers");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error("Error parsing stored dealers", e);
    }
  }
  localStorage.setItem("sunpower_dealers", JSON.stringify(SUNPOWER_DATA.dealers));
  return SUNPOWER_DATA.dealers;
}

function saveNewDealer(dealerObj) {
  const current = getStoredDealers();
  current.unshift(dealerObj);
  localStorage.setItem("sunpower_dealers", JSON.stringify(current));
  return current;
}
