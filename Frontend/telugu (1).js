/**
 * NetPaySense Telugu Translation Script
 * This script translates the entire frontend into Telugu.
 * To use: Include this script in your index.html or run applyKannadaTranslation() in the console.
 */

const KANNADA_TRANSLATIONS = {
    // Onboarding
    "Welcome to NetPaySense": "NetPaySense కి స్వాగతం",
    "Check network reliability and UPI payment success chances for any location — before you pay.": "చెల్లింపు చేయడానికి ముందు ఏదైనా స్థానంలో నెట్‌వర్క్ విశ్వసనీయత మరియు UPI చెల్లింపు విజయ అవకాశాలను తనిఖీ చేయండి.",
    "Smart Location Check": "స్మార్ట్ లొకేషన్ తనిఖీ",
    "Enter any location or use GPS to instantly get signal strength, UPI risk level, and bank server status.": "సిగ్నల్ బలం, UPI రిస్క్ స్థాయి మరియు బ్యాంక్ సర్వర్ స్థితిని తక్షణమే పొందడానికి ఏదైనా స్థానాన్ని నమోదు చేయండి లేదా GPS ఉపయోగించండి.",
    "100% Private": "100% ప్రైవేట్",
    "No data is sent to any server. Everything runs locally on your device. Your location stays yours.": "ఏ డేటా ఏ సర్వర్‌కు పంపబడదు. అన్నీ మీ పరికరంలో స్థానికంగా నడుస్తాయి. మీ స్థానం మీదే ఉంటుంది.",
    "Next →": "తదుపరి →",
    "Don't show again": "మళ్ళీ చూపించకు",
    "Get Started ✓": "ప్రారంభించండి ✓",

    // Settings
    "Settings": "సెట్టింగులు",
    "My Profile": "నా ప్రొఫైల్",
    "NetPaySense User": "NetPaySense వినియోగదారు",
    "Edit": "సవరించు",
    "Appearance": "రూపాన్ని",
    "🌙 Dark Mode": "🌙 డార్క్ మోడ్",
    "Dark Mode": "డార్క్ మోడ్",
    "Switch between light and dark": "లైట్ మరియు డార్క్ మధ్య మారండి",
    "Notifications": "నోటిఫికేషన్లు",
    "🔔 Payment Risk Alerts": "🔔 చెల్లింపు రిస్క్ హెచ్చరికలు",
    "Payment Risk Alerts": "చెల్లింపు రిస్క్ హెచ్చరికలు",
    "Get notified on high risk": "అధిక రిస్క్‌పై నోటిఫికేషన్ పొందండి",
    "📳 Vibration": "📳 కంపనం",
    "Vibration": "కంపనం",
    "Haptic feedback on actions": "చర్యలపై హ్యాప్టిక్ అభిప్రాయం",
    "Data & Privacy": "డేటా మరియు గోప్యత",
    "🗑️ Clear Search History": "🗑️ శోధన చరిత్రను తొలగించండి",
    "Clear Search History": "శోధన చరిత్రను తొలగించండి",
    "Remove all recent checks": "అన్ని ఇటీవలి తనిఖీలను తొలగించండి",
    "🎬 Show App Intro": "🎬 యాప్ పరిచయం చూపించు",
    "Show App Intro": "యాప్ పరిచయం చూపించు",
    "Replay the onboarding slides": "ఆన్‌బోర్డింగ్ స్లైడ్‌లను తిరిగి ప్లే చేయండి",
    "Privacy": "గోప్యత",
    "All data stays on your device": "అన్ని డేటా మీ పరికరంలోనే ఉంటుంది",
    "Local": "స్థానిక",
    "About": "గురించి",
    "📱 App Version": "📱 యాప్ వెర్షన్",
    "App Version": "యాప్ వెర్షన్",
    "⭐ Rate the App": "⭐ యాప్‌ను రేట్ చేయండి",
    "Rate the App": "యాప్‌ను రేట్ చేయండి",
    "Tell us what you think": "మీ అభిప్రాయం చెప్పండి",
    "📧 Contact Support": "📧 సపోర్ట్ సంప్రదించండి",
    "Contact Support": "సపోర్ట్ సంప్రదించండి",
    "Get help or report a bug": "సహాయం పొందండి లేదా బగ్ నివేదించండి",
    "Enter your name:": "మీ పేరు నమోదు చేయండి:",
    "Profile Updated": "ప్రొఫైల్ నవీకరించబడింది",

    // Dashboard
    "📊 My Network Dashboard": "📊 నా నెట్‌వర్క్ డాష్‌బోర్డ్",
    "Check your current location's network reliability": "మీ ప్రస్తుత స్థానం యొక్క నెట్‌వర్క్ విశ్వసనీయతను తనిఖీ చేయండి",
    "📍 Get My Location": "📍 నా స్థానం పొందండి",
    "⏳ Fetching...": "⏳ పొందుతున్నాం...",
    "🔍 Check New Location": "🔍 కొత్త స్థానాన్ని తనిఖీ చేయండి",
    "Fetching location...": "స్థానం పొందుతున్నాం...",
    "Current Location": "ప్రస్తుత స్థానం",
    "📶 Network Status": "📶 నెట్‌వర్క్ స్థితి",
    "Signal": "సిగ్నల్",
    "Latency": "జాప్యం (Latency)",
    "Speed": "వేగం",
    "💳 Payment Reliability": "💳 చెల్లింపు విశ్వసనీయత",
    "📈 Signal History": "📈 సిగ్నల్ చరిత్ర",
    "Last 5 checks": "చివరి 5 తనిఖీలు",
    "Check Bank Status": "బ్యాంక్ స్థితి తనిఖీ చేయండి",
    "🏦 Check Bank Status": "🏦 బ్యాంక్ స్థితి తనిఖీ చేయండి",

    // Map
    "Smart Network Map": "స్మార్ట్ నెట్‌వర్క్ మ్యాప్",
    "Move 50m": "50 మీటర్లు వెళ్ళండి",
    "Better network": "మెరుగైన నెట్‌వర్క్",
    "Better Network Zone": "మెరుగైన నెట్‌వర్క్ జోన్",
    "You are here": "మీరు ఇక్కడ ఉన్నారు",
    "🚶 Move 50m ➔ Better network": "🚶 50మీ వెళ్ళండి ➔ మెరుగైన నెట్‌వర్క్",

    // Banks
    "🏦 Check Bank Server Status": "🏦 బ్యాంక్ సర్వర్ స్థితి తనిఖీ చేయండి",
    "Select a bank to view its live UPI server status": "లైవ్ UPI సర్వర్ స్థితి చూడటానికి బ్యాంక్ ఎంచుకోండి",
    "Select Bank": "బ్యాంక్ ఎంచుకోండి",
    "Choose Bank": "బ్యాంక్ ఎంచుకోండి",

    // Search Step
    "Welcome to Network & UPI Checker": "నెట్‌వర్క్ మరియు UPI చెకర్‌కు స్వాగతం",
    "Check your network signal strength and UPI payment reliability for any location.": "ఏ స్థానానికైనా మీ నెట్‌వర్క్ సిగ్నల్ బలం మరియు UPI చెల్లింపు విశ్వసనీయతను తనిఖీ చేయండి.",
    "Enter location (e.g. Koramangala…)": "స్థానం నమోదు చేయండి (ఉదా. కోరమంగల…)",
    "Check": "తనిఖీ చేయండి",
    "Checking…": "తనిఖీ చేయబడుతోంది…",
    "🕐 Recently Checked": "🕐 ఇటీవల తనిఖీ చేయబడింది",
    "🔍 Enter a location to get started": "🔍 ప్రారంభించడానికి స్థానాన్ని నమోదు చేయండి",

    // Analyzing
    "Analyzing Network...": "నెట్‌వర్క్ విశ్లేషించబడుతోంది...",
    "Please wait, this may take a few seconds": "దయచేసి వేచి ఉండండి, ఇది కొన్ని సెకన్లు పట్టవచ్చు",
    "Fetching location data...": "స్థాన డేటా పొందుతున్నాం...",
    "Fetching signal data...": "సిగ్నల్ డేటా పొందుతున్నాం...",
    "Analyzing signal strength...": "సిగ్నల్ బలం విశ్లేషించబడుతోంది...",
    "Predicting UPI success...": "UPI విజయాన్ని అంచనా వేయబడుతోంది...",

    // Results
    "Results": "ఫలితాలు",
    "Location Detected": "స్థానం గుర్తించబడింది",
    "Payment Risk Meter": "చెల్లింపు రిస్క్ మీటర్",
    "UPI Success Chance": "UPI విజయ అవకాశం",
    "💡 Recommendations": "💡 సిఫారసులు",
    "Recommendations": "సిఫారసులు",
    "← Back": "← వెనుకకు",
    "Back": "వెనుకకు",
    "Feedback →": "అభిప్రాయం →",
    "Feedback": "అభిప్రాయం",
    "Bank Server Status": "బ్యాంక్ సర్వర్ స్థితి",

    // Feedback
    "How did your payment go?": "మీ చెల్లింపు ఎలా జరిగింది?",
    "Successful": "విజయవంతమైంది",
    "Failed": "విఫలమైంది",
    "Pending": "పెండింగ్‌లో ఉంది (Pending)",
    "What went wrong?": "ఏమి తప్పు జరిగింది?",
    "Poor Signal": "బలహీనమైన సిగ్నల్",
    "Timeout": "సమయం ముగిసింది (Timeout)",
    "Bank Server Down": "బ్యాంక్ సర్వర్ డౌన్",
    "Wrong UPI ID": "తప్పు UPI ఐడి",
    "Other": "ఇతర",
    "Rate your experience": "మీ అనుభవాన్ని రేట్ చేయండి",
    "Submit Feedback": "అభిప్రాయం సమర్పించండి",
    "Thank you!": "ధన్యవాదాలు!",
    "Check Another Location": "మరొక స్థానాన్ని తనిఖీ చేయండి",
    "Thanks for the": "రేటింగ్ ఇచ్చినందుకు ధన్యవాదాలు",
    "rating!": "స్టార్!",
    "Thank you for your feedback!": "మీ అభిప్రాయానికి ధన్యవాదాలు!",

    // AI Advisor
    "AI Smart Advisor": "AI స్మార్ట్ సలహాదారు",
    "💡 Network Boosting Suggestions": "💡 నెట్‌వర్క్ మెరుగుపరచే సూచనలు",
    "Move near a window to improve signal": "సిగ్నల్ మెరుగుపరచడానికి కిటికీ దగ్గరికి వెళ్ళండి",
    "Turn Airplane mode ON and OFF": "ఎయిర్‌ప్లేన్ మోడ్ ఆన్ మరియు ఆఫ్ చేయండి",
    "Switch to WiFi to increase success by 25%": "విజయాన్ని 25% పెంచడానికి WiFi కి మారండి",
    "Hi! Your payment risk is high right now. How can I assist you?": "నమస్కారం! మీ చెల్లింపు రిస్క్ ఇప్పుడు ఎక్కువగా ఉంది. నేను మీకు ఎలా సహాయపడగలను?",
    "Why did my payment fail?": "నా చెల్లింపు ఎందుకు విఫలమైంది?",
    "Can I make a payment now?": "నేను ఇప్పుడు చెల్లింపు చేయవచ్చా?",
    "Voice Input... or type": "వాయిస్ ఇన్‌పుట్... లేదా టైప్ చేయండి",

    // Bottom Nav (Specific spans)
    "Home": "హోమ్",
    "Map": "మ్యాప్",
    "Banks": "బ్యాంకులు",
    "🏠 Home": "🏠 హోమ్",
    "🗺️ Map": "🗺️ మ్యాప్",
    "🏦 Banks": "🏦 బ్యాంకులు",

    // Headers with icons
    "🏦 Bank Server Status": "🏦 బ్యాంక్ సర్వర్ స్థితి",

    // Risk Labels
    "Low Risk": "తక్కువ రిస్క్",
    "Moderate Risk": "మధ్యస్థ రిస్క్",
    "High Risk": "అధిక రిస్క్",
    "Low": "తక్కువ",
    "High": "అధికం",

    // Dynamic Statuses
    "Online": "ఆన్‌లైన్",
    "Offline": "ఆఫ్‌లైన్",
    "Available": "అందుబాటులో ఉంది",
    "Unavailable": "అందుబాటులో లేదు",
    "Active": "క్రియాశీలంగా ఉంది",
    "Delayed": "ఆలస్యమైంది",
    "Minor Delays Detected": "చిన్న జాప్యాలు గుర్తించబడ్డాయి",
    "All Services are Operational": "అన్ని సేవలు పనిచేస్తున్నాయి",
    "UPI Transactions Currently Down": "UPI లావాదేవీలు ప్రస్తుతం నిలిపివేయబడ్డాయి",

    // Banks Names (for HTML options)
    "State Bank of India (SBI)": "స్టేట్ బ్యాంక్ ఆఫ్ ఇండియా (SBI)",
    "HDFC Bank": "HDFC బ్యాంక్",
    "ICICI Bank": "ICICI బ్యాంక్",
    "Punjab National Bank": "పంజాబ్ నేషనల్ బ్యాంక్",
    "Bank of Baroda": "బ్యాంక్ ఆఫ్ బరోడా",
    "Canara Bank": "కెనరా బ్యాంక్",
    "Axis Bank": "యాక్సిస్ బ్యాంక్",
    "Union Bank of India": "యూనియన్ బ్యాంక్ ఆఫ్ ఇండియా",
    "Indian Bank": "ఇండియన్ బ్యాంక్",
    "Bank of India": "బ్యాంక్ ఆఫ్ ఇండియా",
};

