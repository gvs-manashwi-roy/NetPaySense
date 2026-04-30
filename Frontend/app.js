// ── Global Config (With Safety Lock) ──
if (typeof window.APP_LOADED === 'undefined') {
  window.APP_LOADED = true;

  window.BANK_DOMAINS = {
    "State Bank of India": "sbi.co.in",
    "HDFC Bank": "hdfcbank.com",
    "ICICI Bank": "icicibank.com",
    "Punjab National Bank": "pnbindia.in",
    "Bank Of Baroda": "bankofbaroda.in",
    "Canara Bank": "canarabank.com",
    "Axis Bank": "axisbank.com",
    "Airtel Payments Bank": "airtel.in",
    "Kotak Mahindra Bank": "kotak.com",
    "AU Small Finance Bank": "aubank.in"
  };
}

window.BANK_DROPDOWN_OPTIONS = [
  { value: "", name: "Choose Bank" },
  { value: "State Bank of India", name: "State Bank of India (SBI)" },
  { value: "HDFC Bank", name: "HDFC Bank" },
  { value: "ICICI Bank", name: "ICICI Bank" },
  { value: "Punjab National Bank", name: "Punjab National Bank" },
  { value: "Bank Of Baroda", name: "Bank of Baroda" },
  { value: "Canara Bank", name: "Canara Bank" },
  { value: "Axis Bank", name: "Axis Bank" },
  { value: "Airtel Payments Bank", name: "Airtel Payments Bank" },
  { value: "Kotak Mahindra Bank", name: "Kotak Mahindra Bank" },
  { value: "AU Small Finance Bank", name: "AU Small Finance Bank" }
];

// ── Custom Dropdown Logic ──
function toggleCustomDropdown() {
  document.getElementById('custom-select-options').classList.toggle('hidden');
}

function selectCustomBank(value, name) {
  const select = document.getElementById('bank-select');
  if (select) select.value = value;

  const displayValue = document.getElementById('custom-select-value');
  const domain = BANK_DOMAINS[value];

  if (value && domain) {
    displayValue.innerHTML = `<span style="display:flex; align-items:center; gap:8px;">
      <img src="https://www.google.com/s2/favicons?domain=${domain}&sz=64" class="bank-logo" onerror="this.style.display='none'"> 
      ${name}
    </span>`;
  } else {
    displayValue.innerHTML = `<span style="display:flex; align-items:center; gap:8px;">${name}</span>`;
  }

  document.getElementById('custom-select-options').classList.add('hidden');
  selectPaymentBank(); // trigger change
}

function initCustomDropdown() {
  const container = document.getElementById('custom-select-options');
  if (!container) return;

  container.innerHTML = BANK_DROPDOWN_OPTIONS
    .filter(opt => opt.value !== "") 
    .map(opt => {
      const domain = BANK_DOMAINS[opt.value];
      const logoHtml = domain ? `<img src="https://www.google.com/s2/favicons?domain=${domain}&sz=64" class="bank-logo" onerror="this.src='https://cdn-icons-png.flaticon.com/64/2830/2830284.png'">` : '';
      return `<div class="custom-select-option" onclick="selectCustomBank('${opt.value}', '${opt.name}')">
        ${logoHtml} ${opt.name}
      </div>`;
    }).join('');
}

// Close dropdown if clicked outside
document.addEventListener('click', (e) => {
  const wrap = document.getElementById('custom-bank-select');
  const opts = document.getElementById('custom-select-options');
  if (wrap && opts && !wrap.contains(e.target)) {
    opts.classList.add('hidden');
  }
});

