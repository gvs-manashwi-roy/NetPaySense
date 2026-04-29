/**
 * NetPaySense Hindi Translation Script
 * This script translates the entire frontend into Hindi.
 * To use: Include this script in your index.html or run applyHindiTranslation() in the console.
 */

const HINDI_TRANSLATIONS = {
    // Onboarding
    "Welcome to NetPaySense": "NetPaySense में आपका स्वागत है",
    "Check network reliability and UPI payment success chances for any location — before you pay.": "भुगतान करने से पहले किसी भी स्थान की नेटवर्क विश्वसनीयता और UPI भुगतान सफलता की संभावनाएं जांचें।",
    "Smart Location Check": "स्मार्ट स्थान जांच",
    "Enter any location or use GPS to instantly get signal strength, UPI risk level, and bank server status.": "सिग्नल शक्ति, UPI जोखिम स्तर और बैंक सर्वर स्थिति तुरंत जानने के लिए कोई भी स्थान दर्ज करें या GPS का उपयोग करें।",
    "100% Private": "100% निजी",
    "No data is sent to any server. Everything runs locally on your device. Your location stays yours.": "कोई भी डेटा किसी सर्वर पर नहीं भेजा जाता। सब कुछ आपके डिवाइस पर स्थानीय रूप से चलता है। आपका स्थान आपका ही रहता है।",
    "Next →": "अगला →",
    "Don't show again": "दोबारा मत दिखाएं",
    "Get Started ✓": "शुरू करें ✓",

    // Settings
    "Settings": "सेटिंग्स",
    "My Profile": "मेरी प्रोफाइल",
    "NetPaySense User": "NetPaySense उपयोगकर्ता",
    "Edit": "संपादित करें",
    "Appearance": "स्वरूप",
    "🌙 Dark Mode": "🌙 डार्क मोड",
    "Dark Mode": "डार्क मोड",
    "Switch between light and dark": "लाइट और डार्क के बीच बदलें",
    "Notifications": "सूचनाएं",
    "🔔 Payment Risk Alerts": "🔔 भुगतान जोखिम अलर्ट",
    "Payment Risk Alerts": "भुगतान जोखिम अलर्ट",
    "Get notified on high risk": "उच्च जोखिम पर सूचना पाएं",
    "📳 Vibration": "📳 कंपन",
    "Vibration": "कंपन",
    "Haptic feedback on actions": "क्रियाओं पर हैप्टिक प्रतिक्रिया",
    "Data & Privacy": "डेटा और गोपनीयता",
    "🗑️ Clear Search History": "🗑️ खोज इतिहास साफ़ करें",
    "Clear Search History": "खोज इतिहास साफ़ करें",
    "Remove all recent checks": "सभी हाल की जांचें हटाएं",
    "🎬 Show App Intro": "🎬 ऐप परिचय दिखाएं",
    "Show App Intro": "ऐप परिचय दिखाएं",
    "Replay the onboarding slides": "ऑनबोर्डिंग स्लाइड्स फिर से चलाएं",
    "Privacy": "गोपनीयता",
    "All data stays on your device": "सभी डेटा आपके डिवाइस पर रहता है",
    "Local": "स्थानीय",
    "About": "जानकारी",
    "📱 App Version": "📱 ऐप संस्करण",
    "App Version": "ऐप संस्करण",
    "⭐ Rate the App": "⭐ ऐप को रेट करें",
    "Rate the App": "ऐप को रेट करें",
    "Tell us what you think": "हमें अपनी राय बताएं",
    "📧 Contact Support": "📧 सहायता से संपर्क करें",
    "Contact Support": "सहायता से संपर्क करें",
    "Get help or report a bug": "सहायता पाएं या बग रिपोर्ट करें",
    "Enter your name:": "अपना नाम दर्ज करें:",
    "Profile Updated": "प्रोफाइल अपडेट हो गई",

    // Dashboard
    "📊 My Network Dashboard": "📊 मेरा नेटवर्क डैशबोर्ड",
    "Check your current location's network reliability": "अपने वर्तमान स्थान की नेटवर्क विश्वसनीयता जांचें",
    "📍 Fetch My Location": "📍 मेरा स्थान पाएं",
    "⏳ Fetching...": "⏳ प्राप्त हो रहा है...",
    "🔍 Check New Location": "🔍 नया स्थान जांचें",
    "Fetching location...": "स्थान प्राप्त हो रहा है...",
    "Current Location": "वर्तमान स्थान",
    "📶 Network Status": "📶 नेटवर्क स्थिति",
    "Signal": "सिग्नल",
    "Latency": "विलंबता (Latency)",
    "Speed": "गति",
    "💳 Payment Reliability": "💳 भुगतान विश्वसनीयता",
    "📈 Signal History": "📈 सिग्नल इतिहास",
    "Last 5 checks": "पिछली 5 जांचें",
    "Check Bank Status": "बैंक स्थिति जांचें",
    "🏦 Check Bank Status": "🏦 बैंक स्थिति जांचें",

    // Map
    "Smart Network Map": "स्मार्ट नेटवर्क मैप",
    "Move 50m": "50 मीटर चलें",
    "Better network": "बेहतर नेटवर्क",
    "Better Network Zone": "बेहतर नेटवर्क क्षेत्र",
    "You are here": "आप यहां हैं",
    "🚶 Move 50m ➔ Better network": "🚶 50मी चलें ➔ बेहतर नेटवर्क",

    // Banks
    "🏦 Check Bank Server Status": "🏦 बैंक सर्वर स्थिति जांचें",
    "Select a bank to view its live UPI server status": "लाइव UPI सर्वर स्थिति देखने के लिए बैंक चुनें",
    "Select Bank": "बैंक चुनें",
    "Choose Bank": "बैंक चुनें",

    // Search Step
    "Welcome to Network & UPI Checker": "नेटवर्क और UPI चेकर में आपका स्वागत है",
    "Check your network signal strength and UPI payment reliability for any location.": "किसी भी स्थान के लिए अपनी नेटवर्क सिग्नल शक्ति और UPI भुगतान विश्वसनीयता जांचें।",
    "Enter location (e.g. Koramangala…)": "स्थान दर्ज करें (उदा. कोरमंगला…)",
    "Check": "जांचें",
    "Checking…": "जांच हो रही है…",
    "🕐 Recently Checked": "🕐 हाल ही में जांचा गया",
    "🔍 Enter a location to get started": "🔍 शुरू करने के लिए स्थान दर्ज करें",

    // Analyzing
    "Analyzing Network...": "नेटवर्क विश्लेषण हो रहा है...",
    "Please wait, this may take a few seconds": "कृपया प्रतीक्षा करें, इसमें कुछ सेकंड लग सकते हैं",
    "Fetching location data...": "स्थान डेटा प्राप्त हो रहा है...",
    "Fetching signal data...": "सिग्नल डेटा प्राप्त हो रहा है...",
    "Analyzing signal strength...": "सिग्नल शक्ति का विश्लेषण हो रहा है...",
    "Predicting UPI success...": "UPI सफलता का अनुमान लगाया जा रहा है...",

    // Results
    "Results": "परिणाम",
    "Location Detected": "स्थान पता चला",
    "Payment Risk Meter": "भुगतान जोखिम मीटर",
    "UPI Success Chance": "UPI सफलता की संभावना",
    "💡 Recommendations": "💡 सिफारिशें",
    "Recommendations": "सिफारिशें",
    "← Back": "← वापस",
    "Back": "वापस",
    "Feedback →": "प्रतिक्रिया →",
    "Feedback": "प्रतिक्रिया",
    "Bank Server Status": "बैंक सर्वर स्थिति",

    // Feedback
    "How did your payment go?": "आपका भुगतान कैसा रहा?",
    "Successful": "सफल",
    "Failed": "असफल",
    "Pending": "लंबित (Pending)",
    "What went wrong?": "क्या गलत हुआ?",
    "Poor Signal": "कमज़ोर सिग्नल",
    "Timeout": "समय समाप्त (Timeout)",
    "Bank Server Down": "बैंक सर्वर बंद",
    "Wrong UPI ID": "गलत UPI आईडी",
    "Other": "अन्य",
    "Rate your experience": "अपना अनुभव रेट करें",
    "Submit Feedback": "प्रतिक्रिया सबमिट करें",
    "Thank you!": "धन्यवाद!",
    "Check Another Location": "कोई अन्य स्थान जांचें",
    "Thanks for the": "रेटिंग देने के लिए धन्यवाद",
    "rating!": "स्टार!",
    "Thank you for your feedback!": "आपकी प्रतिक्रिया के लिए धन्यवाद!",

    // AI Advisor
    "AI Smart Advisor": "AI स्मार्ट सलाहकार",
    "💡 Network Boosting Suggestions": "💡 नेटवर्क बढ़ाने के सुझाव",
    "Move near a window to improve signal": "सिग्नल सुधारने के लिए खिड़की के पास जाएं",
    "Turn Airplane mode ON and OFF": "एयरप्लेन मोड चालू और बंद करें",
    "Switch to WiFi to increase success by 25%": "सफलता 25% बढ़ाने के लिए WiFi पर स्विच करें",
    "Hi! Your payment risk is high right now. How can I assist you?": "नमस्ते! आपका भुगतान जोखिम अभी उच्च है। मैं आपकी कैसे सहायता कर सकता हूं?",
    "Why did my payment fail?": "मेरा भुगतान क्यों विफल हुआ?",
    "Can I make a payment now?": "क्या मैं अभी भुगतान कर सकता हूं?",
    "Voice Input... or type": "वॉयस इनपुट... या टाइप करें",

    // Bottom Nav (Specific spans)
    "Home": "होम",
    "Map": "मैप",
    "Banks": "बैंक",
    "🏠 Home": "🏠 होम",
    "🗺️ Map": "🗺️ मैप",
    "🏦 Banks": "🏦 बैंक",

    // Headers with icons
    "🏦 Bank Server Status": "🏦 बैंक सर्वर स्थिति",

    // Risk Labels
    "Low Risk": "कम जोखिम",
    "Moderate Risk": "मध्यम जोखिम",
    "High Risk": "उच्च जोखिम",
    "Low": "कम",
    "High": "उच्च",

    // Dynamic Statuses
    "Online": "ऑनलाइन",
    "Offline": "ऑफलाइन",
    "Available": "उपलब्ध",
    "Unavailable": "अनुपलब्ध",
    "Active": "सक्रिय",
    "Delayed": "विलंबित",
    "Minor Delays Detected": "मामूली देरी पाई गई",
    "All Services are Operational": "सभी सेवाएं चालू हैं",
    "UPI Transactions Currently Down": "UPI लेनदेन अभी बंद हैं",

    // Banks Names (for HTML options)
    "State Bank of India (SBI)": "भारतीय स्टेट बैंक (SBI)",
    "HDFC Bank": "HDFC बैंक",
    "ICICI Bank": "ICICI बैंक",
    "Punjab National Bank": "पंजाब नेशनल बैंक",
    "Bank of Baroda": "बैंक ऑफ बड़ौदा",
    "Canara Bank": "केनरा बैंक",
    "Axis Bank": "एक्सिस बैंक",
    "Union Bank of India": "यूनियन बैंक ऑफ इंडिया",
    "Indian Bank": "इंडियन बैंक",
    "Bank of India": "बैंक ऑफ इंडिया",
};

