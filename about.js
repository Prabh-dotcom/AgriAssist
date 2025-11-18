// FAQ Toggle with arrow rotation
document.querySelectorAll(".faq-question").forEach(q => {
  q.addEventListener("click", () => {
    const p = q.nextElementSibling;
    const arrow = q.querySelector(".arrow");
    const open = p.style.display === "block";

    // Collapse all
    document.querySelectorAll(".faq-item p").forEach(item => item.style.display = "none");
    document.querySelectorAll(".arrow").forEach(a => a.style.transform = "rotate(0deg)");

    // Expand selected
    if (!open) {
      p.style.display = "block";
      arrow.style.transform = "rotate(180deg)";
    }
  });
});

// Chatbot Toggle
const chatToggle = document.getElementById("chatToggle");
const chatbot = document.getElementById("chatbot");
const closeChat = document.getElementById("closeChat");

chatToggle.addEventListener("click", () => {
  chatbot.style.display = chatbot.style.display === "flex" ? "none" : "flex";
});

closeChat.addEventListener("click", () => {
  chatbot.style.display = "none";
});

// Chatbot Logic
const chatBody = document.getElementById("chatBody");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");

const responses = {
  hello: "Hi there! 👋 How can I help you?",
  weather: "You can check the weather forecast on our Weather page 🌤️.",
  crop: "Visit Smart Crop Recommendation to know the best crops for your soil 🌱.",
  soil: "Our Soil Health section can analyze fertility and give suggestions 🌾.",
  market: "Market Prices are available on the Market page with live mandi data 💰.",
  default: "I'm here to help! Try asking about weather, crops, soil, or market prices."
};

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add(sender === "bot" ? "bot-message" : "user-message");
  msg.textContent = text;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

sendBtn.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const text = chatInput.value.trim().toLowerCase();
  if (!text) return;

  addMessage(text, "user");
  chatInput.value = "";

  let response = responses.default;
  for (const key in responses) {
    if (text.includes(key)) {
      response = responses[key];
      break;
    }
  }
  setTimeout(() => addMessage(response, "bot"), 600);
}

