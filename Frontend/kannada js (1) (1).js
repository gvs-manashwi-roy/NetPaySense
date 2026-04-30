/**
 * NetPaySense Kannada Translation Script
 * This script translates the entire frontend into Kannada.
 * To use: Include this script in your index.html or run applyKannadaTranslation() in the console.
 */

const KANNADA_TRANSLATIONS = {
    // Onboarding
    "Welcome to NetPaySense": "NetPaySense ಗೆ ಸುಸ್ವಾಗತ",
    "Check network reliability and UPI payment success chances for any location — before you pay.": "ನೀವು ಹಣ ಪಾವತಿಸುವ ಮೊದಲು ಯಾವುದೇ ಸ್ಥಳದ ನೆಟ್‌ವರ್ಕ್ ವಿಶ್ವಾಸಾರ್ಹತೆ ಮತ್ತು UPI ಪಾವತಿ ಯಶಸ್ಸಿನ ಸಾಧ್ಯತೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.",
    "Smart Location Check": "ಸ್ಮಾರ್ಟ್ ಸ್ಥಳ ಪರಿಶೀಲನೆ",
    "Enter any location or use GPS to instantly get signal strength, UPI risk level, and bank server status.": "ಸಿಗ್ನಲ್ ಸಾಮರ್ಥ್ಯ, UPI ಅಪಾಯದ ಮಟ್ಟ ಮತ್ತು ಬ್ಯಾಂಕ್ ಸರ್ವರ್ ಸ್ಥಿತಿಯನ್ನು ತಕ್ಷಣವೇ ಪಡೆಯಲು ಯಾವುದೇ ಸ್ಥಳವನ್ನು ನಮೂದಿಸಿ ಅಥವಾ GPS ಬಳಸಿ.",
    "100% Private": "100% ಖಾಸಗಿ",
    "No data is sent to any server. Everything runs locally on your device. Your location stays yours.": "ಯಾವುದೇ ಡೇಟಾವನ್ನು ಯಾವುದೇ ಸರ್ವರ್‌ಗೆ ಕಳುಹಿಸಲಾಗುವುದಿಲ್ಲ. ಎಲ್ಲವೂ ನಿಮ್ಮ ಸಾಧನದಲ್ಲಿ ಸ್ಥಳೀಯವಾಗಿ ಚಲಿಸುತ್ತದೆ. ನಿಮ್ಮ ಸ್ಥಳವು ನಿಮ್ಮದಾಗಿಯೇ ಇರುತ್ತದೆ.",
    "Next →": "ಮುಂದೆ →",
    "Don't show again": "ಮತ್ತೆ ತೋರಿಸಬೇಡಿ",
    "Get Started ✓": "ಪ್ರಾರಂಭಿಸಿ ✓",

    // Settings
    "Settings": "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    "My Profile": "ನನ್ನ ಪ್ರೊಫೈಲ್",
    "NetPaySense User": "NetPaySense ಬಳಕೆದಾರ",
    "Edit": "ತಿದ್ದು",
    "Appearance": "ಗೋಚರತೆ",
    "🌙 Dark Mode": "🌙 ಡಾರ್ಕ್ ಮೋಡ್",
    "Dark Mode": "ಡಾರ್ಕ್ ಮೋಡ್",
    "Switch between light and dark": "ಬೆಳಕು ಮತ್ತು ಕತ್ತಲೆಯ ನಡುವೆ ಬದಲಿಸಿ",
    "Notifications": "ಸೂಚನೆಗಳು",
    "🔔 Payment Risk Alerts": "🔔 ಪಾವತಿ ಅಪಾಯದ ಎಚ್ಚರಿಕೆಗಳು",
    "Payment Risk Alerts": "ಪಾವತಿ ಅಪಾಯದ ಎಚ್ಚರಿಕೆಗಳು",
    "Get notified on high risk": "ಹೆಚ್ಚಿನ ಅಪಾಯದ ಬಗ್ಗೆ ಸೂಚನೆ ಪಡೆಯಿರಿ",
    "📳 Vibration": "📳 ಕಂಪನ",
    "Vibration": "ಕಂಪನ",
    "Haptic feedback on actions": "ಕ್ರಮಗಳ ಮೇಲೆ ಹ್ಯಾಪ್ಟಿಕ್ ಪ್ರತಿಕ್ರಿಯೆ",
    "Data & Privacy": "ಡೇಟಾ ಮತ್ತು ಗೌಪ್ಯತೆ",
    "🗑️ Clear Search History": "🗑️ ಹುಡುಕಾಟದ ಇತಿಹಾಸವನ್ನು ಅಳಿಸಿ",
    "Clear Search History": "ಹುಡುಕಾಟದ ಇತಿಹಾಸವನ್ನು ಅಳಿಸಿ",
    "Remove all recent checks": "ಎಲ್ಲಾ ಇತ್ತೀಚಿನ ತಪಾಸಣೆಗಳನ್ನು ತೆಗೆದುಹಾಕಿ",
    "🎬 Show App Intro": "🎬 ಅಪ್ಲಿಕೇಶನ್ ಪರಿಚಯವನ್ನು ತೋರಿಸಿ",
    "Show App Intro": "ಅಪ್ಲಿಕೇಶನ್ ಪರಿಚಯವನ್ನು ತೋರಿಸಿ",
    "Replay the onboarding slides": "ಆನ್‌ಬೋರ್ಡಿಂಗ್ ಸ್ಲೈಡ್‌ಗಳನ್ನು ಮರುಪ್ಲೇ ಮಾಡಿ",
    "Privacy": "ಗೌಪ್ಯತೆ",
    "All data stays on your device": "ಎಲ್ಲಾ ಡೇಟಾ ನಿಮ್ಮ ಸಾಧನದಲ್ಲಿಯೇ ಇರುತ್ತದೆ",
    "Local": "ಸ್ಥಳೀಯ",
    "About": "ಬಗ್ಗೆ",
    "📱 App Version": "📱 ಅಪ್ಲಿಕೇಶನ್ ಆವೃತ್ತಿ",
    "App Version": "ಅಪ್ಲಿಕೇಶನ್ ಆವೃತ್ತಿ",
    "⭐ Rate the App": "⭐ ಅಪ್ಲಿಕೇಶನ್ ರೇಟ್ ಮಾಡಿ",
    "Rate the App": "ಅಪ್ಲಿಕೇಶನ್ ರೇಟ್ ಮಾಡಿ",
    "Tell us what you think": "ನಿಮ್ಮ ಅಭಿಪ್ರಾಯವನ್ನು ನಮಗೆ ತಿಳಿಸಿ",
    "📧 Contact Support": "📧 ಬೆಂಬಲವನ್ನು ಸಂಪರ್ಕಿಸಿ",
    "Contact Support": "ಬೆಂಬಲವನ್ನು ಸಂಪರ್ಕಿಸಿ",
    "Get help or report a bug": "ಸಹಾಯ ಪಡೆಯಿರಿ ಅಥವಾ ದೋಷವನ್ನು ವರದಿ ಮಾಡಿ",
    "Enter your name:": "ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ:",
    "Profile Updated": "ಪ್ರೊಫೈಲ್ ನವೀಕರಿಸಲಾಗಿದೆ",

    // Dashboard
    "📊 My Network Dashboard": "📊 ನನ್ನ ನೆಟ್‌ವರ್ಕ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    "Check your current location's network reliability": "ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಸ್ಥಳದ ನೆಟ್‌ವರ್ಕ್ ವಿಶ್ವಾಸಾರ್ಹತೆಯನ್ನು ಪರಿಶೀಲಿಸಿ",
    "📍 Fetch My Location": "📍 ನನ್ನ ಸ್ಥಳವನ್ನು ಪಡೆಯಿರಿ",
    "⏳ Fetching...": "⏳ ಪಡೆಯಲಾಗುತ್ತಿದೆ...",
    "🔍 Check New Location": "🔍 ಹೊಸ ಸ್ಥಳವನ್ನು ಪರಿಶೀಲಿಸಿ",
    "Fetching location...": "ಸ್ಥಳವನ್ನು ಪಡೆಯಲಾಗುತ್ತಿದೆ...",
    "Current Location": "ಪ್ರಸ್ತುತ ಸ್ಥಳ",
    "📶 Network Status": "📶 ನೆಟ್‌ವರ್ಕ್ ಸ್ಥಿತಿ",
    "Signal": "ಸಿಗ್ನಲ್",
    "Latency": "ವಿಳಂಬ (Latency)",
    "Speed": "ವೇಗ",
    "💳 Payment Reliability": "💳 ಪಾವತಿ ವಿಶ್ವಾಸಾರ್ಹತೆ",
    "📈 Signal History": "📈 ಸಿಗ್ನಲ್ ಇತಿಹಾಸ",
    "Last 5 checks": "ಕಳೆದ 5 ತಪಾಸಣೆಗಳು",
    "Check Bank Status": "ಬ್ಯಾಂಕ್ ಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ",
    "🏦 Check Bank Status": "🏦 ಬ್ಯಾಂಕ್ ಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ",

    // Map
    "Smart Network Map": "ಸ್ಮಾರ್ಟ್ ನೆಟ್‌ವರ್ಕ್ ಮ್ಯಾಪ್",
    "Move 50m": "50 ಮೀಟರ್ ಚಲಿಸಿ",
    "Better network": "ಉತ್ತಮ ನೆಟ್‌ವರ್ಕ್",
    "Better Network Zone": "ಉತ್ತಮ ನೆಟ್‌ವರ್ಕ್ ವಲಯ",
    "You are here": "ನೀವು ಇಲ್ಲಿದ್ದೀರಿ",
    "🚶 Move 50m ➔ Better network": "🚶 50ಮೀ ಚಲಿಸಿ ➔ ಉತ್ತಮ ನೆಟ್‌ವರ್ಕ್",

    // Banks
    "🏦 Check Bank Server Status": "🏦 ಬ್ಯಾಂಕ್ ಸರ್ವರ್ ಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ",
    "Select a bank to view its live UPI server status": "ಲೈವ್ UPI ಸರ್ವರ್ ಸ್ಥಿತಿಯನ್ನು ವೀಕ್ಷಿಸಲು ಬ್ಯಾಂಕ್ ಆಯ್ಕೆಮಾಡಿ",
    "Select Bank": "ಬ್ಯಾಂಕ್ ಆಯ್ಕೆಮಾಡಿ",
    "Choose Bank": "ಬ್ಯಾಂಕ್ ಆರಿಸಿ",

    // Search Step
    "Welcome to Network & UPI Checker": "ನೆಟ್‌ವರ್ಕ್ ಮತ್ತು UPI ಚೆಕ್ಕರ್‌ಗೆ ಸುಸ್ವಾಗತ",
    "Check your network signal strength and UPI payment reliability for any location.": "ಯಾವುದೇ ಸ್ಥಳಕ್ಕಾಗಿ ನಿಮ್ಮ ನೆಟ್‌ವರ್ಕ್ ಸಿಗ್ನಲ್ ಸಾಮರ್ಥ್ಯ ಮತ್ತು UPI ಪಾವತಿ ವಿಶ್ವಾಸಾರ್ಹತೆಯನ್ನು ಪರಿಶೀಲಿಸಿ.",
    "Enter location (e.g. Koramangala…)": "ಸ್ಥಳವನ್ನು ನಮೂದಿಸಿ (ಉದಾ: ಕೋರಮಂಗಲ…)",
    "Check": "ಪರಿಶೀಲಿಸಿ",
    "Checking…": "ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ…",
    "🕐 Recently Checked": "🕐 ಇತ್ತೀಚೆಗೆ ಪರಿಶೀಲಿಸಲಾಗಿದೆ",
    "🔍 Enter a location to get started": "🔍 ಪ್ರಾರಂಭಿಸಲು ಸ್ಥಳವನ್ನು ನಮೂದಿಸಿ",

    // Analyzing
    "Analyzing Network...": "ನೆಟ್‌ವರ್ಕ್ ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
    "Please wait, this may take a few seconds": "ದಯವಿಟ್ಟು ನಿರೀಕ್ಷಿಸಿ, ಇದು ಕೆಲವು ಸೆಕೆಂಡುಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳಬಹುದು",
    "Fetching location data...": "ಸ್ಥಳದ ಡೇಟಾವನ್ನು ಪಡೆಯಲಾಗುತ್ತಿದೆ...",
    "Fetching signal data...": "ಸಿಗ್ನಲ್ ಡೇಟಾವನ್ನು ಪಡೆಯಲಾಗುತ್ತಿದೆ...",
    "Analyzing signal strength...": "ಸಿಗ್ನಲ್ ಸಾಮರ್ಥ್ಯವನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
    "Predicting UPI success...": "UPI ಯಶಸ್ಸನ್ನು ಊಹಿಸಲಾಗುತ್ತಿದೆ...",

    // Results
    "Results": "ಫಲಿತಾಂಶಗಳು",
    "Location Detected": "ಸ್ಥಳ ಪತ್ತೆಯಾಗಿದೆ",
    "Payment Risk Meter": "ಪಾವತಿ ಅಪಾಯದ ಮೀಟರ್",
    "UPI Success Chance": "UPI ಯಶಸ್ಸಿನ ಸಾಧ್ಯತೆ",
    "💡 Recommendations": "💡 ಶಿಫಾರಸುಗಳು",
    "Recommendations": "ಶಿಫಾರಸುಗಳು",
    "← Back": "← ಹಿಂದಕ್ಕೆ",
    "Back": "ಹಿಂದಕ್ಕೆ",
    "Feedback →": "ಪ್ರತಿಕ್ರಿಯೆ →",
    "Feedback": "ಪ್ರತಿಕ್ರಿಯೆ",
    "Bank Server Status": "ಬ್ಯಾಂಕ್ ಸರ್ವರ್ ಸ್ಥಿತಿ",

    // Feedback
    "How did your payment go?": "ನಿಮ್ಮ ಪಾವತಿ ಹೇಗೆ ಹೋಯಿತು?",
    "Successful": "ಯಶಸ್ವಿಯಾಗಿದೆ",
    "Failed": "ವಿಫಲವಾಗಿದೆ",
    "Pending": "ಬಾಕಿ ಉಳಿದಿದೆ (Pending)",
    "What went wrong?": "ಏನು ತಪ್ಪಾಗಿದೆ?",
    "Poor Signal": "ದುರ್ಬಲ ಸಿಗ್ನಲ್",
    "Timeout": "ಸಮಯ ಮೀರಿದೆ (Timeout)",
    "Bank Server Down": "ಬ್ಯಾಂಕ್ ಸರ್ವರ್ ಸ್ಥಗಿತಗೊಂಡಿದೆ",
    "Wrong UPI ID": "ತಪ್ಪಾದ UPI ಐಡಿ",
    "Other": "ಇತರೆ",
    "Rate your experience": "ನಿಮ್ಮ ಅನುಭವವನ್ನು ರೇಟ್ ಮಾಡಿ",
    "Submit Feedback": "ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಸಲ್ಲಿಸಿ",
    "Thank you!": "ಧನ್ಯವಾದಗಳು!",
    "Check Another Location": "ಮತ್ತೊಂದು ಸ್ಥಳವನ್ನು ಪರಿಶೀಲಿಸಿ",
    "Thanks for the": "ರೇಟಿಂಗ್ ನೀಡಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು",
    "rating!": "ಸ್ಟಾರ್!",
    "Thank you for your feedback!": "ನಿಮ್ಮ ಪ್ರತಿಕ್ರಿಯೆಗಾಗಿ ಧನ್ಯವಾದಗಳು!",

    // AI Advisor
    "AI Smart Advisor": "AI ಸ್ಮಾರ್ಟ್ ಸಲಹೆಗಾರ",
    "💡 Network Boosting Suggestions": "💡 ನೆಟ್‌ವರ್ಕ್ ಹೆಚ್ಚಿಸುವ ಸಲಹೆಗಳು",
    "Move near a window to improve signal": "ಸಿಗ್ನಲ್ ಸುಧಾರಿಸಲು ಕಿಟಕಿಯ ಹತ್ತಿರ ಚಲಿಸಿ",
    "Turn Airplane mode ON and OFF": "ಏರ್‌ಪ್ಲೇನ್ ಮೋಡ್ ಅನ್ನು ಆನ್ ಮತ್ತು ಆಫ್ ಮಾಡಿ",
    "Switch to WiFi to increase success by 25%": "ಯಶಸ್ಸನ್ನು 25% ಹೆಚ್ಚಿಸಲು ವೈಫೈಗೆ ಬದಲಿಸಿ",
    "Hi! Your payment risk is high right now. How can I assist you?": "ನಮಸ್ತೆ! ನಿಮ್ಮ ಪಾವತಿ ಅಪಾಯವು ಈಗ ಹೆಚ್ಚಾಗಿದೆ. ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?",
    "Why did my payment fail?": "ನನ್ನ ಪಾವತಿ ಏಕೆ ವಿಫಲವಾಯಿತು?",
    "Can I make a payment now?": "ನಾನು ಈಗ ಪಾವತಿ ಮಾಡಬಹುದೇ?",
    "Voice Input... or type": "ಧ್ವನಿ ಇನ್ಪುಟ್... ಅಥವಾ ಟೈಪ್ ಮಾಡಿ",

    // Bottom Nav (Specific spans)
    "Home": "ಹೋಮ್",
    "Map": "ಮ್ಯಾಪ್",
    "Banks": "ಬ್ಯಾಂಕುಗಳು",
    "🏠 Home": "🏠 ಹೋಮ್",
    "🗺️ Map": "🗺️ ಮ್ಯಾಪ್",
    "🏦 Banks": "🏦 ಬ್ಯಾಂಕುಗಳು",

    // Headers with icons
    "🏦 Bank Server Status": "🏦 ಬ್ಯಾಂಕ್ ಸರ್ವರ್ ಸ್ಥಿತಿ",

    // Risk Labels
    "Low Risk": "ಕಡಿಮೆ ಅಪಾಯ",
    "Moderate Risk": "ಮಧ್ಯಮ ಅಪಾಯ",
    "High Risk": "ಹೆಚ್ಚಿನ ಅಪಾಯ",
    "Low": "ಕಡಿಮೆ",
    "High": "ಹೆಚ್ಚು",

    // Dynamic Statuses
    "Online": "ಆನ್‌ಲೈನ್",
    "Offline": "ಆಫ್‌ಲೈನ್",
    "Available": "ಲಭ್ಯವಿದೆ",
    "Unavailable": "ಲಭ್ಯವಿಲ್ಲ",
    "Active": "ಸಕ್ರಿಯವಾಗಿದೆ",
    "Delayed": "ವಿಳಂಬವಾಗಿದೆ",
    "Minor Delays Detected": "ಸಣ್ಣ ವಿಳಂಬಗಳು ಪತ್ತೆಯಾಗಿವೆ",
    "All Services are Operational": "ಎಲ್ಲಾ ಸೇವೆಗಳು ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿವೆ",
    "UPI Transactions Currently Down": "UPI ವಹಿವಾಟುಗಳು ಪ್ರಸ್ತುತ ಸ್ಥಗಿತಗೊಂಡಿವೆ",

    // Banks Names (for HTML options)
    "State Bank of India (SBI)": "ಸ್ಟೇಟ್ ಬ್ಯಾಂಕ್ ಆಫ್ ಇಂಡಿಯಾ (SBI)",
    "HDFC Bank": "HDFC ಬ್ಯಾಂಕ್",
    "ICICI Bank": "ICICI ಬ್ಯಾಂಕ್",
    "Punjab National Bank": "ಪಂಜಾಬ್ ನ್ಯಾಷನಲ್ ಬ್ಯಾಂಕ್",
    "Bank of Baroda": "ಬ್ಯಾಂಕ್ ಆಫ್ ಬರೋಡಾ",
    "Canara Bank": "ಕೆನರಾ ಬ್ಯಾಂಕ್",
    "Axis Bank": "ಆಕ್ಸಿಸ್ ಬ್ಯಾಂಕ್",
    "Union Bank of India": "ಯೂನಿಯನ್ ಬ್ಯಾಂಕ್ ಆಫ್ ಇಂಡಿಯಾ",
    "Indian Bank": "ಇಂಡಿಯನ್ ಬ್ಯಾಂಕ್",
    "Bank of India": "ಬ್ಯಾಂಕ್ ಆಫ್ ಇಂಡಿಯಾ",
};

