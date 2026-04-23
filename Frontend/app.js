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
function drawGauge(canvasId, labelId, tier) {
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

  // Colored arc
  const tierMap = {
    good: { end: Math.PI * 1.33, color: '#22c55e', label: 'Low Risk' },
    mid: { end: Math.PI * 1.66, color: '#f59e0b', label: 'Medium Risk' },
    poor: { end: Math.PI * 2, color: '#ef4444', label: 'High Risk' }
  };
  const t = tierMap[tier] || tierMap.mid;
  ctx.beginPath();
  ctx.arc(cx, cy, r, startAngle, t.end);
  ctx.strokeStyle = t.color;
  ctx.stroke();

  // Needle
  const needleAngle = t.end;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + Math.cos(needleAngle) * (r - 10), cy + Math.sin(needleAngle) * (r - 10));
  ctx.strokeStyle = '#1e40af';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Center dot
  ctx.beginPath();
  ctx.arc(cx, cy, 6, 0, 2 * Math.PI);
  ctx.fillStyle = '#1e40af';
  ctx.fill();

  // Labels
  ctx.font = '600 11px Inter, sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.textAlign = 'left'; ctx.fillText('Low', cx - r - 2, cy - 4);
  ctx.textAlign = 'right'; ctx.fillText('High', cx + r + 2, cy - 4);

  if (labelId) {
    const lbl = document.getElementById(labelId);
    if (lbl) { lbl.textContent = t.label; lbl.className = `risk-meter-label ${tier}`; }
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
  { dbm: -58, type: '5G', label: 'Excellent Signal', tier: 'good', bars: 5, upi: 'High – 96%', badge: 'Low Risk' },
  { dbm: -65, type: '5G', label: 'Excellent Signal', tier: 'good', bars: 5, upi: 'High – 91%', badge: 'Low Risk' },
  { dbm: -72, type: '4G', label: 'Good Signal', tier: 'good', bars: 4, upi: 'High – 84%', badge: 'Low Risk' },
  { dbm: -80, type: '4G', label: 'Good Signal', tier: 'good', bars: 3, upi: 'Medium – 72%', badge: 'Low Risk' },
  { dbm: -88, type: '4G', label: 'Moderate Signal', tier: 'mid', bars: 3, upi: 'Medium – 61%', badge: 'Medium Risk' },
  { dbm: -95, type: '3G', label: 'Moderate Signal', tier: 'mid', bars: 2, upi: 'Medium – 48%', badge: 'Medium Risk' },
  { dbm: -102, type: '4G', label: 'Poor Signal', tier: 'poor', bars: 1, upi: 'Low – 32%', badge: 'High Risk' },
  { dbm: -110, type: '4G', label: 'Poor Signal', tier: 'poor', bars: 1, upi: 'Low – 28%', badge: 'High Risk' },
  { dbm: -115, type: '2G', label: 'Very Poor Signal', tier: 'poor', bars: 1, upi: 'Low – 14%', badge: 'High Risk' },
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
    { icon: '⏱️', text: '<strong>Wait 10–15 minutes</strong> and retry the payment' },
    { icon: '💵', text: '<strong>Carry Cash as Backup</strong> in case payment fails' },
  ],
  poor: [
    { icon: '🔄', text: '<strong>Switch to Vi / BSNL</strong> for better coverage here' },
    { icon: '⏱️', text: '<strong>Wait 10–15 minutes</strong> and retry the payment' },
    { icon: '💵', text: '<strong>Carry Cash as Backup</strong> — payments likely to fail' },
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
let currentLat = 12.9716;
let currentLng = 77.5946;
let recents = JSON.parse(localStorage.getItem('nps_recents') || '[]');

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

// ── Location & Check ──
function goToLocationChecker() {
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

  if (!navigator.geolocation) { useLiveLocation(12.9716, 77.5946, 'Bengaluru'); return; }

  navigator.geolocation.getCurrentPosition(
    async pos => {
      const lat = pos.coords.latitude, lng = pos.coords.longitude;
      let name = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
        const data = await res.json();
        const a = data.address;
        const area = a.suburb || a.neighbourhood || a.village || a.town || a.city || a.county || '';
        const city = a.city || a.town || a.state_district || '';
        name = area ? (city && city !== area ? `${area}, ${city}` : area) : name;
      } catch { }
      useLiveLocation(lat, lng, name);
    },
    () => useLiveLocation(12.9716, 77.5946, 'Bengaluru')
  );
}

function useLiveLocation(lat, lng, name) {
  const btn = document.getElementById('geo-btn');
  btn.textContent = '📍 Fetch My Location';
  btn.disabled = false;
  document.getElementById('skeleton-loc').classList.add('hidden');
  document.getElementById('skeleton-net').classList.add('hidden');
  document.getElementById('dashboard-panel').classList.add('hidden');
  document.getElementById('app-main').classList.remove('hidden');
  document.getElementById('loc-input').value = name;
  runCheckWithCoords(name, lat, lng);
}