// ── Theme ──
function initTheme() {
  const saved = localStorage.getItem('nps_theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  const toggle = document.getElementById('dark-mode-toggle');
  if (toggle) toggle.checked = saved === 'dark';
}

function toggleDarkMode(on) {
  const theme = on ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('nps_theme', theme);
}

// ── Onboarding ──
function initOnboarding() {
  if (!localStorage.getItem('nps_onboarded')) {
    document.getElementById('onboarding').classList.remove('hidden');
  }
}

let obIndex = 0;
function obSkip() {
  document.getElementById('onboarding').classList.add('hidden');
  localStorage.setItem('nps_onboarded', '1');
}
function obNext() {
  const slides = document.querySelectorAll('.ob-slide');
  const dots = document.querySelectorAll('.ob-dot');
  slides[obIndex].classList.remove('active');
  dots[obIndex].classList.remove('active');
  obIndex++;
  if (obIndex >= slides.length) {
    document.getElementById('onboarding').classList.add('hidden');
    localStorage.setItem('nps_onboarded', '1');
    return;
  }
  slides[obIndex].classList.add('active');
  dots[obIndex].classList.add('active');
  if (obIndex === slides.length - 1) {
    document.getElementById('ob-next-btn').textContent = "Get Started ✓";
  }
}

// ── Settings ──
function openSettings() {
  document.getElementById('settings-panel').classList.remove('hidden');
}
function closeSettings() {
  document.getElementById('settings-panel').classList.add('hidden');
}
function closeSettingsOverlay(e) {
  if (e.target === document.getElementById('settings-panel')) closeSettings();
}
function editProfile() {
  const name = prompt('Enter your name:', 'NetPaySense User');
  if (name) document.querySelector('.settings-profile-name').textContent = name;
}
function showIntro() {
  obIndex = 0;
  document.querySelectorAll('.ob-slide').forEach((s, i) => s.classList.toggle('active', i === 0));
  document.querySelectorAll('.ob-dot').forEach((d, i) => d.classList.toggle('active', i === 0));
  document.getElementById('ob-next-btn').textContent = 'Next →';
  localStorage.removeItem('nps_onboarded');
  document.getElementById('onboarding').classList.remove('hidden');
  closeSettings();
}

function clearHistory() {
  recents = [];
  localStorage.removeItem('nps_recents');
  renderRecents();
  closeSettings();
}

// ── Real-time Bank Status ──
async function refreshBankStatus() {
  try {
    const res = await fetch('/bank-status');
    const data = await res.json();

    // Update the live bank grid in the Banks tab
    if (data.banks) {
      renderLiveBankGrid(data.banks, data.last_updated);
    }

    // Update BANK_DATA so results panel is also accurate
    if (data.banks) {
      data.banks.forEach(b => {
        const key = Object.keys(BANK_DATA).find(k =>
          BANK_DATA[k].name.toLowerCase().includes(b.bank.toLowerCase()) ||
          b.bank.toLowerCase().includes(BANK_DATA[k].name.split(' ')[0].toLowerCase())
        );
        if (key) {
          BANK_DATA[key].ok = b.status === 'UP';
          BANK_DATA[key].rows = [{ label: 'UPI Transactions', status: b.status }];
          BANK_DATA[key].overall = b.status === 'DOWN'
            ? 'CRITICAL: Server Down'
            : b.status === 'FLUCTUATING'
              ? 'Warning: Fluctuating'
              : 'All Services Operational';
        }
      });
    }

    // Show/hide issues banner and all-clear
    const problematic = data.problematic_banks || [];
    renderProblematicBanks(problematic);

  } catch (err) {
    console.error("Bank status fetch failed", err);
    const grid = document.getElementById('live-bank-grid');
    if (grid) grid.innerHTML = `<div class="bank-grid-loading" style="color:#ef4444">⚠️ Could not connect to backend</div>`;
  }
}

// 🔥 Render Live Bank Status Grid
function renderLiveBankGrid(banks, lastUpdated) {
  const grid = document.getElementById('live-bank-grid');
  if (!grid) return;

  // Update timestamp
  const tsEl = document.getElementById('bank-last-updated');
  if (tsEl && lastUpdated) {
    const d = new Date(lastUpdated);
    tsEl.textContent = `Updated: ${d.toLocaleTimeString()}`;
  }

  if (!banks || banks.length === 0) {
    grid.innerHTML = `<div class="bank-grid-loading">No data available yet</div>`;
    return;
  }

  grid.innerHTML = banks.map(b => {
    const statusClass = b.status === 'UP' ? 'status-up'
      : b.status === 'DOWN' ? 'status-down'
        : 'status-warn';
    const staleNote = b.stale ? `<div style="font-size:0.6rem; opacity:0.6; margin-top:2px;">⏱ stale</div>` : '';

    const domain = BANK_DOMAINS[b.bank];
    const logoSrc = domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : `https://api.dicebear.com/7.x/initials/svg?seed=${b.bank}&backgroundColor=0ea5e9`;

    return `
      <div class="bank-grid-card fade-in">
        <div class="bank-grid-logo-wrap">
          <img src="${logoSrc}" onerror="this.src='https://cdn-icons-png.flaticon.com/64/2830/2830284.png'" alt="${b.bank}">
        </div>
        <span class="bank-grid-name">${b.bank}</span>
        <span class="bank-grid-status-badge ${statusClass}">${b.status}</span>
        ${staleNote}
      </div>`;
  }).join('');
}

// 🔥 Render Problematic Banks (Issues Banner)
function renderProblematicBanks(banks) {
  const banner = document.getElementById('bank-issues-banner');
  const allClear = document.getElementById('bank-all-clear');
  const container = document.getElementById('problematic-banks-list');

  if (!banks || banks.length === 0) {
    if (banner) banner.classList.add('hidden');
    if (allClear) allClear.classList.remove('hidden');
    return;
  }

  if (banner) banner.classList.remove('hidden');
  if (allClear) allClear.classList.add('hidden');

  if (container) {
    container.innerHTML = banks.map(b => `
      <div style="display:flex; justify-content:space-between; align-items:center; padding:6px 0; border-bottom:1px solid rgba(0,0,0,0.06)">
        <span style="font-weight:500; font-size:0.88rem">${b.icon} ${b.bank}</span>
        <span class="bank-issue-badge ${b.status.toLowerCase()}" style="font-size:0.75rem">${b.status}</span>
      </div>
    `).join('');
  }
}

// ── Scroll to Top ──
function scrollToTop() {
  const main = document.querySelector('.main:not(.hidden)');
  if (main) main.scrollTo({ top: 0, behavior: 'smooth' });
}

function initScrollTop() {
  document.querySelectorAll('.main').forEach(el => {
    el.addEventListener('scroll', () => {
      const btn = document.getElementById('scroll-top-btn');
      if (el.scrollTop > 200) btn.classList.remove('hidden');
      else btn.classList.add('hidden');
    });
  });
}

// ── Risk Gauge (Canvas) ──
// ── Risk Gauge (Canvas) ──
function drawGauge(canvasId, score, labelId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  const cx = W / 2, cy = H - 10, r = 80;
  const startAngle = Math.PI, endAngle = 2 * Math.PI;

  // Background arc
  ctx.beginPath();
  ctx.arc(cx, cy, r, startAngle, endAngle);
  ctx.lineWidth = 18;
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineCap = 'round';
  ctx.stroke();

  // CONVERT SUCCESS TO RISK
  // 5% Success = 95% Risk (Right)
  // 99% Success = 1% Risk (Left)
  const riskValue = Math.min(100, Math.max(0, 100 - score));
  const normalizedRisk = riskValue / 100;
  const needleAngle = startAngle + (normalizedRisk * Math.PI);
  
  // COLOR BY RISK
  let riskColor = '#22c55e'; // Green for Low Risk
  let riskStatus = 'Low Risk';
  
  if (riskValue > 45) {
    riskColor = '#ef4444'; // Red for High Risk
    riskStatus = 'High Risk';
  } else if (riskValue > 15) {
    riskColor = '#f59e0b'; // Amber for Medium Risk
    riskStatus = 'Medium Risk';
  }

  // Draw the progress arc up to the needle
  ctx.beginPath();
  ctx.arc(cx, cy, r, startAngle, needleAngle);
  ctx.strokeStyle = riskColor;
  ctx.stroke();

  // Draw the needle
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + Math.cos(needleAngle) * (r - 10), cy + Math.sin(needleAngle) * (r - 10));
  ctx.strokeStyle = '#1e40af';
  ctx.lineWidth = 4;
  ctx.stroke();

  // Center hub
  ctx.beginPath();
  ctx.arc(cx, cy, 8, 0, 2 * Math.PI);
  ctx.fillStyle = '#1e40af';
  ctx.fill();

  // Labels
  ctx.font = '600 11px Inter, sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.textAlign = 'left'; ctx.fillText('Low Risk', cx - r - 2, cy - 4);
  ctx.textAlign = 'right'; ctx.fillText('High Risk', cx + r + 2, cy - 4);

  // Update text label below
  if (labelId) {
    const lbl = document.getElementById(labelId);
    if (lbl) {
      lbl.textContent = riskStatus;
      lbl.style.color = riskColor;
    }
  }
}

