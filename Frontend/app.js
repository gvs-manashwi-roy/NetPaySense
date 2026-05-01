if (typeof window.APP_LOADED === 'undefined') {
  window.APP_LOADED = true;

  // ── TRANSLATIONS (v4.2) ──
  window.TRANSLATIONS = {
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
      header_sub: 'Network & UPI Checker',
      dash_title: '📊 My Network Dashboard',
      dash_sub: "Check your current location's network reliability",
      choose_bank: '🏦 Choose Bank',
      check_new_location: '🔍 Check New Location',
      geo_btn: '📍 Fetch My Location',
      current_location: 'Current Location',
      fetching: 'Fetching location...',
      network_status: 'Network Status',
      signal: 'Signal',
      latency: 'Latency',
      speed: 'Speed',
      moderate: 'Moderate',
      excellent: 'Excellent',
      good: 'Good',
      poor: 'Poor',
      payment_reliability: 'Payment Reliability',
      risk_low: 'Low Risk',
      risk_mid: 'Medium Risk',
      risk_high: 'High Risk',
      signal_history: 'Signal History',
      last_5: 'Last 5 checks',
      smart_map: 'Smart Network Map',
      map_tip: 'Calculating...',
      map_tip_rest: 'Better network',
      bank_title: '🏦 Live UPI Bank Status',
      bank_sub: 'Real-time UPI server health — auto-refreshes every minute',
      checker_title: 'Welcome to Network & UPI Checker',
      checker_sub: 'Check your network signal strength and UPI payment reliability for any location.',
      search_placeholder: 'Enter location (e.g. Koramangala…)',
      check_btn: 'Check',
      recently_checked: '🕐 Recently Checked',
      empty_state: 'Enter a location to get started',
      analyzing_title: 'Analyzing Network...',
      analyzing_sub: 'Please wait, this may take a few seconds',
      step1: 'Fetching GPS location...',
      step2: 'Probing Live Network (Pulse)...',
      step3: 'Analyzing Signal Health...',
      step4: 'Predicting UPI Success...',
      results_label: 'Results',
      location_detected: 'Location Detected',
      bank_server_status: 'Bank Server Status',
      risk_meter_title: 'Payment Risk Meter',
      upi_success_chance: 'UPI Success Rate',
      recommendations: 'Recommendations',
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
      thanks_title: 'Thank you!',
      check_another: '🔄 Check Another Location',
      nav_home: 'Home',
      nav_map: 'Map',
      nav_banks: 'Banks',
      ai_title: 'AI Smart Advisor',
      ai_suggestions_title: '💡 Network Boosting Suggestions',
      ai_tip1: 'Move near a window to improve signal',
      ai_tip2: 'Turn Airplane mode ON and OFF',
      ai_tip3: 'Switch to WiFi to increase success by 25%',
      ai_greeting: 'Hi! Your payment risk is high right now. How can I assist you?',
      ai_placeholder: 'Voice Input... or type',
      ai_q1: 'Why did my payment fail?',
      ai_q2: 'Can I make a payment now?',
      regional_alert_title: 'Regional Failure Alert',
      regional_alert_desc: 'Multiple payment failures reported nearby in the last 30 minutes. High risk detected.',
      upi_high: 'High',
      upi_medium: 'Medium',
      upi_low: 'Low',
    },
    kn: {
      ob0_title: 'ನೆಟ್‌ಪೇಸೆನ್ಸ್‌ಗೆ ಸ್ವಾಗತ',
      ob0_desc: 'ಯಾವುದೇ ಸ್ಥಳಕ್ಕೂ ಮುಂಚಿತವಾಗಿ ನೆಟ್‌ವರ್ಕ್ ವಿಶ್ವಾಸಾರ್ಹತೆ ಮತ್ತು UPI ಪಾವತಿ ಯಶಸ್ಸಿನ ಸಾಧ್ಯತೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.',
      ob1_title: 'ಸ್ಮಾರ್ಟ್ ಸ್ಥಳ ಪರಿಶೀಲನೆ',
      ob1_desc: 'ಯಾವುದೇ ಸ್ಥಳವನ್ನು ನಮೂದಿಸಿ ಅಥವಾ ಸಿಗ್ನಲ್ ಸಾಮರ್ಥ್ಯ, UPI ಅಪಾಯದ ಮಟ್ಟ ಮತ್ತು ಬ್ಯಾಂಕ್ ಸರ್ವರ್ ಸ್ಥಿತಿಯನ್ನು ತಕ್ಷಣವೇ ಪಡೆಯಲು GPS ಬಳಸಿ.',
      ob2_title: '100% ಖಾಸಗಿ',
      ob2_desc: 'ಯಾವುದೇ ಡೇಟಾವನ್ನು ಸರ್ವರ್‌ಗೆ ಕಳುಹಿಸಲಾಗುವುದಿಲ್ಲ. ಎಲ್ಲವೂ ನಿಮ್ಮ ಸಾಧನದಲ್ಲಿ ಸ್ಥಳೀಯವಾಗಿ ಚಲಿಸುತ್ತದೆ. ನಿಮ್ಮ ಸ್ಥಳ ನಿಮ್ಮದಾಗಿಯೇ ಇರುತ್ತದೆ.',
      ob_next: 'ಮುಂದೆ →',
      ob_skip: "ಮತ್ತೆ ತೋರಿಸಬೇಡಿ",
      ob_get_started: 'ಪ್ರಾರಂಭಿಸಿ ✓',
      settings_title: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
      profile_name: 'ನನ್ನ ಪ್ರೊಫೈಲ್',
      profile_sub: 'ನೆಟ್‌ಪೇಸೆನ್ಸ್ ಬಳಕೆದಾರ',
      edit_btn: 'ತಿದ್ದುಪಡಿ',
      section_language: 'ಭಾಷೆ',
      lang_label: 'ಅಪ್ಲಿಕೇಶನ್ ಭಾಷೆ',
      lang_sub: 'ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯನ್ನು ಆರಿಸಿ',
      section_appearance: 'ಗೋಚರತೆ',
      dark_mode: 'ಡಾರ್ಕ್ ಮೋಡ್',
      dark_mode_sub: 'ಬೆಳಕು ಮತ್ತು ಕತ್ತಲೆಯ ನಡುವೆ ಬದಲಿಸಿ',
      section_notifications: 'ಅಧಿಸೂಚನೆಗಳು',
      notif_risk: 'ಪಾವತಿ ಅಪಾಯದ ಎಚ್ಚರಿಕೆಗಳು',
      notif_risk_sub: 'ಹೆಚ್ಚಿನ ಅಪಾಯದ ಬಗ್ಗೆ ಅಧಿಸೂಚನೆ ಪಡೆಯಿರಿ',
      vibration: 'ಕಂಪನ',
      vibration_sub: 'ಕ್ರಿಯೆಗಳ ಮೇಲೆ ಹ್ಯಾಪ್ಟಿಕ್ ಪ್ರತಿಕ್ರಿಯೆ',
      section_privacy: 'ಡೇಟಾ ಮತ್ತು ಗೌಪ್ಯತೆ',
      clear_history: 'ಹುಡುಕಾಟದ ಇತಿಹಾಸವನ್ನು ಅಳಿಸಿ',
      clear_history_sub: 'ಎಲ್ಲಾ ಇತ್ತೀಚಿನ ಪರಿಶೀಲನೆಗಳನ್ನು ತೆಗೆದುಹಾಕಿ',
      show_intro: 'ಅಪ್ಲಿಕೇಶನ್ ಪರಿಚಯ ತೋರಿಸಿ',
      show_intro_sub: 'ಆನ್‌ಬೋರ್ಡಿಂಗ್ ಸ್ಲೈಡ್‌ಗಳನ್ನು ಮರುಪ್ಲೇ ಮಾಡಿ',
      privacy: 'ಗೌಪ್ಯತೆ',
      privacy_sub: 'ಎಲ್ಲಾ ಡೇಟಾ ನಿಮ್ಮ ಸಾಧನದಲ್ಲಿಯೇ ಇರುತ್ತದೆ',
      local_badge: 'ಸ್ಥಳೀಯ',
      section_about: 'ಬಗ್ಗೆ',
      app_version: 'ಅಪ್ಲಿಕೇಶನ್ ಆವೃತ್ತಿ',
      rate_app: 'ಅಪ್ಲಿಕೇಶನ್ ರೇಟ್ ಮಾಡಿ',
      rate_app_sub: 'ನಿಮ್ಮ ಅನಿಸಿಕೆಯನ್ನು ತಿಳಿಸಿ',
      contact_support: 'ಬೆಂಬಲವನ್ನು ಸಂಪರ್ಕಿಸಿ',
      contact_support_sub: 'ಸಹಾಯ ಪಡೆಯಿರಿ ಅಥವಾ ದೋಷವನ್ನು ವರದಿ ಮಾಡಿ',
      header_sub: 'ನೆಟ್‌ವರ್ಕ್ ಮತ್ತು UPI ಪರಿಶೀಲಕ',
      dash_title: '📊 ನನ್ನ ನೆಟ್‌ವರ್ಕ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
      dash_sub: 'ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಸ್ಥಳದ ನೆಟ್‌ವರ್ಕ್ ವಿಶ್ವಾಸಾರ್ಹತೆಯನ್ನು ಪರಿಶೀಲಿಸಿ',
      choose_bank: '🏦 ಬ್ಯಾಂಕ್ ಆಯ್ಕೆಮಾಡಿ',
      check_new_location: '🔍 ಹೊಸ ಸ್ಥಳವನ್ನು ಪರಿಶೀಲಿಸಿ',
      geo_btn: '📍 ನನ್ನ ಸ್ಥಳವನ್ನು ಪಡೆಯಿರಿ',
      current_location: 'ಪ್ರಸ್ತುತ ಸ್ಥಳ',
      fetching: 'ಸ್ಥಳವನ್ನು ಪಡೆಯಲಾಗುತ್ತಿದೆ...',
      network_status: 'ನೆಟ್‌ವರ್ಕ್ ಸ್ಥಿತಿ',
      signal: 'ಸಿಗ್ನಲ್',
      latency: 'ವಿಳಂಬ',
      speed: 'ವೇಗ',
      moderate: 'ಮಧ್ಯಮ',
      excellent: 'ಅತ್ಯುತ್ತಮ',
      good: 'ಉತ್ತಮ',
      poor: 'ಕಡಿಮೆ',
      payment_reliability: 'ಪಾವತಿ ವಿಶ್ವಾಸಾರ್ಹತೆ',
      risk_low: 'ಕಡಿಮೆ ಅಪಾಯ',
      risk_mid: 'ಮಧ್ಯಮ ಅಪಾಯ',
      risk_high: 'ಹೆಚ್ಚಿನ ಅಪಾಯ',
      signal_history: 'ಸಿಗ್ನಲ್ ಇತಿಹಾಸ',
      last_5: 'ಕೊನೆಯ 5 ಪರಿಶೀಲನೆಗಳು',
      smart_map: 'ಸ್ಮಾರ್ಟ್ ನೆಟ್‌ವರ್ಕ್ ನಕ್ಷೆ',
      map_tip: 'ಲೆಕ್ಕಹಾಕಲಾಗುತ್ತಿದೆ...',
      map_tip_rest: 'ಉತ್ತಮ ನೆಟ್‌ವರ್ಕ್',
      bank_title: '🏦 ಲೈವ್ UPI ಬ್ಯಾಂಕ್ ಸ್ಥಿತಿ',
      bank_sub: 'ನೈಜ-ಸಮಯದ UPI ಸರ್ವರ್ ಆರೋಗ್ಯ — ಪ್ರತಿ ನಿಮಿಷಕ್ಕೂ ಸ್ವಯಂ-ರಿಫ್ರೆಶ್ ಆಗುತ್ತದೆ',
      checker_title: 'ನೆಟ್‌ವರ್ಕ್ ಮತ್ತು UPI ಪರಿಶೀಲಕಕ್ಕೆ ಸ್ವಾಗತ',
      checker_sub: 'ಯಾವುದೇ ಸ್ಥಳಕ್ಕಾಗಿ ನಿಮ್ಮ ನೆಟ್‌ವರ್ಕ್ ಸಿಗ್ನಲ್ ಸಾಮರ್ಥ್ಯ ಮತ್ತು UPI ಪಾವತಿ ವಿಶ್ವಾಸಾರ್ಹತೆಯನ್ನು ಪರಿಶೀಲಿಸಿ.',
      search_placeholder: 'ಸ್ಥಳವನ್ನು ನಮೂದಿಸಿ (ಉದಾ. ಕೋರಮಂಗಲ…)',
      check_btn: 'ಪರಿಶೀಲಿಸಿ',
      recently_checked: '🕐 ಇತ್ತೀಚೆಗೆ ಪರಿಶೀಲಿಸಲಾಗಿದೆ',
      empty_state: 'ಪ್ರಾರಂಭಿಸಲು ಸ್ಥಳವನ್ನು ನಮೂದಿಸಿ',
      analyzing_title: 'ನೆಟ್‌ವರ್ಕ್ ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...',
      analyzing_sub: 'ದಯವಿಟ್ಟು ಕಾಯಿರಿ, ಇದು ಕೆಲವು ಸೆಕೆಂಡುಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳಬಹುದು',
      step1: 'GPS ಸ್ಥಳವನ್ನು ಪಡೆಯಲಾಗುತ್ತಿದೆ...',
      step2: 'ಲೈವ್ ನೆಟ್‌ವರ್ಕ್ ಪರೀಕ್ಷಿಸಲಾಗುತ್ತಿದೆ...',
      step3: 'ಸಿಗ್ನಲ್ ಆರೋಗ್ಯವನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...',
      step4: 'UPI ಯಶಸ್ಸನ್ನು ಊಹಿಸಲಾಗುತ್ತಿದೆ...',
      results_label: 'ಫಲಿತಾಂಶಗಳು',
      location_detected: 'ಸ್ಥಳ ಪತ್ತೆಯಾಗಿದೆ',
      bank_server_status: 'ಬ್ಯಾಂಕ್ ಸರ್ವರ್ ಸ್ಥಿತಿ',
      risk_meter_title: 'ಪಾವತಿ ಅಪಾಯದ ಮೀಟರ್',
      upi_success_chance: 'UPI ಯಶಸ್ಸಿನ ದರ',
      recommendations: 'ಶಿಫಾರಸುಗಳು',
      back_btn: '← ಹಿಂದೆ',
      feedback_btn: 'ಪ್ರತಿಕ್ರಿಯೆ →',
      feedback_label: 'ಪ್ರತಿಕ್ರಿಯೆ',
      fb_question: 'ನಿಮ್ಮ ಪಾವತಿ ಹೇಗೆ ಹೋಯಿತು?',
      outcome_success: 'ಯಶಸ್ವಿ',
      outcome_failed: 'ವಿಫಲವಾಗಿದೆ',
      outcome_pending: 'ಬಾಕಿ ಇದೆ',
      fb_reason: 'ಏನು ತಪ್ಪಾಗಿದೆ?',
      chip_signal: 'ಕಡಿಮೆ ಸಿಗ್ನಲ್',
      chip_timeout: 'ಸಮಯ ಮೀರಿದೆ',
      chip_bank: 'ಬ್ಯಾಂಕ್ ಸರ್ವರ್ ಸ್ಥಗಿತ',
      chip_upi: 'ತಪ್ಪು UPI ಐಡಿ',
      chip_other: 'ಇತರೆ',
      fb_rate: 'ನಿಮ್ಮ ಅನುಭವವನ್ನು ರೇಟ್ ಮಾಡಿ',
      submit_feedback: 'ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಸಲ್ಲಿಸಿ',
      thanks_title: 'ಧನ್ಯವಾದಗಳು!',
      check_another: '🔄 ಇನ್ನೊಂದು ಸ್ಥಳವನ್ನು ಪರಿಶೀಲಿಸಿ',
      nav_home: 'ಮುಖಪುಟ',
      nav_map: 'ನಕ್ಷೆ',
      nav_banks: 'ಬ್ಯಾಂಕ್‌ಗಳು',
      ai_title: 'AI ಸ್ಮಾರ್ಟ್ ಸಲಹೆಗಾರ',
      ai_suggestions_title: '💡 ನೆಟ್‌ವರ್ಕ್ ಬೂಸ್ಟಿಂಗ್ ಸಲಹೆಗಳು',
      ai_tip1: 'ಸಿಗ್ನಲ್ ಸುಧಾರಿಸಲು ಕಿಟಕಿಯ ಹತ್ತಿರ ಹೋಗಿ',
      ai_tip2: 'ಏರ್‌ಪ್ಲೇನ್ ಮೋಡ್ ಆನ್ ಮತ್ತು ಆಫ್ ಮಾಡಿ',
      ai_tip3: 'ಯಶಸ್ಸನ್ನು 25% ಹೆಚ್ಚಿಸಲು ವೈಫೈಗೆ ಬದಲಿಸಿ',
      ai_greeting: 'ನಮಸ್ಕಾರ! ನಿಮ್ಮ ಪಾವತಿ ಅಪಾಯ ಈಗ ಹೆಚ್ಚಾಗಿದೆ. ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?',
      ai_placeholder: 'ಧ್ವನಿ ಇನ್ಪುಟ್... ಅಥವಾ ಟೈಪ್ ಮಾಡಿ',
      ai_q1: 'ನನ್ನ ಪಾವತಿ ಏಕೆ ವಿಫಲವಾಯಿತು?',
      ai_q2: 'ನಾನು ಈಗ ಪಾವತಿ ಮಾಡಬಹುದೇ?',
      regional_alert_title: 'ಪ್ರಾದೇಶಿಕ ವೈಫಲ್ಯದ ಎಚ್ಚರಿకే',
      regional_alert_desc: 'ಕಳೆದ 30 ನಿಮಿಷಗಳಲ್ಲಿ ಹತ್ತಿರದಲ್ಲಿ ಹಲವಾರು ಪಾವತಿ ವೈಫಲ್ಯಗಳು ವರದಿಯಾಗಿವೆ. ಹೆಚ್ಚಿನ ಅಪಾಯ ಪತ್ತೆಯಾಗಿದೆ.',
      upi_high: 'ಹೆಚ್ಚು',
      upi_medium: 'ಮಧ್ಯಮ',
      upi_low: 'ಕಡಿಮೆ',
    },
    hi: {
      ob0_title: 'NetPaySense में आपका स्वागत है',
      ob0_desc: 'भुगतान करने से पहले किसी भी स्थान के लिए नेटवर्क विश्वसनीयता और UPI भुगतान सफलता की संभावनाओं की जांच करें।',
      ob1_title: 'स्मार्ट लोकेशन चेक',
      ob1_desc: 'सिग्नल शक्ति, UPI जोखिम स्तर और बैंक सर्वर स्थिति तुरंत प्राप्त करने के लिए कोई भी स्थान दर्ज करें या GPS का उपयोग करें।',
      ob2_title: '100% निजी',
      ob2_desc: 'कोई भी डेटा सर्वर पर नहीं भेजा जाता है। सब कुछ आपके डिवाइस पर स्थानीय रूप से चलता है। आपकी लोकेशन आपकी ही रहती है।',
      ob_next: 'अगला →',
      ob_skip: "दोबारा न दिखाएं",
      ob_get_started: 'शुरू करें ✓',
      settings_title: 'सेटिंग्स',
      profile_name: 'मेरी प्रोफ़ाइल',
      profile_sub: 'NetPaySense उपयोगकर्ता',
      edit_btn: 'संपादन',
      section_language: 'भाषा',
      lang_label: 'ऐप की भाषा',
      lang_sub: 'अपनी पसंदीदा भाषा चुनें',
      section_appearance: 'दिखावट',
      dark_mode: 'डार्क मोड',
      dark_mode_sub: 'प्रकाश और अंधेरे के बीच स्विच करें',
      section_notifications: 'सूचनाएं',
      notif_risk: 'भुगतान जोखिम अलर्ट',
      notif_risk_sub: 'उच्च जोखिम पर सूचना प्राप्त करें',
      vibration: 'कंपन',
      vibration_sub: 'क्रियाओं पर हैप्टिक फीडबैक',
      section_privacy: 'डेटा और गोपनीयता',
      clear_history: 'खोज इतिहास मिटाएं',
      clear_history_sub: 'सभी हालिया जांच हटा दें',
      show_intro: 'ऐप परिचय दिखाएं',
      show_intro_sub: 'ऑनबोर्डिंग स्लाइड फिर से चलाएं',
      privacy: 'गोपनीयता',
      privacy_sub: 'सारा डेटा आपके डिवाइस पर रहता है',
      local_badge: 'स्थानीय',
      section_about: 'के बारे में',
      app_version: 'ऐप संस्करण',
      rate_app: 'ऐप को रेट करें',
      rate_app_sub: 'हमें बताएं कि आप क्या सोचते हैं',
      contact_support: 'सहायता से संपर्क करें',
      contact_support_sub: 'मदद लें या बग की रिपोर्ट करें',
      header_sub: 'नेटवर्क और UPI चेकर',
      dash_title: '📊 मेरा नेटवर्क डैशबोर्ड',
      dash_sub: 'अपने वर्तमान स्थान की नेटवर्क विश्वसनीयता की जांच करें',
      choose_bank: '🏦 बैंक चुनें',
      check_new_location: '🔍 नया स्थान जांचें',
      geo_btn: '📍 मेरी लोकेशन प्राप्त करें',
      current_location: 'वर्तमान स्थान',
      fetching: 'लोकेशन प्राप्त की जा रही है...',
      network_status: 'नेटवर्क स्थिति',
      signal: 'सिग्नल',
      latency: 'विलंबता',
      speed: 'गति',
      moderate: 'मध्यम',
      excellent: 'उत्कृष्ट',
      good: 'अच्छा',
      poor: 'खराब',
      payment_reliability: 'भुगतान विश्वसनीयता',
      risk_low: 'कम जोखिम',
      risk_mid: 'मध्यम जोखिम',
      risk_high: 'उच्च जोखिम',
      signal_history: 'सिग्नल इतिहास',
      last_5: 'पिछली 5 जांच',
      smart_map: 'स्मार्ट नेटवर्क मानचित्र',
      map_tip: 'गणना की जा रही है...',
      map_tip_rest: 'बेहतर नेटवर्क',
      bank_title: '🏦 लाइव UPI बैंक स्थिति',
      bank_sub: 'वास्तविक समय UPI सर्वर स्वास्थ्य — हर मिनट ऑटो-रिफ्रेश होता है',
      checker_title: 'नेटवर्क और UPI चेकर में आपका स्वागत है',
      checker_sub: 'किसी भी स्थान के लिए अपनी नेटवर्क सिग्नल शक्ति और UPI भुगतान विश्वसनीयता की जांच करें।',
      search_placeholder: 'स्थान दर्ज करें (जैसे कोरमंगला…)',
      check_btn: 'जांचें',
      recently_checked: '🕐 हाल ही में जांचा गया',
      empty_state: 'शुरू करने के लिए एक स्थान दर्ज करें',
      analyzing_title: 'नेटवर्क का विश्लेषण किया जा रहा है...',
      analyzing_sub: 'कृपया प्रतीक्षा करें, इसमें कुछ सेकंड लग सकते हैं',
      step1: 'GPS लोकेशन प्राप्त की जा रही है...',
      step2: 'लाइव नेटवर्क की जांच की जा रही है...',
      step3: 'सिग्नल स्वास्थ्य का विश्लेषण किया जा रहा है...',
      step4: 'UPI सफलता की भविष्यवाणी की जा रही है...',
      results_label: 'परिणाम',
      location_detected: 'लोकेशन का पता चला',
      bank_server_status: 'बैंक सर्वर स्थिति',
      risk_meter_title: 'भुगतान जोखिम मीटर',
      upi_success_chance: 'UPI सफलता दर',
      recommendations: 'सिफारिशें',
      back_btn: '← पीछे',
      feedback_btn: 'फीडबैक →',
      feedback_label: 'फीडबैक',
      fb_question: 'आपका भुगतान कैसा रहा?',
      outcome_success: 'सफल',
      outcome_failed: 'विफल',
      outcome_pending: 'लंबित',
      fb_reason: 'क्या गलत हुआ?',
      chip_signal: 'खराब सिग्नल',
      chip_timeout: 'समय समाप्त',
      chip_bank: 'बैंक सर्वर डाउन',
      chip_upi: 'गलत UPI आईडी',
      chip_other: 'अन्य',
      fb_rate: 'अपने अनुभव को रेट करें',
      submit_feedback: 'फीडबैक सबमिट करें',
      thanks_title: 'धन्यवाद!',
      check_another: '🔄 दूसरा स्थान जांचें',
      nav_home: 'होम',
      nav_map: 'मानचित्र',
      nav_banks: 'बैंक',
      ai_title: 'AI स्मार्ट सलाहकार',
      ai_suggestions_title: '💡 नेटवर्क बूस्टिंग सुझाव',
      ai_tip1: 'सिग्नल सुधारने के लिए खिड़की के पास जाएं',
      ai_tip2: 'एयरप्लेन मोड ऑन और ऑफ करें',
      ai_tip3: 'सफलता को 25% बढ़ाने के लिए वाईफाई पर स्विच करें',
      ai_greeting: 'नमस्ते! आपका भुगतान जोखिम अभी अधिक है। मैं आपकी कैसे सहायता कर सकता हूँ?',
      ai_placeholder: 'वॉयस इनपुट... या टाइप करें',
      ai_q1: 'मेरा भुगतान क्यों विफल हुआ?',
      ai_q2: 'क्या मैं अभी भुगतान कर सकता हूँ?',
      regional_alert_title: 'क्षेत्रीय विफलता अलर्ट',
      regional_alert_desc: 'पिछले 30 मिनट में पास में कई भुगतान विफलताओं की सूचना मिली है। उच्च जोखिम का पता चला है।',
      upi_high: 'उच्च',
      upi_medium: 'मध्यम',
      upi_low: 'निम्न',
    },
    ta: {
      ob0_title: 'NetPaySense-க்கு வரவேற்கிறோம்',
      ob0_desc: 'பணம் செலுத்துவதற்கு முன் எந்த இடத்திற்கும் நெட்வொர்க் நம்பகத்தன்மை மற்றும் UPI கட்டண வெற்றி வாய்ப்புகளைச் சரிபார்க்கவும்.',
      ob1_title: 'ஸ்மார்ட் இருப்பிடச் சரிபார்ப்பு',
      ob1_desc: 'சிக்னல் வலிமை, UPI அபாய நிலை மற்றும் வங்கி சர்வர் நிலையை உடனடியாகப் பெற எந்த இடத்தையும் உள்ளிடவும் அல்லது GPS-ஐப் பயன்படுத்தவும்.',
      ob2_title: '100% தனிப்பட்டது',
      ob2_desc: 'எந்தத் தரவும் சர்வர் அனுப்பப்படுவதில்லை. அனைத்தும் உங்கள் சாதனத்தில் உள்ளூர் ரீதியாக இயங்கும். உங்கள் இருப்பிடம் உங்களுடையதாகவே இருக்கும்.',
      ob_next: 'அடுத்து →',
      ob_skip: "மீண்டும் காட்டாதே",
      ob_get_started: 'தொடங்குங்கள் ✓',
      settings_title: 'அமைப்புகள்',
      profile_name: 'எனது சுயவிவரம்',
      profile_sub: 'NetPaySense பயனர்',
      edit_btn: 'திருத்து',
      section_language: 'மொழி',
      lang_label: 'பயன்பாட்டு மொழி',
      lang_sub: 'உங்களுக்கு விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்',
      section_appearance: 'தோற்றம்',
      dark_mode: 'இருண்ட பயன்முறை',
      dark_mode_sub: 'ஒளி மற்றும் இருளுக்கு இடையில் மாறவும்',
      section_notifications: 'அறிவிப்புகள்',
      notif_risk: 'கட்டண அபாய எச்சரிக்கைகள்',
      notif_risk_sub: 'அதிக அபாயம் குறித்து அறிவிப்பைப் பெறுங்கள்',
      vibration: 'அதிர்வு',
      vibration_sub: 'செயல்களுக்கான ஹேப்டிக் பின்னூட்டம்',
      section_privacy: 'தரவு மற்றும் தனியுரிமை',
      clear_history: 'தேடல் வரலாற்றை அழி',
      clear_history_sub: 'அனைத்து சமீபத்திய சரிபார்ப்புகளையும் அகற்று',
      show_intro: 'பயன்பாட்டு அறிமுகத்தைக் காட்டு',
      show_intro_sub: 'ஆன்போர்டிங் ஸ்லைடுகளை மீண்டும் இயக்கவும்',
      privacy: 'தனியுரிமை',
      privacy_sub: 'அனைத்து தரவும் உங்கள் சாதனத்திலேயே இருக்கும்',
      local_badge: 'உள்ளூர்',
      section_about: 'பற்றி',
      app_version: 'பயன்பாட்டு பதிப்பு',
      rate_app: 'பயன்பாட்டை மதிப்பிடவும்',
      rate_app_sub: 'உங்கள் கருத்தை எங்களுக்குத் தெரிவிக்கவும்',
      contact_support: 'ஆதரவைத் தொடர்பு கொள்ளவும்',
      contact_support_sub: 'உதவி பெறவும் அல்லது பிழையைப் புகாரளிக்கவும்',
      header_sub: 'நெட்வொர்க் மற்றும் UPI செக்கர்',
      dash_title: '📊 எனது நெட்வொர்க் டாஷ்போர்டு',
      dash_sub: 'உங்கள் தற்போதைய இருப்பிடத்தின் நெட்வொர்க் நம்பகத்தன்மையைச் சரிபார்க்கவும்',
      choose_bank: '🏦 வங்கியைத் தேர்ந்தெடுக்கவும்',
      check_new_location: '🔍 புதிய இருப்பிடத்தைச் சரிபார்க்கவும்',
      geo_btn: '📍 எனது இருப்பிடத்தைப் பெறவும்',
      current_location: 'தற்போதைய இருப்பிடம்',
      fetching: 'இருப்பிடம் பெறப்படுகிறது...',
      network_status: 'நெட்வொர்க் நிலை',
      signal: 'சிக்னல்',
      latency: 'தாமதம்',
      speed: 'வேகம்',
      moderate: 'மிதமான',
      excellent: 'சிறந்த',
      good: 'நல்லது',
      poor: 'மோசமான',
      payment_reliability: 'கட்டண நம்பகத்தன்மை',
      risk_low: 'குறைந்த அபாயம்',
      risk_mid: 'நடுத்தர அபாயம்',
      risk_high: 'அதிக அபாயம்',
      signal_history: 'சிக்னல் வரலாறு',
      last_5: 'கடைசி 5 சரிபார்ப்புகள்',
      smart_map: 'ஸ்மார்ட் நெட்வொர்க் வரைபடம்',
      map_tip: 'கணக்கிடப்படுகிறது...',
      map_tip_rest: 'சிறந்த நெட்வொர்க்',
      bank_title: '🏦 நேரலை UPI வங்கி நிலை',
      bank_sub: 'நிகழ்நேர UPI சர்வர் ஆரோக்கியம் — ஒவ்வொரு நிமிடமும் தானாகவே புதுப்பிக்கப்படும்',
      checker_title: 'நெட்வொர்க் மற்றும் UPI செக்கருக்கு வரவேற்கிறோம்',
      checker_sub: 'எந்த இடத்திற்கும் உங்கள் நெட்வொர்க் சிக்னல் வலிமை மற்றும் UPI கட்டண நம்பகத்தன்மையைச் சரிபார்க்கவும்.',
      search_placeholder: 'இருப்பிடத்தை உள்ளிடவும் (எ.கா. கோரமங்களா…)',
      check_btn: 'சரிபார்க்கவும்',
      recently_checked: '🕐 சமீபத்தில் சரிபார்க்கப்பட்டது',
      empty_state: 'தொடங்குவதற்கு ஒரு இருப்பிடத்தை உள்ளிடவும்',
      analyzing_title: 'நெட்வொர்க் பகுப்பாய்வு செய்யப்படுகிறது...',
      analyzing_sub: 'தயவுசெய்து காத்திருக்கவும், இதற்கு சில வினாடிகள் ஆகலாம்',
      step1: 'GPS இருப்பிடம் பெறப்படுகிறது...',
      step2: 'நேரலை நெட்வொர்க் சோதிக்கப்படுகிறது...',
      step3: 'சிக்னல் ஆரோக்கியம் பகுப்பாய்வு செய்யப்படுகிறது...',
      step4: 'UPI வெற்றியை கணிக்கிறது...',
      results_label: 'முடிவுகள்',
      location_detected: 'இருப்பிடம் கண்டறியப்பட்டது',
      bank_server_status: 'வங்கி சர்வர் நிலை',
      risk_meter_title: 'கட்டண அபாய மீட்டர்',
      upi_success_chance: 'UPI வெற்றி விகிதம்',
      recommendations: 'பரிந்துரைகள்',
      back_btn: '← பின்னால்',
      feedback_btn: 'பின்னூட்டம் →',
      feedback_label: 'பின்னூட்டம்',
      fb_question: 'உங்கள் கட்டணம் எப்படி இருந்தது?',
      outcome_success: 'வெற்றி',
      outcome_failed: 'தோல்வி',
      outcome_pending: 'நிலுவையில் உள்ளது',
      fb_reason: 'என்ன தவறு நடந்தது?',
      chip_signal: 'மோசமான சிக்னல்',
      chip_timeout: 'நேரம் முடிந்தது',
      chip_bank: 'வங்கி சர்வர் முடக்கம்',
      chip_upi: 'தவறான UPI ஐடி',
      chip_other: 'மற்றவை',
      fb_rate: 'உங்கள் அனுபவத்தை மதிப்பிடவும்',
      submit_feedback: 'பின்னூட்டத்தைச் சமர்ப்பிக்கவும்',
      thanks_title: 'நன்றி!',
      check_another: '🔄 மற்றொரு இருப்பிடத்தைச் சரிபார்க்கவும்',
      nav_home: 'முகப்பு',
      nav_map: 'வரைபடம்',
      nav_banks: 'வங்கிகள்',
      ai_title: 'AI ஸ்மார்ட் ஆலோசகர்',
      ai_suggestions_title: '💡 நெட்வொர்க் மேம்பாட்டு பரிந்துரைகள்',
      ai_tip1: 'சிக்னலை மேம்படுத்த ஜன்னலுக்கு அருகில் செல்லவும்',
      ai_tip2: 'ஏரோப்ளேன் மோடை ஆன் மற்றும் ஆஃப் செய்யவும்',
      ai_tip3: 'வெற்றியை 25% அதிகரிக்க வைஃபை-க்கு மாறவும்',
      ai_greeting: 'வணக்கம்! உங்கள் கட்டண அபாயம் இப்போது அதிகமாக உள்ளது. நான் உங்களுக்கு எப்படி உதவ முடியும்?',
      ai_placeholder: 'குரல் உள்ளீடு... அல்லது தட்டச்சு செய்யவும்',
      ai_q1: 'எனது கட்டணம் ஏன் தோல்வியடைந்தது?',
      ai_q2: 'நான் இப்போது பணம் செலுத்த முடியுமா?',
      regional_alert_title: 'பிராந்திய தோல்வி எச்சரிக்கை',
      regional_alert_desc: 'கடந்த 30 நிமிடங்களில் அருகில் பல கட்டணத் தோல்விகள் பதிவாகியுள்ளன. அதிக அபாயம் கண்டறியப்பட்டுள்ளது.',
      upi_high: 'அதிகம்',
      upi_medium: 'மிதமான',
      upi_low: 'குறைவு',
    },
    te: {
      ob0_title: 'NetPaySense కి స్వాగతం',
      ob0_desc: 'చెల్లింపు చేయడానికి ముందు ఏదైనా ప్రాంతం కోసం నెట్‌వర్క్ విశ్వసనీయత మరియు UPI చెల్లింపు విజయ అవకాశాలను తనిఖీ చేయండి.',
      ob1_title: 'స్మార్ట్ లొకేషన్ చెక్',
      ob1_desc: 'సిగ్నల్ బలం, UPI రిస్క్ స్థాయి మరియు బ్యాంక్ సర్వర్ స్థితిని తక్షణమే పొందడానికి ఏదైనా ప్రాంతాన్ని నమోదు చేయండి లేదా GPS ఉపయోగించండి.',
      ob2_title: '100% ప్రైవేట్',
      ob2_desc: 'ఏ డేటా సర్వర్‌కు పంపబడదు. అంతా మీ పరికరంలో స్థానికంగా నడుస్తుంది. మీ లొకేషన్ మీ వద్దే ఉంటుంది.',
      ob_next: 'తదుపరి →',
      ob_skip: "మళ్లీ చూపవద్దు",
      ob_get_started: 'ప్రారంభించండి ✓',
      settings_title: 'సెట్టింగ్‌లు',
      profile_name: 'నా ప్రొఫైల్',
      profile_sub: 'NetPaySense వినియోగదారు',
      edit_btn: 'సవరించు',
      section_language: 'భాష',
      lang_label: 'యాప్ భాష',
      lang_sub: 'మీకు నచ్చిన భాషను ఎంచుకోండి',
      section_appearance: 'రూపం',
      dark_mode: 'డార్క్ మోడ్',
      dark_mode_sub: 'కాంతి మరియు చీకటి మధ్య మారండి',
      section_notifications: 'నోటిఫికేషన్‌లు',
      notif_risk: 'చెల్లింపు రిస్క్ హెచ్చరికలు',
      notif_risk_sub: 'అధిక రిస్క్ ఉన్నప్పుడు నోటిఫికేషన్ పొందండి',
      vibration: 'వైబ్రేషన్',
      vibration_sub: 'చర్యలపై హ్యాప్టిక్ ఫీడ్‌బ్యాక్',
      section_privacy: 'డేటా & గోప్యత',
      clear_history: 'శోధన చరిత్రను తుడిచివేయి',
      clear_history_sub: 'అన్ని ఇటీవలి తనిఖీలను తొలగించు',
      show_intro: 'యాప్ పరిచయాన్ని చూపించు',
      show_intro_sub: 'ఆన్‌బోర్డింగ్ స్లైడ్‌లను మళ్లీ ప్లే చేయండి',
      privacy: 'గోప్యత',
      privacy_sub: 'మొత్తం డేటా మీ పరికరంలోనే ఉంటుంది',
      local_badge: 'స్థానికం',
      section_about: 'గురించి',
      app_version: 'యాప్ వెర్షన్',
      rate_app: 'యాప్‌ను రేట్ చేయండి',
      rate_app_sub: 'మీ అభిప్రాయాన్ని మాకు తెలియజేయండి',
      contact_support: 'మద్దతును సంప్రదించండి',
      contact_support_sub: 'సహాయం పొందండి లేదా బగ్‌ను నివేదించండి',
      header_sub: 'నెట్‌వర్క్ & UPI చెకర్',
      dash_title: '📊 నా నెట్‌వర్క్ డ్యాష్‌బోర్డ్',
      dash_sub: 'మీ ప్రస్తుత ప్రాంతం యొక్క నెట్‌వర్క్ విశ్వసనీయతను తనిఖీ చేయండి',
      choose_bank: '🏦 బ్యాంక్ ఎంచుకోండి',
      check_new_location: '🔍 కొత్త ప్రాంతాన్ని తనిఖీ చేయండి',
      geo_btn: '📍 నా లొకేషన్ పొందండి',
      current_location: 'ప్రస్తుత లొకేషన్',
      fetching: 'లొకేషన్ పొందుతోంది...',
      network_status: 'నెట్‌వర్క్ స్థితి',
      signal: 'సిగ్నల్',
      latency: 'లేటెన్సీ',
      speed: 'వేగం',
      moderate: 'ఓ మోస్తరు',
      excellent: 'అద్భుతం',
      good: 'మంచిది',
      poor: 'తక్కువ',
      payment_reliability: 'చెల్లింపు విశ్వసనీయత',
      risk_low: 'తక్కువ రిస్క్',
      risk_mid: 'మధ్యస్థ రిస్క్',
      risk_high: 'అధిక రిస్క్',
      signal_history: 'సిగ్నల్ చరిత్ర',
      last_5: 'చివరి 5 తనిఖీలు',
      smart_map: 'స్మార్ట్ నెట్‌వర్క్ మ్యాప్',
      map_tip: 'లెక్కించబడుతోంది...',
      map_tip_rest: 'మెరుగైన నెట్‌వర్క్',
      bank_title: '🏦 లైవ్ UPI బ్యాంక్ స్థితి',
      bank_sub: 'నిజ-సమయ UPI సర్వర్ ఆరోగ్యం — ప్రతి నిమిషానికి ఆటో-రిఫ్రెష్ అవుతుంది',
      checker_title: 'నెట్‌వర్క్ & UPI చెకర్ కి స్వాగతం',
      checker_sub: 'ఏదైనా ప్రాంతం కోసం మీ నెట్‌వర్క్ సిగ్నల్ బలం మరియు UPI చెల్లింపు విశ్వసనీయతను తనిఖీ చేయండి.',
      search_placeholder: 'ప్రాంతాన్ని నమోదు చేయండి (ఉదా. కోరమంగళ…)',
      check_btn: 'తనిఖీ చేయండి',
      recently_checked: '🕐 ఇటీవలి తనిఖీలు',
      empty_state: 'ప్రారంభించడానికి ఒక ప్రాంతాన్ని నమోదు చేయండి',
      analyzing_title: 'నెట్‌వర్క్ విశ్లేషించబడుతోంది...',
      analyzing_sub: 'దయచేసి వేచి ఉండండి, ఇది కొన్ని సెకన్లు పట్టవచ్చు',
      step1: 'GPS లొకేషన్ పొందుతోంది...',
      step2: 'లైవ్ నెట్‌వర్క్ తనిఖీ చేస్తోంది...',
      step3: 'సిగ్నల్ ఆరోగ్యాన్ని విశ్లేషిస్తోంది...',
      step4: 'UPI విజయాన్ని అంచనా వేస్తోంది...',
      results_label: 'ఫలితాలు',
      location_detected: 'లొకేషన్ గుర్తించబడింది',
      bank_server_status: 'బ్యాంక్ సర్వర్ స్థితి',
      risk_meter_title: 'చెల్లింపు రిస్క్ మీటర్',
      upi_success_chance: 'UPI విజయవంతమైన రేటు',
      recommendations: 'సిఫార్సులు',
      back_btn: '← వెనుకకు',
      feedback_btn: 'అభిప్రాయం →',
      feedback_label: 'అభిప్రాయం',
      fb_question: 'మీ చెల్లింపు ఎలా జరిగింది?',
      outcome_success: 'విజయవంతమైంది',
      outcome_failed: 'వైఫల్యం',
      outcome_pending: 'పెండింగ్‌లో ఉంది',
      fb_reason: 'ఏమి తప్పు జరిగింది?',
      chip_signal: 'తక్కువ సిగ్నల్',
      chip_timeout: 'సమయం ముగిసింది',
      chip_bank: 'బ్యాంక్ సర్వర్ డౌన్',
      chip_upi: 'తప్పు UPI ఐడి',
      chip_other: 'ఇతర',
      fb_rate: 'మీ అనుభవాన్ని రేట్ చేయండి',
      submit_feedback: 'అభిప్రాయాన్ని సమర్పించండి',
      thanks_title: 'ధన్యవాదాలు!',
      check_another: '🔄 మరొక ప్రాంతాన్ని తనిఖీ చేయండి',
      nav_home: 'హోమ్',
      nav_map: 'మ్యాప్',
      nav_banks: 'బ్యాంకులు',
      ai_title: 'AI స్మార్ట్ సలహాదారు',
      ai_suggestions_title: '💡 నెట్‌వర్క్ బూస్టింగ్ సలహాలు',
      ai_tip1: 'సిగ్నల్ మెరుగుపరచడానికి కిటికీ దగ్గరకు వెళ్లండి',
      ai_tip2: 'ఏరోప్లేన్ మోడ్ ఆన్ మరియు ఆఫ్ చేయండి',
      ai_tip3: 'విజయాన్ని 25% పెంచడానికి వైఫైకి మారండి',
      ai_greeting: 'నమస్కారం! మీ చెల్లింపు రిస్క్ ఇప్పుడు ఎక్కువగా ఉంది. నేను మీకు ఎలా సహాయపడగలను?',
      ai_placeholder: 'వాయిస్ ఇన్‌పుట్... లేదా టైప్ చేయండి',
      ai_q1: 'నా చెల్లింపు ఎందుకు విఫలమైంది?',
      ai_q2: 'నేను ఇప్పుడు చెల్లింపు చేయవచ్చా?',
      regional_alert_title: 'ప్రాంతీయ వైఫల్యం హెచ్చరిక',
      regional_alert_desc: 'గత 30 నిమిషాల్లో సమీపంలో అనేక చెల్లింపు వైఫల్యాలు నివేదించబడ్డాయి. అధిక రిస్క్ గుర్తించబడింది.',
      upi_high: 'అధికం',
      upi_medium: 'మధ్యస్థం',
      upi_low: 'తక్కువ',
    }
  };

  window.REC_TRANSLATIONS = {
    en: {
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
      ]
    },
    kn: {
      good: [
        { icon: '📱', text: '<strong>Airtel / Jio ಬಳಸಿ</strong> — ನೆಟ್‌ವರ್ಕ್ ಸ್ಥಿರ ಮತ್ತು ವೇಗವಾಗಿದೆ' },
        { icon: '✅', text: '<strong>ಈಗ UPI ಪಾವತಿ ಮಾಡಲು ಸುರಕ್ಷಿತವಾಗಿದೆ</strong>' },
        { icon: '⚡', text: '<strong>ವೇಗದ ವಹಿವಾಟುಗಳು</strong> 5 ಸೆಕೆಂಡುಗಳ ಒಳಗೆ ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ' },
        { icon: '🔒', text: '<strong>ಕಡಿಮೆ ಅಪಾಯ</strong> ಪಾವತಿ ವಿಫಲ ಅಥವಾ ಸಮಯ ಮೀರಿದ ಸಾಧ್ಯತೆ ಕಡಿಮೆ' },
      ],
      mid: [
        { icon: '🔄', text: '<strong>ಉತ್ತಮ ನೆಟ್‌ವರ್ಕ್‌ಗಾಗಿ Jio ಗೆ ಬದಲಿಸಿ</strong>' },
        { icon: '⏱️', text: '<strong>10-15 ನಿಮಿಷ ಕಾಯಿರಿ</strong> ಮತ್ತು ಪಾವತಿಯನ್ನು ಮರುಪ್ರಯತ್ನಿಸಿ' },
        { icon: '💵', text: '<strong>ನಗದನ್ನು ಬ್ಯಾಕಪ್ ಆಗಿ ಇಟ್ಟುಕೊಳ್ಳಿ</strong> ಒಂದು ವೇಳೆ ಪಾವತಿ ವಿಫಲವಾದರೆ' },
      ],
      poor: [
        { icon: '🔄', text: '<strong>ಉತ್ತಮ ವ್ಯಾಪ್ತಿಗಾಗಿ Vi / BSNL ಗೆ ಬದಲಿಸಿ</strong>' },
        { icon: '⏱️', text: '<strong>10-15 ನಿಮಿಷ ಕಾಯಿರಿ</strong> ಮತ್ತು ಪಾವತಿಯನ್ನು ಮರುಪ್ರಯತ್ನಿಸಿ' },
        { icon: '💵', text: '<strong>ನಗದನ್ನು ಬ್ಯಾಕಪ್ ಆಗಿ ಇಟ್ಟುಕೊಳ್ಳಿ</strong> - ಪಾವತಿ ವಿಫಲವಾಗುವ ಸಾಧ್ಯತೆ ಹೆಚ್ಚು' },
      ]
    },
    hi: {
      good: [
        { icon: '📱', text: '<strong>Airtel / Jio का उपयोग करें</strong> — नेटवर्क स्थिर और तेज़ है' },
        { icon: '✅', text: '<strong>अभी UPI भुगतान करना सुरक्षित है</strong>' },
        { icon: '⚡', text: '<strong>तेज़ लेनदेन</strong> 5 सेकंड के भीतर अपेक्षित' },
        { icon: '🔒', text: '<strong>कम जोखिम</strong> भुगतान विफलता या टाइमआउट की कम संभावना' },
      ],
      mid: [
        { icon: '🔄', text: '<strong>बेहतर स्थिरता के लिए Jio पर स्विच करें</strong>' },
        { icon: '⏱️', text: '<strong>10-15 मिनट प्रतीक्षा करें</strong> और पुनः प्रयास करें' },
        { icon: '💵', text: '<strong>बैकअप के रूप में नकद रखें</strong> यदि भुगतान विफल हो जाता है' },
      ],
      poor: [
        { icon: '🔄', text: '<strong>बेहतर कवरेज के लिए Vi / BSNL पर स्विच करें</strong>' },
        { icon: '⏱️', text: '<strong>10-15 मिनट प्रतीक्षा करें</strong> और पुनः प्रयास करें' },
        { icon: '💵', text: '<strong>बैकअप के रूप में नकद रखें</strong> - भुगतान विफल होने की संभावना अधिक है' },
      ]
    },
    ta: {
      good: [
        { icon: '📱', text: '<strong>Airtel / Jio-ஐப் பயன்படுத்தவும்</strong> — நெட்வொர்க் நிலையானது மற்றும் வேகமானது' },
        { icon: '✅', text: '<strong>இப்போது UPI பணம் செலுத்த பாதுகாப்பானது</strong>' },
        { icon: '⚡', text: '<strong>வேகமான பரிவர்த்தனைகள்</strong> 5 வினாடிகளுக்குள் எதிர்பார்க்கப்படுகிறது' },
        { icon: '🔒', text: '<strong>குறைந்த அபாயம்</strong> கட்டணம் தோல்வியடைய அல்லது காலாவதியாக வாய்ப்பு குறைவு' },
      ],
      mid: [
        { icon: '🔄', text: '<strong>சிறந்த நெட்வொர்க் நிலைத்தன்மைக்கு Jio-க்கு மாறவும்</strong>' },
        { icon: '⏱️', text: '<strong>10-15 நிமிடங்கள் காத்திருக்கவும்</strong> மீண்டும் முயற்சிக்கவும்' },
        { icon: '💵', text: '<strong>பணம் கையில் வைத்திருக்கவும்</strong> கட்டணம் தோல்வியடைந்தால் பயன்படுத்த' },
      ],
      poor: [
        { icon: '🔄', text: '<strong>சிறந்த கவரேஜுக்கு Vi / BSNL-க்கு மாறவும்</strong>' },
        { icon: '⏱️', text: '<strong>10-15 நிமிடங்கள் காத்திருக்கவும்</strong> மீண்டும் முயற்சிக்கவும்' },
        { icon: '💵', text: '<strong>பணம் கையில் வைத்திருக்கவும்</strong> - கட்டணம் தோல்வியடைய வாய்ப்பு அதிகம்' },
      ]
    },
    te: {
      good: [
        { icon: '📱', text: '<strong>Airtel / Jio ని ఉపయోగించండి</strong> — నెట్‌వర్క్ స్థిరంగా మరియు వేగంగా ఉంది' },
        { icon: '✅', text: '<strong>ఇప్పుడు UPI చెల్లింపు చేయడం సురక్షితం</strong>' },
        { icon: '⚡', text: '<strong>వేగవంతమైన లావాదేవీలు</strong> 5 సెకన్లలోపు ఆశించవచ్చు' },
        { icon: '🔒', text: '<strong>తక్కువ రిస్క్</strong> చెల్లింపు వైఫల్యం లేదా టైమౌట్ అయ్యే అవకాశం తక్కువ' },
      ],
      mid: [
        { icon: '🔄', text: '<strong>మెరుగైన స్థిరత్వం కోసం Jio కి మారండి</strong>' },
        { icon: '⏱️', text: '<strong>10-15 నిమిషాలు వేచి ఉండండి</strong> మళ్ళీ ప్రయత్నించండి' },
        { icon: '💵', text: '<strong>బ్యాకప్‌గా నగదు ఉంచుకోండి</strong> ఒకవేళ చెల్లింపు విఫలమైతే' },
      ],
      poor: [
        { icon: '🔄', text: '<strong>మెరుగైన కవరేజీ కోసం Vi / BSNL కి మారండి</strong>' },
        { icon: '⏱️', text: '<strong>10-15 నిమిషాలు వేచి ఉండండి</strong> మళ్ళీ ప్రయత్నించండి' },
        { icon: '💵', text: '<strong>బ్యాకప్‌గా నగదు ఉంచుకోండి</strong> - చెల్లింపు విఫలమయ్యే అవకాశం ఉంది' },
      ]
    }
  };

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

