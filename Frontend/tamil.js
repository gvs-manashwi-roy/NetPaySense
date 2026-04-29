/**
 * NetPaySense Tamil Translation Script
 * This script translates the entire frontend into Tamil.
 * To use: Include this script in your index.html or run applyTamilTranslation() in the console.
 */

const TAMIL_TRANSLATIONS = {
    // Onboarding
    "Welcome to NetPaySense": "NetPaySense-க்கு வரவேற்கிறோம்",
    "Check network reliability and UPI payment success chances for any location — before you pay.": "பணம் செலுத்துவதற்கு முன் எந்த இடத்திலும் நெட்வொர்க் நம்பகத்தன்மை மற்றும் UPI பணம் செலுத்தல் வெற்றி வாய்ப்புகளை சரிபாருங்கள்.",
    "Smart Location Check": "ஸ்மார்ட் இட சரிபார்ப்பு",
    "Enter any location or use GPS to instantly get signal strength, UPI risk level, and bank server status.": "சிக்னல் வலிமை, UPI ஆபத்து நிலை மற்றும் வங்கி சர்வர் நிலையை உடனடியாக அறிய எந்த இடத்தையும் உள்ளிடுங்கள் அல்லது GPS பயன்படுத்துங்கள்.",
    "100% Private": "100% தனிப்பட்டது",
    "No data is sent to any server. Everything runs locally on your device. Your location stays yours.": "எந்த தரவும் எந்த சர்வருக்கும் அனுப்பப்படுவதில்லை. எல்லாம் உங்கள் சாதனத்தில் உள்ளூராக இயங்குகிறது. உங்கள் இடம் உங்களுக்கே சொந்தமானது.",
    "Next →": "அடுத்து →",
    "Don't show again": "மீண்டும் காட்டாதே",
    "Get Started ✓": "தொடங்குங்கள் ✓",

    // Settings
    "Settings": "அமைப்புகள்",
    "My Profile": "என் சுயவிவரம்",
    "NetPaySense User": "NetPaySense பயனர்",
    "Edit": "திருத்து",
    "Appearance": "தோற்றம்",
    "🌙 Dark Mode": "🌙 டார்க் மோட்",
    "Dark Mode": "டார்க் மோட்",
    "Switch between light and dark": "ஒளி மற்றும் இருளுக்கு இடையே மாறுங்கள்",
    "Notifications": "அறிவிப்புகள்",
    "🔔 Payment Risk Alerts": "🔔 பணம் செலுத்தல் ஆபத்து எச்சரிக்கைகள்",
    "Payment Risk Alerts": "பணம் செலுத்தல் ஆபத்து எச்சரிக்கைகள்",
    "Get notified on high risk": "அதிக ஆபத்தில் அறிவிப்பு பெறுங்கள்",
    "📳 Vibration": "📳 அதிர்வு",
    "Vibration": "அதிர்வு",
    "Haptic feedback on actions": "செயல்களில் ஹேப்டிக் கருத்து",
    "Data & Privacy": "தரவு மற்றும் தனியுரிமை",
    "🗑️ Clear Search History": "🗑️ தேடல் வரலாற்றை அழிக்கவும்",
    "Clear Search History": "தேடல் வரலாற்றை அழிக்கவும்",
    "Remove all recent checks": "அனைத்து சமீபத்திய சரிபார்ப்புகளையும் அகற்றுங்கள்",
    "🎬 Show App Intro": "🎬 பயன்பாட்டு அறிமுகம் காட்டு",
    "Show App Intro": "பயன்பாட்டு அறிமுகம் காட்டு",
    "Replay the onboarding slides": "ஆன்போர்டிங் ஸ்லைடுகளை மீண்டும் இயக்கவும்",
    "Privacy": "தனியுரிமை",
    "All data stays on your device": "அனைத்து தரவும் உங்கள் சாதனத்தில் இருக்கும்",
    "Local": "உள்ளூர்",
    "About": "பற்றி",
    "📱 App Version": "📱 பயன்பாட்டு பதிப்பு",
    "App Version": "பயன்பாட்டு பதிப்பு",
    "⭐ Rate the App": "⭐ பயன்பாட்டை மதிப்பிடுங்கள்",
    "Rate the App": "பயன்பாட்டை மதிப்பிடுங்கள்",
    "Tell us what you think": "உங்கள் கருத்தை எங்களிடம் தெரிவியுங்கள்",
    "📧 Contact Support": "📧 ஆதரவைத் தொடர்பு கொள்ளுங்கள்",
    "Contact Support": "ஆதரவைத் தொடர்பு கொள்ளுங்கள்",
    "Get help or report a bug": "உதவி பெறுங்கள் அல்லது பிழையை புகாரளிக்கவும்",
    "Enter your name:": "உங்கள் பெயரை உள்ளிடுங்கள்:",
    "Profile Updated": "சுயவிவரம் புதுப்பிக்கப்பட்டது",

    // Dashboard
    "📊 My Network Dashboard": "📊 என் நெட்வொர்க் டாஷ்போர்டு",
    "Check your current location's network reliability": "உங்கள் தற்போதைய இடத்தின் நெட்வொர்க் நம்பகத்தன்மையை சரிபாருங்கள்",
    "📍 Fetch My Location": "📍 என் இடத்தை பெறுங்கள்",
    "⏳ Fetching...": "⏳ பெறப்படுகிறது...",
    "🔍 Check New Location": "🔍 புதிய இடத்தை சரிபாருங்கள்",
    "Fetching location...": "இடம் பெறப்படுகிறது...",
    "Current Location": "தற்போதைய இடம்",
    "📶 Network Status": "📶 நெட்வொர்க் நிலை",
    "Signal": "சிக்னல்",
    "Latency": "தாமதம் (Latency)",
    "Speed": "வேகம்",
    "💳 Payment Reliability": "💳 பணம் செலுத்தல் நம்பகத்தன்மை",
    "📈 Signal History": "📈 சிக்னல் வரலாறு",
    "Last 5 checks": "கடந்த 5 சரிபார்ப்புகள்",
    "Check Bank Status": "வங்கி நிலையை சரிபாருங்கள்",
    "🏦 Check Bank Status": "🏦 வங்கி நிலையை சரிபாருங்கள்",

    // Map
    "Smart Network Map": "ஸ்மார்ட் நெட்வொர்க் வரைபடம்",
    "Move 50m": "50 மீட்டர் நகருங்கள்",
    "Better network": "சிறந்த நெட்வொர்க்",
    "Better Network Zone": "சிறந்த நெட்வொர்க் மண்டலம்",
    "You are here": "நீங்கள் இங்கே இருக்கிறீர்கள்",
    "🚶 Move 50m ➔ Better network": "🚶 50மீ நகருங்கள் ➔ சிறந்த நெட்வொர்க்",

    // Banks
    "🏦 Check Bank Server Status": "🏦 வங்கி சர்வர் நிலையை சரிபாருங்கள்",
    "Select a bank to view its live UPI server status": "நேரடி UPI சர்வர் நிலையை பார்க்க வங்கியைத் தேர்ந்தெடுங்கள்",
    "Select Bank": "வங்கியைத் தேர்ந்தெடுங்கள்",
    "Choose Bank": "வங்கியை தேர்வு செய்யுங்கள்",

    // Search Step
    "Welcome to Network & UPI Checker": "நெட்வொர்க் மற்றும் UPI சரிபார்ப்பாளருக்கு வரவேற்கிறோம்",
    "Check your network signal strength and UPI payment reliability for any location.": "எந்த இடத்திற்கும் உங்கள் நெட்வொர்க் சிக்னல் வலிமை மற்றும் UPI பணம் செலுத்தல் நம்பகத்தன்மையை சரிபாருங்கள்.",
    "Enter location (e.g. Koramangala…)": "இடத்தை உள்ளிடுங்கள் (எ.கா. கோரமங்கலா…)",
    "Check": "சரிபாருங்கள்",
    "Checking…": "சரிபார்க்கப்படுகிறது…",
    "🕐 Recently Checked": "🕐 சமீபத்தில் சரிபார்க்கப்பட்டது",
    "🔍 Enter a location to get started": "🔍 தொடங்க ஒரு இடத்தை உள்ளிடுங்கள்",

    // Analyzing
    "Analyzing Network...": "நெட்வொர்க் பகுப்பாய்வு செய்யப்படுகிறது...",
    "Please wait, this may take a few seconds": "தயவுசெய்து காத்திருங்கள், இது சில நொடிகள் ஆகலாம்",
    "Fetching location data...": "இட தரவு பெறப்படுகிறது...",
    "Fetching signal data...": "சிக்னல் தரவு பெறப்படுகிறது...",
    "Analyzing signal strength...": "சிக்னல் வலிமை பகுப்பாய்வு செய்யப்படுகிறது...",
    "Predicting UPI success...": "UPI வெற்றி முன்கணிக்கப்படுகிறது...",

    // Results
    "Results": "முடிவுகள்",
    "Location Detected": "இடம் கண்டறியப்பட்டது",
    "Payment Risk Meter": "பணம் செலுத்தல் ஆபத்து மீட்டர்",
    "UPI Success Chance": "UPI வெற்றி வாய்ப்பு",
    "💡 Recommendations": "💡 பரிந்துரைகள்",
    "Recommendations": "பரிந்துரைகள்",
    "← Back": "← பின்னால்",
    "Back": "பின்னால்",
    "Feedback →": "கருத்து →",
    "Feedback": "கருத்து",
    "Bank Server Status": "வங்கி சர்வர் நிலை",

    // Feedback
    "How did your payment go?": "உங்கள் பணம் செலுத்தல் எப்படி இருந்தது?",
    "Successful": "வெற்றிகரமானது",
    "Failed": "தோல்வியடைந்தது",
    "Pending": "நிலுவையில் உள்ளது (Pending)",
    "What went wrong?": "என்ன தவறு நடந்தது?",
    "Poor Signal": "மோசமான சிக்னல்",
    "Timeout": "நேரம் முடிந்தது (Timeout)",
    "Bank Server Down": "வங்கி சர்வர் செயலிழந்தது",
    "Wrong UPI ID": "தவறான UPI ஐடி",
    "Other": "மற்றவை",
    "Rate your experience": "உங்கள் அனுபவத்தை மதிப்பிடுங்கள்",
    "Submit Feedback": "கருத்தை சமர்ப்பிக்கவும்",
    "Thank you!": "நன்றி!",
    "Check Another Location": "மற்றொரு இடத்தை சரிபாருங்கள்",
    "Thanks for the": "மதிப்பீட்டிற்கு நன்றி",
    "rating!": "நட்சத்திரம்!",
    "Thank you for your feedback!": "உங்கள் கருத்திற்கு நன்றி!",

    // AI Advisor
    "AI Smart Advisor": "AI ஸ்மார்ட் ஆலோசகர்",
    "💡 Network Boosting Suggestions": "💡 நெட்வொர்க் மேம்படுத்தல் பரிந்துரைகள்",
    "Move near a window to improve signal": "சிக்னலை மேம்படுத்த ஜன்னலுக்கு அருகில் நகருங்கள்",
    "Turn Airplane mode ON and OFF": "ஏர்ப்லேன் மோட்டை ஆன் மற்றும் ஆஃப் செய்யுங்கள்",
    "Switch to WiFi to increase success by 25%": "வெற்றியை 25% அதிகரிக்க WiFi-க்கு மாறுங்கள்",
    "Hi! Your payment risk is high right now. How can I assist you?": "வணக்கம்! உங்கள் பணம் செலுத்தல் ஆபத்து இப்போது அதிகமாக உள்ளது. நான் உங்களுக்கு எப்படி உதவலாம்?",
    "Why did my payment fail?": "என் பணம் செலுத்தல் ஏன் தோல்வியடைந்தது?",
    "Can I make a payment now?": "நான் இப்போது பணம் செலுத்தலாமா?",
    "Voice Input... or type": "குரல் உள்ளீடு... அல்லது தட்டச்சு செய்யுங்கள்",

    // Bottom Nav (Specific spans)
    "Home": "முகப்பு",
    "Map": "வரைபடம்",
    "Banks": "வங்கிகள்",
    "🏠 Home": "🏠 முகப்பு",
    "🗺️ Map": "🗺️ வரைபடம்",
    "🏦 Banks": "🏦 வங்கிகள்",

    // Headers with icons
    "🏦 Bank Server Status": "🏦 வங்கி சர்வர் நிலை",

    // Risk Labels
    "Low Risk": "குறைந்த ஆபத்து",
    "Moderate Risk": "மிதமான ஆபத்து",
    "High Risk": "அதிக ஆபத்து",
    "Low": "குறைவு",
    "High": "அதிகம்",

    // Dynamic Statuses
    "Online": "ஆன்லைன்",
    "Offline": "ஆஃப்லைன்",
    "Available": "கிடைக்கிறது",
    "Unavailable": "கிடைக்கவில்லை",
    "Active": "செயலில் உள்ளது",
    "Delayed": "தாமதமானது",
    "Minor Delays Detected": "சிறிய தாமதங்கள் கண்டறியப்பட்டன",
    "All Services are Operational": "அனைத்து சேவைகளும் இயங்குகின்றன",
    "UPI Transactions Currently Down": "UPI பரிவர்த்தனைகள் தற்போது செயலிழந்துள்ளன",

    // Banks Names (for HTML options)
    "State Bank of India (SBI)": "இந்திய ஸ்டேட் வங்கி (SBI)",
    "HDFC Bank": "HDFC வங்கி",
    "ICICI Bank": "ICICI வங்கி",
    "Punjab National Bank": "பஞ்சாப் நேஷனல் வங்கி",
    "Bank of Baroda": "பாரோடா வங்கி",
    "Canara Bank": "கனரா வங்கி",
    "Axis Bank": "ஆக்சிஸ் வங்கி",
    "Union Bank of India": "யூனியன் வங்கி ஆஃப் இந்தியா",
    "Indian Bank": "இந்தியன் வங்கி",
    "Bank of India": "இந்திய வங்கி",
};