const KANNADA_SIGNALS = [
    { dbm: -58, type: '5G', label: 'అద్భుతమైన సిగ్నల్', tier: 'good', bars: 5, upi: 'అధికం – 96%', badge: 'తక్కువ రిస్క్' },
    { dbm: -65, type: '5G', label: 'అద్భుతమైన సిగ్నల్', tier: 'good', bars: 5, upi: 'అధికం – 91%', badge: 'తక్కువ రిస్క్' },
    { dbm: -72, type: '4G', label: 'మంచి సిగ్నల్', tier: 'good', bars: 4, upi: 'అధికం – 84%', badge: 'తక్కువ రిస్క్' },
    { dbm: -80, type: '4G', label: 'మంచి సిగ్నల్', tier: 'good', bars: 3, upi: 'మధ్యస్థం – 72%', badge: 'తక్కువ రిస్క్' },
    { dbm: -88, type: '4G', label: 'మధ్యస్థ సిగ్నల్', tier: 'mid', bars: 3, upi: 'మధ్యస్థం – 61%', badge: 'మధ్యస్థ రిస్క్' },
    { dbm: -95, type: '3G', label: 'మధ్యస్థ సిగ్నల్', tier: 'mid', bars: 2, upi: 'మధ్యస్థం – 48%', badge: 'మధ్యస్థ రిస్క్' },
    { dbm: -102, type: '4G', label: 'బలహీనమైన సిగ్నల్', tier: 'poor', bars: 1, upi: 'తక్కువ – 32%', badge: 'అధిక రిస్క్' },
    { dbm: -110, type: '4G', label: 'బలహీనమైన సిగ్నల్', tier: 'poor', bars: 1, upi: 'తక్కువ – 28%', badge: 'అధిక రిస్క్' },
    { dbm: -115, type: '2G', label: 'చాలా బలహీనమైన సిగ్నల్', tier: 'poor', bars: 1, upi: 'తక్కువ – 14%', badge: 'అధిక రిస్క్' },
];