// ── Sparkline ──
function drawSparkline() {
  const canvas = document.getElementById('sparkline-canvas');
  if (!canvas || recents.length === 0) return;
  canvas.width = canvas.parentElement.offsetWidth || 300;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = 60;
  ctx.clearRect(0, 0, W, H);

  const tierScore = { good: 90, mid: 55, poor: 20 };
  const data = recents.slice(0, 5).reverse().map(r => tierScore[r.tier] || 50);
  const max = 100, min = 0;
  const step = W / (data.length - 1 || 1);

  const points = data.map((v, i) => ({
    x: i * step,
    y: H - ((v - min) / (max - min)) * (H - 10) - 5
  }));

  // Gradient fill
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, 'rgba(37,99,235,0.3)');
  grad.addColorStop(1, 'rgba(37,99,235,0)');
  ctx.beginPath();
  ctx.moveTo(points[0].x, H);
  points.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.lineTo(points[points.length - 1].x, H);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Line
  ctx.beginPath();
  points.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
  ctx.strokeStyle = '#2563eb';
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';
  ctx.stroke();

  // Dots
  points.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 4, 0, 2 * Math.PI);
    ctx.fillStyle = '#2563eb';
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();
  });
}

// ── App Data ──
const COORDS = [
  { lat: 12.9716, lng: 77.6079 }, { lat: 12.9352, lng: 77.6245 },
  { lat: 13.0827, lng: 80.2707 }, { lat: 19.0760, lng: 72.8777 },
  { lat: 28.6139, lng: 77.2090 }, { lat: 17.3850, lng: 78.4867 },
  { lat: 22.5726, lng: 88.3639 }, { lat: 12.2958, lng: 76.6394 },
  { lat: 15.3173, lng: 75.7139 }, { lat: 26.9124, lng: 75.7873 },
];

const SIGNALS = [
  { dbm: -58, type: '5G', label: 'Excellent Signal', tier: 'good', bars: 5, upi: 'High - 96%', badge: 'Low Risk' },
  { dbm: -65, type: '5G', label: 'Excellent Signal', tier: 'good', bars: 5, upi: 'High - 91%', badge: 'Low Risk' },
  { dbm: -72, type: '4G', label: 'Good Signal', tier: 'good', bars: 4, upi: 'High - 84%', badge: 'Low Risk' },
  { dbm: -80, type: '4G', label: 'Good Signal', tier: 'good', bars: 3, upi: 'Medium - 72%', badge: 'Low Risk' },
  { dbm: -88, type: '4G', label: 'Moderate Signal', tier: 'mid', bars: 3, upi: 'Medium - 61%', badge: 'Medium Risk' },
  { dbm: -95, type: '3G', label: 'Moderate Signal', tier: 'mid', bars: 2, upi: 'Medium - 48%', badge: 'Medium Risk' },
  { dbm: -102, type: '4G', label: 'Poor Signal', tier: 'poor', bars: 1, upi: 'Low - 32%', badge: 'High Risk' },
  { dbm: -110, type: '4G', label: 'Poor Signal', tier: 'poor', bars: 1, upi: 'Low - 28%', badge: 'High Risk' },
  { dbm: -115, type: '2G', label: 'Very Poor Signal', tier: 'poor', bars: 1, upi: 'Low - 14%', badge: 'High Risk' },
];

const RECS = {
  good: [
    { icon: '📱', text: '<strong>Use Airtel / Jio</strong> — network is stable and fast' },
    { icon: '✅', text: '<strong>Safe to proceed</strong> with UPI payments now' },
    { icon: '⚡', text: '<strong>Fast transactions</strong> expected under 5 seconds' },
    { icon: '🔒', text: '<strong>Low risk</strong> of payment failure or timeout' },
  ],
  mid: [
    { icon: '🔄', text: '<strong>Switch to Jio</strong> for better network stability' },
    { icon: '⏱️', text: '<strong>Wait 10-15 minutes</strong> and retry the payment' },
    { icon: '💵', text: '<strong>Carry Cash as Backup</strong> in case payment fails' },
  ],
  poor: [
    { icon: '🔄', text: '<strong>Switch to Vi / BSNL</strong> for better coverage here' },
    { icon: '⏱️', text: '<strong>Wait 10-15 minutes</strong> and retry the payment' },
    { icon: '💵', text: '<strong>Carry Cash as Backup</strong> - payments likely to fail' },
  ],
};

