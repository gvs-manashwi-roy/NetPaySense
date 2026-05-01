// ════════════════════════════════════════
// ── TRANSLATIONS ──
// ════════════════════════════════════════
const TRANSLATIONS = {
  en: {
    ob0_title: 'Welcome to NetPaySense',
    ob0_desc: 'Check network reliability and UPI payment success chances for any location — before you pay.',
    ob1_title: 'Smart Location Check',
    ob1_desc: 'Enter any location or use GPS to instantly get signal strength, UPI risk level, and bank server status.',
    ob2_title: '100% Private',
    ob2_desc: 'No data is sent to any server. Everything runs locally on your device. Your location stays yours.',
    ob_next: 'Next →',
    ob_skip: "Don't show again",
    ob_get_started: 'Get Started ✓',
    settings_title: 'Settings',
    profile_name: 'My Profile',
    profile_sub: 'NetPaySense User',
    edit_btn: 'Edit',
    section_language: 'Language',
    lang_label: 'App Language',
    lang_sub: 'Choose your preferred language',
    section_appearance: 'Appearance',
    dark_mode: 'Dark Mode',
    dark_mode_sub: 'Switch between light and dark',
    section_notifications: 'Notifications',
    notif_risk: 'Payment Risk Alerts',
    notif_risk_sub: 'Get notified on high risk',
    vibration: 'Vibration',
    vibration_sub: 'Haptic feedback on actions',
    section_privacy: 'Data & Privacy',
    clear_history: 'Clear Search History',
    clear_history_sub: 'Remove all recent checks',
    show_intro: 'Show App Intro',
    show_intro_sub: 'Replay the onboarding slides',
    privacy: 'Privacy',
    privacy_sub: 'All data stays on your device',
    local_badge: 'Local',
    section_about: 'About',
    app_version: 'App Version',
    rate_app: 'Rate the App',
    rate_app_sub: 'Tell us what you think',
    contact_support: 'Contact Support',
    contact_support_sub: 'Get help or report a bug',
    ai_title: 'AI Smart Advisor',
    ai_suggestions_title: '💡 Network Boosting Suggestions',
    ai_tip1: 'Move near a window to improve signal',
    ai_tip2: 'Turn Airplane mode ON and OFF',
    ai_tip3: 'Switch to WiFi to increase success by 25%',
    ai_greeting: 'Hi! Your payment risk is high right now. How can I assist you?',
    ai_q1: 'Why did my payment fail?',
    ai_q2: 'Can I make a payment now?',
    ai_placeholder: 'Voice Input... or type',
    header_sub: 'Network & UPI Checker',
    dash_title: '📊 My Network Dashboard',
    dash_sub: "Check your current location's network reliability",
    geo_btn: '📍 Get My Location',
    current_location: 'Current Location',
    fetching: 'Fetching location...',
    network_status: 'Network Status',
    signal: 'Signal',
    moderate: 'Moderate',
    latency: 'Latency',
    speed: 'Speed',
    payment_reliability: 'Payment Reliability',
    signal_history: 'Signal History',
    last_5: 'Last 5 checks',
    check_new_location: '🔍 Check New Location',
    check_bank_status: '🏦 Check Bank Status',
    smart_map: 'Smart Network Map',
    map_tip: 'Move 50m',
    map_tip_rest: 'Better network',
    bank_title: '🏦 Check Bank Server Status',
    bank_sub: 'Select a bank to view its live UPI server status',
    select_bank: 'Select Bank',
    choose_bank: 'Choose Bank',
    checker_title: 'Welcome to Network & UPI Checker',
    checker_sub: 'Check your network signal strength and UPI payment reliability for any location.',
    search_placeholder: 'Enter location (e.g. Koramangala…)',
    check_btn: 'Check',
    recently_checked: '🕐 Recently Checked',
    empty_state: 'Enter a location to get started',
    analyzing_title: 'Analyzing Network...',
    analyzing_sub: 'Please wait, this may take a few seconds',
    step1: 'Fetching location data...',
    step2: 'Fetching signal data...',
    step3: 'Analyzing signal strength...',
    step4: 'Predicting UPI success...',
    results_label: 'Results',
    location_detected: 'Location Detected',
    risk_meter_title: 'Payment Risk Meter',
    upi_success_chance: 'UPI Success Chance',
    recommendations: 'Recommendations',
    bank_server_status: 'Bank Server Status',
    back_btn: '← Back',
    feedback_btn: 'Feedback →',
    feedback_label: 'Feedback',
    fb_question: 'How did your payment go?',
    outcome_success: 'Successful',
    outcome_failed: 'Failed',
    outcome_pending: 'Pending',
    fb_reason: 'What went wrong?',
    chip_signal: 'Poor Signal',
    chip_timeout: 'Timeout',
    chip_bank: 'Bank Server Down',
    chip_upi: 'Wrong UPI ID',
    chip_other: 'Other',
    fb_rate: 'Rate your experience',
    submit_feedback: 'Submit Feedback',
    check_another: '🔄 Check Another Location',
    nav_home: 'Home',
    nav_map: 'Map',
    nav_banks: 'Banks',
    risk_low: 'Low Risk',
    risk_medium: 'Medium Risk',
    risk_high: 'High Risk',
    thanks_title_star: 'Thanks for the {n}★ rating!',
    thanks_title: 'Thank you for your feedback!',
    tip_success: '🎉 Great! Glad it went through. Keep checking signal before big payments.',
    tip_failed: '🙏 Sorry about that. Try switching to WiFi or moving to a better signal area.',
    tip_pending: '⏳ Pending payments usually resolve in 10–15 mins. Check your bank app.',
    ai_fail_reply: 'Your payment likely failed due to a sudden drop in 4G signal. Switching to <b>WiFi</b> or moving to an open area will resolve this.',
    ai_now_reply: 'Currently, your risk is <b>Moderate (67%)</b> on 4G. It\'s safer to switch to WiFi first.',
    ai_generic_reply: 'I am an AI Smart Advisor. To improve your payment success, try connecting to a stable WiFi network or toggling Airplane mode.',
    upi_server_status: 'UPI Server Status',
    status_prefix: 'Status: ',
    all_operational: 'All Services are Operational',
    minor_delays: 'Minor Delays Detected',
    upi_down: 'UPI Transactions Currently Down',
    upi_high: 'High',
    upi_medium: 'Medium',
    upi_low: 'Low',
    bank_sbi: 'State Bank of India (SBI)',
    bank_hdfc: 'HDFC Bank',
    bank_icici: 'ICICI Bank',
    bank_pnb: 'Punjab National Bank',
    bank_bob: 'Bank of Baroda',
    bank_canara: 'Canara Bank',
    bank_axis: 'Axis Bank',
    bank_union: 'Union Bank of India',
    bank_indian: 'Indian Bank',
    bank_boi: 'Bank of India',
  },

  kn: {
    ob0_title: 'NetPaySense ಗೆ ಸ್ವಾಗತ',
    ob0_desc: 'ಯಾವುದೇ ಸ್ಥಳಕ್ಕಾಗಿ ನೆಟ್‌ವರ್ಕ್ ವಿಶ್ವಾಸಾರ್ಹತೆ ಮತ್ತು UPI ಪಾವತಿ ಯಶಸ್ಸಿನ ಅವಕಾಶಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.',
    ob1_title: 'ಸ್ಮಾರ್ಟ್ ಲೊಕೇಶನ್ ಚೆಕ್',
    ob1_desc: 'ಯಾವುದೇ ಸ್ಥಳ ನಮೂದಿಸಿ ಅಥವಾ GPS ಬಳಸಿ ಸಿಗ್ನಲ್ ಶಕ್ತಿ, UPI ಅಪಾಯ ಮಟ್ಟ ತಿಳಿಯಿರಿ.',
    ob2_title: '100% ಖಾಸಗಿ',
    ob2_desc: 'ಯಾವುದೇ ಸರ್ವರ್‌ಗೆ ಡೇಟಾ ಕಳುಹಿಸಲಾಗುವುದಿಲ್ಲ. ಎಲ್ಲವೂ ನಿಮ್ಮ ಸಾಧನದಲ್ಲೇ ಉಳಿಯುತ್ತದೆ.',
    ob_next: 'ಮುಂದೆ →',
    ob_skip: 'ಮತ್ತೆ ತೋರಿಸಬೇಡ',
    ob_get_started: 'ಪ್ರಾರಂಭಿಸಿ ✓',
    settings_title: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    profile_name: 'ನನ್ನ ಪ್ರೊಫೈಲ್',
    profile_sub: 'NetPaySense ಬಳಕೆದಾರ',
    edit_btn: 'ಸಂಪಾದಿಸಿ',
    section_language: 'ಭಾಷೆ',
    lang_label: 'ಅಪ್ಲಿಕೇಶನ್ ಭಾಷೆ',
    lang_sub: 'ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆ ಆರಿಸಿ',
    section_appearance: 'ನೋಟ',
    dark_mode: 'ಡಾರ್ಕ್ ಮೋಡ್',
    dark_mode_sub: 'ಲೈಟ್ ಮತ್ತು ಡಾರ್ಕ್ ನಡುವೆ ಬದಲಾಯಿಸಿ',
    section_notifications: 'ಅಧಿಸೂಚನೆಗಳು',
    notif_risk: 'ಪಾವತಿ ಅಪಾಯ ಎಚ್ಚರಿಕೆಗಳು',
    notif_risk_sub: 'ಹೆಚ್ಚಿನ ಅಪಾಯದ ಸಂದರ್ಭದಲ್ಲಿ ತಿಳಿಸಿ',
    vibration: 'ಕಂಪನ',
    vibration_sub: 'ಕ್ರಿಯೆಗಳ ಮೇಲೆ ಸ್ಪರ್ಶ ಪ್ರತಿಕ್ರಿಯೆ',
    section_privacy: 'ಡೇಟಾ ಮತ್ತು ಗೌಪ್ಯತೆ',
    clear_history: 'ಹುಡುಕಾಟ ಇತಿಹಾಸ ತೆರವು',
    clear_history_sub: 'ಎಲ್ಲಾ ಇತ್ತೀಚಿನ ತಪಾಸಣೆಗಳನ್ನು ತೆಗೆದುಹಾಕಿ',
    show_intro: 'ಅಪ್ಲಿಕೇಶನ್ ಪರಿಚಯ ತೋರಿಸಿ',
    show_intro_sub: 'ಆನ್‌ಬೋರ್ಡಿಂಗ್ ಸ್ಲೈಡ್‌ಗಳನ್ನು ಮರುಪ್ಲೇ ಮಾಡಿ',
    privacy: 'ಗೌಪ್ಯತೆ',
    privacy_sub: 'ಎಲ್ಲಾ ಡೇಟಾ ನಿಮ್ಮ ಸಾಧನದಲ್ಲೇ ಉಳಿಯುತ್ತದೆ',
    local_badge: 'ಲೋಕಲ್',
    section_about: 'ಬಗ್ಗೆ',
    app_version: 'ಅಪ್ಲಿಕೇಶನ್ ಆವೃತ್ತಿ',
    rate_app: 'ಅಪ್ಲಿಕೇಶನ್ ರೇಟ್ ಮಾಡಿ',
    rate_app_sub: 'ನಿಮ್ಮ ಅಭಿಪ್ರಾಯ ತಿಳಿಸಿ',
    contact_support: 'ಬೆಂಬಲ ಸಂಪರ್ಕ',
    contact_support_sub: 'ಸಹಾಯ ಪಡೆಯಿರಿ ಅಥವಾ ದೋಷ ವರದಿ ಮಾಡಿ',
    ai_title: 'AI ಸ್ಮಾರ್ಟ್ ಸಲಹೆಗಾರ',
    ai_suggestions_title: '💡 ನೆಟ್‌ವರ್ಕ್ ಸುಧಾರಣಾ ಸಲಹೆಗಳು',
    ai_tip1: 'ಸಿಗ್ನಲ್ ಸುಧಾರಿಸಲು ಕಿಟಕಿ ಬಳಿ ಹೋಗಿ',
    ai_tip2: 'ಏರ್‌ಪ್ಲೇನ್ ಮೋಡ್ ಆನ್/ಆಫ್ ಮಾಡಿ',
    ai_tip3: 'WiFi ಗೆ ಬದಲಿಸಿ - 25% ಯಶಸ್ಸು ಹೆಚ್ಚು',
    ai_greeting: 'ನಮಸ್ಕಾರ! ನಿಮ್ಮ ಪಾವತಿ ಅಪಾಯ ಈಗ ಹೆಚ್ಚಿದೆ. ನಾನು ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?',
    ai_q1: 'ನನ್ನ ಪಾವತಿ ಏಕೆ ವಿಫಲವಾಯಿತು?',
    ai_q2: 'ಈಗ ಪಾವತಿ ಮಾಡಬಹುದೇ?',
    ai_placeholder: 'ಧ್ವನಿ ಇನ್‌ಪುಟ್... ಅಥವಾ ಟೈಪ್ ಮಾಡಿ',
    header_sub: 'ನೆಟ್‌ವರ್ಕ್ & UPI ಪರೀಕ್ಷಕ',
    dash_title: '📊 ನನ್ನ ನೆಟ್‌ವರ್ಕ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    dash_sub: 'ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಸ್ಥಳದ ನೆಟ್‌ವರ್ಕ್ ವಿಶ್ವಾಸಾರ್ಹತೆ ಪರಿಶೀಲಿಸಿ',
    geo_btn: '📍 ನನ್ನ ಸ್ಥಳ ಪಡೆಯಿರಿ',
    current_location: 'ಪ್ರಸ್ತುತ ಸ್ಥಳ',
    fetching: 'ಸ್ಥಳ ಪಡೆಯಲಾಗುತ್ತಿದೆ...',
    network_status: 'ನೆಟ್‌ವರ್ಕ್ ಸ್ಥಿತಿ',
    signal: 'ಸಿಗ್ನಲ್',
    moderate: 'ಮಧ್ಯಮ',
    latency: 'ಲೇಟೆನ್ಸಿ',
    speed: 'ವೇಗ',
    payment_reliability: 'ಪಾವತಿ ವಿಶ್ವಾಸಾರ್ಹತೆ',
    signal_history: 'ಸಿಗ್ನಲ್ ಇತಿಹಾಸ',
    last_5: 'ಕೊನೆಯ 5 ತಪಾಸಣೆಗಳು',
    check_new_location: '🔍 ಹೊಸ ಸ್ಥಳ ಪರಿಶೀಲಿಸಿ',
    check_bank_status: '🏦 ಬ್ಯಾಂಕ್ ಸ್ಥಿತಿ ತಿಳಿಯಿರಿ',
    smart_map: 'ಸ್ಮಾರ್ಟ್ ನೆಟ್‌ವರ್ಕ್ ನಕ್ಷೆ',
    map_tip: '50 ಮೀ ಸರಿಯಿರಿ',
    map_tip_rest: 'ಉತ್ತಮ ನೆಟ್‌ವರ್ಕ್',
    bank_title: '🏦 ಬ್ಯಾಂಕ್ ಸರ್ವರ್ ಸ್ಥಿತಿ ತಿಳಿಯಿರಿ',
    bank_sub: 'ಲೈವ್ UPI ಸರ್ವರ್ ಸ್ಥಿತಿ ನೋಡಲು ಬ್ಯಾಂಕ್ ಆರಿಸಿ',
    select_bank: 'ಬ್ಯಾಂಕ್ ಆರಿಸಿ',
    choose_bank: 'ಬ್ಯಾಂಕ್ ಆರಿಸಿ',
    checker_title: 'ನೆಟ್‌ವರ್ಕ್ & UPI ಪರೀಕ್ಷಕಕ್ಕೆ ಸ್ವಾಗತ',
    checker_sub: 'ಯಾವುದೇ ಸ್ಥಳಕ್ಕಾಗಿ ನೆಟ್‌ವರ್ಕ್ ಸಿಗ್ನಲ್ ಮತ್ತು UPI ವಿಶ್ವಾಸಾರ್ಹತೆ ಪರಿಶೀಲಿಸಿ.',
    search_placeholder: 'ಸ್ಥಳ ನಮೂದಿಸಿ (ಉದಾ. ಕೋರಮಂಗಲ…)',
    check_btn: 'ಪರಿಶೀಲಿಸಿ',
    recently_checked: '🕐 ಇತ್ತೀಚಿನ ತಪಾಸಣೆಗಳು',
    empty_state: 'ಪ್ರಾರಂಭಿಸಲು ಸ್ಥಳ ನಮೂದಿಸಿ',
    analyzing_title: 'ನೆಟ್‌ವರ್ಕ್ ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...',
    analyzing_sub: 'ದಯವಿಟ್ಟು ನಿರೀಕ್ಷಿಸಿ, ಸ್ವಲ್ಪ ಸಮಯ ತೆಗೆದುಕೊಳ್ಳಬಹುದು',
    step1: 'ಸ್ಥಳ ಡೇಟಾ ಪಡೆಯಲಾಗುತ್ತಿದೆ...',
    step2: 'ಸಿಗ್ನಲ್ ಡೇಟಾ ಪಡೆಯಲಾಗುತ್ತಿದೆ...',
    step3: 'ಸಿಗ್ನಲ್ ಶಕ್ತಿ ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...',
    step4: 'UPI ಯಶಸ್ಸು ಅಂದಾಜಿಸಲಾಗುತ್ತಿದೆ...',
    results_label: 'ಫಲಿತಾಂಶಗಳು',
    location_detected: 'ಸ್ಥಳ ಪತ್ತೆಯಾಗಿದೆ',
    risk_meter_title: 'ಪಾವತಿ ಅಪಾಯ ಮೀಟರ್',
    upi_success_chance: 'UPI ಯಶಸ್ಸಿನ ಅವಕಾಶ',
    recommendations: 'ಶಿಫಾರಸುಗಳು',
    bank_server_status: 'ಬ್ಯಾಂಕ್ ಸರ್ವರ್ ಸ್ಥಿತಿ',
    back_btn: '← ಹಿಂದೆ',
    feedback_btn: 'ಪ್ರತಿಕ್ರಿಯೆ →',
    feedback_label: 'ಪ್ರತಿಕ್ರಿಯೆ',
    fb_question: 'ನಿಮ್ಮ ಪಾವತಿ ಹೇಗೆ ಆಯಿತು?',
    outcome_success: 'ಯಶಸ್ವಿ',
    outcome_failed: 'ವಿಫಲ',
    outcome_pending: 'ಬಾಕಿ',
    fb_reason: 'ಏನು ತಪ್ಪಾಯಿತು?',
    chip_signal: 'ಕಳಪೆ ಸಿಗ್ನಲ್',
    chip_timeout: 'ಟೈಮ್‌ಔಟ್',
    chip_bank: 'ಬ್ಯಾಂಕ್ ಸರ್ವರ್ ಡೌನ್',
    chip_upi: 'ತಪ್ಪು UPI ID',
    chip_other: 'ಇತರೆ',
    fb_rate: 'ನಿಮ್ಮ ಅನುಭವ ರೇಟ್ ಮಾಡಿ',
    submit_feedback: 'ಪ್ರತಿಕ್ರಿಯೆ ಸಲ್ಲಿಸಿ',
    check_another: '🔄 ಇನ್ನೊಂದು ಸ್ಥಳ ಪರಿಶೀಲಿಸಿ',
    nav_home: 'ಮುಖಪುಟ',
    nav_map: 'ನಕ್ಷೆ',
    nav_banks: 'ಬ್ಯಾಂಕ್‌ಗಳು',
    risk_low: 'ಕಡಿಮೆ ಅಪಾಯ',
    risk_medium: 'ಮಧ್ಯಮ ಅಪಾಯ',
    risk_high: 'ಹೆಚ್ಚಿನ ಅಪಾಯ',
    thanks_title_star: '{n}★ ರೇಟಿಂಗ್‌ಗೆ ಧನ್ಯವಾದ!',
    thanks_title: 'ನಿಮ್ಮ ಪ್ರತಿಕ್ರಿಯೆಗೆ ಧನ್ಯವಾದ!',
    tip_success: '🎉 ಚೆನ್ನಾಗಿ ಆಯಿತು! ದೊಡ್ಡ ಪಾವತಿಗಳ ಮೊದಲು ಸಿಗ್ನಲ್ ಪರಿಶೀಲಿಸಿ.',
    tip_failed: '🙏 ಕ್ಷಮಿಸಿ. WiFi ಗೆ ಬದಲಿಸಿ ಅಥವಾ ಉತ್ತಮ ಸಿಗ್ನಲ್ ಪ್ರದೇಶಕ್ಕೆ ಹೋಗಿ.',
    tip_pending: '⏳ ಬಾಕಿ ಪಾವತಿಗಳು 10-15 ನಿಮಿಷಗಳಲ್ಲಿ ಸ್ಪಷ್ಟವಾಗುತ್ತವೆ. ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಅಪ್ಲಿಕೇಶನ್ ಪರಿಶೀಲಿಸಿ.',
    ai_fail_reply: 'ನಿಮ್ಮ ಪಾವತಿ 4G ಸಿಗ್ನಲ್ ಕುಸಿತದಿಂದ ವಿಫಲವಾಗಿರಬಹುದು. <b>WiFi</b> ಗೆ ಬದಲಿಸಿ ಅಥವಾ ತೆರೆದ ಪ್ರದೇಶಕ್ಕೆ ಹೋಗಿ.',
    ai_now_reply: 'ಈಗ ನಿಮ್ಮ ಅಪಾಯ <b>ಮಧ್ಯಮ (67%)</b> 4G ನಲ್ಲಿ. ಮೊದಲು WiFi ಗೆ ಬದಲಿಸಿ.',
    ai_generic_reply: 'ನಾನು AI ಸ್ಮಾರ್ಟ್ ಸಲಹೆಗಾರ. ಪಾವತಿ ಯಶಸ್ಸು ಹೆಚ್ಚಿಸಲು ಸ್ಥಿರ WiFi ಗೆ ಸಂಪರ್ಕಿಸಿ ಅಥವಾ ಏರ್‌ಪ್ಲೇನ್ ಮೋಡ್ ಬದಲಾಯಿಸಿ.',
    upi_server_status: 'UPI ಸರ್ವರ್ ಸ್ಥಿತಿ',
    status_prefix: 'ಸ್ಥಿತಿ: ',
    all_operational: 'ಎಲ್ಲಾ ಸೇವೆಗಳು ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿವೆ',
    minor_delays: 'ಸಣ್ಣ ವಿಳಂಬಗಳು ಪತ್ತೆಯಾಗಿವೆ',
    upi_down: 'UPI ವ್ಯವಹಾರಗಳು ಪ್ರಸ್ತುತ ಲಭ್ಯವಿಲ್ಲ',
    upi_high: 'ಹೆಚ್ಚು',
    upi_medium: 'ಮಧ್ಯಮ',
    upi_low: 'ಕಡಿಮೆ',
    bank_sbi: 'ಭಾರತೀಯ ಸ್ಟೇಟ್ ಬ್ಯಾಂಕ್ (SBI)',
    bank_hdfc: 'HDFC ಬ್ಯಾಂಕ್',
    bank_icici: 'ICICI ಬ್ಯಾಂಕ್',
    bank_pnb: 'ಪಂಜಾಬ್ ನ್ಯಾಷನಲ್ ಬ್ಯಾಂಕ್',
    bank_bob: 'ಬ್ಯಾಂಕ್ ಆಫ್ ಬರೋಡಾ',
    bank_canara: 'ಕೆನರಾ ಬ್ಯಾಂಕ್',
    bank_axis: 'ಆಕ್ಸಿಸ್ ಬ್ಯಾಂಕ್',
    bank_union: 'ಯೂನಿಯನ್ ಬ್ಯಾಂಕ್ ಆಫ್ ಇಂಡಿಯಾ',
    bank_indian: 'ಇಂಡಿಯನ್ ಬ್ಯಾಂಕ್',
    bank_boi: 'ಬ್ಯಾಂಕ್ ಆಫ್ ಇಂಡಿಯಾ',
  },

  ta: {
    ob0_title: 'NetPaySense-க்கு வரவேற்கிறோம்',
    ob0_desc: 'எந்த இடத்திலும் நெட்வொர்க் நம்பகத்தன்மை மற்றும் UPI கட்டண வெற்றி வாய்ப்புகளை சரிபார்க்கவும்.',
    ob1_title: 'ஸ்மார்ட் இட சரிபார்ப்பு',
    ob1_desc: 'எந்த இடத்தையும் உள்ளிடுங்கள் அல்லது GPS பயன்படுத்தி சிக்னல் வலிமை மற்றும் UPI அபாய நிலையை அறியுங்கள்.',
    ob2_title: '100% தனியுரிமை',
    ob2_desc: 'எந்த சேவையகத்திலும் தரவு அனுப்பப்படவில்லை. அனைத்தும் உங்கள் சாதனத்திலேயே இயங்குகிறது.',
    ob_next: 'அடுத்து →',
    ob_skip: 'மீண்டும் காட்டாதே',
    ob_get_started: 'தொடங்கு ✓',
    settings_title: 'அமைப்புகள்',
    profile_name: 'என் சுயவிவரம்',
    profile_sub: 'NetPaySense பயனர்',
    edit_btn: 'திருத்து',
    section_language: 'மொழி',
    lang_label: 'பயன்பாட்டு மொழி',
    lang_sub: 'உங்கள் விருப்பமான மொழியை தேர்வு செய்யுங்கள்',
    section_appearance: 'தோற்றம்',
    dark_mode: 'இருண்ட பயன்முறை',
    dark_mode_sub: 'ஒளி மற்றும் இருள் இடையே மாற்றவும்',
    section_notifications: 'அறிவிப்புகள்',
    notif_risk: 'கட்டண அபாய எச்சரிக்கைகள்',
    notif_risk_sub: 'அதிக ஆபத்தில் தெரிவிக்கவும்',
    vibration: 'அதிர்வு',
    vibration_sub: 'செயல்களில் தொட்டுணர் கருத்து',
    section_privacy: 'தரவு & தனியுரிமை',
    clear_history: 'தேடல் வரலாற்றை அழி',
    clear_history_sub: 'அனைத்து சமீபத்திய சரிபார்ப்புகளை அகற்றவும்',
    show_intro: 'பயன்பாட்டு அறிமுகம் காட்டு',
    show_intro_sub: 'ஆன்போர்டிங் ஸ்லைடுகளை மீண்டும் பார்க்கவும்',
    privacy: 'தனியுரிமை',
    privacy_sub: 'அனைத்து தரவும் உங்கள் சாதனத்திலேயே உள்ளது',
    local_badge: 'உள்ளூர்',
    section_about: 'பற்றி',
    app_version: 'பயன்பாட்டு பதிப்பு',
    rate_app: 'பயன்பாட்டை மதிப்பிடுங்கள்',
    rate_app_sub: 'உங்கள் கருத்தை தெரிவியுங்கள்',
    contact_support: 'ஆதரவை தொடர்பு கொள்ளுங்கள்',
    contact_support_sub: 'உதவி பெறுங்கள் அல்லது பிழையை அறிவிக்கவும்',
    ai_title: 'AI ஸ்மார்ட் ஆலோசகர்',
    ai_suggestions_title: '💡 நெட்வொர்க் மேம்பாட்டு ஆலோசனைகள்',
    ai_tip1: 'சிக்னலை மேம்படுத்த சாளரத்திற்கு அருகில் செல்லுங்கள்',
    ai_tip2: 'விமான முறையை இயக்கி மீண்டும் அணைக்கவும்',
    ai_tip3: 'WiFi-க்கு மாறுங்கள் - 25% அதிக வெற்றி',
    ai_greeting: 'வணக்கம்! உங்கள் கட்டண ஆபத்து இப்போது அதிகமாக உள்ளது. நான் எப்படி உதவலாம்?',
    ai_q1: 'என் கட்டணம் ஏன் தோல்வியடைந்தது?',
    ai_q2: 'இப்போது கட்டணம் செலுத்த முடியுமா?',
    ai_placeholder: 'குரல் உள்ளீடு... அல்லது தட்டச்சு செய்யுங்கள்',
    header_sub: 'நெட்வொர்க் & UPI சரிபார்ப்பாளர்',
    dash_title: '📊 என் நெட்வொர்க் டாஷ்போர்டு',
    dash_sub: 'உங்கள் தற்போதைய இடத்தின் நெட்வொர்க் நம்பகத்தன்மையை சரிபார்க்கவும்',
    geo_btn: '📍 என் இடத்தை பெறுங்கள்',
    current_location: 'தற்போதைய இடம்',
    fetching: 'இடத்தை பெறுகிறது...',
    network_status: 'நெட்வொர்க் நிலை',
    signal: 'சிக்னல்',
    moderate: 'மிதமான',
    latency: 'தாமதம்',
    speed: 'வேகம்',
    payment_reliability: 'கட்டண நம்பகத்தன்மை',
    signal_history: 'சிக்னல் வரலாறு',
    last_5: 'கடைசி 5 சரிபார்ப்புகள்',
    check_new_location: '🔍 புதிய இடத்தை சரிபார்க்கவும்',
    check_bank_status: '🏦 வங்கி நிலையை சரிபார்க்கவும்',
    smart_map: 'ஸ்மார்ட் நெட்வொர்க் வரைபடம்',
    map_tip: '50 மீட்டர் நகரவும்',
    map_tip_rest: 'சிறந்த நெட்வொர்க்',
    bank_title: '🏦 வங்கி சேவையக நிலையை சரிபார்க்கவும்',
    bank_sub: 'நேரடி UPI சேவையக நிலையை பார்க்க வங்கியை தேர்வு செய்யுங்கள்',
    select_bank: 'வங்கியை தேர்ந்தெடுங்கள்',
    choose_bank: 'வங்கியை தேர்ந்தெடுங்கள்',
    checker_title: 'நெட்வொர்க் & UPI சரிபார்ப்பாளருக்கு வரவேற்கிறோம்',
    checker_sub: 'எந்த இடத்திற்கும் நெட்வொர்க் சிக்னல் வலிமை மற்றும் UPI நம்பகத்தன்மையை சரிபார்க்கவும்.',
    search_placeholder: 'இடத்தை உள்ளிடுங்கள் (எ.கா. கோரமங்கலா…)',
    check_btn: 'சரிபார்',
    recently_checked: '🕐 சமீபத்தில் சரிபார்க்கப்பட்டவை',
    empty_state: 'தொடங்க ஒரு இடத்தை உள்ளிடுங்கள்',
    analyzing_title: 'நெட்வொர்க் பகுப்பாய்வு செய்கிறது...',
    analyzing_sub: 'சற்று காத்திருங்கள், இது சில நொடிகள் ஆகலாம்',
    step1: 'இட தரவை பெறுகிறது...',
    step2: 'சிக்னல் தரவை பெறுகிறது...',
    step3: 'சிக்னல் வலிமையை பகுப்பாய்வு செய்கிறது...',
    step4: 'UPI வெற்றியை கணிக்கிறது...',
    results_label: 'முடிவுகள்',
    location_detected: 'இடம் கண்டறியப்பட்டது',
    risk_meter_title: 'கட்டண ஆபத்து மீட்டர்',
    upi_success_chance: 'UPI வெற்றி வாய்ப்பு',
    recommendations: 'பரிந்துரைகள்',
    bank_server_status: 'வங்கி சேவையக நிலை',
    back_btn: '← பின்',
    feedback_btn: 'கருத்து →',
    feedback_label: 'கருத்து',
    fb_question: 'உங்கள் கட்டணம் எவ்வாறு சென்றது?',
    outcome_success: 'வெற்றிகரமாக',
    outcome_failed: 'தோல்வி',
    outcome_pending: 'நிலுவையில்',
    fb_reason: 'என்ன தவறாக நடந்தது?',
    chip_signal: 'மோசமான சிக்னல்',
    chip_timeout: 'நேர முடிவு',
    chip_bank: 'வங்கி சேவையகம் செயலிழந்தது',
    chip_upi: 'தவறான UPI ID',
    chip_other: 'மற்றவை',
    fb_rate: 'உங்கள் அனுபவத்தை மதிப்பிடுங்கள்',
    submit_feedback: 'கருத்தை சமர்ப்பிக்கவும்',
    check_another: '🔄 மற்றொரு இடத்தை சரிபார்க்கவும்',
    nav_home: 'முகப்பு',
    nav_map: 'வரைபடம்',
    nav_banks: 'வங்கிகள்',
    risk_low: 'குறைந்த ஆபத்து',
    risk_medium: 'மிதமான ஆபத்து',
    risk_high: 'அதிக ஆபத்து',
    thanks_title_star: '{n}★ மதிப்பீட்டிற்கு நன்றி!',
    thanks_title: 'உங்கள் கருத்திற்கு நன்றி!',
    tip_success: '🎉 நலம்! பெரிய கட்டணங்களுக்கு முன் சிக்னலை சரிபார்க்கவும்.',
    tip_failed: '🙏 மன்னிக்கவும். WiFi-க்கு மாறுங்கள் அல்லது சிறந்த சிக்னல் பகுதிக்கு செல்லுங்கள்.',
    tip_pending: '⏳ நிலுவையிலுள்ள கட்டணங்கள் 10-15 நிமிடங்களில் தீர்க்கப்படும். உங்கள் வங்கி ஆப்பை சரிபார்க்கவும்.',
    ai_fail_reply: 'உங்கள் கட்டணம் 4G சிக்னல் சரிவால் தோல்வியடைந்திருக்கலாம். <b>WiFi</b>-க்கு மாறுங்கள் அல்லது திறந்த வெளிக்கு செல்லுங்கள்.',
    ai_now_reply: 'தற்போது உங்கள் ஆபத்து 4G-ல் <b>மிதமான (67%)</b>. முதலில் WiFi-க்கு மாறுங்கள்.',
    ai_generic_reply: 'நான் AI ஸ்மார்ட் ஆலோசகர். கட்டண வெற்றியை மேம்படுத்த நிலையான WiFi-ஐ இணைக்கவும் அல்லது விமான முறையை மாற்றவும்.',
    upi_server_status: 'UPI சேவையக நிலை',
    status_prefix: 'நிலை: ',
    all_operational: 'அனைத்து சேவைகளும் இயங்குகின்றன',
    minor_delays: 'சிறிய தாமதங்கள் கண்டறியப்பட்டன',
    upi_down: 'UPI பரிவர்த்தனைகள் தற்போது செயல்படவில்லை',
    upi_high: 'அதிகம்',
    upi_medium: 'மிதமான',
    upi_low: 'குறைவு',
    bank_sbi: 'இந்திய ஸ்டேட் வங்கி (SBI)',
    bank_hdfc: 'HDFC வங்கி',
    bank_icici: 'ICICI வங்கி',
    bank_pnb: 'பஞ்சாப் நேஷனல் வங்கி',
    bank_bob: 'பரோடா வங்கி',
    bank_canara: 'கனரா வங்கி',
    bank_axis: 'ஆக்சிஸ் வங்கி',
    bank_union: 'யூனியன் வங்கி இந்தியா',
    bank_indian: 'இந்தியன் வங்கி',
    bank_boi: 'இந்தியா வங்கி',
  },

  hi: {
    ob0_title: 'NetPaySense में आपका स्वागत है',
    ob0_desc: 'किसी भी स्थान के लिए नेटवर्क विश्वसनीयता और UPI भुगतान सफलता की संभावनाएं जांचें।',
    ob1_title: 'स्मार्ट लोकेशन चेक',
    ob1_desc: 'कोई भी स्थान दर्ज करें या GPS का उपयोग करें — सिग्नल शक्ति, UPI जोखिम स्तर और बैंक सर्वर स्थिति जानें।',
    ob2_title: '100% निजी',
    ob2_desc: 'कोई डेटा किसी सर्वर को नहीं भेजा जाता। सब कुछ आपके डिवाइस पर ही चलता है।',
    ob_next: 'आगे →',
    ob_skip: 'दोबारा मत दिखाओ',
    ob_get_started: 'शुरू करें ✓',
    settings_title: 'सेटिंग्स',
    profile_name: 'मेरी प्रोफ़ाइल',
    profile_sub: 'NetPaySense उपयोगकर्ता',
    edit_btn: 'संपादित करें',
    section_language: 'भाषा',
    lang_label: 'ऐप भाषा',
    lang_sub: 'अपनी पसंदीदा भाषा चुनें',
    section_appearance: 'दिखावट',
    dark_mode: 'डार्क मोड',
    dark_mode_sub: 'लाइट और डार्क के बीच स्विच करें',
    section_notifications: 'सूचनाएं',
    notif_risk: 'भुगतान जोखिम अलर्ट',
    notif_risk_sub: 'उच्च जोखिम पर सूचित करें',
    vibration: 'कंपन',
    vibration_sub: 'क्रियाओं पर स्पर्श प्रतिक्रिया',
    section_privacy: 'डेटा और गोपनीयता',
    clear_history: 'खोज इतिहास साफ़ करें',
    clear_history_sub: 'सभी हालिया जांच हटाएं',
    show_intro: 'ऐप परिचय दिखाएं',
    show_intro_sub: 'ऑनबोर्डिंग स्लाइड्स फिर से देखें',
    privacy: 'गोपनीयता',
    privacy_sub: 'सभी डेटा आपके डिवाइस पर रहता है',
    local_badge: 'लोकल',
    section_about: 'के बारे में',
    app_version: 'ऐप संस्करण',
    rate_app: 'ऐप को रेट करें',
    rate_app_sub: 'हमें बताएं आपकी राय',
    contact_support: 'सहायता से संपर्क करें',
    contact_support_sub: 'सहायता प्राप्त करें या बग रिपोर्ट करें',
    ai_title: 'AI स्मार्ट सलाहकार',
    ai_suggestions_title: '💡 नेटवर्क बूस्टिंग सुझाव',
    ai_tip1: 'सिग्नल बेहतर करने के लिए खिड़की के पास जाएं',
    ai_tip2: 'एयरप्लेन मोड ON और OFF करें',
    ai_tip3: 'WiFi पर स्विच करें — 25% अधिक सफलता',
    ai_greeting: 'नमस्ते! आपका भुगतान जोखिम अभी अधिक है। मैं कैसे मदद करूं?',
    ai_q1: 'मेरा भुगतान क्यों विफल हुआ?',
    ai_q2: 'क्या मैं अभी भुगतान कर सकता हूं?',
    ai_placeholder: 'वॉइस इनपुट... या टाइप करें',
    header_sub: 'नेटवर्क & UPI जांचकर्ता',
    dash_title: '📊 मेरा नेटवर्क डैशबोर्ड',
    dash_sub: 'अपनी वर्तमान स्थान की नेटवर्क विश्वसनीयता जांचें',
    geo_btn: '📍 मेरी लोकेशन पाएं',
    current_location: 'वर्तमान स्थान',
    fetching: 'स्थान प्राप्त हो रहा है...',
    network_status: 'नेटवर्क स्थिति',
    signal: 'सिग्नल',
    moderate: 'मध्यम',
    latency: 'लेटेंसी',
    speed: 'गति',
    payment_reliability: 'भुगतान विश्वसनीयता',
    signal_history: 'सिग्नल इतिहास',
    last_5: 'अंतिम 5 जांच',
    check_new_location: '🔍 नई लोकेशन जांचें',
    check_bank_status: '🏦 बैंक स्थिति जांचें',
    smart_map: 'स्मार्ट नेटवर्क मानचित्र',
    map_tip: '50 मी चलें',
    map_tip_rest: 'बेहतर नेटवर्क',
    bank_title: '🏦 बैंक सर्वर स्थिति जांचें',
    bank_sub: 'लाइव UPI सर्वर स्थिति देखने के लिए बैंक चुनें',
    select_bank: 'बैंक चुनें',
    choose_bank: 'बैंक चुनें',
    checker_title: 'नेटवर्क & UPI जांचकर्ता में आपका स्वागत है',
    checker_sub: 'किसी भी स्थान के लिए नेटवर्क सिग्नल शक्ति और UPI विश्वसनीयता जांचें।',
    search_placeholder: 'स्थान दर्ज करें (जैसे कोरमंगला…)',
    check_btn: 'जांचें',
    recently_checked: '🕐 हाल ही में जांचे गए',
    empty_state: 'शुरू करने के लिए कोई स्थान दर्ज करें',
    analyzing_title: 'नेटवर्क का विश्लेषण हो रहा है...',
    analyzing_sub: 'कृपया प्रतीक्षा करें, इसमें कुछ सेकंड लग सकते हैं',
    step1: 'स्थान डेटा प्राप्त हो रहा है...',
    step2: 'सिग्नल डेटा प्राप्त हो रहा है...',
    step3: 'सिग्नल शक्ति का विश्लेषण हो रहा है...',
    step4: 'UPI सफलता का अनुमान लग रहा है...',
    results_label: 'परिणाम',
    location_detected: 'स्थान पहचाना गया',
    risk_meter_title: 'भुगतान जोखिम मीटर',
    upi_success_chance: 'UPI सफलता की संभावना',
    recommendations: 'सुझाव',
    bank_server_status: 'बैंक सर्वर स्थिति',
    back_btn: '← वापस',
    feedback_btn: 'प्रतिक्रिया →',
    feedback_label: 'प्रतिक्रिया',
    fb_question: 'आपका भुगतान कैसा रहा?',
    outcome_success: 'सफल',
    outcome_failed: 'विफल',
    outcome_pending: 'लंबित',
    fb_reason: 'क्या गलत हुआ?',
    chip_signal: 'खराब सिग्नल',
    chip_timeout: 'टाइमआउट',
    chip_bank: 'बैंक सर्वर डाउन',
    chip_upi: 'गलत UPI ID',
    chip_other: 'अन्य',
    fb_rate: 'अपना अनुभव रेट करें',
    submit_feedback: 'प्रतिक्रिया सबमिट करें',
    check_another: '🔄 दूसरी लोकेशन जांचें',
    nav_home: 'होम',
    nav_map: 'मानचित्र',
    nav_banks: 'बैंक',
    risk_low: 'कम जोखिम',
    risk_medium: 'मध्यम जोखिम',
    risk_high: 'उच्च जोखिम',
    thanks_title_star: '{n}★ रेटिंग के लिए धन्यवाद!',
    thanks_title: 'आपकी प्रतिक्रिया के लिए धन्यवाद!',
    tip_success: '🎉 बढ़िया! बड़े भुगतानों से पहले सिग्नल जांचते रहें।',
    tip_failed: '🙏 खेद है। WiFi पर स्विच करें या बेहतर सिग्नल वाले क्षेत्र में जाएं।',
    tip_pending: '⏳ लंबित भुगतान आमतौर पर 10-15 मिनट में हल हो जाते हैं। अपना बैंक ऐप जांचें।',
    ai_fail_reply: 'आपका भुगतान 4G सिग्नल गिरावट के कारण विफल हुआ होगा। <b>WiFi</b> पर स्विच करें या खुले क्षेत्र में जाएं।',
    ai_now_reply: 'अभी आपका जोखिम 4G पर <b>मध्यम (67%)</b> है। पहले WiFi पर स्विच करना सुरक्षित है।',
    ai_generic_reply: 'मैं AI स्मार्ट सलाहकार हूं। भुगतान सफलता बढ़ाने के लिए स्थिर WiFi से जुड़ें या एयरप्लेन मोड टॉगल करें।',
    upi_server_status: 'UPI सर्वर स्थिति',
    status_prefix: 'स्थिति: ',
    all_operational: 'सभी सेवाएं कार्यरत हैं',
    minor_delays: 'मामूली देरी पाई गई',
    upi_down: 'UPI लेनदेन वर्तमान में बंद है',
    upi_high: 'उच्च',
    upi_medium: 'मध्यम',
    upi_low: 'निम्न',
    bank_sbi: 'भारतीय स्टेट बैंक (SBI)',
    bank_hdfc: 'HDFC बैंक',
    bank_icici: 'ICICI बैंक',
    bank_pnb: 'पंजाब नेशनल बैंक',
    bank_bob: 'बैंक ऑफ बड़ौदा',
    bank_canara: 'केनरा बैंक',
    bank_axis: 'एक्सिस बैंक',
    bank_union: 'यूनियन बैंक ऑफ इंडिया',
    bank_indian: 'इंडियन बैंक',
    bank_boi: 'बैंक ऑफ इंडिया',
  },

  te: {
    ob0_title: 'NetPaySense కి స్వాగతం',
    ob0_desc: 'ఏ స్థానానికైనా నెట్‌వర్క్ విశ్వసనీయత మరియు UPI చెల్లింపు విజయ అవకాశాలను తనిఖీ చేయండి.',
    ob1_title: 'స్మార్ట్ లొకేషన్ చెక్',
    ob1_desc: 'ఏ స్థానాన్నైనా నమోదు చేయండి లేదా GPS ఉపయోగించి సిగ్నల్ బలం, UPI ప్రమాద స్థాయి తెలుసుకోండి.',
    ob2_title: '100% ప్రైవేట్',
    ob2_desc: 'ఏ సర్వర్‌కూ డేటా పంపబడదు. అన్నీ మీ పరికరంలోనే నడుస్తాయి.',
    ob_next: 'తదుపరి →',
    ob_skip: 'మళ్ళీ చూపించవద్దు',
    ob_get_started: 'ప్రారంభించండి ✓',
    settings_title: 'సెట్టింగులు',
    profile_name: 'నా ప్రొఫైల్',
    profile_sub: 'NetPaySense వినియోగదారు',
    edit_btn: 'సవరించు',
    section_language: 'భాష',
    lang_label: 'యాప్ భాష',
    lang_sub: 'మీకు నచ్చిన భాషను ఎంచుకోండి',
    section_appearance: 'రూపం',
    dark_mode: 'డార్క్ మోడ్',
    dark_mode_sub: 'లైట్ మరియు డార్క్ మధ్య మారండి',
    section_notifications: 'నోటిఫికేషన్లు',
    notif_risk: 'చెల్లింపు ప్రమాద హెచ్చరికలు',
    notif_risk_sub: 'అధిక ప్రమాదంలో తెలియజేయండి',
    vibration: 'వైబ్రేషన్',
    vibration_sub: 'చర్యలకు స్పర్శ అభిప్రాయం',
    section_privacy: 'డేటా & గోపనీయత',
    clear_history: 'శోధన చరిత్రను తొలగించు',
    clear_history_sub: 'అన్ని ఇటీవలి తనిఖీలను తీసివేయండి',
    show_intro: 'యాప్ పరిచయం చూపించు',
    show_intro_sub: 'ఆన్‌బోర్డింగ్ స్లైడ్‌లను మళ్ళీ చూడండి',
    privacy: 'గోపనీయత',
    privacy_sub: 'అన్ని డేటా మీ పరికరంలోనే ఉంటుంది',
    local_badge: 'లోకల్',
    section_about: 'గురించి',
    app_version: 'యాప్ వెర్షన్',
    rate_app: 'యాప్‌ను రేట్ చేయండి',
    rate_app_sub: 'మీ అభిప్రాయం చెప్పండి',
    contact_support: 'మద్దతుని సంప్రదించండి',
    contact_support_sub: 'సహాయం పొందండి లేదా బగ్ రిపోర్ట్ చేయండి',
    ai_title: 'AI స్మార్ట్ సలహాదారు',
    ai_suggestions_title: '💡 నెట్‌వర్క్ బూస్టింగ్ సూచనలు',
    ai_tip1: 'సిగ్నల్ మెరుగుపరచడానికి కిటికీ దగ్గర వెళ్ళండి',
    ai_tip2: 'ఎయిర్‌ప్లేన్ మోడ్ ఆన్/ఆఫ్ చేయండి',
    ai_tip3: 'WiFi కి మారండి - 25% అధిక విజయం',
    ai_greeting: 'నమస్కారం! మీ చెల్లింపు ప్రమాదం ఇప్పుడు ఎక్కువగా ఉంది. నేను ఎలా సహాయపడగలను?',
    ai_q1: 'నా చెల్లింపు ఎందుకు విఫలమైంది?',
    ai_q2: 'నేను ఇప్పుడు చెల్లింపు చేయగలనా?',
    ai_placeholder: 'వాయిస్ ఇన్‌పుట్... లేదా టైప్ చేయండి',
    header_sub: 'నెట్‌వర్క్ & UPI చెకర్',
    dash_title: '📊 నా నెట్‌వర్క్ డాష్‌బోర్డ్',
    dash_sub: 'మీ ప్రస్తుత స్థానం యొక్క నెట్‌వర్క్ విశ్వసనీయతను తనిఖీ చేయండి',
    geo_btn: '📍 నా స్థానాన్ని పొందండి',
    current_location: 'ప్రస్తుత స్థానం',
    fetching: 'స్థానాన్ని తీసుకుంటోంది...',
    network_status: 'నెట్‌వర్క్ స్థితి',
    signal: 'సిగ్నల్',
    moderate: 'మధ్యస్థం',
    latency: 'లేటెన్సీ',
    speed: 'వేగం',
    payment_reliability: 'చెల్లింపు విశ్వసనీయత',
    signal_history: 'సిగ్నల్ చరిత్ర',
    last_5: 'చివరి 5 తనిఖీలు',
    check_new_location: '🔍 కొత్త స్థానాన్ని తనిఖీ చేయండి',
    check_bank_status: '🏦 బ్యాంక్ స్థితి తనిఖీ చేయండి',
    smart_map: 'స్మార్ట్ నెట్‌వర్క్ మ్యాప్',
    map_tip: '50మీ కదలండి',
    map_tip_rest: 'మెరుగైన నెట్‌వర్క్',
    bank_title: '🏦 బ్యాంక్ సర్వర్ స్థితి తనిఖీ చేయండి',
    bank_sub: 'లైవ్ UPI సర్వర్ స్థితి చూడడానికి బ్యాంక్ ఎంచుకోండి',
    select_bank: 'బ్యాంక్ ఎంచుకోండి',
    choose_bank: 'బ్యాంక్ ఎంచుకోండి',
    checker_title: 'నెట్‌వర్క్ & UPI చెకర్‌కి స్వాగతం',
    checker_sub: 'ఏ స్థానానికైనా నెట్‌వర్క్ సిగ్నల్ బలం మరియు UPI విశ్వసనీయతను తనిఖీ చేయండి.',
    search_placeholder: 'స్థానాన్ని నమోదు చేయండి (ఉదా. కోరమంగల…)',
    check_btn: 'తనిఖీ చేయండి',
    recently_checked: '🕐 ఇటీవల తనిఖీ చేయబడినవి',
    empty_state: 'ప్రారంభించడానికి స్థానాన్ని నమోదు చేయండి',
    analyzing_title: 'నెట్‌వర్క్ విశ్లేషిస్తోంది...',
    analyzing_sub: 'దయచేసి వేచి ఉండండి, ఇది కొన్ని సెకన్లు పట్టవచ్చు',
    step1: 'స్థాన డేటా తీసుకుంటోంది...',
    step2: 'సిగ్నల్ డేటా తీసుకుంటోంది...',
    step3: 'సిగ్నల్ బలాన్ని విశ్లేషిస్తోంది...',
    step4: 'UPI విజయాన్ని అంచనా వేస్తోంది...',
    results_label: 'ఫలితాలు',
    location_detected: 'స్థానం గుర్తించబడింది',
    risk_meter_title: 'చెల్లింపు ప్రమాద మీటర్',
    upi_success_chance: 'UPI విజయ అవకాశం',
    recommendations: 'సిఫార్సులు',
    bank_server_status: 'బ్యాంక్ సర్వర్ స్థితి',
    back_btn: '← వెనుక',
    feedback_btn: 'అభిప్రాయం →',
    feedback_label: 'అభిప్రాయం',
    fb_question: 'మీ చెల్లింపు ఎలా జరిగింది?',
    outcome_success: 'విజయవంతం',
    outcome_failed: 'విఫలం',
    outcome_pending: 'పెండింగ్',
    fb_reason: 'ఏమి తప్పు జరిగింది?',
    chip_signal: 'పేద సిగ్నల్',
    chip_timeout: 'టైమ్‌అవుట్',
    chip_bank: 'బ్యాంక్ సర్వర్ డౌన్',
    chip_upi: 'తప్పు UPI ID',
    chip_other: 'ఇతర',
    fb_rate: 'మీ అనుభవాన్ని రేట్ చేయండి',
    submit_feedback: 'అభిప్రాయాన్ని సమర్పించండి',
    check_another: '🔄 మరొక స్థానాన్ని తనిఖీ చేయండి',
    nav_home: 'హోమ్',
    nav_map: 'మ్యాప్',
    nav_banks: 'బ్యాంకులు',
    risk_low: 'తక్కువ ప్రమాదం',
    risk_medium: 'మధ్యస్థ ప్రమాదం',
    risk_high: 'అధిక ప్రమాదం',
    thanks_title_star: '{n}★ రేటింగ్‌కు ధన్యవాదాలు!',
    thanks_title: 'మీ అభిప్రాయానికి ధన్యవాదాలు!',
    tip_success: '🎉 చాలా బాగా! పెద్ద చెల్లింపులకు ముందు సిగ్నల్ తనిఖీ చేయండి.',
    tip_failed: '🙏 క్షమించండి. WiFi కి మారండి లేదా మెరుగైన సిగ్నల్ ప్రాంతానికి వెళ్ళండి.',
    tip_pending: '⏳ పెండింగ్ చెల్లింపులు సాధారణంగా 10-15 నిమిషాల్లో పరిష్కరిస్తాయి. మీ బ్యాంక్ యాప్ తనిఖీ చేయండి.',
    ai_fail_reply: 'మీ చెల్లింపు 4G సిగ్నల్ పడిపోవడం వల్ల విఫలమై ఉండవచ్చు. <b>WiFi</b> కి మారండి లేదా తెరిచిన ప్రాంతానికి వెళ్ళండి.',
    ai_now_reply: 'ప్రస్తుతం మీ ప్రమాదం 4G లో <b>మధ్యస్థం (67%)</b>. ముందు WiFi కి మారడం సురక్షితం.',
    ai_generic_reply: 'నేను AI స్మార్ట్ సలహాదారుని. చెల్లింపు విజయాన్ని మెరుగుపరచడానికి స్థిరమైన WiFi కి కనెక్ట్ చేయండి లేదా ఎయిర్‌ప్లేన్ మోడ్ టాగుల్ చేయండి.',
    upi_server_status: 'UPI సర్వర్ స్థితి',
    status_prefix: 'స్థితి: ',
    all_operational: 'అన్ని సేవలూ నిర్వహించబడుతున్నాయి',
    minor_delays: 'స్వల్ప ఆలస్యాలు గుర్తించబడ్డాయి',
    upi_down: 'UPI లావాదేవీలు ప్రస్తుతం పని చేయడం లేదు',
    upi_high: 'అధికం',
    upi_medium: 'మధ్యస్థం',
    upi_low: 'తక్కువ',
    bank_sbi: 'స్టేట్ బ్యాంక్ ఆఫ్ ఇండియా (SBI)',
    bank_hdfc: 'HDFC బ్యాంక్',
    bank_icici: 'ICICI బ్యాంక్',
    bank_pnb: 'పంజాబ్ నేషనల్ బ్యాంక్',
    bank_bob: 'బ్యాంక్ ఆఫ్ బరోడా',
    bank_canara: 'కెనరా బ్యాంక్',
    bank_axis: 'యాక్సిస్ బ్యాంక్',
    bank_union: 'యూనియన్ బ్యాంక్ ఆఫ్ ఇండియా',
    bank_indian: 'ఇండియన్ బ్యాంక్',
    bank_boi: 'బ్యాంక్ ఆఫ్ ఇండియా',
  },
};

