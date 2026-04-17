function goToLocationChecker() {
  document.getElementById('dashboard-panel').classList.add('hidden');
  document.getElementById('app-main').classList.remove('hidden');
}

function getMyLocation() {
  const btn = document.getElementById('geo-btn');
  btn.textContent = '⏳ Fetching location...';
  btn.disabled = true;

  if (!navigator.geolocation) {
    useLiveLocation(12.9716, 77.5946, 'Bengaluru');
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async pos => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      let name = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
        const data = await res.json();
        const a = data.address;
        const area = a.suburb || a.neighbourhood || a.village || a.town || a.city || a.county || '';
        const city = a.city || a.town || a.state_district || '';
        name = area ? (city && city !== area ? `${area}, ${city}` : area) : name;
      } catch {}
      useLiveLocation(lat, lng, name);
    },
    () => useLiveLocation(12.9716, 77.5946, 'Bengaluru')
  );
}

function useLiveLocation(lat, lng, name) {
  const btn = document.getElementById('geo-btn');
  btn.textContent = '📍 Get My Location';
  btn.disabled = false;

  // Switch to main app flow
  document.getElementById('dashboard-panel').classList.add('hidden');
  document.getElementById('app-main').classList.remove('hidden');

  // Set input and run check with real coords
  document.getElementById('loc-input').value = name;
  runCheckWithCoords(name, lat, lng);
}

function runCheckWithCoords(name, lat, lng) {
  const btn = document.getElementById('check-btn');
  btn.textContent = 'Checking…';
  btn.disabled = true;

  goStep(2);
  runAnalyzingWithCoords(name, lat, lng, btn);
}

async function runAnalyzingWithCoords(name, lat, lng, btn) {
  const steps = ['a1','a2','a3','a4'];
  const delays = [600, 1200, 1900, 2600];
  steps.forEach((id, i) => {
    setTimeout(() => document.getElementById(id).classList.add('done'), delays[i]);
  });

  // Call your FastAPI backend with real GPS coords
  let data;
  try {
    const res = await fetch('http://localhost:8000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lat, lon: lng })
    });
    data = await res.json();

    if (!res.ok) {
      alert(data.message || 'Location not supported.');
      btn.textContent = 'Check'; btn.disabled = false;
      goStep(1); return;
    }
  } catch {
    alert('Backend unreachable. Is the server running?');
    btn.textContent = 'Check'; btn.disabled = false;
    goStep(1); return;
  }

  currentSig = {
    dbm:   data.dbm,
    type:  data.type,
    label: data.label,
    tier:  data.tier,
    bars:  data.bars,
    upi:   data.upi,
    badge: data.badge
  };

  currentLat = data.lat;
  currentLng = data.lon;

  setTimeout(() => {
    document.getElementById('loc-name').textContent = name;
    document.getElementById('loc-coords').textContent = `${data.lat.toFixed(4)}, ${data.lon.toFixed(4)}`;
    populateSignal(currentSig);
    populateRecs(currentSig.tier);
    saveRecent(name, { lat: data.lat, lng: data.lon }, currentSig);

    btn.textContent = 'Check'; btn.disabled = false;
    goStep(3);
  }, 3200);
}



// ── App Logic ──
const COORDS = [
  { lat: 12.9716, lng: 77.6079 }, { lat: 12.9352, lng: 77.6245 },
  { lat: 13.0827, lng: 80.2707 }, { lat: 19.0760, lng: 72.8777 },
  { lat: 28.6139, lng: 77.2090 }, { lat: 17.3850, lng: 78.4867 },
  { lat: 22.5726, lng: 88.3639 }, { lat: 12.2958, lng: 76.6394 },
  { lat: 15.3173, lng: 75.7139 }, { lat: 26.9124, lng: 75.7873 },
];