const BANK_DATA = {
  SBI: { name: 'SBI', rows: [{ label: 'UPI Transactions', status: 'Online' }, { label: 'UPI Balance Check', status: 'Available' }, { label: 'UPI Registration', status: 'Active' }], overall: 'All Services are Operational', ok: true },
  HDFC: { name: 'HDFC', rows: [{ label: 'UPI Transactions', status: 'Online' }, { label: 'UPI Balance Check', status: 'Available' }, { label: 'UPI Registration', status: 'Active' }], overall: 'All Services are Operational', ok: true },
  ICICI: { name: 'ICICI', rows: [{ label: 'UPI Transactions', status: 'Online' }, { label: 'UPI Balance Check', status: 'Delayed' }, { label: 'UPI Registration', status: 'Active' }], overall: 'Minor Delays Detected', ok: false },
  PNB: { name: 'PNB', rows: [{ label: 'UPI Transactions', status: 'Offline' }, { label: 'UPI Balance Check', status: 'Unavailable' }, { label: 'UPI Registration', status: 'Active' }], overall: 'UPI Transactions Currently Down', ok: false },
  BOB: { name: 'Bank of Baroda', rows: [{ label: 'UPI Transactions', status: 'Online' }, { label: 'UPI Balance Check', status: 'Available' }, { label: 'UPI Registration', status: 'Active' }], overall: 'All Services are Operational', ok: true },
  CANARA: { name: 'Canara Bank', rows: [{ label: 'UPI Transactions', status: 'Online' }, { label: 'UPI Balance Check', status: 'Available' }, { label: 'UPI Registration', status: 'Active' }], overall: 'All Services are Operational', ok: true },
  AXIS: { name: 'Axis Bank', rows: [{ label: 'UPI Transactions', status: 'Online' }, { label: 'UPI Balance Check', status: 'Available' }, { label: 'UPI Registration', status: 'Active' }], overall: 'All Services are Operational', ok: true },
  UNION: { name: 'Union Bank', rows: [{ label: 'UPI Transactions', status: 'Online' }, { label: 'UPI Balance Check', status: 'Delayed' }, { label: 'UPI Registration', status: 'Active' }], overall: 'Minor Delays Detected', ok: false },
  INDIAN: { name: 'Indian Bank', rows: [{ label: 'UPI Transactions', status: 'Online' }, { label: 'UPI Balance Check', status: 'Available' }, { label: 'UPI Registration', status: 'Active' }], overall: 'All Services are Operational', ok: true },
  BOI: { name: 'Bank of India', rows: [{ label: 'UPI Transactions', status: 'Online' }, { label: 'UPI Balance Check', status: 'Available' }, { label: 'UPI Registration', status: 'Active' }], overall: 'All Services are Operational', ok: true },
};

let currentSig = null;
let currentLat = 12.9716; // Bug 5 fix: initialize alongside currentLng
let currentLng = 77.5946;
let rawLat = 0, rawLng = 0; // 🔥 Store actual GPS coords for feedback
let isLiveSession = false; // 🔥 Track if current check is GPS-verified
let recents = JSON.parse(localStorage.getItem('nps_recents') || '[]');

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

// ── Location & Check ──
function goToLocationChecker() {
  isLiveSession = false; // Reset session type when manually checking new location
  // Hide bank dropdown when switching to checker
  document.getElementById('dash-bank-dropdown')?.classList.add('hidden');

  document.getElementById('dashboard-panel').classList.add('hidden');
  document.getElementById('app-main').classList.remove('hidden');
}

function getMyLocation() {
  // Hide bank dropdown when starting GPS fetch
  document.getElementById('dash-bank-dropdown')?.classList.add('hidden');

  const btn = document.getElementById('geo-btn');
  btn.textContent = '⏳ Fetching...';
  btn.disabled = true;
  // Show skeletons
  document.getElementById('skeleton-loc').classList.remove('hidden');
  document.getElementById('skeleton-net').classList.remove('hidden');

  if (!navigator.geolocation) { useLiveLocation(12.9716, 77.5946, 'Bengaluru', null); return; }

  navigator.geolocation.getCurrentPosition(
    async pos => {
      const lat = pos.coords.latitude, lng = pos.coords.longitude;
      let name = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;

      // Update UI for Pulse Test
      btn.textContent = '🚀 Probing Live...';

      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
        const data = await res.json();
        const a = data.address;
        const area = a.suburb || a.neighbourhood || a.village || a.town || a.city || a.county || '';
        const city = a.city || a.town || a.state_district || '';
        name = area ? (city && city !== area ? `${area}, ${city}` : area) : name;
      } catch { }

      // 🛰️ Run Pulse Test
      let liveMetrics = null;
      try {
        const pulseRes = await fetch('/pulse-test');
        liveMetrics = await pulseRes.json();
        if (liveMetrics.error) liveMetrics = null;
      } catch (e) { console.warn("Pulse test failed", e); }

      useLiveLocation(lat, lng, name, liveMetrics);
    },
    () => useLiveLocation(12.9716, 77.5946, 'Bengaluru', null)
  );
}

function useLiveLocation(lat, lng, name, liveMetrics) {
  isLiveSession = true; // ✅ This is a live GPS check
  const btn = document.getElementById('geo-btn');
  btn.textContent = '📍 Fetch My Location';
  btn.disabled = false;
  document.getElementById('skeleton-loc').classList.add('hidden');
  document.getElementById('skeleton-net').classList.add('hidden');
  document.getElementById('dashboard-panel').classList.add('hidden');
  document.getElementById('app-main').classList.remove('hidden');
  document.getElementById('loc-input').value = name;
  runCheckWithCoords(name, lat, lng, liveMetrics);
}

function runCheck() {
  isLiveSession = false; // ❌ This is a manual lookup
  // Hide bank dropdown when starting check
  document.getElementById('dash-bank-dropdown')?.classList.add('hidden');

  const raw = document.getElementById('loc-input').value.trim();
  if (!raw) { shake(document.getElementById('loc-input')); return; }
  const btn = document.getElementById('check-btn');
  btn.textContent = 'Checking…';
  btn.disabled = true;
  document.getElementById('empty-state').classList.add('hidden');
  resetFeedbackUI(); // 🔥 Reset feedback state for new test
  goStep(2);
  runAnalyzing(raw, btn);
}

function runCheckWithCoords(name, lat, lng, liveMetrics = null) {
  const btn = document.getElementById('check-btn');
  btn.textContent = 'Checking…';
  btn.disabled = true;
  resetFeedbackUI(); // 🔥 Reset feedback state for new test
  goStep(2);
  runAnalyzingWithCoords(name, lat, lng, btn, liveMetrics);
}