const TAMIL_SIGNALS = [
    { dbm: -58, type: '5G', label: 'சிறந்த சிக்னல்', tier: 'good', bars: 5, upi: 'அதிகம் – 96%', badge: 'குறைந்த ஆபத்து' },
    { dbm: -65, type: '5G', label: 'சிறந்த சிக்னல்', tier: 'good', bars: 5, upi: 'அதிகம் – 91%', badge: 'குறைந்த ஆபத்து' },
    { dbm: -72, type: '4G', label: 'நல்ல சிக்னல்', tier: 'good', bars: 4, upi: 'அதிகம் – 84%', badge: 'குறைந்த ஆபத்து' },
    { dbm: -80, type: '4G', label: 'நல்ல சிக்னல்', tier: 'good', bars: 3, upi: 'மிதமான – 72%', badge: 'குறைந்த ஆபத்து' },
    { dbm: -88, type: '4G', label: 'மிதமான சிக்னல்', tier: 'mid', bars: 3, upi: 'மிதமான – 61%', badge: 'மிதமான ஆபத்து' },
    { dbm: -95, type: '3G', label: 'மிதமான சிக்னல்', tier: 'mid', bars: 2, upi: 'மிதமான – 48%', badge: 'மிதமான ஆபத்து' },
    { dbm: -102, type: '4G', label: 'மோசமான சிக்னல்', tier: 'poor', bars: 1, upi: 'குறைவு – 32%', badge: 'அதிக ஆபத்து' },
    { dbm: -110, type: '4G', label: 'மோசமான சிக்னல்', tier: 'poor', bars: 1, upi: 'குறைவு – 28%', badge: 'அதிக ஆபத்து' },
    { dbm: -115, type: '2G', label: 'மிகவும் மோசமான சிக்னல்', tier: 'poor', bars: 1, upi: 'குறைவு – 14%', badge: 'அதிக ஆபத்து' },
];