const KANNADA_RECS = {
    good: [
        { icon: '📱', text: '<strong>Airtel / Jio ఉపయోగించండి</strong> — నెట్‌వర్క్ స్థిరంగా మరియు వేగంగా ఉంది' },
        { icon: '✅', text: '<strong>కొనసాగడం సురక్షితం</strong> ఇప్పుడే UPI చెల్లింపు చేయండి' },
        { icon: '⚡', text: '<strong>వేగవంతమైన లావాదేవీలు</strong> 5 సెకన్లలోపు అంచనా' },
        { icon: '🔒', text: 'చెల్లింపు విఫలం లేదా సమయం ముగియడానికి <strong>తక్కువ రిస్క్</strong>' },
    ],
    mid: [
        { icon: '🔄', text: 'మెరుగైన నెట్‌వర్క్ స్థిరత్వం కోసం <strong>Jio కి మారండి</strong>' },
        { icon: '⏱️', text: '<strong>10–15 నిమిషాలు వేచి ఉండండి</strong> మరియు చెల్లింపు మళ్ళీ ప్రయత్నించండి' },
        { icon: '💵', text: 'చెల్లింపు విఫలమైతే <strong>నగదు (Cash) బ్యాకప్‌గా ఉంచుకోండి</strong>' },
    ],
    poor: [
        { icon: '🔄', text: 'ఇక్కడ మెరుగైన కవరేజ్ కోసం <strong>Vi / BSNL కి మారండి</strong>' },
        { icon: '⏱️', text: '<strong>10–15 నిమిషాలు వేచి ఉండండి</strong> మరియు చెల్లింపు మళ్ళీ ప్రయత్నించండి' },
        { icon: '💵', text: '<strong>నగదు (Cash) బ్యాకప్‌గా ఉంచుకోండి</strong> — చెల్లింపులు విఫలమయ్యే అవకాశం ఉంది' },
    ],
};