const HINDI_SIGNALS = [
    { dbm: -58, type: '5G', label: 'उत्कृष्ट सिग्नल', tier: 'good', bars: 5, upi: 'उच्च – 96%', badge: 'कम जोखिम' },
    { dbm: -65, type: '5G', label: 'उत्कृष्ट सिग्नल', tier: 'good', bars: 5, upi: 'उच्च – 91%', badge: 'कम जोखिम' },
    { dbm: -72, type: '4G', label: 'अच्छा सिग्नल', tier: 'good', bars: 4, upi: 'उच्च – 84%', badge: 'कम जोखिम' },
    { dbm: -80, type: '4G', label: 'अच्छा सिग्नल', tier: 'good', bars: 3, upi: 'मध्यम – 72%', badge: 'कम जोखिम' },
    { dbm: -88, type: '4G', label: 'मध्यम सिग्नल', tier: 'mid', bars: 3, upi: 'मध्यम – 61%', badge: 'मध्यम जोखिम' },
    { dbm: -95, type: '3G', label: 'मध्यम सिग्नल', tier: 'mid', bars: 2, upi: 'मध्यम – 48%', badge: 'मध्यम जोखिम' },
    { dbm: -102, type: '4G', label: 'कमज़ोर सिग्नल', tier: 'poor', bars: 1, upi: 'कम – 32%', badge: 'उच्च जोखिम' },
    { dbm: -110, type: '4G', label: 'कमज़ोर सिग्नल', tier: 'poor', bars: 1, upi: 'कम – 28%', badge: 'उच्च जोखिम' },
    { dbm: -115, type: '2G', label: 'बहुत कमज़ोर सिग्नल', tier: 'poor', bars: 1, upi: 'कम – 14%', badge: 'उच्च जोखिम' },
];