// ── Multilingual Engine (v4.2) ──
let currentLang = localStorage.getItem('nps_lang') || 'en';

function T(key) {
  return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) || (TRANSLATIONS['en'][key]) || key;
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.innerHTML = T(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = T(key);
  });

  // Update Font Family based on language
  const fonts = {
    kn: "'Noto Sans Kannada', sans-serif",
    hi: "'Noto Sans Devanagari', sans-serif",
    ta: "'Noto Sans Tamil', sans-serif",
    te: "'Noto Sans Telugu', sans-serif",
    en: "'Inter', sans-serif"
  };
  document.body.style.fontFamily = fonts[currentLang] || fonts.en;

  // Sync Selectors
  const headerSel = document.getElementById('header-lang-select');
  const settingsSel = document.getElementById('settings-lang-select');
  if (headerSel) headerSel.value = currentLang;
  if (settingsSel) settingsSel.value = currentLang;
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('nps_lang', lang);
  applyTranslations();

  // Update dynamic content if results are visible
  if (currentSig) {
    populateSignal(currentSig);
    populateRecs(currentSig.tier);
  }
  renderRecents();
}

/**
 * 🔥 Fallback Translation for Place Names
 * If Nominatim returns an English name for an Indic language mode, 
 * we use MyMemory API to transliterate/translate it.
 */
