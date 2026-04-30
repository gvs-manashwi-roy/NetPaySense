/**
 * NetPaySense — Kannada Translation
 * Clean data-i18n based system. No MutationObserver. No global function overrides.
 * applyKannadaTranslation()  → switch to Kannada
 * restoreEnglish()           → switch back to English
 */

// ─── Translation map ──────────────────────────────────────────────────────────
const KANNADA_TRANSLATIONS = {
  // Onboarding
  "Welcome to NetPaySense": "NetPaySense ಗೆ ಸುಸ್ವಾಗತ",
  "Check network reliability and UPI payment success chances for any location — before you pay.":
    "ನೀವು ಹಣ ಪಾವತಿಸುವ ಮೊದಲು ಯಾವುದೇ ಸ್ಥಳದ ನೆಟ್‌ವರ್ಕ್ ವಿಶ್ವಾಸಾರ್ಹತೆ ಮತ್ತು UPI ಪಾವತಿ ಯಶಸ್ಸಿನ ಸಾಧ್ಯತೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.",
  "Smart Location Check": "ಸ್ಮಾರ್ಟ್ ಸ್ಥಳ ಪರಿಶೀಲನೆ",
  "Enter any location or use GPS to instantly get signal strength, UPI risk level, and bank server status.":
    "ಸಿಗ್ನಲ್ ಸಾಮರ್ಥ್ಯ, UPI ಅಪಾಯದ ಮಟ್ಟ ಮತ್ತು ಬ್ಯಾಂಕ್ ಸರ್ವರ್ ಸ್ಥಿತಿಯನ್ನು ತಕ್ಷಣ ಪಡೆಯಲು ಯಾವುದೇ ಸ್ಥಳ ನಮೂದಿಸಿ ಅಥವಾ GPS ಬಳಸಿ.",
  "100% Private": "100% ಖಾಸಗಿ",
  "No data is sent to any server. Everything runs locally on your device. Your location stays yours.":
    "ಯಾವುದೇ ಡೇಟಾವನ್ನು ಸರ್ವರ್‌ಗೆ ಕಳುಹಿಸಲಾಗುವುದಿಲ್ಲ. ಎಲ್ಲವೂ ನಿಮ್ಮ ಸಾಧನದಲ್ಲಿ ಸ್ಥಳೀಯವಾಗಿ ಚಲಿಸುತ್ತದೆ. ನಿಮ್ಮ ಸ್ಥಳ ನಿಮ್ಮದಾಗಿಯೇ ಇರುತ್ತದೆ.",
  "Next →": "ಮುಂದೆ →",
  "Don't show again": "ಮತ್ತೆ ತೋರಿಸಬೇಡಿ",
  "Get Started ✓": "ಪ್ರಾರಂಭಿಸಿ ✓",

  // Settings
  "Settings": "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
  "My Profile": "ನನ್ನ ಪ್ರೊಫೈಲ್",
  "NetPaySense User": "NetPaySense ಬಳಕೆದಾರ",
  "Edit": "ತಿದ್ದು",
  "Appearance": "ಗೋಚರತೆ",
  "Dark Mode": "ಡಾರ್ಕ್ ಮೋಡ್",
  "Switch between light and dark": "ಬೆಳಕು ಮತ್ತು ಕತ್ತಲೆಯ ನಡುವೆ ಬದಲಿಸಿ",
  "Notifications": "ಸೂಚನೆಗಳು",
  "Payment Risk Alerts": "ಪಾವತಿ ಅಪಾಯದ ಎಚ್ಚರಿಕೆಗಳು",
  "Get notified on high risk": "ಹೆಚ್ಚಿನ ಅಪಾಯದ ಬಗ್ಗೆ ಸೂಚನೆ ಪಡೆಯಿರಿ",
  "Vibration": "ಕಂಪನ",
  "Haptic feedback on actions": "ಕ್ರಮಗಳ ಮೇಲೆ ಹ್ಯಾಪ್ಟಿಕ್ ಪ್ರತಿಕ್ರಿಯೆ",
  "Data & Privacy": "ಡೇಟಾ ಮತ್ತು ಗೌಪ್ಯತೆ",
  "Clear Search History": "ಹುಡುಕಾಟದ ಇತಿಹಾಸವನ್ನು ಅಳಿಸಿ",
  "Remove all recent checks": "ಎಲ್ಲಾ ಇತ್ತೀಚಿನ ತಪಾಸಣೆಗಳನ್ನು ತೆಗೆದುಹಾಕಿ",
  "Show App Intro": "ಅಪ್ಲಿಕೇಶನ್ ಪರಿಚಯವನ್ನು ತೋರಿಸಿ",
  "Replay the onboarding slides": "ಆನ್‌ಬೋರ್ಡಿಂಗ್ ಸ್ಲೈಡ್‌ಗಳನ್ನು ಮರುಪ್ಲೇ ಮಾಡಿ",
  "Privacy": "ಗೌಪ್ಯತೆ",
  "All data stays on your device": "ಎಲ್ಲಾ ಡೇಟಾ ನಿಮ್ಮ ಸಾಧನದಲ್ಲಿಯೇ ಇರುತ್ತದೆ",
  "Local": "ಸ್ಥಳೀಯ",
  "About": "ಬಗ್ಗೆ",
  "App Version": "ಅಪ್ಲಿಕೇಶನ್ ಆವೃತ್ತಿ",
  "NetPaySense v2.0": "NetPaySense v2.0",
  "Rate the App": "ಅಪ್ಲಿಕೇಶನ್ ರೇಟ್ ಮಾಡಿ",
  "Tell us what you think": "ನಿಮ್ಮ ಅಭಿಪ್ರಾಯ ತಿಳಿಸಿ",
  "Contact Support": "ಬೆಂಬಲ ಸಂಪರ್ಕಿಸಿ",
  "Get help or report a bug": "ಸಹಾಯ ಪಡೆಯಿರಿ ಅಥವಾ ದೋಷ ವರದಿ ಮಾಡಿ",

  // Dashboard
  "📊 My Network Dashboard": "📊 ನನ್ನ ನೆಟ್‌ವರ್ಕ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
  "My Network Dashboard": "ನನ್ನ ನೆಟ್‌ವರ್ಕ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
  "Check your current location's network reliability": "ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಸ್ಥಳದ ನೆಟ್‌ವರ್ಕ್ ವಿಶ್ವಾಸಾರ್ಹತೆ ಪರಿಶೀಲಿಸಿ",
  "🏦 Choose Bank": "🏦 ಬ್ಯಾಂಕ್ ಆರಿಸಿ",
  "Choose Bank": "ಬ್ಯಾಂಕ್ ಆರಿಸಿ",
  "Select your payment bank": "ನಿಮ್ಮ ಪಾವತಿ ಬ್ಯಾಂಕ್ ಆಯ್ಕೆಮಾಡಿ",
  "🔍 Check New Location": "🔍 ಹೊಸ ಸ್ಥಳ ಪರಿಶೀಲಿಸಿ",
  "📍 Fetch My Location": "📍 ನನ್ನ ಸ್ಥಳ ಪಡೆಯಿರಿ",
  "Fetching location...": "ಸ್ಥಳ ಪಡೆಯಲಾಗುತ್ತಿದೆ...",
  "Current Location": "ಪ್ರಸ್ತುತ ಸ್ಥಳ",
  "Network Status": "ನೆಟ್‌ವರ್ಕ್ ಸ್ಥಿತಿ",
  "Signal": "ಸಿಗ್ನಲ್",
  "Latency": "ವಿಳಂಬ (Latency)",
  "Speed": "ವೇಗ",
  "Payment Reliability": "ಪಾವತಿ ವಿಶ್ವಾಸಾರ್ಹತೆ",
  "Signal History": "ಸಿಗ್ನಲ್ ಇತಿಹಾಸ",
  "Last 5 checks": "ಕಳೆದ 5 ತಪಾಸಣೆಗಳು",

  // Map
  "Smart Network Map": "ಸ್ಮಾರ್ಟ್ ನೆಟ್‌ವರ್ಕ್ ಮ್ಯಾಪ್",
  "🚶 Move 50m ➔ Better network": "🚶 50ಮೀ ಚಲಿಸಿ ➔ ಉತ್ತಮ ನೆಟ್‌ವರ್ಕ್",
  "Move 50m": "50 ಮೀಟರ್ ಚಲಿಸಿ",
  "Better network": "ಉತ್ತಮ ನೆಟ್‌ವರ್ಕ್",

  // Banks panel
  "🏦 Check Bank Server Status": "🏦 ಬ್ಯಾಂಕ್ ಸರ್ವರ್ ಸ್ಥಿತಿ ಪರಿಶೀಲಿಸಿ",
  "Check Bank Server Status": "ಬ್ಯಾಂಕ್ ಸರ್ವರ್ ಸ್ಥಿತಿ ಪರಿಶೀಲಿಸಿ",
  "Select a bank to view its live UPI server status": "ಲೈವ್ UPI ಸರ್ವರ್ ಸ್ಥಿತಿ ವೀಕ್ಷಿಸಲು ಬ್ಯಾಂಕ್ ಆಯ್ಕೆಮಾಡಿ",
  "Select Bank": "ಬ್ಯಾಂಕ್ ಆಯ್ಕೆ",

  // Search step
  "Welcome to Network & UPI Checker": "ನೆಟ್‌ವರ್ಕ್ ಮತ್ತು UPI ಚೆಕ್ಕರ್‌ಗೆ ಸುಸ್ವಾಗತ",
  "Check your network signal strength and UPI payment reliability for any location.":
    "ಯಾವುದೇ ಸ್ಥಳಕ್ಕಾಗಿ ನಿಮ್ಮ ನೆಟ್‌ವರ್ಕ್ ಸಿಗ್ನಲ್ ಸಾಮರ್ಥ್ಯ ಮತ್ತು UPI ಪಾವತಿ ವಿಶ್ವಾಸಾರ್ಹತೆ ಪರಿಶೀಲಿಸಿ.",
  "Enter location (e.g. Koramangala…)": "ಸ್ಥಳ ನಮೂದಿಸಿ (ಉದಾ: ಕೋರಮಂಗಲ…)",
  "Check": "ಪರಿಶೀಲಿಸಿ",
  "Checking…": "ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ…",
  "🕐 Recently Checked": "🕐 ಇತ್ತೀಚೆಗೆ ಪರಿಶೀಲಿಸಲಾಗಿದೆ",
  "Enter a location to get started": "ಪ್ರಾರಂಭಿಸಲು ಸ್ಥಳ ನಮೂದಿಸಿ",

  // Analyzing
  "Analyzing Network...": "ನೆಟ್‌ವರ್ಕ್ ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
  "Please wait, this may take a few seconds": "ದಯವಿಟ್ಟು ನಿರೀಕ್ಷಿಸಿ, ಇದು ಕೆಲವು ಸೆಕೆಂಡುಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳಬಹುದು",
  "Fetching location data...": "ಸ್ಥಳ ಡೇಟಾ ಪಡೆಯಲಾಗುತ್ತಿದೆ...",
  "Fetching signal data...": "ಸಿಗ್ನಲ್ ಡೇಟಾ ಪಡೆಯಲಾಗುತ್ತಿದೆ...",
  "Analyzing signal strength...": "ಸಿಗ್ನಲ್ ಸಾಮರ್ಥ್ಯ ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
  "Predicting UPI success...": "UPI ಯಶಸ್ಸು ಊಹಿಸಲಾಗುತ್ತಿದೆ...",

  // Results
  "Results": "ಫಲಿತಾಂಶಗಳು",
  "Location Detected": "ಸ್ಥಳ ಪತ್ತೆಯಾಗಿದೆ",
  "Bank Server Status": "ಬ್ಯಾಂಕ್ ಸರ್ವರ್ ಸ್ಥಿತಿ",
  "Payment Risk Meter": "ಪಾವತಿ ಅಪಾಯದ ಮೀಟರ್",
  "UPI Success Chance": "UPI ಯಶಸ್ಸಿನ ಸಾಧ್ಯತೆ",
  "💡 Recommendations": "💡 ಶಿಫಾರಸುಗಳು",
  "Recommendations": "ಶಿಫಾರಸುಗಳು",
  "← Back": "← ಹಿಂದಕ್ಕೆ",
  "Feedback →": "ಪ್ರತಿಕ್ರಿಯೆ →",

  // Feedback
  "Feedback": "ಪ್ರತಿಕ್ರಿಯೆ",
  "How did your payment go?": "ನಿಮ್ಮ ಪಾವತಿ ಹೇಗೆ ಹೋಯಿತು?",
  "Successful": "ಯಶಸ್ವಿಯಾಗಿದೆ",
  "Failed": "ವಿಫಲವಾಗಿದೆ",
  "Pending": "ಬಾಕಿ ಉಳಿದಿದೆ",
  "What went wrong?": "ಏನು ತಪ್ಪಾಗಿದೆ?",
  "Poor Signal": "ದುರ್ಬಲ ಸಿಗ್ನಲ್",
  "Timeout": "ಸಮಯ ಮೀರಿದೆ",
  "Bank Server Down": "ಬ್ಯಾಂಕ್ ಸರ್ವರ್ ಸ್ಥಗಿತ",
  "Wrong UPI ID": "ತಪ್ಪಾದ UPI ಐಡಿ",
  "Other": "ಇತರೆ",
  "Rate your experience": "ನಿಮ್ಮ ಅನುಭವ ರೇಟ್ ಮಾಡಿ",
  "Submit Feedback": "ಪ್ರತಿಕ್ರಿಯೆ ಸಲ್ಲಿಸಿ",
  "Thank you!": "ಧನ್ಯವಾದಗಳು!",
  "🔄 Check Another Location": "🔄 ಮತ್ತೊಂದು ಸ್ಥಳ ಪರಿಶೀಲಿಸಿ",

  // AI Advisor
  "AI Smart Advisor": "AI ಸ್ಮಾರ್ಟ್ ಸಲಹೆಗಾರ",
  "💡 Network Boosting Suggestions": "💡 ನೆಟ್‌ವರ್ಕ್ ಹೆಚ್ಚಿಸುವ ಸಲಹೆಗಳು",
  "Move near a window to improve signal": "ಸಿಗ್ನಲ್ ಸುಧಾರಿಸಲು ಕಿಟಕಿಯ ಹತ್ತಿರ ಚಲಿಸಿ",
  "Turn Airplane mode ON and OFF": "ಏರ್‌ಪ್ಲೇನ್ ಮೋಡ್ ಆನ್ ಮತ್ತು ಆಫ್ ಮಾಡಿ",
  "Switch to WiFi to increase success by 25%": "ಯಶಸ್ಸನ್ನು 25% ಹೆಚ್ಚಿಸಲು ವೈಫೈಗೆ ಬದಲಿಸಿ",
  "Hi! Your payment risk is high right now. How can I assist you?":
    "ನಮಸ್ತೆ! ನಿಮ್ಮ ಪಾವತಿ ಅಪಾಯ ಈಗ ಹೆಚ್ಚಾಗಿದೆ. ನಾನು ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?",
  "Why did my payment fail?": "ನನ್ನ ಪಾವತಿ ಏಕೆ ವಿಫಲವಾಯಿತು?",
  "Can I make a payment now?": "ನಾನು ಈಗ ಪಾವತಿ ಮಾಡಬಹುದೇ?",
  "Voice Input... or type": "ಧ್ವನಿ ಇನ್ಪುಟ್... ಅಥವಾ ಟೈಪ್ ಮಾಡಿ",

  // Bottom Nav
  "Home": "ಹೋಮ್",
  "Maps": "ಮ್ಯಾಪ್",
  "Banks": "ಬ್ಯಾಂಕುಗಳು",

  // Header
  "Network & UPI Checker": "ನೆಟ್‌ವರ್ಕ್ ಮತ್ತು UPI ಚೆಕ್ಕರ್",

  // Risk labels
  "Low Risk": "ಕಡಿಮೆ ಅಪಾಯ",
  "Moderate Risk": "ಮಧ್ಯಮ ಅಪಾಯ",
  "High Risk": "ಹೆಚ್ಚಿನ ಅಪಾಯ",
  "Low": "ಕಡಿಮೆ",
  "High": "ಹೆಚ್ಚು",

  // Dynamic statuses
  "Online": "ಆನ್‌ಲೈನ್",
  "Offline": "ಆಫ್‌ಲೈನ್",
  "Available": "ಲಭ್ಯವಿದೆ",
  "Unavailable": "ಲಭ್ಯವಿಲ್ಲ",
  "Active": "ಸಕ್ರಿಯ",
  "Delayed": "ವಿಳಂಬ",
  "Minor Delays Detected": "ಸಣ್ಣ ವಿಳಂಬಗಳು ಪತ್ತೆ",
  "All Services are Operational": "ಎಲ್ಲಾ ಸೇವೆಗಳು ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿವೆ",
  "UPI Transactions Currently Down": "UPI ವಹಿವಾಟುಗಳು ಪ್ರಸ್ತುತ ಸ್ಥಗಿತ",

  // Community alert
  "Community Alert!": "ಸಮುದಾಯ ಎಚ್ಚರಿಕೆ!",
  "Recent payment failures reported nearby.": "ಹತ್ತಿರದಲ್ಲಿ ಇತ್ತೀಚಿನ ಪಾವತಿ ವಿಫಲತೆಗಳು ವರದಿಯಾಗಿವೆ.",
};