const HINDI_RECS = {
    good: [
        { icon: '📱', text: '<strong>Airtel / Jio का उपयोग करें</strong> — नेटवर्क स्थिर और तेज़ है' },
        { icon: '✅', text: '<strong>जारी रखना सुरक्षित है</strong> अभी UPI भुगतान करें' },
        { icon: '⚡', text: '<strong>तेज़ लेनदेन</strong> 5 सेकंड के भीतर अपेक्षित' },
        { icon: '🔒', text: 'भुगतान विफलता या समय समाप्ति का <strong>कम जोखिम</strong>' },
    ],
    mid: [
        { icon: '🔄', text: 'बेहतर नेटवर्क स्थिरता के लिए <strong>Jio पर स्विच करें</strong>' },
        { icon: '⏱️', text: '<strong>10–15 मिनट प्रतीक्षा करें</strong> और फिर भुगतान का प्रयास करें' },
        { icon: '💵', text: 'भुगतान विफल होने पर <strong>नकद (Cash) बैकअप के रूप में रखें</strong>' },
    ],
    poor: [
        { icon: '🔄', text: 'यहां बेहतर कवरेज के लिए <strong>Vi / BSNL पर स्विच करें</strong>' },
        { icon: '⏱️', text: '<strong>10–15 मिनट प्रतीक्षा करें</strong> और फिर भुगतान का प्रयास करें' },
        { icon: '💵', text: '<strong>नकद (Cash) बैकअप के रूप में रखें</strong> — भुगतान विफल होने की संभावना है' },
    ],
};

