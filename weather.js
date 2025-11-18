function getAdvice() {
  const temp = parseFloat(document.getElementById("tempInput").value);
  const rain = document.getElementById("rainInput").value;
  const result = document.getElementById("adviceResult");

  if (isNaN(temp) || !rain) {
    result.innerHTML = "⚠️ Please enter both temperature and rain chance.";
    return;
  }

  let cropAdvice = "";
  let rainAdvice = "";

  // 🌡️ Temperature-based crop advice
  if (temp >= 10 && temp <= 20) {
    cropAdvice = "🥔 Best crops: Potato, Carrot, Cabbage.";
  } else if (temp > 20 && temp <= 28) {
    cropAdvice = "🌾 Great for Wheat, Maize, Rice, and Soybean.";
  } else if (temp > 28 && temp <= 35) {
    cropAdvice = "🌻 Suitable for Cotton, Sugarcane, Groundnut.";
  } else {
    cropAdvice = "⚠️ Extreme temperature! Use protective measures like shade nets or irrigation.";
  }

  // 🌧️ Rain protection advice
  if (rain === "no") {
    rainAdvice = "☀️ No rain — maintain regular irrigation and monitor soil dryness.";
  } else if (rain === "low") {
    rainAdvice = "🌦️ Light rain — reduce irrigation and check soil moisture.";
  } else if (rain === "high") {
    rainAdvice =
      "🌧️ Heavy rain expected — improve field drainage, use raised beds, and cover young crops.";
  }

  result.innerHTML = `
    <strong>🌡️ Temperature:</strong> ${temp}°C<br>
    <strong>🌾 Crop Suggestion:</strong> ${cropAdvice}<br>
    <strong>🌧️ Rain Advice:</strong> ${rainAdvice}
  `;
}