const KANNADA_SIGNALS = [
    { dbm: -58, type: '5G', label: 'ಅತ್ಯುತ್ತಮ ಸಿಗ್ನಲ್', tier: 'good', bars: 5, upi: 'ಹೆಚ್ಚು – 96%', badge: 'ಕಡಿಮೆ ಅಪಾಯ' },
    { dbm: -65, type: '5G', label: 'ಅತ್ಯುತ್ತಮ ಸಿಗ್ನಲ್', tier: 'good', bars: 5, upi: 'ಹೆಚ್ಚು – 91%', badge: 'ಕಡಿಮೆ ಅಪಾಯ' },
    { dbm: -72, type: '4G', label: 'ಉತ್ತಮ ಸಿಗ್ನಲ್', tier: 'good', bars: 4, upi: 'ಹೆಚ್ಚು – 84%', badge: 'ಕಡಿಮೆ ಅಪಾಯ' },
    { dbm: -80, type: '4G', label: 'ಉತ್ತಮ ಸಿಗ್ನಲ್', tier: 'good', bars: 3, upi: 'ಮಧ್ಯಮ – 72%', badge: 'ಕಡಿಮೆ ಅಪಾಯ' },
    { dbm: -88, type: '4G', label: 'ಮಧ್ಯಮ ಸಿಗ್ನಲ್', tier: 'mid', bars: 3, upi: 'ಮಧ್ಯಮ – 61%', badge: 'ಮಧ್ಯಮ ಅಪಾಯ' },
    { dbm: -95, type: '3G', label: 'ಮಧ್ಯಮ ಸಿಗ್ನಲ್', tier: 'mid', bars: 2, upi: 'ಮಧ್ಯಮ – 48%', badge: 'ಮಧ್ಯಮ ಅಪಾಯ' },
    { dbm: -102, type: '4G', label: 'ಕಡಿಮೆ ಸಿಗ್ನಲ್', tier: 'poor', bars: 1, upi: 'ಕಡಿಮೆ – 32%', badge: 'ಹೆಚ್ಚಿನ ಅಪಾಯ' },
    { dbm: -110, type: '4G', label: 'ಕಡಿಮೆ ಸಿಗ್ನಲ್', tier: 'poor', bars: 1, upi: 'ಕಡಿಮೆ – 28%', badge: 'ಹೆಚ್ಚಿನ ಅಪಾಯ' },
    { dbm: -115, type: '2G', label: 'ಬಹಳ ಕಡಿಮೆ ಸಿಗ್ನಲ್', tier: 'poor', bars: 1, upi: 'ಕಡಿಮೆ – 14%', badge: 'ಹೆಚ್ಚಿನ ಅಪಾಯ' },
];