async function translateIfNeeded(text, targetLang) {
  if (!text || targetLang === 'en') return text;

  // Check if text is already localized (contains non-Latin characters)
  const isLocalized = /[^\u0000-\u007F]/.test(text);
  if (isLocalized) return text;

  try {
    const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`);
    const data = await res.json();
    if (data.responseData && data.responseData.translatedText) {
      return data.responseData.translatedText;
    }
  } catch (err) {
    console.warn("Translation fallback failed:", err);
  }
  return text;
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

  const cx = W / 2, cy = H - 15, r = 75;
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
    riskStatus = T('risk_high');
  } else if (riskValue > 15) {
    riskColor = '#f59e0b'; // Amber for Medium Risk
    riskStatus = T('risk_mid');
  } else {
    riskStatus = T('risk_low');
  }

  // Draw the progress arc up to the needle

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
  ctx.font = `700 10px ${document.body.style.fontFamily}`;
  ctx.fillStyle = '#94a3b8';

  // Move labels to the OUTSIDE of the meter lines
  ctx.textAlign = 'right';
  ctx.fillText(T('risk_low'), cx - r - 10, cy - 2);
  ctx.textAlign = 'left';
  ctx.fillText(T('risk_high'), cx + r + 10, cy - 2);

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
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=${currentLang}`);
        const data = await res.json();
        const a = data.address;
        const area = a.suburb || a.neighbourhood || a.village || a.hamlet || '';
        const city = a.city || a.town || a.municipality || '';

        if (area) {
          name = area;
        } else if (city) {
          name = city;
        } else {
          name = a.state_district || a.county || name;
        }

        // 🔥 Dynamic Fallback Translation
        name = await translateIfNeeded(name, currentLang);
      } catch { }

      // 🛰️ Run Pulse Test
      let liveMetrics = null;
      btn.textContent = T('analyzing_title');
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
  btn.textContent = T('geo_btn');
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
  btn.textContent = '...';
  btn.disabled = true;
  document.getElementById('empty-state').classList.add('hidden');
  resetFeedbackUI(); // 🔥 Reset feedback state for new test
  goStep(2);
  runAnalyzing(raw, btn);
}