const KANNADA_BANK_DATA = {
    SBI: { name: 'స్టేట్ బ్యాంక్ ఆఫ్ ఇండియా (SBI)', rows: [{ label: 'UPI లావాదేవీలు', status: 'ఆన్‌లైన్' }, { label: 'UPI బ్యాలెన్స్ తనిఖీ', status: 'అందుబాటులో ఉంది' }, { label: 'UPI నమోదు', status: 'క్రియాశీలంగా ఉంది' }], overall: 'అన్ని సేవలు పనిచేస్తున్నాయి', ok: true },
    HDFC: { name: 'HDFC బ్యాంక్', rows: [{ label: 'UPI లావాదేవీలు', status: 'ఆన్‌లైన్' }, { label: 'UPI బ్యాలెన్స్ తనిఖీ', status: 'అందుబాటులో ఉంది' }, { label: 'UPI నమోదు', status: 'క్రియాశీలంగా ఉంది' }], overall: 'అన్ని సేవలు పనిచేస్తున్నాయి', ok: true },
    ICICI: { name: 'ICICI బ్యాంక్', rows: [{ label: 'UPI లావాదేవీలు', status: 'ఆన్‌లైన్' }, { label: 'UPI బ్యాలెన్స్ తనిఖీ', status: 'ఆలస్యమైంది' }, { label: 'UPI నమోదు', status: 'క్రియాశీలంగా ఉంది' }], overall: 'చిన్న జాప్యాలు గుర్తించబడ్డాయి', ok: false },
    PNB: { name: 'పంజాబ్ నేషనల్ బ్యాంక్ (PNB)', rows: [{ label: 'UPI లావాదేవీలు', status: 'ఆఫ్‌లైన్' }, { label: 'UPI బ్యాలెన్స్ తనిఖీ', status: 'అందుబాటులో లేదు' }, { label: 'UPI నమోదు', status: 'క్రియాశీలంగా ఉంది' }], overall: 'UPI లావాదేవీలు ప్రస్తుతం నిలిపివేయబడ్డాయి', ok: false },
    BOB: { name: 'బ్యాంక్ ఆఫ్ బరోడా (BOB)', rows: [{ label: 'UPI లావాదేవీలు', status: 'ఆన్‌లైన్' }, { label: 'UPI బ్యాలెన్స్ తనిఖీ', status: 'అందుబాటులో ఉంది' }, { label: 'UPI నమోదు', status: 'క్రియాశీలంగా ఉంది' }], overall: 'అన్ని సేవలు పనిచేస్తున్నాయి', ok: true },
    CANARA: { name: 'కెనరా బ్యాంక్', rows: [{ label: 'UPI లావాదేవీలు', status: 'ఆన్‌లైన్' }, { label: 'UPI బ్యాలెన్స్ తనిఖీ', status: 'అందుబాటులో ఉంది' }, { label: 'UPI నమోదు', status: 'క్రియాశీలంగా ఉంది' }], overall: 'అన్ని సేవలు పనిచేస్తున్నాయి', ok: true },
    AXIS: { name: 'యాక్సిస్ బ్యాంక్', rows: [{ label: 'UPI లావాదేవీలు', status: 'ఆన్‌లైన్' }, { label: 'UPI బ్యాలెన్స్ తనిఖీ', status: 'అందుబాటులో ఉంది' }, { label: 'UPI నమోదు', status: 'క్రియాశీలంగా ఉంది' }], overall: 'అన్ని సేవలు పనిచేస్తున్నాయి', ok: true },
    UNION: { name: 'యూనియన్ బ్యాంక్', rows: [{ label: 'UPI లావాదేవీలు', status: 'ఆన్‌లైన్' }, { label: 'UPI బ్యాలెన్స్ తనిఖీ', status: 'ఆలస్యమైంది' }, { label: 'UPI నమోదు', status: 'క్రియాశీలంగా ఉంది' }], overall: 'చిన్న జాప్యాలు గుర్తించబడ్డాయి', ok: false },
    INDIAN: { name: 'ఇండియన్ బ్యాంక్', rows: [{ label: 'UPI లావాదేవీలు', status: 'ఆన్‌లైన్' }, { label: 'UPI బ్యాలెన్స్ తనిఖీ', status: 'అందుబాటులో ఉంది' }, { label: 'UPI నమోదు', status: 'క్రియాశీలంగా ఉంది' }], overall: 'అన్ని సేవలు పనిచేస్తున్నాయి', ok: true },
    BOI: { name: 'బ్యాంక్ ఆఫ్ ఇండియా', rows: [{ label: 'UPI లావాదేవీలు', status: 'ఆన్‌లైన్' }, { label: 'UPI బ్యాలెన్స్ తనిఖీ', status: 'అందుబాటులో ఉంది' }, { label: 'UPI నమోదు', status: 'క్రియాశీలంగా ఉంది' }], overall: 'అన్ని సేవలు పనిచేస్తున్నాయి', ok: true },
};

