 // Smooth scroll to features section
    function scrollToSection(id) {
      document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    }

    // Add header shadow on scroll
    window.addEventListener('scroll', () => {
      const header = document.querySelector('header');
      if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
      } else {
        header.style.boxShadow = 'none';
      }
    });
  <script>
// ===== HEADER SHADOW =====
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  header.style.boxShadow = window.scrollY > 50 ? "0 2px 10px rgba(0,0,0,0.2)" : "none";
});

// ===== GOOGLE TRANSLATE SETUP =====
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "en",
      includedLanguages: "en,hi,pa,ta,te,mr,bn",
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
    },
    "google_translate_element"
  );
}

// Load Google Translate Script
(function loadGoogleTranslate() {
  const script = document.createElement("script");
  script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  document.body.appendChild(script);
})();

// ===== MANUAL LANGUAGE SWITCH =====
const langSelect = document.getElementById("languageSelect");
langSelect.addEventListener("change", () => {
  const lang = langSelect.value;
  setTimeout(() => {
    const iframe = document.querySelector("iframe.goog-te-menu-frame");
    if (!iframe) return alert("Translator still loading... please wait a moment.");

    const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    const langs = innerDoc.querySelectorAll(".goog-te-menu2-item span.text");

    langs.forEach((el) => {
      if (el.innerText.toLowerCase().includes(lang.toLowerCase())) {
        el.click();
      }
    });
  }, 500);
});

// ===== VOICE ASSISTANT =====
const voiceBtn = document.getElementById("voiceBtn");
const voiceResponse = document.getElementById("voiceResponse");

voiceBtn.addEventListener("click", () => {
  if (!("webkitSpeechRecognition" in window)) {
    alert("Your browser doesn't support voice recognition.");
    return;
  }

  const recognition = new webkitSpeechRecognition();
  const selectedLang = langSelect.value === "hi" ? "hi-IN" : "en-IN";
  recognition.lang = selectedLang;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();
  voiceBtn.textContent = "🎧 Listening...";

  recognition.onresult = (event) => {
    const command = event.results[0][0].transcript.toLowerCase();
    handleVoiceCommand(command);
  };

  recognition.onerror = () => {
    voiceBtn.textContent = "🎤";
  };

  recognition.onend = () => {
    voiceBtn.textContent = "🎤";
  };
});

function handleVoiceCommand(command) {
  let response = "";
  
  // Dynamic content detection
  if (window.location.href.includes("weather")) {
    const temp = document.querySelector(".temp")?.textContent || "25°C";
    const cond = document.querySelector(".condition")?.textContent || "clear sky";
    response = `The current temperature is ${temp}, and weather is ${cond}.`;
  } else if (window.location.href.includes("smartcrop")) {
    const crop = document.querySelector(".recommended-crop")?.textContent || "Wheat";
    response = `Based on your soil and temperature, ${crop} is recommended.`;
  } else if (window.location.href.includes("soil")) {
    const fertility = document.querySelector(".fertility")?.textContent || "medium";
    response = `Your soil fertility is ${fertility}. It’s suitable for pulses and cereals.`;
  } else if (command.includes("weather")) {
    response = "Go to the Weather page to check temperature and rain forecast.";
  } else if (command.includes("crop")) {
    response = "Visit Smart Crop Recommendation to know which crops you can grow.";
  } else if (command.includes("soil")) {
    response = "Check the Soil Health page for fertility and nutrient insights.";
  } else {
    response = "Sorry, I didn’t understand. Try asking about weather, crops, or soil.";
  }

  showVoiceResponse(response);
  speakResponse(response);
}

// ===== Helper Functions =====
function showVoiceResponse(text) {
  voiceResponse.textContent = text;
  voiceResponse.style.display = "block";
  setTimeout(() => (voiceResponse.style.display = "none"), 8000);
}

function speakResponse(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = langSelect.value === "hi" ? "hi-IN" : "en-IN";
  window.speechSynthesis.speak(utter);
}
</script>