async function runAnalyzing(raw, btn) {
  animateSteps();

  try {
    let lat, lon;
    const coordMatch = raw.match(/^([-+]?\d+\.?\d*)\s*,\s*([-+]?\d+\.?\d*)$/);

    if (coordMatch) {
      // Direct coordinates entered
      lat = parseFloat(coordMatch[1]);
      lon = parseFloat(coordMatch[2]);
    } else {
      // 1. Geocode text (Adding context for better accuracy)
      const query = raw.toLowerCase().includes('karnataka') ? raw : `${raw}, Karnataka, India`;
      const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`);
      const geoData = await geoRes.json();
      if (!geoData.length) throw new Error('Location not found. Try adding the district name.');
      lat = parseFloat(geoData[0].lat);
      lon = parseFloat(geoData[0].lon);
    }

    rawLat = lat; rawLng = lon; // ✅ Save for feedback check

    // 2. Predict
    const res = await fetch('/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lat, lon })
    });

    if (res.status === 403) {
      const errData = await res.json();
      throw new Error(errData.message || 'Location outside of Karnataka');
    }

    if (!res.ok) throw new Error(`Server Error: ${res.status}`);
    const data = await res.json();
    
    // 🗺️ SMART MAP: Store prediction globally and update map
    currentLat = lat;
    currentLng = lon;
    window.lastPredictionData = data;
    setTimeout(() => {
      if (typeof updateMapWithPrediction === 'function') updateMapWithPrediction(data);
    }, 500);

    lastNetworkScore = parseFloat(data.upi.split('-').pop().match(/\d+\.?\d*/) || 90);
    currentSig = {
      tier: data.tier,
      label: data.label,
      upi: data.upi,
      badge: data.badge,
      dbm: data.dbm,
      type: data.type,
      metrics: data.metrics,
      serverVersion: "v4.1"
    };
    currentLat = data.lat;
    currentLng = data.lon;

    setTimeout(() => {
      try {
        document.getElementById('loc-name').textContent = raw;
        document.getElementById('loc-coords').textContent = `${data.lat.toFixed(4)}, ${data.lon.toFixed(4)}`;
        populateSignal(currentSig);
        populateRecs(currentSig.tier);
        showResultsBankStatus();

        const alertBanner = document.getElementById('community-alert-banner');
        if (alertBanner) {
          if (data.community_alert) alertBanner.classList.remove('hidden');
          else alertBanner.classList.add('hidden');
        }

        saveRecent(raw, { lat: data.lat, lng: data.lon }, currentSig);
        btn.textContent = 'Check'; btn.disabled = false;

        // 🔥 Show/Hide Feedback button based on Live status
        const fbBtn = document.getElementById('results-feedback-btn');
        if (fbBtn) fbBtn.style.display = isLiveSession ? 'block' : 'none';

        goStep(3);
      } catch (innerErr) {
        console.error("Transition error:", innerErr);
        btn.textContent = 'Check'; btn.disabled = false;
        goStep(1);
      }
    }, 1500);

  } catch (err) {
    alert(err.message || 'Error connecting to backend');
    btn.textContent = 'Check'; btn.disabled = false;
    goStep(1);
  }
}

async function runAnalyzingWithCoords(name, lat, lng, btn, liveMetrics = null) {
  rawLat = lat; rawLng = lng; // ✅ Save for feedback
  animateSteps();
  try {
    // Bug 1 fix: include selected bank so overrides fire on GPS checks
    const selectedBank = document.getElementById('bank-select')?.value || null;

    const res = await fetch('/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lat,
        lon: lng,
        live_metrics: liveMetrics,
        bank_name: selectedBank || undefined
      })
    });

    // Bug 4 fix: handle 403 (outside Karnataka) with a clear message
    if (res.status === 403) {
      const errData = await res.json();
      throw new Error(errData.message || 'Location outside of Karnataka');
    }

    if (!res.ok) throw new Error(`Server Error: ${res.status}`);
    const data = await res.json();

    // Bug 2 fix: update smart map with prediction data
    currentLat = lat;
    currentLng = lng;
    window.lastPredictionData = data;
    setTimeout(() => { updateMapWithPrediction(data); }, 500);

    currentSig = {
      tier: data.tier,
      label: data.label,
      upi: data.upi,
      badge: data.badge,
      dbm: data.dbm,
      type: data.type,
      metrics: data.metrics,
      serverVersion: data.server_version || "v4.1"
    };

    setTimeout(() => {
      try {
        document.getElementById('loc-name').textContent = name;
        document.getElementById('loc-coords').textContent = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
        populateSignal(currentSig);
        populateRecs(currentSig.tier);
        showResultsBankStatus();

        const alertBanner = document.getElementById('community-alert-banner');
        if (alertBanner) {
          if (data.community_alert) alertBanner.classList.remove('hidden');
          else alertBanner.classList.add('hidden');
        }

        saveRecent(name, { lat, lng }, currentSig);
        btn.textContent = 'Check'; btn.disabled = false;

        const fbBtn = document.getElementById('results-feedback-btn');
        if (fbBtn) fbBtn.style.display = isLiveSession ? 'block' : 'none';

        goStep(3);
      } catch (innerErr) {
        console.error("Transition error:", innerErr);
        btn.textContent = 'Check'; btn.disabled = false;
        goStep(1);
      }
    }, 1500);
  } catch (err) {
    // Bug 3 fix: show the actual error message, not a generic 'Backend Error'
    alert(err.message || 'Error connecting to backend');
    btn.textContent = 'Check'; btn.disabled = false;
    goStep(1);
  }
}

function animateSteps() {
  const delays = [600, 1200, 1900, 2600];
  ['a1', 'a2', 'a3', 'a4'].forEach((id, i) =>
    setTimeout(() => document.getElementById(id).classList.add('done'), delays[i])
  );
}

function populateSignal(sig) {
  const upiVal = document.getElementById('upi-value');
  upiVal.textContent = sig.upi;
  upiVal.className = `upi-value ${sig.tier}`;
  const upiWrap = document.getElementById('upi-icon-wrap');
  upiWrap.className = `upi-icon-wrap ${sig.tier}`;
  document.getElementById('upi-icon').textContent = sig.tier === 'good' ? '✅' : sig.tier === 'mid' ? '⚠️' : '🚨';

  // Version Check
  const verEl = document.getElementById('debug-server-version');
  if (verEl) verEl.textContent = `Backend: ${sig.serverVersion}`;

  // Handle Verified/Operator display
  const vBox = document.getElementById('results-verified-box');
  const opName = document.getElementById('results-operator-name');
  if (vBox && sig.metrics && (sig.metrics.is_verified || sig.metrics.operator !== 'Unknown')) {
    vBox.classList.remove('hidden');
    if (opName) opName.textContent = sig.metrics.operator || 'Mobile';
  } else if (vBox) {
    vBox.classList.add('hidden');
  }
  // Draw gauge on results (Extract numeric score from label)
  const numericScore = parseFloat(sig.upi.split('-').pop().match(/\d+\.?\d*/) || 5);
  setTimeout(() => drawGauge('results-risk-gauge', numericScore, 'results-risk-label'), 100);
}

function populateRecs(tier) {
  const list = document.getElementById('rec-list');
  list.innerHTML = '';
  RECS[tier].forEach(r => {
    const li = document.createElement('li');
    li.innerHTML = `<div class="rec-icon-box">${r.icon}</div><span>${r.text}</span>`;
    list.appendChild(li);
  });
}

// ── End of Main Functions ──

function saveRecent(name, coords, sig) {
  // Store specifically for feedback / reinforcement learning
  localStorage.setItem('last_check_data', JSON.stringify({
    lat: coords.lat,
    lng: coords.lng,
    metrics: sig.metrics || {} // Assuming metrics are attached to sig or passed
  }));

  recents = recents.filter(r => r.name.toLowerCase() !== name.toLowerCase());
  recents.unshift({ name, lat: coords.lat, lng: coords.lng, tier: sig.tier, badge: sig.badge });
  if (recents.length > 5) recents = recents.slice(0, 5);
  localStorage.setItem('nps_recents', JSON.stringify(recents));
  renderRecents();
}

function renderRecents() {
  const section = document.getElementById('recents-section');
  const list = document.getElementById('recents-list');
  const empty = document.getElementById('empty-state');
  if (recents.length === 0) {
    section.classList.add('hidden');
    if (empty) empty.classList.remove('hidden');
    return;
  }
  section.classList.remove('hidden');
  if (empty) empty.classList.add('hidden');
  list.innerHTML = '';
  recents.forEach(r => {
    const div = document.createElement('div');
    div.className = 'recent-item fade-in';
    div.innerHTML = `
      <div class="recent-left">
        <span class="recent-icon">📍</span>
        <div>
          <p class="recent-name">${r.name}</p>
          <p class="recent-coords">${r.lat}, ${r.lng}</p>
        </div>
      </div>
      <span class="recent-badge ${r.tier}">${r.badge}</span>`;
    div.onclick = () => { document.getElementById('loc-input').value = r.name; runCheck(); };
    list.appendChild(div);
  });
}

function goStep(step) {
  document.querySelectorAll('.step-panel').forEach(p => p.classList.add('hidden'));
  const panel = document.getElementById(`panel-${step}`);
  panel.classList.remove('hidden');
  panel.classList.add('fade-in');
  if (step === 2) ['a1', 'a2', 'a3', 'a4'].forEach(id => document.getElementById(id).classList.remove('done'));
  const main = document.getElementById('app-main');
  if (main) main.scrollTop = 0;
}

function shake(el) {
  el.style.animation = 'none';
  void el.offsetWidth;
  el.style.animation = 'shake 0.35s ease';
  el.addEventListener('animationend', () => el.style.animation = '', { once: true });
}

document.getElementById('loc-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') runCheck();
});

// ── Bank Status ──
let selectedBank = "";

function selectPaymentBank() {
  const bank = document.getElementById('bank-select').value;
  if (!bank) return;

  selectedBank = bank;
  console.log("Bank Selected for future UPI check:", selectedBank);
  // Removed auto-hide: let the user see their choice
}

let lastNetworkScore = 90.0;

async function showResultsBankStatus() {
  const key = selectedBank || "SBI";
  const container = document.getElementById('results-bank-status');

  // Get live icon from already-fetched bank grid data
  let liveIcon = '✅';
  let liveStatus = 'UP';
  try {
    const statusRes = await fetch('/bank-status');
    const statusData = await statusRes.json();
    if (statusData.banks) {
      const match = statusData.banks.find(b =>
        b.bank.toLowerCase().includes(key.toLowerCase()) ||
        key.toLowerCase().includes(b.bank.toLowerCase())
      );
      if (match) { liveIcon = match.icon; liveStatus = match.status; }
    }
  } catch (_) { }

  try {
    const res = await fetch('/bank-predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bank: key,
        lat: 12.9716,
        lon: 77.5946,
        network_score: lastNetworkScore
      })
    });
    const bankData = await res.json();
    bankData._liveIcon = liveIcon;
    bankData._liveStatus = liveStatus;

    renderBankCardLive(bankData, 'results-bank-title', 'results-bank-rows', 'results-bank-overall');

    // Update the main UPI Success UI with the combined final score
    const upiVal = document.getElementById('upi-value');
    if (upiVal) upiVal.textContent = `${bankData.success_rate} - ${bankData.final_score}%`;

    // 🔥 FIX: Update the gauge and icons too!
    const tier = bankData.success_rate === 'High' ? 'good' : (bankData.success_rate === 'Moderate' ? 'mid' : 'poor');
    
    // Update Icons/Colors
    upiVal.className = `upi-value ${tier}`;
    const upiWrap = document.getElementById('upi-icon-wrap');
    if (upiWrap) upiWrap.className = `upi-icon-wrap ${tier}`;
    const upiIcon = document.getElementById('upi-icon');
    if (upiIcon) upiIcon.textContent = tier === 'good' ? '✅' : tier === 'mid' ? '⚠️' : '🚨';

    // Redraw Gauge
    drawGauge('results-risk-gauge', bankData.final_score, 'results-risk-label');

    container.classList.remove('hidden');
  } catch (e) { console.error("Bank fetch error", e); }
}

function renderBankCardLive(bank, titleId, rowsId, overallId) {
  const displayName = bank.name || bank.bank || selectedBank || "Bank";

  // Live status icon from CSV data (attached by showResultsBankStatus)
  const liveIcon = bank._liveIcon || '✅';
  const liveStatus = bank._liveStatus || 'UP';

  const domain = BANK_DOMAINS[displayName];
  const primaryLogo = domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : `https://api.dicebear.com/7.x/initials/svg?seed=${displayName}`;
  const fallbackLogo = `https://api.dicebear.com/7.x/initials/svg?seed=${displayName}&backgroundColor=0ea5e9&fontFamily=Arial&bold=true`;

  // Icon style based on live status
  const iconBg = liveStatus === 'UP' ? '#dcfce7'
    : liveStatus === 'DOWN' ? '#fee2e2' : '#fef9c3';
  const iconColor = liveStatus === 'UP' ? '#15803d'
    : liveStatus === 'DOWN' ? '#b91c1c' : '#92400e';

  document.getElementById(titleId).innerHTML = `
    <div style="display:flex; align-items:center; gap:12px;">
      <img src="${primaryLogo}"
           onerror="this.onerror=null; this.src='${fallbackLogo}';"
           alt="${displayName}"
           style="width:32px; height:32px; border-radius:8px; object-fit:contain; background:white; padding:2px; box-shadow:0 2px 4px rgba(0,0,0,0.1);">
      <span style="flex:1; font-weight:700; font-size:0.95rem;">${displayName} UPI Server Status</span>
      <div style="
        width:44px; height:44px; border-radius:50%;
        background:${iconBg};
        display:flex; align-items:center; justify-content:center;
        font-size:1.5rem;
        box-shadow:0 2px 8px ${iconBg};
        animation:fadeUp 0.4s ease;
        flex-shrink:0;
      " title="${liveStatus}">${liveIcon}</div>
    </div>
  `;

  // Use live status for row icon
  const rowIcon = liveStatus === 'UP' ? '✅' : liveStatus === 'DOWN' ? '❌' : '⚠️';
  const rowClass = liveStatus === 'UP' ? 'bank-row-ok' : 'bank-row-warn';
  const statusText = liveStatus === 'UP' ? 'Online'
    : liveStatus === 'DOWN' ? 'Down' : 'Fluctuating';
  const uptime = bank.up || (liveStatus === 'UP' ? 99.9 : liveStatus === 'FLUCTUATING' ? 60.0 : 0.0);
  const latency = bank.latency || (liveStatus === 'UP' ? 45 : liveStatus === 'FLUCTUATING' ? 350 : 0);

  document.getElementById(rowsId).innerHTML = '';

  const overall = document.getElementById(overallId);
  const isOk = liveStatus === 'UP';
  const isDown = liveStatus === 'DOWN';
  overall.textContent = isOk ? '✅ All Services Operational'
    : isDown ? '❌ Server Currently Down'
      : '⚠️ Minor Delays / Fluctuating';
  overall.className = `bank-overall-status ${isOk ? 'ok' : isDown ? 'down' : 'warn'}`;
}

// ── Feedback ──
let fbOutcome = null, fbStar = 0;

function selectOutcome(outcome, el) {
  fbOutcome = outcome;
  document.querySelectorAll('.fb-outcome-btn').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
  // bounce animation
  el.style.transform = 'scale(1.12)';
  setTimeout(() => el.style.transform = '', 200);
  const reasonSection = document.getElementById('fb-reason-section');
  if (outcome === 'failed' || outcome === 'pending') reasonSection.classList.remove('hidden');
  else { reasonSection.classList.add('hidden'); document.querySelectorAll('.fb-chip').forEach(c => c.classList.remove('selected')); }
  document.getElementById('fb-rating-section').classList.remove('hidden');
}

function selectChip(el) {
  document.querySelectorAll('.fb-chip').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
}

function selectStar(n) {
  fbStar = n;
  document.querySelectorAll('.fb-star').forEach((s, i) => s.classList.toggle('active', i < n));
}

async function submitFeedbackNew() {
  if (!fbOutcome) return;

  // Continuous Learning / RL Data Submission
  const feedbackData = {
    lat: rawLat || 0,
    lon: rawLng || 0,
    outcome: fbOutcome,
    metrics: currentSig?.metrics || {}
  };

  try {
    await fetch('/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feedbackData)
    });
    console.log("Feedback recorded for community alerts.");
  } catch (e) { console.error("Feedback submission error", e); }

  const tips = {
    success: '🎉 Great! Glad it went through. Keep checking signal before big payments.',
    failed: '🙏 Sorry about that. We have recorded this to warn other users in this area.',
    pending: '⏳ Pending payments usually resolve in 10-15 mins. Check your bank app.',
  };
  document.getElementById('feedback-main').classList.add('hidden');
  document.getElementById('back-from-5').classList.add('hidden');
  const icons = { success: '🎉', failed: '😔', pending: '⏳' };
  document.getElementById('fb-thanks-icon').textContent = icons[fbOutcome];
  document.getElementById('fb-thanks-title').textContent = fbStar ? `Thanks for the ${fbStar}★ rating!` : 'Thank you for your feedback!';
  document.getElementById('fb-thanks-tip').textContent = tips[fbOutcome];
  const card = document.getElementById('feedback-thanks-card');
  card.classList.remove('hidden');
  card.classList.add('fade-in');
  fbOutcome = null; fbStar = 0;
}

function resetFeedbackUI() {
  fbOutcome = null;
  fbStar = 0;
  document.getElementById('feedback-main').classList.remove('hidden');
  document.getElementById('feedback-thanks-card').classList.add('hidden');
  document.getElementById('fb-outcome-section').classList.remove('hidden');
  document.getElementById('fb-reason-section').classList.add('hidden');
  document.getElementById('fb-rating-section').classList.add('hidden');
  document.querySelectorAll('.fb-outcome-btn').forEach(b => b.classList.remove('selected'));
  document.querySelectorAll('.fb-chip').forEach(c => c.classList.remove('selected'));
  document.querySelectorAll('.fb-star').forEach(s => s.classList.remove('active'));
}

function resetApp() {
  document.getElementById('loc-input').value = '';
  document.getElementById('back-from-5').classList.remove('hidden');
  currentSig = null;
  resetFeedbackUI();
  const rbs = document.getElementById('results-bank-select');
  if (rbs) rbs.value = '';
  const rbsC = document.getElementById('results-bank-status');
  if (rbsC) rbsC.classList.add('hidden');
  
  if (isLiveSession) {
    // 🔥 Go back to Main Dashboard for GPS checks
    switchDashboardTab('dash-content');
  } else {
    // 🔍 Go back to Search Bar for manual checks
    goStep(1);
  }
}

// ── AI Panel ──
function openAiPanel() { document.getElementById('ai-panel').classList.remove('hidden'); }
function closeAiPanel() { document.getElementById('ai-panel').classList.add('hidden'); }

function submitAiText() {
  const input = document.getElementById('ai-text-in');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  sendAiMsg(text, true);
}

function sendAiMsg(text, fromInput = false) {
  const body = document.getElementById('ai-chat-body');
  const userMsg = document.createElement('div');
  userMsg.className = 'ai-msg user fade-in';
  userMsg.textContent = text;
  body.appendChild(userMsg);
  body.scrollTop = body.scrollHeight;
  setTimeout(() => {
    const aiMsg = document.createElement('div');
    aiMsg.className = 'ai-msg ai fade-in';
    const lower = text.toLowerCase();
    if (lower.includes('fail')) aiMsg.innerHTML = "Your payment likely failed due to a sudden drop in 4G signal. Switching to <b>WiFi</b> or moving to an open area will resolve this.";
    else if (lower.includes('now') || lower.includes('can i')) aiMsg.innerHTML = "Currently, your risk is <b>Moderate (67%)</b> on 4G. It's safer to switch to WiFi first.";
    else aiMsg.innerHTML = "I am an AI Smart Advisor. To improve your payment success, try connecting to a stable WiFi network or toggling Airplane mode.";
    body.appendChild(aiMsg);
    body.scrollTop = body.scrollHeight;
  }, 1000);
}

// ── Dashboard Tabs ──
function switchDashboardTab(tabId, el) {
  document.getElementById('app-main').classList.add('hidden');
  document.getElementById('dashboard-panel').classList.remove('hidden');
  ['dash-content', 'dash-map', 'dash-bank'].forEach(id => document.getElementById(id).classList.add('hidden'));
  const target = document.getElementById(tabId);
  if (target) { target.classList.remove('hidden'); target.classList.add('fade-in'); }
  if (tabId === 'dash-map') setTimeout(() => initMap(), 50);
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  if (el) el.classList.add('active');
  else document.querySelector(`[data-tab="${tabId}"]`)?.classList.add('active');
}

// ── Map ──
let map = null, mapMarker = null, betterNetworkCircle = null;

// 🔥 Fix for Leaflet default icon paths being blocked by browser tracking prevention
if (typeof L !== 'undefined' && L.Icon && L.Icon.Default) {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  });
}

