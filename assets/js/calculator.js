/**
 * SunPower Lanka - Solar ROI & CEB/LECO Tariff Calculator
 * Tailored for Sri Lankan solar generation factors and CEB tariff structures
 */

document.addEventListener("DOMContentLoaded", () => {
  initQuickCalculator();
  initDetailedCalculator();
});

// Quick slider calculator on Home page
function initQuickCalculator() {
  const quickSlider = document.getElementById("quick-bill-slider");
  const billDisplay = document.getElementById("quick-bill-value");
  const kwDisplay = document.getElementById("quick-rec-kw");
  const savingsDisplay = document.getElementById("quick-est-savings");
  const panelsDisplay = document.getElementById("quick-panels-count");
  const ctaBtn = document.getElementById("quick-calc-cta");

  if (!quickSlider) return;

  function updateQuickCalc() {
    const bill = parseInt(quickSlider.value);
    billDisplay.innerText = "Rs. " + bill.toLocaleString();

    // Approximate units based on SL CEB domestic tariffs
    let units = 0;
    if (bill <= 15000) {
      units = bill / 60;
    } else if (bill <= 35000) {
      units = 250 + (bill - 15000) / 75;
    } else if (bill <= 70000) {
      units = 500 + (bill - 35000) / 80;
    } else {
      units = 900 + (bill - 70000) / 85;
    }

    // Solar sizing in Sri Lanka: 1 kWp ≈ 120 units/mo
    let recKw = (units / 120);
    recKw = Math.max(2.5, Math.ceil(recKw * 2) / 2); // Round to nearest 0.5kW, min 2.5kW

    const panelCount = Math.ceil((recKw * 1000) / 550);
    // Estimated monthly saving (offsetting ~90-95% of bill)
    const monthlySaving = Math.round(bill * 0.92);

    if (kwDisplay) kwDisplay.innerText = recKw.toFixed(1) + " kWp";
    if (savingsDisplay) savingsDisplay.innerText = "Rs. " + monthlySaving.toLocaleString() + "/mo";
    if (panelsDisplay) panelsDisplay.innerText = panelCount + " Panels";

    if (ctaBtn) {
      ctaBtn.setAttribute("data-system", `${recKw.toFixed(1)}kW Solar System`);
    }
  }

  quickSlider.addEventListener("input", updateQuickCalc);
  updateQuickCalc();
}