const KANNADA_RECS = {
    good: [
        { icon: '📱', text: '<strong>Airtel / Jio ಬಳಸಿ</strong> — ನೆಟ್‌ವರ್ಕ್ ಸ್ಥಿರವಾಗಿದೆ ಮತ್ತು ವೇಗವಾಗಿದೆ' },
        { icon: '✅', text: '<strong>ಮುಂದುವರಿಯಲು ಸುರಕ್ಷಿತ</strong> ಈಗಲೇ UPI ಪಾವತಿ ಮಾಡಿ' },
        { icon: '⚡', text: '<strong>ವೇಗದ ವಹಿವಾಟುಗಳು</strong> 5 ಸೆಕೆಂಡುಗಳ ಒಳಗೆ ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ' },
        { icon: '🔒', text: 'ಪಾವತಿ ವಿಫಲ ಅಥವಾ ಸಮಯ ಮೀರಿದ <strong>ಕಡಿಮೆ ಅಪಾಯ</strong>' },
    ],
    mid: [
        { icon: '🔄', text: 'ಉತ್ತಮ ನೆಟ್‌ವರ್ಕ್ ಸ್ಥಿರತೆಗಾಗಿ <strong>Jio ಗೆ ಬದಲಿಸಿ</strong>' },
        { icon: '⏱️', text: '<strong>10–15 ನಿಮಿಷ ಕಾಯಿರಿ</strong> ಮತ್ತು ಪಾವತಿಯನ್ನು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ' },
        { icon: '💵', text: 'ಪಾವತಿ ವಿಫಲವಾದರೆ <strong>ಹಣವನ್ನು (Cash) ಬ್ಯಾಕಪ್ ಆಗಿ ಇಟ್ಟುಕೊಳ್ಳಿ</strong>' },
    ],
    poor: [
        { icon: '🔄', text: 'ಇಲ್ಲಿ ಉತ್ತಮ ವ್ಯಾಪ್ತಿಗಾಗಿ <strong>Vi / BSNL ಗೆ ಬದಲಿಸಿ</strong>' },
        { icon: '⏱️', text: '<strong>10–15 ನಿಮಿಷ ಕಾಯಿರಿ</strong> ಮತ್ತು ಪಾವತಿಯನ್ನು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ' },
        { icon: '💵', text: '<strong>ಹಣವನ್ನು (Cash) ಬ್ಯಾಕಪ್ ಆಗಿ ಇಟ್ಟುಕೊಳ್ಳಿ</strong> — ಪಾವತಿಗಳು ವಿಫಲವಾಗುವ ಸಾಧ್ಯತೆಯಿದೆ' },
    ],
};