//  Calculates the real-world distance (in meters) between two geographic points
// using the Haversine formula. This is required to determine how far the user is
// from the "better network location", which is then used for:
// - deciding circle color (green/yellow/red)
// - generating movement recommendation (near / move X meters)
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const toRad = x => x * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
    Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

// Smart map feature frontend dynamic design and implementation to show better network location based on backend prediction
function updateMapWithPrediction(data) {
  if (!map || !data) return;

  // 🔄 Force map to recalculate its container size (fixes grey map issue)
  setTimeout(() => map.invalidateSize(), 100);

  // 📍 Extract optimized (better) location or fallback to current
  const betterLat = data.better_location?.lat || currentLat;
  const betterLng = data.better_location?.lon || currentLng;

  console.log("SMART MAP UPDATE:", betterLat, betterLng);

  if (betterNetworkCircle) map.removeLayer(betterNetworkCircle);

  const dist = getDistance(currentLat, currentLng, betterLat, betterLng);
  let color = '#22c55e'; // Green
  if (dist > 300) color = '#ef4444'; // Red
  else if (dist > 100) color = '#f59e0b'; // Amber

  betterNetworkCircle = L.circle([betterLat, betterLng], {
    color: color,
    fillColor: color,
    fillOpacity: 0.2,
    radius: 100
  }).addTo(map).bindPopup(`<b>Optimized Location</b><br>${Math.round(dist)}m from you`);

  const distText = document.getElementById('smart-distance');
  if (distText) {
    if (dist < 20) {
      distText.textContent = "You're in the Best Spot!";
    } else {
      distText.textContent = `Move ${Math.round(dist)}m`;
    }
  }
}