const TAMIL_RECS = {
    good: [
        { icon: '📱', text: '<strong>Airtel / Jio பயன்படுத்துங்கள்</strong> — நெட்வொர்க் நிலையானது மற்றும் வேகமானது' },
        { icon: '✅', text: '<strong>தொடர்வது பாதுகாப்பானது</strong> இப்போதே UPI பணம் செலுத்துங்கள்' },
        { icon: '⚡', text: '<strong>வேகமான பரிவர்த்தனைகள்</strong> 5 நொடிகளுக்குள் எதிர்பார்க்கப்படுகின்றன' },
        { icon: '🔒', text: 'பணம் செலுத்தல் தோல்வி அல்லது நேரம் முடிவதற்கு <strong>குறைந்த ஆபத்து</strong>' },
    ],
    mid: [
        { icon: '🔄', text: 'சிறந்த நெட்வொர்க் நிலைப்பாட்டிற்காக <strong>Jio-க்கு மாறுங்கள்</strong>' },
        { icon: '⏱️', text: '<strong>10–15 நிமிடங்கள் காத்திருங்கள்</strong> மற்றும் பணம் செலுத்தலை மீண்டும் முயற்சிக்கவும்' },
        { icon: '💵', text: 'பணம் செலுத்தல் தோல்வியடைந்தால் <strong>பணத்தை (Cash) காப்பு நகலாக வைத்திருங்கள்</strong>' },
    ],
    poor: [
        { icon: '🔄', text: 'இங்கு சிறந்த கவரேஜுக்காக <strong>Vi / BSNL-க்கு மாறுங்கள்</strong>' },
        { icon: '⏱️', text: '<strong>10–15 நிமிடங்கள் காத்திருங்கள்</strong> மற்றும் பணம் செலுத்தலை மீண்டும் முயற்சிக்கவும்' },
        { icon: '💵', text: '<strong>பணத்தை (Cash) காப்பு நகலாக வைத்திருங்கள்</strong> — பணம் செலுத்தல்கள் தோல்வியடையும் வாய்ப்பு உள்ளது' },
    ],
};