const HINDI_BANK_DATA = {
    SBI: { name: 'भारतीय स्टेट बैंक (SBI)', rows: [{ label: 'UPI लेनदेन', status: 'ऑनलाइन' }, { label: 'UPI बैलेंस जांच', status: 'उपलब्ध' }, { label: 'UPI पंजीकरण', status: 'सक्रिय' }], overall: 'सभी सेवाएं चालू हैं', ok: true },
    HDFC: { name: 'HDFC बैंक', rows: [{ label: 'UPI लेनदेन', status: 'ऑनलाइन' }, { label: 'UPI बैलेंस जांच', status: 'उपलब्ध' }, { label: 'UPI पंजीकरण', status: 'सक्रिय' }], overall: 'सभी सेवाएं चालू हैं', ok: true },
    ICICI: { name: 'ICICI बैंक', rows: [{ label: 'UPI लेनदेन', status: 'ऑनलाइन' }, { label: 'UPI बैलेंस जांच', status: 'विलंबित' }, { label: 'UPI पंजीकरण', status: 'सक्रिय' }], overall: 'मामूली देरी पाई गई', ok: false },
    PNB: { name: 'पंजाब नेशनल बैंक (PNB)', rows: [{ label: 'UPI लेनदेन', status: 'ऑफलाइन' }, { label: 'UPI बैलेंस जांच', status: 'अनुपलब्ध' }, { label: 'UPI पंजीकरण', status: 'सक्रिय' }], overall: 'UPI लेनदेन अभी बंद हैं', ok: false },
    BOB: { name: 'बैंक ऑफ बड़ौदा (BOB)', rows: [{ label: 'UPI लेनदेन', status: 'ऑनलाइन' }, { label: 'UPI बैलेंस जांच', status: 'उपलब्ध' }, { label: 'UPI पंजीकरण', status: 'सक्रिय' }], overall: 'सभी सेवाएं चालू हैं', ok: true },
    CANARA: { name: 'केनरा बैंक', rows: [{ label: 'UPI लेनदेन', status: 'ऑनलाइन' }, { label: 'UPI बैलेंस जांच', status: 'उपलब्ध' }, { label: 'UPI पंजीकरण', status: 'सक्रिय' }], overall: 'सभी सेवाएं चालू हैं', ok: true },
    AXIS: { name: 'एक्सिस बैंक', rows: [{ label: 'UPI लेनदेन', status: 'ऑनलाइन' }, { label: 'UPI बैलेंस जांच', status: 'उपलब्ध' }, { label: 'UPI पंजीकरण', status: 'सक्रिय' }], overall: 'सभी सेवाएं चालू हैं', ok: true },
    UNION: { name: 'यूनियन बैंक', rows: [{ label: 'UPI लेनदेन', status: 'ऑनलाइन' }, { label: 'UPI बैलेंस जांच', status: 'विलंबित' }, { label: 'UPI पंजीकरण', status: 'सक्रिय' }], overall: 'मामूली देरी पाई गई', ok: false },
    INDIAN: { name: 'इंडियन बैंक', rows: [{ label: 'UPI लेनदेन', status: 'ऑनलाइन' }, { label: 'UPI बैलेंस जांच', status: 'उपलब्ध' }, { label: 'UPI पंजीकरण', status: 'सक्रिय' }], overall: 'सभी सेवाएं चालू हैं', ok: true },
    BOI: { name: 'बैंक ऑफ इंडिया', rows: [{ label: 'UPI लेनदेन', status: 'ऑनलाइन' }, { label: 'UPI बैलेंस जांच', status: 'उपलब्ध' }, { label: 'UPI पंजीकरण', status: 'सक्रिय' }], overall: 'सभी सेवाएं चालू हैं', ok: true },
};