const KANNADA_BANK_DATA = {
    SBI: { name: 'ಸ್ಟೇಟ್ ಬ್ಯಾಂಕ್ ಆಫ್ ಇಂಡಿಯಾ (SBI)', rows: [{ label: 'UPI ವಹಿವಾಟುಗಳು', status: 'ಆನ್‌ಲೈನ್' }, { label: 'UPI ಬ್ಯಾಲೆನ್ಸ್ ಪರಿಶೀಲನೆ', status: 'ಲಭ್ಯವಿದೆ' }, { label: 'UPI ನೋಂದಣಿ', status: 'ಸಕ್ರಿಯವಾಗಿದೆ' }], overall: 'ಎಲ್ಲಾ ಸೇವೆಗಳು ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿವೆ', ok: true },
    HDFC: { name: 'HDFC ಬ್ಯಾಂಕ್', rows: [{ label: 'UPI ವಹಿವಾಟುಗಳು', status: 'ಆನ್‌ಲೈನ್' }, { label: 'UPI ಬ್ಯಾಲೆನ್ಸ್ ಪರಿಶೀಲನೆ', status: 'ಲಭ್ಯವಿದೆ' }, { label: 'UPI ನೋಂದಣಿ', status: 'ಸಕ್ರಿಯವಾಗಿದೆ' }], overall: 'ಎಲ್ಲಾ ಸೇವೆಗಳು ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿವೆ', ok: true },
    ICICI: { name: 'ICICI ಬ್ಯಾಂಕ್', rows: [{ label: 'UPI ವಹಿವಾಟುಗಳು', status: 'ಆನ್‌ಲೈನ್' }, { label: 'UPI ಬ್ಯಾಲೆನ್ಸ್ ಪರಿಶೀಲನೆ', status: 'ವಿಳಂಬವಾಗಿದೆ' }, { label: 'UPI ನೋಂದಣಿ', status: 'ಸಕ್ರಿಯವಾಗಿದೆ' }], overall: 'ಸಣ್ಣ ವಿಳಂಬಗಳು ಪತ್ತೆಯಾಗಿವೆ', ok: false },
    PNB: { name: 'ಪಂಜಾಬ್ ನ್ಯಾಷನಲ್ ಬ್ಯಾಂಕ್ (PNB)', rows: [{ label: 'UPI ವಹಿವಾಟುಗಳು', status: 'ಆಫ್‌ಲೈನ್' }, { label: 'UPI ಬ್ಯಾಲೆನ್ಸ್ ಪರಿಶೀಲನೆ', status: 'ಲಭ್ಯವಿಲ್ಲ' }, { label: 'UPI ನೋಂದಣಿ', status: 'ಸಕ್ರಿಯವಾಗಿದೆ' }], overall: 'UPI ವಹಿವಾಟುಗಳು ಪ್ರಸ್ತುತ ಸ್ಥಗಿತಗೊಂಡಿವೆ', ok: false },
    BOB: { name: 'ಬ್ಯಾಂಕ್ ಆಫ್ ಬರೋಡಾ (BOB)', rows: [{ label: 'UPI ವಹಿವಾಟುಗಳು', status: 'ಆನ್‌ಲೈನ್' }, { label: 'UPI ಬ್ಯಾಲೆನ್ಸ್ ಪರಿಶೀಲನೆ', status: 'ಲಭ್ಯವಿದೆ' }, { label: 'UPI ನೋಂದಣಿ', status: 'ಸಕ್ರಿಯವಾಗಿದೆ' }], overall: 'ಎಲ್ಲಾ ಸೇವೆಗಳು ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿವೆ', ok: true },
    CANARA: { name: 'ಕೆನರಾ ಬ್ಯಾಂಕ್', rows: [{ label: 'UPI ವಹಿವಾಟುಗಳು', status: 'ಆನ್‌ಲೈನ್' }, { label: 'UPI ಬ್ಯಾಲೆನ್ಸ್ ಪರಿಶೀಲನೆ', status: 'ಲಭ್ಯವಿದೆ' }, { label: 'UPI ನೋಂದಣಿ', status: 'ಸಕ್ರಿಯವಾಗಿದೆ' }], overall: 'ಎಲ್ಲಾ ಸೇವೆಗಳು ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿವೆ', ok: true },
    AXIS: { name: 'ಆಕ್ಸಿಸ್ ಬ್ಯಾಂಕ್', rows: [{ label: 'UPI ವಹಿವಾಟುಗಳು', status: 'ಆನ್‌ಲೈನ್' }, { label: 'UPI ಬ್ಯಾಲೆನ್ಸ್ ಪರಿಶೀಲನೆ', status: 'ಲಭ್ಯವಿದೆ' }, { label: 'UPI ನೋಂದಣಿ', status: 'ಸಕ್ರಿಯವಾಗಿದೆ' }], overall: 'ಎಲ್ಲಾ ಸೇವೆಗಳು ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿವೆ', ok: true },
    UNION: { name: 'ಯೂನಿಯನ್ ಬ್ಯಾಂಕ್', rows: [{ label: 'UPI ವಹಿವಾಟುಗಳು', status: 'ಆನ್‌ಲೈನ್' }, { label: 'UPI ಬ್ಯಾಲೆನ್ಸ್ ಪರಿಶೀಲನೆ', status: 'ವಿಳಂಬವಾಗಿದೆ' }, { label: 'UPI ನೋಂದಣಿ', status: 'ಸಕ್ರಿಯವಾಗಿದೆ' }], overall: 'ಸಣ್ಣ ವಿಳಂಬಗಳು ಪತ್ತೆಯಾಗಿವೆ', ok: false },
    INDIAN: { name: 'ಇಂಡಿಯನ್ ಬ್ಯಾಂಕ್', rows: [{ label: 'UPI ವಹಿವಾಟುಗಳು', status: 'ಆನ್‌ಲೈನ್' }, { label: 'UPI ಬ್ಯಾಲೆನ್ಸ್ ಪರಿಶೀಲನೆ', status: 'ಲಭ್ಯವಿದೆ' }, { label: 'UPI ನೋಂದಣಿ', status: 'ಸಕ್ರಿಯವಾಗಿದೆ' }], overall: 'ಎಲ್ಲಾ ಸೇವೆಗಳು ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿವೆ', ok: true },
    BOI: { name: 'ಬ್ಯಾಂಕ್ ಆಫ್ ಇಂಡಿಯಾ', rows: [{ label: 'UPI ವಹಿವಾಟುಗಳು', status: 'ಆನ್‌ಲೈನ್' }, { label: 'UPI ಬ್ಯಾಲೆನ್ಸ್ ಪರಿಶೀಲನೆ', status: 'ಲಭ್ಯವಿದೆ' }, { label: 'UPI ನೋಂದಣಿ', status: 'ಸಕ್ರಿಯವಾಗಿದೆ' }], overall: 'ಎಲ್ಲಾ ಸೇವೆಗಳು ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿವೆ', ok: true },
};