const KANNADA_FEEDBACK_TIPS = {
    success: '🎉 అద్భుతం! చెల్లింపు విజయవంతమైంది. పెద్ద చెల్లింపులకు ముందు సిగ్నల్ తనిఖీ చేస్తూ ఉండండి.',
    failed: '🙏 క్షమించండి. WiFi కి మారడం లేదా మెరుగైన సిగ్నల్ ఉన్న ప్రాంతానికి వెళ్ళడం ప్రయత్నించండి.',
    pending: '⏳ పెండింగ్ చెల్లింపులు సాధారణంగా 10-15 నిమిషాల్లో సరిచేయబడతాయి. మీ బ్యాంక్ యాప్ తనిఖీ చేయండి.',
};

function applyKannadaTranslation() {
    console.log("Applying Telugu translation...");

    // Update HTML Title
    document.title = "NetPaySense (తెలుగు)";

    // Update global app data if it exists
    if (typeof SIGNALS !== 'undefined') SIGNALS.length = 0, SIGNALS.push(...KANNADA_SIGNALS);
    if (typeof RECS !== 'undefined') {
        Object.keys(KANNADA_RECS).forEach(k => RECS[k] = KANNADA_RECS[k]);
    }
    if (typeof BANK_DATA !== 'undefined') {
        Object.keys(KANNADA_BANK_DATA).forEach(k => BANK_DATA[k] = KANNADA_BANK_DATA[k]);
    }

    // Override editProfile to use Telugu prompt
    window.editProfile = function () {
        const name = prompt('మీ పేరు నమోదు చేయండి:', 'NetPaySense వినియోగదారు');
        if (name) document.querySelector('.settings-profile-name').textContent = name;
    };

    // Override AI response logic for Telugu
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
            if (lower.includes('fail') || lower.includes('విఫల')) aiMsg.innerHTML = "4G సిగ్నల్‌లో అకస్మాత్తు పతనం కారణంగా మీ చెల్లింపు విఫలమైంది. <b>WiFi</b> కి మారడం లేదా తెరిచిన ప్రదేశానికి వెళ్ళడం దీన్ని పరిష్కరిస్తుంది.";
            else if (lower.includes('now') || lower.includes('can i') || lower.includes('ఇప్పుడు')) aiMsg.innerHTML = "ప్రస్తుతం, 4G లో మీ రిస్క్ <b>మధ్యస్థం (67%)</b>. ముందుగా WiFi కి మారడం సురక్షితం.";
            else aiMsg.innerHTML = "నేను AI స్మార్ట్ సలహాదారుడిని. మీ చెల్లింపు విజయాన్ని మెరుగుపరచడానికి, స్థిరమైన WiFi నెట్‌వర్క్‌కు కనెక్ట్ చేయండి లేదా ఎయిర్‌ప్లేన్ మోడ్ ఆన్-ఆఫ్ చేయడం ప్రయత్నించండి.";
            body.appendChild(aiMsg);
            body.scrollTop = body.scrollHeight;
        }, 1000);
    };

    // Override Feedback submission for Telugu tips
    window.submitFeedbackNew = function () {
        if (!fbOutcome) return;
        document.getElementById('feedback-main').classList.add('hidden');
        document.getElementById('back-from-5').classList.add('hidden');
        const icons = { success: '🎉', failed: '😔', pending: '⏳' };
        document.getElementById('fb-thanks-icon').textContent = icons[fbOutcome];
        document.getElementById('fb-thanks-title').textContent = fbStar ? `${fbStar}★ రేటింగ్ ఇచ్చినందుకు ధన్యవాదాలు!` : 'మీ అభిప్రాయానికి ధన్యవాదాలు!';
        document.getElementById('fb-thanks-tip').textContent = KANNADA_FEEDBACK_TIPS[fbOutcome];
        const card = document.getElementById('feedback-thanks-card');
        card.classList.remove('hidden');
        card.classList.add('fade-in');
        fbOutcome = null; fbStar = 0;
    };

    // Override obNext for Telugu final button text
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
            document.getElementById('ob-next-btn').textContent = KANNADA_TRANSLATIONS["Get Started ✓"];
        }
    };

    // Override drawGauge for Telugu canvas labels
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
            good: { end: Math.PI * 1.33, color: '#22c55e', label: KANNADA_TRANSLATIONS['Low Risk'] },
            mid: { end: Math.PI * 1.66, color: '#eab308', label: KANNADA_TRANSLATIONS['Moderate Risk'] },
            poor: { end: Math.PI * 2, color: '#ef4444', label: KANNADA_TRANSLATIONS['High Risk'] }
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
        ctx.textAlign = 'left'; ctx.fillText(KANNADA_TRANSLATIONS['Low'], cx - r - 2, cy - 4);
        ctx.textAlign = 'right'; ctx.fillText(KANNADA_TRANSLATIONS['High'], cx + r + 2, cy - 4);

        if (labelId) {
            const lbl = document.getElementById(labelId);
            if (lbl) { lbl.textContent = t.label; lbl.className = `risk-meter-label ${tier}`; }
        }
    };

    // Override renderBankCard for Telugu titles
    window.renderBankCard = function (bank, titleId, rowsId, overallId) {
        const titleEl = document.getElementById(titleId);
        const overallEl = document.getElementById(overallId);
        const rowsEl = document.getElementById(rowsId);

        if (titleEl) {
            const bankName = KANNADA_TRANSLATIONS[bank.name] || bank.name;
            titleEl.textContent = `${bankName} UPI సర్వర్ స్థితి`;
        }

        if (rowsEl) {
            rowsEl.innerHTML = bank.rows.map(r => {
                const label = KANNADA_TRANSLATIONS[r.label] || r.label;
                const status = KANNADA_TRANSLATIONS[r.status] || r.status;
                const ok = ['Online', 'Available', 'Active', 'ఆన్‌లైన్', 'అందుబాటులో ఉంది', 'క్రియాశీలంగా ఉంది'].includes(r.status);
                return `<div class="bank-status-row">
                    <span class="bank-row-icon">${ok ? '✅' : '⚠️'}</span>
                    <span class="bank-row-label">${label}:</span>
                    <span class="bank-row-val ${ok ? 'bank-row-ok' : 'bank-row-warn'}">${status}</span>
                </div>`;
            }).join('');
        }

        if (overallEl) {
            const overallText = KANNADA_TRANSLATIONS[bank.overall] || bank.overall;
            overallEl.textContent = `స్థితి: ${overallText}`;
            overallEl.className = `bank-overall-status ${bank.ok ? 'ok' : 'warn'}`;
        }
    };

    // Recursive function to translate text nodes
    function translateElement(el) {
        if (!el) return;

        // Handle specific elements by ID or class if needed
        if (el.classList && el.classList.contains('loc-name')) {
            const txt = el.textContent.trim();
            if (txt === 'Yadgiri') el.textContent = 'యాద్గిర్';
            if (txt === 'Bengaluru') el.textContent = 'బెంగళూరు';
        }

        if (el.nodeType === Node.TEXT_NODE) {
            let text = el.textContent.trim();
            if (!text) return;

            // Try exact match
            if (KANNADA_TRANSLATIONS[text]) {
                el.textContent = el.textContent.replace(text, KANNADA_TRANSLATIONS[text]);
                return;
            }

            // Try matching without leading/trailing emojis or icons
            for (const key in KANNADA_TRANSLATIONS) {
                if (text.includes(key)) {
                    el.textContent = el.textContent.replace(key, KANNADA_TRANSLATIONS[key]);
                }
            }
            return;
        }

        // Handle placeholders
        if (el.placeholder && KANNADA_TRANSLATIONS[el.placeholder]) {
            el.placeholder = KANNADA_TRANSLATIONS[el.placeholder];
        }

        // Handle specific button texts and options
        if (el.id === 'ob-next-btn' && el.textContent.includes('Next')) {
            el.textContent = KANNADA_TRANSLATIONS["Next →"];
        }

        if (el.tagName === 'OPTION') {
            const trimmed = el.textContent.trim();
            if (KANNADA_TRANSLATIONS[trimmed]) {
                el.textContent = KANNADA_TRANSLATIONS[trimmed];
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
        dashSub.textContent = KANNADA_TRANSLATIONS["Check your current location's network reliability"];
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
        if (KANNADA_TRANSLATIONS[txt]) d.textContent = KANNADA_TRANSLATIONS[txt];
    });

    console.log("Telugu translation applied successfully.");
}

// Automatically apply when script is loaded
window.applyTeluguTranslation = applyTeluguTranslation;