function runCheck() {
  // Hide bank dropdown when starting check
  document.getElementById('dash-bank-dropdown')?.classList.add('hidden');

  const raw = document.getElementById('loc-input').value.trim();
  if (!raw) { shake(document.getElementById('loc-input')); return; }
  const btn = document.getElementById('check-btn');
  btn.textContent = 'Checking…';
  btn.disabled = true;
  document.getElementById('empty-state').classList.add('hidden');
  goStep(2);
  runAnalyzing(raw, btn);
}

function runCheckWithCoords(name, lat, lng) {
  const btn = document.getElementById('check-btn');
  btn.textContent = 'Checking…';
  btn.disabled = true;
  goStep(2);
  runAnalyzingWithCoords(name, lat, lng, btn);
}

async function runAnalyzing(raw, btn) {
  animateSteps();
  
  try {
    // 1. Geocode
    const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(raw)}&format=json&limit=1`);
    const geoData = await geoRes.json();
    if (!geoData.length) throw new Error('Location not found');
    const lat = parseFloat(geoData[0].lat);
    const lon = parseFloat(geoData[0].lon);

    // 2. Predict
    const res = await fetch('http://localhost:8000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lat, lon })
    });
    if (!res.ok) throw new Error(`Server Error: ${res.status}`);
    const data = await res.json();
    lastNetworkScore = parseFloat(data.upi.match(/\d+/) || 90); 

    currentSig = {
      tier: data.tier,
      label: data.label,
      upi: data.upi,
      badge: data.badge,
      dbm: data.dbm,
      type: data.type
    };
    currentLat = data.lat;
    currentLng = data.lon;

    setTimeout(() => {
      document.getElementById('loc-name').textContent = raw;
      document.getElementById('loc-coords').textContent = `${data.lat.toFixed(4)}, ${data.lon.toFixed(4)}`;
      populateSignal(currentSig);
      populateRecs(currentSig.tier);
      showResultsBankStatus();
      
      const alertBanner = document.getElementById('community-alert-banner');
      if (data.community_alert) alertBanner.classList.remove('hidden');
      else alertBanner.classList.add('hidden');

      saveRecent(raw, { lat: data.lat, lng: data.lon }, currentSig);
      btn.textContent = 'Check'; btn.disabled = false;
      goStep(3);
    }, 1500);

  } catch (err) {
    alert(err.message || 'Error connecting to backend');
    btn.textContent = 'Check'; btn.disabled = false;
    goStep(1);
  }
}

async function runAnalyzingWithCoords(name, lat, lng, btn) {
  animateSteps();
  try {
    const res = await fetch('http://localhost:8000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lat, lon: lng })
    });
    if (!res.ok) throw new Error(`Server Error: ${res.status}`);
    const data = await res.json();

    currentSig = {
      tier: data.tier,
      label: data.label,
      upi: data.upi,
      badge: data.badge,
      dbm: data.dbm,
      type: data.type
    };

    setTimeout(() => {
      document.getElementById('loc-name').textContent = name;
      document.getElementById('loc-coords').textContent = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      populateSignal(currentSig);
      populateRecs(currentSig.tier);
      showResultsBankStatus();
      
      const alertBanner = document.getElementById('community-alert-banner');
      if (data.community_alert) alertBanner.classList.remove('hidden');
      else alertBanner.classList.add('hidden');

      saveRecent(name, { lat, lng }, currentSig);
      btn.textContent = 'Check'; btn.disabled = false;
      goStep(3);
    }, 1500);
  } catch (err) {
    alert('Backend Error');
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
  const badge = document.getElementById('upi-badge');
  badge.textContent = sig.badge;
  badge.className = `upi-badge ${sig.tier}`;
  // Draw gauge on results
  setTimeout(() => drawGauge('results-risk-gauge', 'results-risk-label', sig.tier), 100);
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
  
  try {
    const res = await fetch('http://localhost:8000/bank-predict', {
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

    renderBankCardLive(bankData, 'results-bank-title', 'results-bank-rows', 'results-bank-overall');
    
    // Update the main UPI Success UI with the combined final score
    const upiVal = document.getElementById('upi-value');
    const upiBadge = document.getElementById('upi-badge');
    if (upiVal) upiVal.textContent = `${bankData.success_rate} – ${bankData.final_score}%`;
    if (upiBadge) {
      upiBadge.textContent = `${bankData.success_rate} Risk`;
      upiBadge.className = `upi-badge ${bankData.success_rate.toLowerCase()}-risk`;
    }

    container.classList.remove('hidden');
  } catch (e) { console.error("Bank fetch error", e); }
}

function renderBankCardLive(bank, titleId, rowsId, overallId) {
  const displayName = bank.name || bank.bank || selectedBank || "Bank";
  
  const logos = {
    "SBI": "sbi.co.in",
    "HDFC": "hdfcbank.com",
    "ICICI": "icicibank.com",
    "AXIS": "axisbank.com",
    "PNB": "pnbindia.in",
    "BOB": "bankofbaroda.in",
    "CANARA": "canarabank.com",
    "AIRTEL": "airtel.in",
    "KOTAK": "kotak.com",
    "AU": "aubank.in"
  };
  
  const domain = logos[displayName];
  const primaryLogo = domain ? `https://logo.clearbit.com/${domain}` : `https://api.dicebear.com/7.x/initials/svg?seed=${displayName}`;
  const fallbackLogo = `https://api.dicebear.com/7.x/initials/svg?seed=${displayName}&backgroundColor=0ea5e9&fontFamily=Arial&bold=true`;

  document.getElementById(titleId).innerHTML = `
    <div style="display:flex; align-items:center; gap:12px;">
      <img src="${primaryLogo}" 
           onerror="this.onerror=null; this.src='${fallbackLogo}';" 
           alt="${displayName}" 
           style="width:32px; height:32px; border-radius:8px; object-fit:contain; background:white; padding:2px; box-shadow:0 2px 4px rgba(0,0,0,0.1);">
      <span>${displayName} UPI Server Status</span>
    </div>
  `;
  
  let statusEmoji = '✅';
  let statusDesc = 'Server UP';
  let statusColorClass = 'bank-row-ok';

  const s = (bank.status || "").toLowerCase();
  if (s.includes('fluct') || s.includes('slow') || s.includes('warn')) {
    statusEmoji = '⚠️';
    statusDesc = 'Server Fluctuating';
    statusColorClass = 'bank-row-warn';
  } else if (s.includes('down') || s.includes('off') || s.includes('fail')) {
    statusEmoji = '❌';
    statusDesc = 'Server DOWN';
    statusColorClass = 'bank-row-danger';
  }

  document.getElementById(rowsId).innerHTML = `
    <div class="bank-status-row" style="margin-top:4px">
      <span class="bank-row-icon" style="font-size:1.2rem">${statusEmoji}</span>
      <span class="bank-row-label" style="font-size:0.95rem; font-weight:600">UPI Server Status:</span>
      <span class="bank-row-val ${statusColorClass}" style="font-size:0.95rem">${statusDesc}</span>
    </div>
  `;
  
  const overall = document.getElementById(overallId);
  overall.textContent = statusDesc === 'Server UP' ? 'All Services Operational' : 
                        statusDesc === 'Server DOWN' ? 'Critical Downtime Detected' : 'Network Instability Detected';
  overall.className = `bank-overall-status ${statusColorClass === 'bank-row-ok' ? 'ok' : 'warn'}`;
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
  const lastCheck = JSON.parse(localStorage.getItem('last_check_data')) || {};
  const feedbackData = {
    lat: lastCheck.lat || 0,
    lon: lastCheck.lng || 0,
    outcome: fbOutcome,
    metrics: lastCheck.metrics || {}
  };

  try {
    await fetch('http://localhost:8000/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feedbackData)
    });
    console.log("Feedback recorded for community alerts.");
  } catch (e) { console.error("Feedback submission error", e); }

  const tips = {
    success: '🎉 Great! Glad it went through. Keep checking signal before big payments.',
    failed: '🙏 Sorry about that. We have recorded this to warn other users in this area.',
    pending: '⏳ Pending payments usually resolve in 10–15 mins. Check your bank app.',
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

function resetApp() {
  document.getElementById('loc-input').value = '';
  document.getElementById('back-from-5').classList.remove('hidden');
  currentSig = null;
  document.getElementById('feedback-main').classList.remove('hidden');
  document.getElementById('feedback-thanks-card').classList.add('hidden');
  document.getElementById('fb-outcome-section').classList.remove('hidden');
  document.getElementById('fb-reason-section').classList.add('hidden');
  document.getElementById('fb-rating-section').classList.add('hidden');
  document.querySelectorAll('.fb-outcome-btn').forEach(b => b.classList.remove('selected'));
  document.querySelectorAll('.fb-chip').forEach(c => c.classList.remove('selected'));
  document.querySelectorAll('.fb-star').forEach(s => s.classList.remove('active'));
  const rbs = document.getElementById('results-bank-select');
  if (rbs) rbs.value = '';
  const rbsC = document.getElementById('results-bank-status');
  if (rbsC) rbsC.classList.add('hidden');
  goStep(1);
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

function initMap() {
  const render = () => {
    if (!map) {
      map = L.map('real-map').setView([currentLat, currentLng], 16);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OpenStreetMap' }).addTo(map);
      mapMarker = L.marker([currentLat, currentLng]).addTo(map).bindPopup('<b>You are here</b>', { closeOnClick: false, autoClose: false }).openPopup();
      betterNetworkCircle = L.circle([currentLat + 0.001, currentLng + 0.0015], { color: '#22c55e', fillColor: '#22c55e', fillOpacity: 0.2, radius: 100 }).addTo(map).bindPopup('Better Network Zone');
    } else {
      map.invalidateSize();
      map.flyTo([currentLat, currentLng], 16, { duration: 1 });
      mapMarker.setLatLng([currentLat, currentLng]).openPopup();
      betterNetworkCircle.setLatLng([currentLat + 0.001, currentLng + 0.0015]);
    }
  };
  render();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      currentLat = pos.coords.latitude; currentLng = pos.coords.longitude;
      render();
    }, err => { }, { enableHighAccuracy: true, timeout: 5000 });
  }
}

// ── Init ──
initTheme();
initOnboarding();
initScrollTop();
renderRecents();