// Current language
let currentLang = localStorage.getItem('nps_lang') || 'en';

// T() — translate a key
function T(key) {
  return (TRANSLATIONS[currentLang] || TRANSLATIONS.en)[key] || TRANSLATIONS.en[key] || key;
}

// Apply translations to all data-i18n elements
function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = T(key);
    if (val) el.textContent = val;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const val = T(key);
    if (val) el.placeholder = val;
  });
  // Sync both language selects
  document.querySelectorAll('#header-lang-select, #settings-lang-select').forEach(sel => {
    sel.value = currentLang;
  });
  // Update html lang attribute for better font rendering
  document.documentElement.lang = currentLang;
  // Apply correct font family for Indic scripts
  const fontMap = {
    kn: "'Noto Sans Kannada', 'Inter', sans-serif",
    ta: "'Noto Sans Tamil', 'Inter', sans-serif",
    hi: "'Noto Sans Devanagari', 'Inter', sans-serif",
    te: "'Noto Sans Telugu', 'Inter', sans-serif",
    en: "'Inter', 'Segoe UI', system-ui, sans-serif",
  };
  document.body.style.fontFamily = fontMap[currentLang] || fontMap.en;
  updateBankDropdowns();
}
function updateBankDropdowns() {
  const bankOptions = [
    { value: 'SBI',    key: 'bank_sbi'    },
    { value: 'HDFC',   key: 'bank_hdfc'   },
    { value: 'ICICI',  key: 'bank_icici'  },
    { value: 'PNB',    key: 'bank_pnb'    },
    { value: 'BOB',    key: 'bank_bob'    },
    { value: 'CANARA', key: 'bank_canara' },
    { value: 'AXIS',   key: 'bank_axis'   },
    { value: 'UNION',  key: 'bank_union'  },
    { value: 'INDIAN', key: 'bank_indian' },
    { value: 'BOI',    key: 'bank_boi'    },
  ];
  ['bank-select', 'results-bank-select'].forEach(selectId => {
    const select = document.getElementById(selectId);
    if (!select) return;
    const currentVal = select.value;
    select.querySelectorAll('option').forEach(option => {
      if (!option.value) return;
      const match = bankOptions.find(b => b.value === option.value);
      if (match) option.textContent = T(match.key);
    });
    select.value = currentVal;
  });
}