const HINDI_FEEDBACK_TIPS = {
    success: '🎉 शानदार! भुगतान सफल रहा। बड़े भुगतानों से पहले सिग्नल जांचते रहें।',
    failed: '🙏 खेद है। WiFi पर स्विच करने या बेहतर सिग्नल वाले क्षेत्र में जाने का प्रयास करें।',
    pending: '⏳ लंबित भुगतान आमतौर पर 10-15 मिनट में ठीक हो जाते हैं। अपना बैंक ऐप जांचें।',
};

function applyHindiTranslation() {
    console.log("Applying Hindi translation...");

    // Update HTML Title
    document.title = "NetPaySense (हिन्दी)";

    // Update global app data if it exists
    if (typeof SIGNALS !== 'undefined') SIGNALS.length = 0, SIGNALS.push(...HINDI_SIGNALS);
    if (typeof RECS !== 'undefined') {
        Object.keys(HINDI_RECS).forEach(k => RECS[k] = HINDI_RECS[k]);
    }
    if (typeof BANK_DATA !== 'undefined') {
        Object.keys(HINDI_BANK_DATA).forEach(k => BANK_DATA[k] = HINDI_BANK_DATA[k]);
    }

    // Override editProfile to use Hindi prompt
    window.editProfile = function () {
        const name = prompt('अपना नाम दर्ज करें:', 'NetPaySense उपयोगकर्ता');
        if (name) document.querySelector('.settings-profile-name').textContent = name;
    };

    // Override AI response logic for Hindi
    window.sendAiMsg = function (text, fromInput = false) {
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
            if (lower.includes('fail') || lower.includes('विफल')) aiMsg.innerHTML = "4G सिग्नल में अचानक गिरावट के कारण आपका भुगतान विफल हुआ होगा। <b>WiFi</b> पर स्विच करना या खुले क्षेत्र में जाना इसे ठीक कर देगा।";
            else if (lower.includes('now') || lower.includes('can i') || lower.includes('अभी')) aiMsg.innerHTML = "वर्तमान में, 4G पर आपका जोखिम <b>मध्यम (67%)</b> है। पहले WiFi पर स्विच करना सुरक्षित रहेगा।";
            else aiMsg.innerHTML = "मैं AI स्मार्ट सलाहकार हूं। आपकी भुगतान सफलता सुधारने के लिए, एक स्थिर WiFi नेटवर्क से जुड़ें या एयरप्लेन मोड चालू-बंद करने का प्रयास करें।";
            body.appendChild(aiMsg);
            body.scrollTop = body.scrollHeight;
        }, 1000);
    };

    // Override Feedback submission for Hindi tips
    window.submitFeedbackNew = function () {
        if (!fbOutcome) return;
        document.getElementById('feedback-main').classList.add('hidden');
        document.getElementById('back-from-5').classList.add('hidden');
        const icons = { success: '🎉', failed: '😔', pending: '⏳' };
        document.getElementById('fb-thanks-icon').textContent = icons[fbOutcome];
        document.getElementById('fb-thanks-title').textContent = fbStar ? `${fbStar}★ रेटिंग देने के लिए धन्यवाद!` : 'आपकी प्रतिक्रिया के लिए धन्यवाद!';
        document.getElementById('fb-thanks-tip').textContent = HINDI_FEEDBACK_TIPS[fbOutcome];
        const card = document.getElementById('feedback-thanks-card');
        card.classList.remove('hidden');
        card.classList.add('fade-in');
        fbOutcome = null; fbStar = 0;
    };

    // Override obNext for Hindi final button text
    const originalObNext = window.obNext;
    window.obNext = function () {
        const slides = document.querySelectorAll('.ob-slide');
        const dots = document.querySelectorAll('.ob-dot');
        if (typeof obIndex === 'undefined') return; // Safety

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
            document.getElementById('ob-next-btn').textContent = HINDI_TRANSLATIONS["Get Started ✓"];
        }
    };

    // Override drawGauge for Hindi canvas labels
    const originalDrawGauge = window.drawGauge;
    window.drawGauge = function (canvasId, labelId, tier) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const W = canvas.width, H = canvas.height;
        ctx.clearRect(0, 0, W, H);

        const cx = W / 2, cy = H - 10, r = 80;
        const startAngle = Math.PI, endAngle = 2 * Math.PI;

        ctx.beginPath();
        ctx.arc(cx, cy, r, startAngle, endAngle);
        ctx.lineWidth = 18;
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineCap = 'round';
        ctx.stroke();

        const tierMap = {
            good: { end: Math.PI * 1.33, color: '#22c55e', label: HINDI_TRANSLATIONS['Low Risk'] },
            mid: { end: Math.PI * 1.66, color: '#eab308', label: HINDI_TRANSLATIONS['Moderate Risk'] },
            poor: { end: Math.PI * 2, color: '#ef4444', label: HINDI_TRANSLATIONS['High Risk'] }
        };
        const t = tierMap[tier] || tierMap.mid;
        ctx.beginPath();
        ctx.arc(cx, cy, r, startAngle, t.end);
        ctx.strokeStyle = t.color;
        ctx.stroke();

        const needleAngle = t.end;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(needleAngle) * (r - 10), cy + Math.sin(needleAngle) * (r - 10));
        ctx.strokeStyle = '#1e40af';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, 6, 0, 2 * Math.PI);
        ctx.fillStyle = '#1e40af';
        ctx.fill();

        ctx.font = '600 11px Inter, sans-serif';
        ctx.fillStyle = '#94a3b8';
        ctx.textAlign = 'left'; ctx.fillText(HINDI_TRANSLATIONS['Low'], cx - r - 2, cy - 4);
        ctx.textAlign = 'right'; ctx.fillText(HINDI_TRANSLATIONS['High'], cx + r + 2, cy - 4);

        if (labelId) {
            const lbl = document.getElementById(labelId);
            if (lbl) { lbl.textContent = t.label; lbl.className = `risk-meter-label ${tier}`; }
        }
    };

    // Override renderBankCard for Hindi titles
    window.renderBankCard = function (bank, titleId, rowsId, overallId) {
        const titleEl = document.getElementById(titleId);
        const overallEl = document.getElementById(overallId);
        const rowsEl = document.getElementById(rowsId);

        if (titleEl) {
            const bankName = HINDI_TRANSLATIONS[bank.name] || bank.name;
            titleEl.textContent = `${bankName} UPI सर्वर स्थिति`;
        }

        if (rowsEl) {
            rowsEl.innerHTML = bank.rows.map(r => {
                const label = HINDI_TRANSLATIONS[r.label] || r.label;
                const status = HINDI_TRANSLATIONS[r.status] || r.status;
                const ok = ['Online', 'Available', 'Active', 'ऑनलाइन', 'उपलब्ध', 'सक्रिय'].includes(r.status);
                return `<div class="bank-status-row">
                    <span class="bank-row-icon">${ok ? '✅' : '⚠️'}</span>
                    <span class="bank-row-label">${label}:</span>
                    <span class="bank-row-val ${ok ? 'bank-row-ok' : 'bank-row-warn'}">${status}</span>
                </div>`;
            }).join('');
        }

        if (overallEl) {
            const overallText = HINDI_TRANSLATIONS[bank.overall] || bank.overall;
            overallEl.textContent = `स्थिति: ${overallText}`;
            overallEl.className = `bank-overall-status ${bank.ok ? 'ok' : 'warn'}`;
        }
    };

    // Recursive function to translate text nodes
    function translateElement(el) {
        if (!el) return;

        // Handle specific elements by ID or class if needed
        if (el.classList && el.classList.contains('loc-name')) {
            const txt = el.textContent.trim();
            if (txt === 'Yadgiri') el.textContent = 'यादगीर';
            if (txt === 'Bengaluru') el.textContent = 'बेंगलुरु';
        }

        if (el.nodeType === Node.TEXT_NODE) {
            let text = el.textContent.trim();
            if (!text) return;

            // Try exact match
            if (HINDI_TRANSLATIONS[text]) {
                el.textContent = el.textContent.replace(text, HINDI_TRANSLATIONS[text]);
                return;
            }

            // Try matching without leading/trailing emojis or icons
            for (const key in HINDI_TRANSLATIONS) {
                if (text.includes(key)) {
                    el.textContent = el.textContent.replace(key, HINDI_TRANSLATIONS[key]);
                }
            }
            return;
        }

        // Handle placeholders
        if (el.placeholder && HINDI_TRANSLATIONS[el.placeholder]) {
            el.placeholder = HINDI_TRANSLATIONS[el.placeholder];
        }

        // Handle specific button texts and options
        if (el.id === 'ob-next-btn' && el.textContent.includes('Next')) {
            el.textContent = HINDI_TRANSLATIONS["Next →"];
        }

        if (el.tagName === 'OPTION') {
            const trimmed = el.textContent.trim();
            if (HINDI_TRANSLATIONS[trimmed]) {
                el.textContent = HINDI_TRANSLATIONS[trimmed];
            }
        }

        // Iterate children
        el.childNodes.forEach(translateElement);
    }

    // Initial translation
    translateElement(document.body);

    // Update specific UI components that might have complex innerHTML
    const dashSub = document.querySelector('.welcome-sub');
    if (dashSub && dashSub.textContent.includes('Check your current')) {
        dashSub.textContent = HINDI_TRANSLATIONS["Check your current location's network reliability"];
    }

    // Setup MutationObserver to catch dynamic content
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) translateElement(node); // Element node
                else if (node.nodeType === 3) translateElement(node.parentNode); // Text node
            });
            // Also handle character data changes (like button text updates)
            if (mutation.type === 'characterData') {
                translateElement(mutation.target.parentNode);
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
    });

    // Force update of recents if rendered
    if (typeof renderRecents === 'function') renderRecents();

    // Custom fix for complex elements
    const obDesc = document.querySelectorAll('.ob-desc');
    obDesc.forEach(d => {
        const txt = d.textContent.trim();
        if (HINDI_TRANSLATIONS[txt]) d.textContent = HINDI_TRANSLATIONS[txt];
    });

    console.log("Hindi translation applied successfully.");
}

// Automatically apply when script is loaded
window.applyHindiTranslation = applyHindiTranslation;