function runCheckWithCoords(name, lat, lng, liveMetrics = null) {
  const btn = document.getElementById('check-btn');
  btn.textContent = '...';
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
      const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1&accept-language=${currentLang}`);
      const geoData = await geoRes.json();
      if (!geoData.length) throw new Error('Location not found. Try adding the district name.');
      lat = parseFloat(geoData[0].lat);
      lon = parseFloat(geoData[0].lon);

      // Update name to localized display name if possible
      if (geoData[0].display_name) {
        const parts = geoData[0].display_name.split(',');
        raw = parts[0]; // Take the primary name

        // 🔥 Dynamic Fallback Translation
        raw = await translateIfNeeded(raw, currentLang);
      }
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

    // Update the master score for bank/gauge sync
    if (data.upi) {
      const match = data.upi.match(/(\d+(\.\d+)?)(?=%)/);
      if (match) lastNetworkScore = parseFloat(match[1]);
    }

    currentSig = {
      tier: data.tier,
      label: data.label,
      upi: data.upi,
      badge: data.badge,
      dbm: data.dbm,
      type: data.type,
      metrics: data.metrics,
      best_network: data.best_network,
      serverVersion: data.server_version || "v4.1"
    };
    currentLat = data.lat;
    currentLng = data.lon;

    setTimeout(() => {
      try {
        document.getElementById('loc-name').textContent = raw;
        document.getElementById('loc-coords').textContent = `${data.lat.toFixed(4)}, ${data.lon.toFixed(4)}`;
        populateSignal(currentSig);
        showResultsBankStatus();

        const alertBanner = document.getElementById('community-alert-banner');
        if (alertBanner) {
          if (data.community_alert) alertBanner.classList.remove('hidden');
          else alertBanner.classList.add('hidden');
        }

        saveRecent(raw, { lat: data.lat, lng: data.lon }, currentSig);
        btn.textContent = T('check_btn'); btn.disabled = false;

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

    // Update the master score for bank/gauge sync
    if (data.upi) {
      const match = data.upi.match(/(\d+(\.\d+)?)(?=%)/);
      if (match) lastNetworkScore = parseFloat(match[1]);
    }

    // Update smart map with prediction data
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
      best_network: data.best_network,
      serverVersion: data.server_version || "v4.1"
    };

    setTimeout(() => {
      try {
        document.getElementById('loc-name').textContent = name;
        document.getElementById('loc-coords').textContent = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
        populateSignal(currentSig);
        showResultsBankStatus();

        const alertBanner = document.getElementById('community-alert-banner');
        if (alertBanner) {
          if (data.community_alert) alertBanner.classList.remove('hidden');
          else alertBanner.classList.add('hidden');
        }

        saveRecent(name, { lat, lng }, currentSig);
        btn.textContent = T('check_btn'); btn.disabled = false;

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

  // 1. Master Tier-based translation (Most Reliable)
  let key = 'upi_medium';
  if (sig.tier === 'good') key = 'upi_high';
  else if (sig.tier === 'poor') key = 'upi_low';

  const translatedLevel = T(key);

  // 2. Extract percentage safely from the backend string
  let percent = '—';
  if (sig.upi && sig.upi.includes('%')) {
    const matches = sig.upi.match(/(\d+(\.\d+)?)(?=%)/);
    if (matches) percent = matches[0] + '%';
  }

  upiVal.textContent = `${translatedLevel} - ${percent}`;

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

  // Pass operator to recommendations
  populateRecs(sig.tier, sig.best_network);
}

function populateRecs(tier, operator) {
  const list = document.getElementById('rec-list');
  list.innerHTML = '';
  const langRecs = REC_TRANSLATIONS[currentLang] || REC_TRANSLATIONS.en;
  
  console.log("DEBUG: populating recs for tier:", tier, "with operator:", operator);

  langRecs[tier].forEach(r => {
    let text = r.text;
    // Dynamically replace generic operator with real OpenCellID data using Regex for robustness
    if (operator && operator !== 'Unknown') {
      text = text.replace(/Airtel \/ Jio/g, operator);
      text = text.replace(/Vi \/ BSNL/g, operator);
    }

    const li = document.createElement('li');
    li.innerHTML = `<div class="rec-icon-box">${r.icon}</div><span>${text}</span>`;
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
    if (section) section.classList.add('hidden');
    if (empty) empty.classList.remove('hidden');
    return;
  }

  if (section) section.classList.remove('hidden');
  if (empty) empty.classList.add('hidden');

  list.innerHTML = recents.map(r => {
    const badgeText = T(r.tier === 'good' ? 'risk_low' : r.tier === 'mid' ? 'risk_mid' : 'risk_high');
    return `
      <div class="recent-item" onclick="runCheckWithCoords('${r.name}', ${r.lat}, ${r.lng})">
        <div class="recent-left">
          <span class="recent-icon">📍</span>
          <div>
            <div class="recent-name">${r.name}</div>
            <div class="recent-coords">${r.lat.toFixed(3)}, ${r.lng.toFixed(3)}</div>
          </div>
        </div>
        <div class="recent-badge ${r.tier}">${badgeText}</div>
      </div>`;
  }).join('');
}

// ── Initialization (v4.2) ──
window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initOnboarding();
  initCustomDropdown();
  initScrollTop();
  renderRecents();
  refreshBankStatus();
  applyTranslations(); // 🔥 Initial translation apply

  // Auto-refresh bank status every 60s
  setInterval(refreshBankStatus, 60000);
});


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
        lat: currentLat,
        lon: currentLng,
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
  }).addTo(map).bindPopup(`<b>${T('smart_map')}</b><br>${Math.round(dist)}m`);

  const distText = document.getElementById('smart-distance');
  if (distText) {
    if (dist < 20) {
      distText.textContent = T('map_tip_rest');
    } else {
      const moveLabel = currentLang === 'en' ? 'Move' : ''; // Or customize per language
      distText.textContent = `${moveLabel} ${Math.round(dist)}m`;
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