function initMap() {
  const render = () => {
    if (!map) {
      map = L.map('real-map').setView([currentLat, currentLng], 16);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OpenStreetMap' }).addTo(map);
      mapMarker = L.marker([currentLat, currentLng]).addTo(map).bindPopup('<b>You are here</b>', { closeOnClick: false, autoClose: false }).openPopup();
      // No static circle here — updateMapWithPrediction draws the real one from backend data
    } else {
      map.invalidateSize();
      map.flyTo([currentLat, currentLng], 16, { duration: 1 });
      mapMarker.setLatLng([currentLat, currentLng]).openPopup();
    }
    // If we already have prediction data, draw the smart zone immediately
    if (window.lastPredictionData) updateMapWithPrediction(window.lastPredictionData);
  };
  render();
  if (navigator.geolocation && (isLiveSession || !window.lastPredictionData)) {
    navigator.geolocation.getCurrentPosition(pos => {
      // Only override the view if we are in a live session or no search exists
      if (isLiveSession || !window.lastPredictionData) {
        currentLat = pos.coords.latitude; currentLng = pos.coords.longitude;
        render();
      }
    }, err => { }, { enableHighAccuracy: true, timeout: 5000 });
  }
}

// ── Init ──
initTheme();
initOnboarding();
initScrollTop();
initCustomDropdown();
renderRecents();
refreshBankStatus();
setInterval(refreshBankStatus, 60000); // every minute