function setLang(code) {
  currentLang = code;
  localStorage.setItem('nps_lang', code);
  applyTranslations();
  renderRecents();
  updateBankDropdowns();
  // Re-render signal result if user is on results page
  if (currentSig) {
    populateSignal(currentSig);
    populateRecs(currentSig.tier);
  }
}
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
    document.getElementById('ob-next-btn').textContent = T('ob_get_started');
  }
}

// ── Settings ──
function openSettings() { document.getElementById('settings-panel').classList.remove('hidden'); }
function closeSettings() { document.getElementById('settings-panel').classList.add('hidden'); }
function closeSettingsOverlay(e) {
  if (e.target === document.getElementById('settings-panel')) closeSettings();
}
function editProfile() {
  const name = prompt(T('profile_name') + ':', 'NetPaySense User');
  if (name) document.querySelector('.settings-profile-name').textContent = name;
}
function showIntro() {
  obIndex = 0;
  document.querySelectorAll('.ob-slide').forEach((s, i) => s.classList.toggle('active', i === 0));
  document.querySelectorAll('.ob-dot').forEach((d, i) => d.classList.toggle('active', i === 0));
  document.getElementById('ob-next-btn').textContent = T('ob_next');
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

  ctx.beginPath();
  ctx.arc(cx, cy, r, startAngle, endAngle);
  ctx.lineWidth = 18;
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineCap = 'round';
  ctx.stroke();

  const tierMap = {
    good: { end: Math.PI * 1.33, color: '#22c55e', labelKey: 'risk_low' },
    mid:  { end: Math.PI * 1.66, color: '#f59e0b', labelKey: 'risk_medium' },
    poor: { end: Math.PI * 2,    color: '#ef4444', labelKey: 'risk_high' },
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
  ctx.textAlign = 'left';  ctx.fillText(T('risk_low').split(' ')[0], cx - r - 2, cy - 4);
  ctx.textAlign = 'right'; ctx.fillText(T('risk_high').split(' ')[0], cx + r + 2, cy - 4);

  if (labelId) {
    const lbl = document.getElementById(labelId);
    if (lbl) { lbl.textContent = T(t.labelKey); lbl.className = `risk-meter-label ${tier}`; }
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

  ctx.beginPath();
  points.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
  ctx.strokeStyle = '#2563eb';
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';
  ctx.stroke();

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

const SIGNAL_DATA = [
  { dbm: -58,  type: '5G', tier: 'good', bars: 5, upiPct: '96' },
  { dbm: -65,  type: '5G', tier: 'good', bars: 5, upiPct: '91' },
  { dbm: -72,  type: '4G', tier: 'good', bars: 4, upiPct: '84' },
  { dbm: -80,  type: '4G', tier: 'good', bars: 3, upiPct: '72' },
  { dbm: -88,  type: '4G', tier: 'mid',  bars: 3, upiPct: '61' },
  { dbm: -95,  type: '3G', tier: 'mid',  bars: 2, upiPct: '48' },
  { dbm: -102, type: '4G', tier: 'poor', bars: 1, upiPct: '32' },
  { dbm: -110, type: '4G', tier: 'poor', bars: 1, upiPct: '28' },
  { dbm: -115, type: '2G', tier: 'poor', bars: 1, upiPct: '14' },
];

const SIGNALS = SIGNAL_DATA;

function getSIG(raw) {
  const levelKey = raw.tier === 'good' ? 'upi_high' : raw.tier === 'mid' ? 'upi_medium' : 'upi_low';
  const riskKey  = raw.tier === 'good' ? 'risk_low' : raw.tier === 'mid' ? 'risk_medium' : 'risk_high';
  return { ...raw, upi: `${T(levelKey)} – ${raw.upiPct}%`, badge: T(riskKey) };
}

// Recommendations use T() so they auto-translate
function getRecs(tier) {
  const map = {
    good: [
      { icon: '📱', key: 'rec_good_1' },
      { icon: '✅', key: 'rec_good_2' },
      { icon: '⚡', key: 'rec_good_3' },
      { icon: '🔒', key: 'rec_good_4' },
    ],
    mid: [
      { icon: '🔄', key: 'rec_mid_1' },
      { icon: '⏱️', key: 'rec_mid_2' },
      { icon: '💵', key: 'rec_mid_3' },
    ],
    poor: [
      { icon: '🔄', key: 'rec_poor_1' },
      { icon: '⏱️', key: 'rec_poor_2' },
      { icon: '💵', key: 'rec_poor_3' },
    ],
  };
  return map[tier] || map.mid;
}

// Add recommendation translations to each language in TRANSLATIONS:
// (We inject them here so the TRANSLATIONS object above stays readable)
const REC_TRANSLATIONS = {
  en: {
    rec_good_1: '<strong>Use Airtel / Jio</strong> — network is stable and fast',
    rec_good_2: '<strong>Safe to proceed</strong> with UPI payments now',
    rec_good_3: '<strong>Fast transactions</strong> expected under 5 seconds',
    rec_good_4: '<strong>Low risk</strong> of payment failure or timeout',
    rec_mid_1:  '<strong>Switch to Jio</strong> for better network stability',
    rec_mid_2:  '<strong>Wait 10–15 minutes</strong> and retry the payment',
    rec_mid_3:  '<strong>Carry Cash as Backup</strong> in case payment fails',
    rec_poor_1: '<strong>Switch to Vi / BSNL</strong> for better coverage here',
    rec_poor_2: '<strong>Wait 10–15 minutes</strong> and retry the payment',
    rec_poor_3: '<strong>Carry Cash as Backup</strong> — payments likely to fail',
  },
  kn: {
    rec_good_1: '<strong>Airtel / Jio ಬಳಸಿ</strong> — ನೆಟ್‌ವರ್ಕ್ ಸ್ಥಿರ ಮತ್ತು ವೇಗವಾಗಿದೆ',
    rec_good_2: '<strong>UPI ಪಾವತಿ ಮಾಡಲು ಸುರಕ್ಷಿತ</strong>',
    rec_good_3: '<strong>ವೇಗದ ವ್ಯವಹಾರಗಳು</strong> 5 ಸೆಕೆಂಡ್‌ಗಳಲ್ಲಿ ನಿರೀಕ್ಷಿತ',
    rec_good_4: '<strong>ಕಡಿಮೆ ಅಪಾಯ</strong> ಪಾವತಿ ವಿಫಲತೆ ಅಥವಾ ಟೈಮ್‌ಔಟ್',
    rec_mid_1:  '<strong>Jio ಗೆ ಬದಲಿಸಿ</strong> ಉತ್ತಮ ನೆಟ್‌ವರ್ಕ್ ಸ್ಥಿರತೆಗಾಗಿ',
    rec_mid_2:  '<strong>10-15 ನಿಮಿಷ ನಿರೀಕ್ಷಿಸಿ</strong> ಮತ್ತು ಪಾವತಿ ಮರು-ಪ್ರಯತ್ನಿಸಿ',
    rec_mid_3:  '<strong>ಬ್ಯಾಕಪ್ ನಗದು ಇರಿಸಿ</strong> ಪಾವತಿ ವಿಫಲವಾದರೆ',
    rec_poor_1: '<strong>Vi / BSNL ಗೆ ಬದಲಿಸಿ</strong> ಉತ್ತಮ ಕವರೇಜ್‌ಗಾಗಿ',
    rec_poor_2: '<strong>10-15 ನಿಮಿಷ ನಿರೀಕ್ಷಿಸಿ</strong> ಮತ್ತು ಮರು-ಪ್ರಯತ್ನಿಸಿ',
    rec_poor_3: '<strong>ನಗದು ಇರಿಸಿ</strong> — ಪಾವತಿ ವಿಫಲವಾಗುವ ಸಾಧ್ಯತೆ',
  },
  ta: {
    rec_good_1: '<strong>Airtel / Jio பயன்படுத்துங்கள்</strong> — நெட்வொர்க் நிலையானது',
    rec_good_2: '<strong>UPI கட்டணம் செய்ய பாதுகாப்பானது</strong>',
    rec_good_3: '<strong>வேகமான பரிவர்த்தனைகள்</strong> 5 நொடிகளுக்குள்',
    rec_good_4: '<strong>குறைந்த ஆபத்து</strong> கட்டண தோல்வி அல்லது நேர முடிவு',
    rec_mid_1:  '<strong>Jio க்கு மாறுங்கள்</strong> சிறந்த நெட்வொர்க் நிலைத்தன்மைக்கு',
    rec_mid_2:  '<strong>10-15 நிமிடம் காத்திருங்கள்</strong> மீண்டும் முயற்சிக்கவும்',
    rec_mid_3:  '<strong>பணம் வைத்திருங்கள்</strong> கட்டணம் தோல்வியடைந்தால்',
    rec_poor_1: '<strong>Vi / BSNL க்கு மாறுங்கள்</strong> சிறந்த கவரேஜுக்கு',
    rec_poor_2: '<strong>10-15 நிமிடம் காத்திருங்கள்</strong> மீண்டும் முயற்சிக்கவும்',
    rec_poor_3: '<strong>பணம் வைத்திருங்கள்</strong> — கட்டணம் தோல்வியடைய வாய்ப்பு',
  },
  hi: {
    rec_good_1: '<strong>Airtel / Jio इस्तेमाल करें</strong> — नेटवर्क स्थिर और तेज़ है',
    rec_good_2: '<strong>UPI भुगतान करना सुरक्षित है</strong>',
    rec_good_3: '<strong>तेज़ लेनदेन</strong> 5 सेकंड में अपेक्षित',
    rec_good_4: '<strong>कम जोखिम</strong> भुगतान विफलता या टाइमआउट का',
    rec_mid_1:  '<strong>Jio पर स्विच करें</strong> बेहतर नेटवर्क स्थिरता के लिए',
    rec_mid_2:  '<strong>10-15 मिनट प्रतीक्षा करें</strong> और भुगतान पुनः प्रयास करें',
    rec_mid_3:  '<strong>बैकअप नकद रखें</strong> भुगतान विफल होने पर',
    rec_poor_1: '<strong>Vi / BSNL पर स्विच करें</strong> बेहतर कवरेज के लिए',
    rec_poor_2: '<strong>10-15 मिनट प्रतीक्षा करें</strong> और पुनः प्रयास करें',
    rec_poor_3: '<strong>नकद रखें</strong> — भुगतान विफल होने की संभावना',
  },
  te: {
    rec_good_1: '<strong>Airtel / Jio వాడండి</strong> — నెట్‌వర్క్ స్థిరంగా మరియు వేగంగా ఉంది',
    rec_good_2: '<strong>UPI చెల్లింపు చేయడం సురక్షితం</strong>',
    rec_good_3: '<strong>వేగవంతమైన లావాదేవీలు</strong> 5 సెకన్లలో అంచనా',
    rec_good_4: '<strong>తక్కువ ప్రమాదం</strong> చెల్లింపు విఫలత లేదా టైమ్‌అవుట్',
    rec_mid_1:  '<strong>Jio కి మారండి</strong> మెరుగైన నెట్‌వర్క్ స్థిరత్వానికి',
    rec_mid_2:  '<strong>10-15 నిమిషాలు వేచి ఉండండి</strong> మళ్ళీ ప్రయత్నించండి',
    rec_mid_3:  '<strong>బ్యాకప్ నగదు ఉంచండి</strong> చెల్లింపు విఫలమైతే',
    rec_poor_1: '<strong>Vi / BSNL కి మారండి</strong> మెరుగైన కవరేజ్ కోసం',
    rec_poor_2: '<strong>10-15 నిమిషాలు వేచి ఉండండి</strong> మళ్ళీ ప్రయత్నించండి',
    rec_poor_3: '<strong>నగదు ఉంచండి</strong> — చెల్లింపు విఫలమయ్యే అవకాశం',
  },
};

// Merge rec translations into TRANSLATIONS
Object.keys(REC_TRANSLATIONS).forEach(lang => {
  if (TRANSLATIONS[lang]) Object.assign(TRANSLATIONS[lang], REC_TRANSLATIONS[lang]);
});

const BANK_DATA = {
  SBI:    { name: 'SBI', rows: [{ label: 'UPI Transactions', status: 'Online' }, { label: 'UPI Balance Check', status: 'Available' }, { label: 'UPI Registration', status: 'Active' }], overall: 'all_operational', ok: true },
  HDFC:   { name: 'HDFC', rows: [{ label: 'UPI Transactions', status: 'Online' }, { label: 'UPI Balance Check', status: 'Available' }, { label: 'UPI Registration', status: 'Active' }], overall: 'all_operational', ok: true },
  ICICI:  { name: 'ICICI', rows: [{ label: 'UPI Transactions', status: 'Online' }, { label: 'UPI Balance Check', status: 'Delayed' }, { label: 'UPI Registration', status: 'Active' }], overall: 'minor_delays', ok: false },
  PNB:    { name: 'PNB', rows: [{ label: 'UPI Transactions', status: 'Offline' }, { label: 'UPI Balance Check', status: 'Unavailable' }, { label: 'UPI Registration', status: 'Active' }], overall: 'upi_down', ok: false },
  BOB:    { name: 'Bank of Baroda', rows: [{ label: 'UPI Transactions', status: 'Online' }, { label: 'UPI Balance Check', status: 'Available' }, { label: 'UPI Registration', status: 'Active' }], overall: 'all_operational', ok: true },
  CANARA: { name: 'Canara Bank', rows: [{ label: 'UPI Transactions', status: 'Online' }, { label: 'UPI Balance Check', status: 'Available' }, { label: 'UPI Registration', status: 'Active' }], overall: 'all_operational', ok: true },
  AXIS:   { name: 'Axis Bank', rows: [{ label: 'UPI Transactions', status: 'Online' }, { label: 'UPI Balance Check', status: 'Available' }, { label: 'UPI Registration', status: 'Active' }], overall: 'all_operational', ok: true },
  UNION:  { name: 'Union Bank', rows: [{ label: 'UPI Transactions', status: 'Online' }, { label: 'UPI Balance Check', status: 'Delayed' }, { label: 'UPI Registration', status: 'Active' }], overall: 'minor_delays', ok: false },
  INDIAN: { name: 'Indian Bank', rows: [{ label: 'UPI Transactions', status: 'Online' }, { label: 'UPI Balance Check', status: 'Available' }, { label: 'UPI Registration', status: 'Active' }], overall: 'all_operational', ok: true },
  BOI:    { name: 'Bank of India', rows: [{ label: 'UPI Transactions', status: 'Online' }, { label: 'UPI Balance Check', status: 'Available' }, { label: 'UPI Registration', status: 'Active' }], overall: 'all_operational', ok: true },
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
  document.getElementById('dashboard-panel').classList.add('hidden');
  document.getElementById('app-main').classList.remove('hidden');
}

function getMyLocation() {
  const btn = document.getElementById('geo-btn');
  btn.textContent = '⏳ ' + T('fetching');
  btn.disabled = true;
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
      } catch {}
      useLiveLocation(lat, lng, name);
    },
    () => useLiveLocation(12.9716, 77.5946, 'Bengaluru')
  );
}