const TAMIL_BANK_DATA = {
    SBI: { name: 'இந்திய ஸ்டேட் வங்கி (SBI)', rows: [{ label: 'UPI பரிவர்த்தனைகள்', status: 'ஆன்லைன்' }, { label: 'UPI இருப்பு சரிபார்ப்பு', status: 'கிடைக்கிறது' }, { label: 'UPI பதிவு', status: 'செயலில் உள்ளது' }], overall: 'அனைத்து சேவைகளும் இயங்குகின்றன', ok: true },
    HDFC: { name: 'HDFC வங்கி', rows: [{ label: 'UPI பரிவர்த்தனைகள்', status: 'ஆன்லைன்' }, { label: 'UPI இருப்பு சரிபார்ப்பு', status: 'கிடைக்கிறது' }, { label: 'UPI பதிவு', status: 'செயலில் உள்ளது' }], overall: 'அனைத்து சேவைகளும் இயங்குகின்றன', ok: true },
    ICICI: { name: 'ICICI வங்கி', rows: [{ label: 'UPI பரிவர்த்தனைகள்', status: 'ஆன்லைன்' }, { label: 'UPI இருப்பு சரிபார்ப்பு', status: 'தாமதமானது' }, { label: 'UPI பதிவு', status: 'செயலில் உள்ளது' }], overall: 'சிறிய தாமதங்கள் கண்டறியப்பட்டன', ok: false },
    PNB: { name: 'பஞ்சாப் நேஷனல் வங்கி (PNB)', rows: [{ label: 'UPI பரிவர்த்தனைகள்', status: 'ஆஃப்லைன்' }, { label: 'UPI இருப்பு சரிபார்ப்பு', status: 'கிடைக்கவில்லை' }, { label: 'UPI பதிவு', status: 'செயலில் உள்ளது' }], overall: 'UPI பரிவர்த்தனைகள் தற்போது செயலிழந்துள்ளன', ok: false },
    BOB: { name: 'பாரோடா வங்கி (BOB)', rows: [{ label: 'UPI பரிவர்த்தனைகள்', status: 'ஆன்லைன்' }, { label: 'UPI இருப்பு சரிபார்ப்பு', status: 'கிடைக்கிறது' }, { label: 'UPI பதிவு', status: 'செயலில் உள்ளது' }], overall: 'அனைத்து சேவைகளும் இயங்குகின்றன', ok: true },
    CANARA: { name: 'கனரா வங்கி', rows: [{ label: 'UPI பரிவர்த்தனைகள்', status: 'ஆன்லைன்' }, { label: 'UPI இருப்பு சரிபார்ப்பு', status: 'கிடைக்கிறது' }, { label: 'UPI பதிவு', status: 'செயலில் உள்ளது' }], overall: 'அனைத்து சேவைகளும் இயங்குகின்றன', ok: true },
    AXIS: { name: 'ஆக்சிஸ் வங்கி', rows: [{ label: 'UPI பரிவர்த்தனைகள்', status: 'ஆன்லைன்' }, { label: 'UPI இருப்பு சரிபார்ப்பு', status: 'கிடைக்கிறது' }, { label: 'UPI பதிவு', status: 'செயலில் உள்ளது' }], overall: 'அனைத்து சேவைகளும் இயங்குகின்றன', ok: true },
    UNION: { name: 'யூனியன் வங்கி', rows: [{ label: 'UPI பரிவர்த்தனைகள்', status: 'ஆன்லைன்' }, { label: 'UPI இருப்பு சரிபார்ப்பு', status: 'தாமதமானது' }, { label: 'UPI பதிவு', status: 'செயலில் உள்ளது' }], overall: 'சிறிய தாமதங்கள் கண்டறியப்பட்டன', ok: false },
    INDIAN: { name: 'இந்தியன் வங்கி', rows: [{ label: 'UPI பரிவர்த்தனைகள்', status: 'ஆன்லைன்' }, { label: 'UPI இருப்பு சரிபார்ப்பு', status: 'கிடைக்கிறது' }, { label: 'UPI பதிவு', status: 'செயலில் உள்ளது' }], overall: 'அனைத்து சேவைகளும் இயங்குகின்றன', ok: true },
    BOI: { name: 'இந்திய வங்கி', rows: [{ label: 'UPI பரிவர்த்தனைகள்', status: 'ஆன்லைன்' }, { label: 'UPI இருப்பு சரிபார்ப்பு', status: 'கிடைக்கிறது' }, { label: 'UPI பதிவு', status: 'செயலில் உள்ளது' }], overall: 'அனைத்து சேவைகளும் இயங்குகின்றன', ok: true },
};