// Full Advanced Calculator on calculator.html
function initDetailedCalculator() {
  const billInput = document.getElementById("calc-bill-input");
  const billSlider = document.getElementById("calc-bill-slider");
  const unitsInput = document.getElementById("calc-units-input");
  const systemTypeSelect = document.getElementById("calc-system-type");
  const roofTypeSelect = document.getElementById("calc-roof-type");

  // Output fields
  const outSystemKw = document.getElementById("out-system-kw");
  const outPanels = document.getElementById("out-panels");
  const outRoofSpace = document.getElementById("out-roof-space");
  const outMonthlyUnits = document.getElementById("out-monthly-units");
  const outMonthlySavings = document.getElementById("out-monthly-savings");
  const outAnnualSavings = document.getElementById("out-annual-savings");
  const outSystemCost = document.getElementById("out-system-cost");
  const outPayback = document.getElementById("out-payback");
  const out25YrSavings = document.getElementById("out-25yr-savings");
  const outCo2Offset = document.getElementById("out-co2-offset");
  const calcRequestBtn = document.getElementById("btn-calc-request");

  if (!billSlider || !outSystemKw) return;

  function syncFromBill(bill) {
    bill = Math.max(8000, Math.min(500000, bill));
    billInput.value = bill;
    billSlider.value = bill;

    // Estimate units
    let units = 0;
    if (bill <= 15000) {
      units = Math.round(bill / 60);
    } else if (bill <= 35000) {
      units = Math.round(250 + (bill - 15000) / 75);
    } else if (bill <= 80000) {
      units = Math.round(500 + (bill - 35000) / 80);
    } else {
      units = Math.round(1050 + (bill - 80000) / 85);
    }
    if (unitsInput) unitsInput.value = units;
    calculateDetailed(bill, units);
  }

  function syncFromUnits(units) {
    units = Math.max(100, Math.min(5000, units));
    // Estimate bill from units
    let bill = 0;
    if (units <= 250) {
      bill = units * 60;
    } else if (units <= 500) {
      bill = 15000 + (units - 250) * 75;
    } else if (units <= 1000) {
      bill = 35000 + (units - 500) * 80;
    } else {
      bill = 80000 + (units - 1000) * 85;
    }
    bill = Math.round(bill);
    billInput.value = bill;
    billSlider.value = bill;
    calculateDetailed(bill, units);
  }

  function calculateDetailed(bill, units) {
    const isHybrid = systemTypeSelect ? systemTypeSelect.value === "hybrid" : false;

    // 1 kWp ≈ 120 kWh/month in Sri Lanka
    let neededKw = units / 120;
    let recKw = Math.max(3, Math.ceil(neededKw * 2) / 2); // Steps of 0.5kW

    const panelWattage = 550;
    const panelCount = Math.ceil((recKw * 1000) / panelWattage);
    const roofAreaSqft = Math.round(recKw * 72); // ~72 sqft per kWp
    const monthlyGenUnits = Math.round(recKw * 120);

    // Bill offset
    const monthlySavings = Math.round(bill * 0.94); // offset 94% after minor fixed charge
    const annualSavings = monthlySavings * 12;

    // Cost estimation
    let estimatedCost = 0;
    if (isHybrid) {
      // Hybrid inverter + LiFePO4 battery costs in Sri Lanka
      // ~Rs. 1,650,000 for 5kW, scaling approx Rs. 290,000 per kW plus battery block
      const batteryKwh = recKw <= 5 ? 5.12 : 10.24;
      estimatedCost = Math.round(recKw * 240000 + (batteryKwh * 85000) + 150000);
    } else {
      // Standard On-Grid
      // ~Rs. 250,000 - 270,000 per kW in Sri Lanka
      estimatedCost = Math.round(recKw * 260000);
    }

    const paybackYears = (estimatedCost / annualSavings).toFixed(1);
    const lifetimeSavings = Math.round((annualSavings * 25) - estimatedCost);
    const co2OffsetAnnual = (monthlyGenUnits * 12 * 0.00085).toFixed(1); // tons CO2

    // Update UI
    outSystemKw.innerText = `${recKw.toFixed(1)} kWp`;
    outPanels.innerText = `${panelCount} Units`;
    outRoofSpace.innerText = `~${roofAreaSqft} sq.ft`;
    outMonthlyUnits.innerText = `~${monthlyGenUnits} kWh`;
    outMonthlySavings.innerText = `Rs. ${monthlySavings.toLocaleString()}`;
    outAnnualSavings.innerText = `Rs. ${annualSavings.toLocaleString()}`;
    outSystemCost.innerText = `Rs. ${estimatedCost.toLocaleString()}*`;
    outPayback.innerText = `${paybackYears} Years`;
    out25YrSavings.innerText = `Rs. ${lifetimeSavings.toLocaleString()}`;
    if (outCo2Offset) outCo2Offset.innerText = `${co2OffsetAnnual} Tons/Yr`;

    if (calcRequestBtn) {
      calcRequestBtn.setAttribute("data-system", `${recKw.toFixed(1)}kWp ${isHybrid ? 'Hybrid' : 'On-Grid'} System`);
      calcRequestBtn.setAttribute("data-bill", bill);
    }
  }

  billSlider.addEventListener("input", (e) => syncFromBill(parseInt(e.target.value)));
  billInput.addEventListener("change", (e) => syncFromBill(parseInt(e.target.value) || 25000));
  if (unitsInput) {
    unitsInput.addEventListener("change", (e) => syncFromUnits(parseInt(e.target.value) || 300));
  }
  if (systemTypeSelect) {
    systemTypeSelect.addEventListener("change", () => syncFromBill(parseInt(billSlider.value)));
  }

  // Initial calculation
  syncFromBill(35000);
}