function useLiveLocation(lat, lng, name) {
  const btn = document.getElementById('geo-btn');
  btn.textContent = T('geo_btn');
  btn.disabled = false;
  document.getElementById('skeleton-loc').classList.add('hidden');
  document.getElementById('skeleton-net').classList.add('hidden');
  document.getElementById('dashboard-panel').classList.add('hidden');
  document.getElementById('app-main').classList.remove('hidden');
  document.getElementById('loc-input').value = name;
  runCheckWithCoords(name, lat, lng);
}

function runCheck() {
  const raw = document.getElementById('loc-input').value.trim();
  if (!raw) { shake(document.getElementById('loc-input')); return; }
  const btn = document.getElementById('check-btn');
  btn.textContent = T('analyzing_title').replace('...', '…');
  btn.disabled = true;
  document.getElementById('empty-state').classList.add('hidden');
  goStep(2);
  runAnalyzing(raw, btn);
}

function runCheckWithCoords(name, lat, lng) {
  const btn = document.getElementById('check-btn');
  btn.disabled = true;
  goStep(2);
  runAnalyzingWithCoords(name, lat, lng, btn);
}

function runAnalyzing(raw, btn) {
  animateSteps();
  setTimeout(() => {
    const h = hash(raw);
    const coords = COORDS[h % COORDS.length];
    currentSig = SIGNAL_DATA[hash(raw + 'sig') % SIGNAL_DATA.length];
    currentLat = coords.lat; currentLng = coords.lng;
    document.getElementById('loc-name').textContent = raw;
    document.getElementById('loc-coords').textContent = `${coords.lat}, ${coords.lng}`;
    populateSignal(currentSig);
    populateRecs(currentSig.tier);
    saveRecent(raw, coords, currentSig);
    btn.textContent = T('check_btn'); btn.disabled = false;
    goStep(3);
  }, 3200);
}