const KANNADA_FEEDBACK_TIPS = {
    success: '🎉 ಅದ್ಭುತ! ಪಾವತಿ ಯಶಸ್ವಿಯಾಗಿದೆ. ದೊಡ್ಡ ಪಾವತಿಗಳ ಮೊದಲು ಸಿಗ್ನಲ್ ಅನ್ನು ಪರಿಶೀಲಿಸುತ್ತಿರಿ.',
    failed: '🙏 ಕ್ಷಮಿಸಿ. ವೈಫೈಗೆ ಬದಲಿಸಲು ಅಥವಾ ಉತ್ತಮ ಸಿಗ್ನಲ್ ಇರುವ ಪ್ರದೇಶಕ್ಕೆ ಹೋಗಲು ಪ್ರಯತ್ನಿಸಿ.',
    pending: '⏳ ಬಾಕಿ ಇರುವ ಪಾವತಿಗಳು ಸಾಮಾನ್ಯವಾಗಿ 10-15 ನಿಮಿಷಗಳಲ್ಲಿ ಸರಿಯಾಗುತ್ತವೆ. ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಅಪ್ಲಿಕೇಶನ್ ಪರಿಶೀಲಿಸಿ.',
};

function applyKannadaTranslation() {
    console.log("Applying Kannada translation...");

    // Update HTML Title
    document.title = "NetPaySense (ಕನ್ನಡ)";

    // Update global app data if it exists
    if (typeof SIGNALS !== 'undefined') SIGNALS.length = 0, SIGNALS.push(...KANNADA_SIGNALS);
    if (typeof RECS !== 'undefined') {
        Object.keys(KANNADA_RECS).forEach(k => RECS[k] = KANNADA_RECS[k]);
    }
    if (typeof BANK_DATA !== 'undefined') {
        Object.keys(KANNADA_BANK_DATA).forEach(k => BANK_DATA[k] = KANNADA_BANK_DATA[k]);
    }

    // Override editProfile to use Kannada prompt
    window.editProfile = function () {
        const name = prompt('ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ:', 'NetPaySense ಬಳಕೆದಾರ');
        if (name) document.querySelector('.settings-profile-name').textContent = name;
    };

    // Override AI response logic for Kannada
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
            if (lower.includes('fail') || lower.includes('ವಿಫಲ')) aiMsg.innerHTML = "4G ಸಿಗ್ನಲ್‌ನಲ್ಲಿನ ಹಠಾತ್ ಕುಸಿತದಿಂದಾಗಿ ನಿಮ್ಮ ಪಾವತಿ ವಿಫಲವಾಗಿರುವ ಸಾಧ್ಯತೆಯಿದೆ. <b>ವೈಫೈ</b> ಗೆ ಬದಲಿಸುವುದು ಅಥವಾ ತೆರೆದ ಪ್ರದೇಶಕ್ಕೆ ಹೋಗುವುದು ಇದನ್ನು ಪರಿಹರಿಸುತ್ತದೆ.";
            else if (lower.includes('now') || lower.includes('can i') || lower.includes('ಈಗ')) aiMsg.innerHTML = "ಪ್ರಸ್ತುತ, 4G ಯಲ್ಲಿ ನಿಮ್ಮ ಅಪಾಯವು <b>ಮಧ್ಯಮ (67%)</b> ಆಗಿದೆ. ಮೊದಲು ವೈಫೈಗೆ ಬದಲಿಸುವುದು ಸುರಕ್ಷಿತವಾಗಿದೆ.";
            else aiMsg.innerHTML = "ನಾನು AI ಸ್ಮಾರ್ಟ್ ಸಲಹೆಗಾರ. ನಿಮ್ಮ ಪಾವತಿ ಯಶಸ್ಸನ್ನು ಸುಧಾರಿಸಲು, ಸ್ಥಿರವಾದ ವೈಫೈ ನೆಟ್‌ವರ್ಕ್‌ಗೆ ಸಂಪರ್ಕಿಸಲು ಅಥವಾ ಏರ್‌ಪ್ಲೇನ್ ಮೋಡ್ ಅನ್ನು ಆನ್-ಆಫ್ ಮಾಡಲು ಪ್ರಯತ್ನಿಸಿ.";
            body.appendChild(aiMsg);
            body.scrollTop = body.scrollHeight;
        }, 1000);
    };

    // Override Feedback submission for Kannada tips
    window.submitFeedbackNew = function () {
        if (!fbOutcome) return;
        document.getElementById('feedback-main').classList.add('hidden');
        document.getElementById('back-from-5').classList.add('hidden');
        const icons = { success: '🎉', failed: '😔', pending: '⏳' };
        document.getElementById('fb-thanks-icon').textContent = icons[fbOutcome];
        document.getElementById('fb-thanks-title').textContent = fbStar ? `${fbStar}★ ರೇಟಿಂಗ್ ನೀಡಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು!` : 'ನಿಮ್ಮ ಪ್ರತಿಕ್ರಿಯೆಗಾಗಿ ಧನ್ಯವಾದಗಳು!';
        document.getElementById('fb-thanks-tip').textContent = KANNADA_FEEDBACK_TIPS[fbOutcome];
        const card = document.getElementById('feedback-thanks-card');
        card.classList.remove('hidden');
        card.classList.add('fade-in');
        fbOutcome = null; fbStar = 0;
    };

    // Override obNext for Kannada final button text
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

    // Override drawGauge for Kannada canvas labels
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

    // Override renderBankCard for Kannada titles
    window.renderBankCard = function (bank, titleId, rowsId, overallId) {
        const titleEl = document.getElementById(titleId);
        const overallEl = document.getElementById(overallId);
        const rowsEl = document.getElementById(rowsId);

        if (titleEl) {
            const bankName = KANNADA_TRANSLATIONS[bank.name] || bank.name;
            titleEl.textContent = `${bankName} UPI ಸರ್ವರ್ ಸ್ಥಿತಿ`;
        }

        if (rowsEl) {
            rowsEl.innerHTML = bank.rows.map(r => {
                const label = KANNADA_TRANSLATIONS[r.label] || r.label;
                const status = KANNADA_TRANSLATIONS[r.status] || r.status;
                const ok = ['Online', 'Available', 'Active', 'ಆನ್‌ಲೈನ್', 'ಲಭ್ಯವಿದೆ', 'ಸಕ್ರಿಯವಾಗಿದೆ'].includes(r.status);
                return `<div class="bank-status-row">
                    <span class="bank-row-icon">${ok ? '✅' : '⚠️'}</span>
                    <span class="bank-row-label">${label}:</span>
                    <span class="bank-row-val ${ok ? 'bank-row-ok' : 'bank-row-warn'}">${status}</span>
                </div>`;
            }).join('');
        }

        if (overallEl) {
            const overallText = KANNADA_TRANSLATIONS[bank.overall] || bank.overall;
            overallEl.textContent = `ಸ್ಥಿತಿ: ${overallText}`;
            overallEl.className = `bank-overall-status ${bank.ok ? 'ok' : 'warn'}`;
        }
    };

    // Recursive function to translate text nodes
    function translateElement(el) {
        if (!el) return;

        // Handle specific elements by ID or class if needed
        if (el.classList && el.classList.contains('loc-name')) {
            const txt = el.textContent.trim();
            if (txt === 'Yadgiri') el.textContent = 'ಯಾದಗಿರಿ';
            if (txt === 'Bengaluru') el.textContent = 'ಬೆಂಗಳೂರು';
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

    console.log("Kannada translation applied successfully.");
}

window.applyKannadaTranslation = applyKannadaTranslation;