const SIGNALS = [
  { dbm: -58,  type: '5G', label: 'Excellent Signal', tier: 'good', bars: 5, upi: 'High – 96%',   badge: 'Low Risk'    },
  { dbm: -65,  type: '5G', label: 'Excellent Signal', tier: 'good', bars: 5, upi: 'High – 91%',   badge: 'Low Risk'    },
  { dbm: -72,  type: '4G', label: 'Good Signal',      tier: 'good', bars: 4, upi: 'High – 84%',   badge: 'Low Risk'    },
  { dbm: -80,  type: '4G', label: 'Good Signal',      tier: 'good', bars: 3, upi: 'Medium – 72%', badge: 'Low Risk'    },
  { dbm: -88,  type: '4G', label: 'Moderate Signal',  tier: 'mid',  bars: 3, upi: 'Medium – 61%', badge: 'Medium Risk' },
  { dbm: -95,  type: '3G', label: 'Moderate Signal',  tier: 'mid',  bars: 2, upi: 'Medium – 48%', badge: 'Medium Risk' },
  { dbm: -102, type: '4G', label: 'Poor Signal',      tier: 'poor', bars: 1, upi: 'Low – 32%',    badge: 'High Risk'   },
  { dbm: -110, type: '4G', label: 'Poor Signal',      tier: 'poor', bars: 1, upi: 'Low – 28%',    badge: 'High Risk'   },
  { dbm: -115, type: '2G', label: 'Very Poor Signal', tier: 'poor', bars: 1, upi: 'Low – 14%',    badge: 'High Risk'   },
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

let currentSig = null;
let recents = JSON.parse(localStorage.getItem('nps_recents') || '[]');

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

function runCheck() {
  const raw = document.getElementById('loc-input').value.trim();
  if (!raw) { shake(document.getElementById('loc-input')); return; }

  const btn = document.getElementById('check-btn');
  btn.textContent = 'Checking…';
  btn.disabled = true;

  // Go to analyzing screen
  goStep(2);
  runAnalyzing(raw, btn);
}

async function runAnalyzing(raw, btn) {
  const steps = ['a1','a2','a3','a4'];
  const delays = [600, 1200, 1900, 2600];
  steps.forEach((id, i) => {
    setTimeout(() => document.getElementById(id).classList.add('done'), delays[i]);
  });

  // Geocode the typed location name → lat/lon
  let lat, lon;
  try {
    const geoRes = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(raw)}&format=json&limit=1`
    );
    const geoData = await geoRes.json();
    if (!geoData.length) {
      alert('Location not found. Try a more specific name.');
      btn.textContent = 'Check'; btn.disabled = false;
      goStep(1); return;
    }
    lat = parseFloat(geoData[0].lat);
    lon = parseFloat(geoData[0].lon);
  } catch {
    alert('Could not geocode location.'); 
    btn.textContent = 'Check'; btn.disabled = false;
    goStep(1); return;
  }

  // Call your FastAPI backend
  let data;
  try {
    const res = await fetch('http://localhost:8000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lat, lon })
    });
    data = await res.json();

    if (!res.ok) {
      // Backend returns 400 for out-of-Karnataka locations
      alert(data.message || 'Location not supported.');
      btn.textContent = 'Check'; btn.disabled = false;
      goStep(1); return;
    }
  } catch {
    alert('Backend unreachable. Is the server running?');
    btn.textContent = 'Check'; btn.disabled = false;
    goStep(1); return;
  }

  // Map backend response → the sig object shape your UI expects
  currentSig = {
    dbm:   data.dbm,
    type:  data.type,
    label: data.label,
    tier:  data.tier,
    bars:  data.bars,
    upi:   data.upi,
    badge: data.badge
  };

  currentLat = data.lat;
  currentLng = data.lon;

  setTimeout(() => {
    document.getElementById('loc-name').textContent = raw;
    document.getElementById('loc-coords').textContent = `${data.lat.toFixed(4)}, ${data.lon.toFixed(4)}`;
    populateSignal(currentSig);
    populateRecs(currentSig.tier);
    saveRecent(raw, { lat: data.lat, lng: data.lon }, currentSig);

    btn.textContent = 'Check'; btn.disabled = false;
    goStep(3);
  }, 3200);
}

function populateSignal(sig) {
  const qEl = document.getElementById('sig-quality');
  qEl.textContent = sig.label;
  qEl.className = `signal-quality ${sig.tier}`;
  document.getElementById('sig-dbm').textContent = `${sig.dbm} dBm (${sig.type})`;

  const upiVal = document.getElementById('upi-value');
  upiVal.textContent = sig.upi;
  upiVal.className = `upi-value ${sig.tier}`;

  const upiWrap = document.getElementById('upi-icon-wrap');
  upiWrap.className = `upi-icon-wrap ${sig.tier}`;
  document.getElementById('upi-icon').textContent = sig.tier === 'good' ? '✅' : sig.tier === 'mid' ? '⚠️' : '🚨';

  const badge = document.getElementById('upi-badge');
  badge.textContent = sig.badge;
  badge.className = `upi-badge ${sig.tier}`;
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
  // Remove duplicate
  recents = recents.filter(r => r.name.toLowerCase() !== name.toLowerCase());
  recents.unshift({ name, lat: coords.lat, lng: coords.lng, tier: sig.tier, badge: sig.badge });
  if (recents.length > 5) recents = recents.slice(0, 5);
  localStorage.setItem('nps_recents', JSON.stringify(recents));
  renderRecents();
}

function renderRecents() {
  const section = document.getElementById('recents-section');
  const list = document.getElementById('recents-list');
  if (recents.length === 0) { section.classList.add('hidden'); return; }
  section.classList.remove('hidden');
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
    div.onclick = () => {
      document.getElementById('loc-input').value = r.name;
      runCheck();
    };
    list.appendChild(div);
  });
}

function goStep(step) {
  document.querySelectorAll('.step-panel').forEach(p => p.classList.add('hidden'));
  const panel = document.getElementById(`panel-${step}`);
  panel.classList.remove('hidden');
  panel.classList.add('fade-in');

  if (step === 2) resetAnalyzingSteps();
  if (step === 3 && currentSig) animateBars(currentSig.bars, currentSig.tier);
  if (step === 5) renderBanks(BANKS);

  document.querySelector('.main').scrollTop = 0;
}

function resetAnalyzingSteps() {
  ['a1','a2','a3','a4'].forEach(id => document.getElementById(id).classList.remove('done'));
}

function animateBars(count, tier) {
  const cols = document.querySelectorAll('.bar-col');
  cols.forEach(col => { col.className = 'bar-col'; });
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      cols.forEach((col, i) => {
        if (i < count) setTimeout(() => col.classList.add('lit', tier), i * 100);
      });
    });
  });
}

function submitFeedback(choice) {
  document.getElementById('feedback-btns').classList.add('hidden');
  document.getElementById('back-from-5').classList.add('hidden');
  const thanks = document.getElementById('feedback-thanks');
  thanks.classList.remove('hidden');
  document.getElementById('thanks-text').textContent = choice === 'yes'
    ? '🎉 Great! Glad the payment went through successfully.'
    : '🙏 Sorry to hear that. Try switching your SIM or moving to a better signal area.';
}

function resetApp() {
  document.getElementById('loc-input').value = '';
  document.getElementById('feedback-btns').classList.remove('hidden');
  document.getElementById('feedback-thanks').classList.add('hidden');
  document.getElementById('back-from-5').classList.remove('hidden');
  currentSig = null;
  goStep(1);
}

function reveal(id) {
  const el = document.getElementById(id);
  el.classList.remove('hidden');
  void el.offsetWidth;
  el.classList.add('fade-in');
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

// Load recents on start
renderRecents();

// ── Bank Status Data ──
const BANKS = [
  { name: 'State Bank of India', upi: 'up', imps: 'up', icon: '🏦' },
  { name: 'HDFC Bank', upi: 'up', imps: 'up', icon: '🏥' },
  { name: 'ICICI Bank', upi: 'up', imps: 'down', icon: '🦁' },
  { name: 'Punjab National Bank', upi: 'down', imps: 'up', icon: '🌾' },
  { name: 'Axis Bank', upi: 'up', imps: 'up', icon: '📐' },
  { name: 'Bank of Baroda', upi: 'up', imps: 'up', icon: '🌎' },
  { name: 'Kotak Mahindra Bank', upi: 'up', imps: 'down', icon: '🛡️' },
  { name: 'YES BANK', upi: 'up', imps: 'up', icon: '✅' },
];

function renderBanks(data) {
  const list = document.getElementById('bank-list');
  if(!list) return;
  list.innerHTML = '';
  data.forEach(b => {
    const div = document.createElement('div');
    div.className = 'bank-item fade-in';
    div.innerHTML = `
      <div class="bank-info">
        <span class="bank-icon">${b.icon}</span>
        <span class="bank-name">${b.name}</span>
      </div>
      <div class="bank-statuses">
        <span class="status-pill ${b.upi}">${b.upi.toUpperCase()}</span>
        <span class="status-pill ${b.imps}">${b.imps.toUpperCase()}</span>
      </div>
    `;
    list.appendChild(div);
  });
}

function filterBanks() {
  const query = document.getElementById('bank-input').value.toLowerCase();
  const filtered = BANKS.filter(b => b.name.toLowerCase().includes(query));
  renderBanks(filtered);
}

// ── New Features: AI Assistant & Multi-Network ──





function openAiPanel() {
  document.getElementById('ai-panel').classList.remove('hidden');
}

function closeAiPanel() {
  document.getElementById('ai-panel').classList.add('hidden');
}

function submitAiText() {
  const input = document.getElementById('ai-text-in');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  sendAiMsg(text, true);
}

function sendAiMsg(text, fromInput = false) {
  const body = document.getElementById('ai-chat-body');
  
  // Create user message
  const userMsg = document.createElement('div');
  userMsg.className = 'ai-msg user fade-in';
  userMsg.textContent = text;
  body.appendChild(userMsg);
  
  // Scroll to bottom
  body.scrollTop = body.scrollHeight;

  // Add typing indicator or response
  setTimeout(() => {
    const aiMsg = document.createElement('div');
    aiMsg.className = 'ai-msg ai fade-in';
    
    // Generate simple canned AI responses based on keywords
    const lower = text.toLowerCase();
    if (lower.includes('fail')) {
      aiMsg.innerHTML = "Your payment likely failed due to a sudden drop in 4G signal (Latency spiked to 300ms). Switching to <b>WiFi</b> or moving to an open area will resolve this.";
    } else if (lower.includes('now') || lower.includes('can i')) {
      aiMsg.innerHTML = "Currently, your risk is <b>Moderate (67%)</b> on 4G. It's safer to switch to WiFi first, or you can try again if the signal bars turn green.";
    } else {
      aiMsg.innerHTML = "I am an AI Smart Advisor. To improve your payment success, try connecting to a stable WiFi network or toggling Airplane mode.";
    }
    
    body.appendChild(aiMsg);
    body.scrollTop = body.scrollHeight;
  }, 1000);
}

function switchDashboardTab(tabId, el) {
  // Ensure we are viewing the dashboard container, not the location checker flow
  document.getElementById('app-main').classList.add('hidden');
  document.getElementById('dashboard-panel').classList.remove('hidden');
  
  // Hide all dash tabs
  document.getElementById('dash-content').classList.add('hidden');
  document.getElementById('dash-map').classList.add('hidden');
  
  const target = document.getElementById(tabId);
  if(target) {
    target.classList.remove('hidden');
    target.classList.add('fade-in');
  }
  
  if (tabId === 'dash-map') {
      setTimeout(() => initMap(), 50);
  }
  
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  if(el) el.classList.add('active');
}

let map = null;
let mapMarker = null;
let betterNetworkCircle = null;
let currentLat = 12.9716;
let currentLng = 77.5946;

function initMap() {
  const renderMapElements = () => {
    if (!map) {
      // Initialize exactly on dash-map
      map = L.map('real-map').setView([currentLat, currentLng], 16);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
      }).addTo(map);

      // Marker for current location
      mapMarker = L.marker([currentLat, currentLng]).addTo(map)
          .bindPopup('<b>You are here</b>', { closeOnClick: false, autoClose: false }).openPopup();

      // Circle for better network 50m away
      betterNetworkCircle = L.circle([currentLat + 0.001, currentLng + 0.0015], {
          color: '#22c55e',
          fillColor: '#22c55e',
          fillOpacity: 0.2,
          radius: 100
      }).addTo(map).bindPopup('Better Network Zone');
    } else {
      map.invalidateSize();
      map.flyTo([currentLat, currentLng], 16, { duration: 1 });
      mapMarker.setLatLng([currentLat, currentLng]).openPopup();
      betterNetworkCircle.setLatLng([currentLat + 0.001, currentLng + 0.0015]);
    }
  };

  // Render immediately with existing cached coords
  renderMapElements();

  // Instantly attempt to fetch extreme real-time accurate coordinates
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => {
        currentLat = pos.coords.latitude;
        currentLng = pos.coords.longitude;
        // Fly over to the exact GPS coordinates live!
        renderMapElements(); 
      },
      (err) => console.log('Live location err:', err),
      { enableHighAccuracy: true, timeout: 5000 }
    );
  }
}