function runAnalyzingWithCoords(name, lat, lng, btn) {
  animateSteps();
  setTimeout(() => {
    currentSig = SIGNAL_DATA[hash(name + 'sig') % SIGNAL_DATA.length];
    currentLat = lat; currentLng = lng;
    document.getElementById('loc-name').textContent = name;
    document.getElementById('loc-coords').textContent = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    populateSignal(currentSig);
    populateRecs(currentSig.tier);
    saveRecent(name, { lat, lng }, currentSig);
    btn.textContent = T('check_btn'); btn.disabled = false;
    goStep(3);
  }, 3200);
}

function animateSteps() {
  const delays = [600, 1200, 1900, 2600];
  ['a1','a2','a3','a4'].forEach((id, i) =>
    setTimeout(() => document.getElementById(id).classList.add('done'), delays[i])
  );
}

function populateSignal(sig) {
  const translated = getSIG(sig);

  const upiVal = document.getElementById('upi-value');
  upiVal.textContent = translated.upi;
  upiVal.className = `upi-value ${sig.tier}`;

  const upiWrap = document.getElementById('upi-icon-wrap');
  upiWrap.className = `upi-icon-wrap ${sig.tier}`;
  document.getElementById('upi-icon').textContent =
    sig.tier === 'good' ? '✅' : sig.tier === 'mid' ? '⚠️' : '🚨';

  const badge = document.getElementById('upi-badge');
  badge.textContent = translated.badge;
  badge.className = `upi-badge ${sig.tier}`;

  setTimeout(() => drawGauge('results-risk-gauge', 'results-risk-label', sig.tier), 100);
}