const TAMIL_FEEDBACK_TIPS = {
    success: '🎉 அருமை! பணம் செலுத்தல் வெற்றிகரமானது. பெரிய பணம் செலுத்தல்களுக்கு முன் சிக்னலை சரிபாருங்கள்.',
    failed: '🙏 மன்னிக்கவும். WiFi-க்கு மாறவும் அல்லது சிறந்த சிக்னல் உள்ள பகுதிக்கு செல்லவும் முயற்சிக்கவும்.',
    pending: '⏳ நிலுவையில் உள்ள பணம் செலுத்தல்கள் பொதுவாக 10-15 நிமிடங்களில் சரியாகும். உங்கள் வங்கி பயன்பாட்டை சரிபாருங்கள்.',
};

function applyTamilTranslation() {
    console.log("Applying Tamil translation...");

    // Update HTML Title
    document.title = "NetPaySense (தமிழ்)";

    // Update global app data if it exists
    if (typeof SIGNALS !== 'undefined') SIGNALS.length = 0, SIGNALS.push(...TAMIL_SIGNALS);
    if (typeof RECS !== 'undefined') {
        Object.keys(TAMIL_RECS).forEach(k => RECS[k] = TAMIL_RECS[k]);
    }
    if (typeof BANK_DATA !== 'undefined') {
        Object.keys(TAMIL_BANK_DATA).forEach(k => BANK_DATA[k] = TAMIL_BANK_DATA[k]);
    }

    // Override editProfile to use Tamil prompt
    window.editProfile = function () {
        const name = prompt('உங்கள் பெயரை உள்ளிடுங்கள்:', 'NetPaySense பயனர்');
        if (name) document.querySelector('.settings-profile-name').textContent = name;
    };

    // Override AI response logic for Tamil
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
            if (lower.includes('fail') || lower.includes('தோல்வி')) aiMsg.innerHTML = "4G சிக்னலில் திடீர் வீழ்ச்சியால் உங்கள் பணம் செலுத்தல் தோல்வியடைந்திருக்கலாம். <b>WiFi</b>-க்கு மாறுவது அல்லது திறந்த வெளியில் செல்வது இதை சரிசெய்யும்.";
            else if (lower.includes('now') || lower.includes('can i') || lower.includes('இப்போது')) aiMsg.innerHTML = "தற்போது, 4G-ல் உங்கள் ஆபத்து <b>மிதமானது (67%)</b>. முதலில் WiFi-க்கு மாறுவது பாதுகாப்பானது.";
            else aiMsg.innerHTML = "நான் AI ஸ்மார்ட் ஆலோசகர். உங்கள் பணம் செலுத்தல் வெற்றியை மேம்படுத்த, நிலையான WiFi நெட்வொர்க்கில் இணைக்கவும் அல்லது ஏர்ப்லேன் மோட்டை ஆன்-ஆஃப் செய்ய முயற்சிக்கவும்.";
            body.appendChild(aiMsg);
            body.scrollTop = body.scrollHeight;
        }, 1000);
    };

    // Override Feedback submission for Tamil tips
    window.submitFeedbackNew = function () {
        if (!fbOutcome) return;
        document.getElementById('feedback-main').classList.add('hidden');
        document.getElementById('back-from-5').classList.add('hidden');
        const icons = { success: '🎉', failed: '😔', pending: '⏳' };
        document.getElementById('fb-thanks-icon').textContent = icons[fbOutcome];
        document.getElementById('fb-thanks-title').textContent = fbStar ? `${fbStar}★ மதிப்பீட்டிற்கு நன்றி!` : 'உங்கள் கருத்திற்கு நன்றி!';
        document.getElementById('fb-thanks-tip').textContent = TAMIL_FEEDBACK_TIPS[fbOutcome];
        const card = document.getElementById('feedback-thanks-card');
        card.classList.remove('hidden');
        card.classList.add('fade-in');
        fbOutcome = null; fbStar = 0;
    };

    // Override obNext for Tamil final button text
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
            document.getElementById('ob-next-btn').textContent = TAMIL_TRANSLATIONS["Get Started ✓"];
        }
    };

    // Override drawGauge for Tamil canvas labels
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
            good: { end: Math.PI * 1.33, color: '#22c55e', label: TAMIL_TRANSLATIONS['Low Risk'] },
            mid: { end: Math.PI * 1.66, color: '#eab308', label: TAMIL_TRANSLATIONS['Moderate Risk'] },
            poor: { end: Math.PI * 2, color: '#ef4444', label: TAMIL_TRANSLATIONS['High Risk'] }
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
        ctx.textAlign = 'left'; ctx.fillText(TAMIL_TRANSLATIONS['Low'], cx - r - 2, cy - 4);
        ctx.textAlign = 'right'; ctx.fillText(TAMIL_TRANSLATIONS['High'], cx + r + 2, cy - 4);

        if (labelId) {
            const lbl = document.getElementById(labelId);
            if (lbl) { lbl.textContent = t.label; lbl.className = `risk-meter-label ${tier}`; }
        }
    };

    // Override renderBankCard for Tamil titles
    window.renderBankCard = function (bank, titleId, rowsId, overallId) {
        const titleEl = document.getElementById(titleId);
        const overallEl = document.getElementById(overallId);
        const rowsEl = document.getElementById(rowsId);

        if (titleEl) {
            const bankName = TAMIL_TRANSLATIONS[bank.name] || bank.name;
            titleEl.textContent = `${bankName} UPI சர்வர் நிலை`;
        }

        if (rowsEl) {
            rowsEl.innerHTML = bank.rows.map(r => {
                const label = TAMIL_TRANSLATIONS[r.label] || r.label;
                const status = TAMIL_TRANSLATIONS[r.status] || r.status;
                const ok = ['Online', 'Available', 'Active', 'ஆன்லைன்', 'கிடைக்கிறது', 'செயலில் உள்ளது'].includes(r.status);
                return `<div class="bank-status-row">
                    <span class="bank-row-icon">${ok ? '✅' : '⚠️'}</span>
                    <span class="bank-row-label">${label}:</span>
                    <span class="bank-row-val ${ok ? 'bank-row-ok' : 'bank-row-warn'}">${status}</span>
                </div>`;
            }).join('');
        }

        if (overallEl) {
            const overallText = TAMIL_TRANSLATIONS[bank.overall] || bank.overall;
            overallEl.textContent = `நிலை: ${overallText}`;
            overallEl.className = `bank-overall-status ${bank.ok ? 'ok' : 'warn'}`;
        }
    };

    // Recursive function to translate text nodes
    function translateElement(el) {
        if (!el) return;

        // Handle specific elements by ID or class if needed
        if (el.classList && el.classList.contains('loc-name')) {
            const txt = el.textContent.trim();
            if (txt === 'Yadgiri') el.textContent = 'யாத்கிரி';
            if (txt === 'Bengaluru') el.textContent = 'பெங்களூரு';
        }

        if (el.nodeType === Node.TEXT_NODE) {
            let text = el.textContent.trim();
            if (!text) return;

            // Try exact match
            if (TAMIL_TRANSLATIONS[text]) {
                el.textContent = el.textContent.replace(text, TAMIL_TRANSLATIONS[text]);
                return;
            }

            // Try matching without leading/trailing emojis or icons
            for (const key in TAMIL_TRANSLATIONS) {
                if (text.includes(key)) {
                    el.textContent = el.textContent.replace(key, TAMIL_TRANSLATIONS[key]);
                }
            }
            return;
        }

        // Handle placeholders
        if (el.placeholder && TAMIL_TRANSLATIONS[el.placeholder]) {
            el.placeholder = TAMIL_TRANSLATIONS[el.placeholder];
        }

        // Handle specific button texts and options
        if (el.id === 'ob-next-btn' && el.textContent.includes('Next')) {
            el.textContent = TAMIL_TRANSLATIONS["Next →"];
        }

        if (el.tagName === 'OPTION') {
            const trimmed = el.textContent.trim();
            if (TAMIL_TRANSLATIONS[trimmed]) {
                el.textContent = TAMIL_TRANSLATIONS[trimmed];
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
        dashSub.textContent = TAMIL_TRANSLATIONS["Check your current location's network reliability"];
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
        if (TAMIL_TRANSLATIONS[txt]) d.textContent = TAMIL_TRANSLATIONS[txt];
    });

    console.log("Tamil translation applied successfully.");
}

// Automatically apply when script is loaded
window.applyTamilTranslation = applyTamilTranslation;