// ─── data-i18n stamping ───────────────────────────────────────────────────────
// Walk every text node once and tag its parent element so we can swap reliably.

function _stampI18n() {
  if (document.body.dataset.i18nStamped) return; // already done

  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null
  );

  let node;
  while ((node = walker.nextNode())) {
    const text = node.nodeValue.trim();
    if (!text) continue;

    // Find the best matching translation key
    let matchKey = null;

    // Exact match (trimmed)
    if (KANNADA_TRANSLATIONS[text]) {
      matchKey = text;
    } else {
      // Substring match — pick longest key that appears in the text
      let best = "";
      for (const key in KANNADA_TRANSLATIONS) {
        if (text.includes(key) && key.length > best.length) {
          best = key;
        }
      }
      if (best) matchKey = best;
    }

    if (matchKey) {
      const parent = node.parentElement;
      if (parent && !parent.dataset.i18nKey) {
        parent.dataset.i18nKey = matchKey;
        parent.dataset.i18nOriginal = node.nodeValue; // preserve exact whitespace
      }
    }
  }

  // Stamp placeholders
  document.querySelectorAll("[placeholder]").forEach(el => {
    const ph = el.placeholder.trim();
    if (KANNADA_TRANSLATIONS[ph]) {
      el.dataset.i18nPlaceholder = ph;
    }
  });

  document.body.dataset.i18nStamped = "1";
}