function populateRecs(tier) {
  const list = document.getElementById('rec-list');
  list.innerHTML = '';
  getRecs(tier).forEach(r => {
    const li = document.createElement('li');
    const recTexts = REC_TRANSLATIONS[currentLang] || REC_TRANSLATIONS.en;
    li.innerHTML = `<div class="rec-icon-box">${r.icon}</div><span>${recTexts[r.key] || REC_TRANSLATIONS.en[r.key]}</span>`;
    list.appendChild(li);
  });
}

function saveRecent(name, coords, sig) {
  recents = recents.filter(r => r.name.toLowerCase() !== name.toLowerCase());
  recents.unshift({ name, lat: coords.lat, lng: coords.lng, tier: sig.tier });
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
    const badgeKey = r.tier === 'good' ? 'risk_low' : r.tier === 'mid' ? 'risk_medium' : 'risk_high';
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
      <span class="recent-badge ${r.tier}">${T(badgeKey)}</span>`;
    div.onclick = () => { document.getElementById('loc-input').value = r.name; runCheck(); };
    list.appendChild(div);
  });
}

function goStep(step) {
  document.querySelectorAll('.step-panel').forEach(p => p.classList.add('hidden'));
  const panel = document.getElementById(`panel-${step}`);
  panel.classList.remove('hidden');
  panel.classList.add('fade-in');
  if (step === 2) ['a1','a2','a3','a4'].forEach(id => document.getElementById(id).classList.remove('done'));
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
function showBankStatus() {
  const key = document.getElementById('bank-select').value;
  const card = document.getElementById('bank-status-card');
  if (!key) { card.classList.add('hidden'); return; }
  renderBankCard(BANK_DATA[key], 'bank-status-title', 'bank-status-rows', 'bank-overall-status');
  card.classList.remove('hidden');
  void card.offsetWidth;
  card.classList.add('fade-in');
}

function showResultsBankStatus() {
  const key = document.getElementById('results-bank-select').value;
  const container = document.getElementById('results-bank-status');
  if (!key) { container.classList.add('hidden'); return; }
  renderBankCard(BANK_DATA[key], 'results-bank-title', 'results-bank-rows', 'results-bank-overall');
  container.classList.remove('hidden');
  void container.offsetWidth;
  container.classList.add('fade-in');
}

function renderBankCard(bank, titleId, rowsId, overallId) {
  document.getElementById(titleId).textContent = `${bank.name} ${T('upi_server_status')}`;
  document.getElementById(rowsId).innerHTML = bank.rows.map(r => {
    const ok = ['Online','Available','Active'].includes(r.status);
    return `<div class="bank-status-row">
      <span class="bank-row-icon">${ok ? '✅' : '⚠️'}</span>
      <span class="bank-row-label">${r.label}:</span>
      <span class="bank-row-val ${ok ? 'bank-row-ok' : 'bank-row-warn'}">${r.status}</span>
    </div>`;
  }).join('');
  const overall = document.getElementById(overallId);
  overall.textContent = T('status_prefix') + T(bank.overall);
  overall.className = `bank-overall-status ${bank.ok ? 'ok' : 'warn'}`;
}

// ── Feedback ──
let fbOutcome = null, fbStar = 0;

function selectOutcome(outcome, el) {
  fbOutcome = outcome;
  document.querySelectorAll('.fb-outcome-btn').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
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

function submitFeedbackNew() {
  if (!fbOutcome) return;
  const tipKey = `tip_${fbOutcome}`;
  document.getElementById('feedback-main').classList.add('hidden');
  document.getElementById('back-from-5').classList.add('hidden');
  const icons = { success: '🎉', failed: '😔', pending: '⏳' };
  document.getElementById('fb-thanks-icon').textContent = icons[fbOutcome];
  const titleStr = fbStar
    ? T('thanks_title_star').replace('{n}', fbStar)
    : T('thanks_title');
  document.getElementById('fb-thanks-title').textContent = titleStr;
  document.getElementById('fb-thanks-tip').textContent = T(tipKey);
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
    if (lower.includes('fail') || lower.includes('विफल') || lower.includes('ವಿಫಲ') || lower.includes('தோல்வி') || lower.includes('విఫల'))
      aiMsg.innerHTML = T('ai_fail_reply');
    else if (lower.includes('now') || lower.includes('can i') || lower.includes('अभी') || lower.includes('ಈಗ') || lower.includes('இப்போது') || lower.includes('ఇప్పుడు'))
      aiMsg.innerHTML = T('ai_now_reply');
    else
      aiMsg.innerHTML = T('ai_generic_reply');
    body.appendChild(aiMsg);
    body.scrollTop = body.scrollHeight;
  }, 1000);
}

// ── Dashboard Tabs ──
function switchDashboardTab(tabId, el) {
  document.getElementById('app-main').classList.add('hidden');
  document.getElementById('dashboard-panel').classList.remove('hidden');
  ['dash-content','dash-map','dash-bank'].forEach(id => document.getElementById(id).classList.add('hidden'));
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
    }, err => {}, { enableHighAccuracy: true, timeout: 5000 });
  }
}

// ── Init ──
initTheme();
initOnboarding();
initScrollTop();
renderRecents();
applyTranslations(); // Apply saved language on load