// ─── Apply Kannada ────────────────────────────────────────────────────────────
function applyKannadaTranslation() {
  _stampI18n();

  // Translate all stamped text nodes
  document.querySelectorAll("[data-i18n-key]").forEach(el => {
    const key = el.dataset.i18nKey;
    const kn = KANNADA_TRANSLATIONS[key];
    if (!kn) return;

    // Replace only the matching part in the original text to preserve surrounding chars
    const original = el.dataset.i18nOriginal;
    const replaced = original.replace(key, kn);

    // Set textContent only on the direct text node (not child elements)
    for (const child of el.childNodes) {
      if (child.nodeType === Node.TEXT_NODE && child.nodeValue.includes(key)) {
        child.nodeValue = original.replace(key, kn);
        break;
      }
    }
    // Fallback: if no text node found with exact key, use the replaced value
    // (handles cases where whitespace trimming hides it)
    if (el.textContent.includes(key)) {
      el.textContent = replaced;
    }
  });

  // Translate placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (KANNADA_TRANSLATIONS[key]) el.placeholder = KANNADA_TRANSLATIONS[key];
  });

  document.title = "NetPaySense (ಕನ್ನಡ)";
  console.log("✅ Kannada translation applied.");
}

// ─── Restore English ──────────────────────────────────────────────────────────
function restoreEnglish() {
  _stampI18n(); // ensure stamped (safe to call multiple times)

  document.querySelectorAll("[data-i18n-key]").forEach(el => {
    const original = el.dataset.i18nOriginal;
    if (!original) return;

    // Restore the original text in the direct text node
    for (const child of el.childNodes) {
      if (child.nodeType === Node.TEXT_NODE) {
        // Check if this node contains the translated text (any Kannada char)
        if (/[\u0C80-\u0CFF]/.test(child.nodeValue) || child.nodeValue !== original) {
          child.nodeValue = original;
          break;
        }
      }
    }
    // Fallback for fully replaced textContent
    if (/[\u0C80-\u0CFF]/.test(el.textContent)) {
      el.textContent = original;
    }
  });

  // Restore placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    el.placeholder = el.dataset.i18nPlaceholder;
  });

  document.title = "NetPaySense";
  console.log("✅ English restored.");
}

// ─── Expose globally ──────────────────────────────────────────────────────────
window.applyKannadaTranslation = applyKannadaTranslation;
window.restoreEnglish = restoreEnglish;
