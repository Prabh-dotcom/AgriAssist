async function getRainPrediction() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherInfo = document.getElementById("weatherInfo");
  const rainAdvice = document.getElementById("rainAdvice");

  if (!city) {
    weatherInfo.innerHTML = "<h2>⚠️ Please enter a city name.</h2>";
    return;
  }

  const apiKey = "7558ab5ea690ce52340a8c17cd3685c0";

  try {
    // Step 1: Get coordinates of the city
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();

    if (!geoData.length) {
      weatherInfo.innerHTML = `<h2>❌ City not found. Try again.</h2>`;
      return;
    }

    const { lat, lon, name, country } = geoData[0];

    // Step 2: Get weather + rain data
    const rainUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const rainRes = await fetch(rainUrl);
    const rainData = await rainRes.json();

    const current = rainData.list[0];
    const rainNextHours = rainData.list.slice(0, 8); // next 24h
    let rainProbability = 0;

    rainNextHours.forEach((hour) => {
      if (hour.pop) rainProbability += hour.pop; // pop = probability of precipitation (0–1)
    });
    rainProbability = Math.round((rainProbability / rainNextHours.length) * 100);

    const temp = current.main.temp;
    const humidity = current.main.humidity;
    const desc = current.weather[0].description;

    weatherInfo.innerHTML = `
      <h2>${name}, ${country}</h2>
      <div class="weather-details">
        <p>🌡️ Temperature: ${temp}°C</p>
        <p>💧 Humidity: ${humidity}%</p>
        <p>🌥️ Condition: ${desc}</p>
        <p class="rain-prob">🌧️ Rain Probability (Next 24h): ${rainProbability}%</p>
      </div>
    `;

    // Step 3: Smart advice
    let advice = "";
    if (rainProbability < 20) {
      advice = "☀️ Low rain chance — continue irrigation as usual.";
    } else if (rainProbability >= 20 && rainProbability < 60) {
      advice = "🌦️ Moderate rain chance — monitor soil moisture and drainage.";
    } else {
      advice = "🌧️ High rain chance — prepare drainage and protect young crops!";
    }

    rainAdvice.innerHTML = `
      <h3>🌾 Weather-based Farming Tips</h3>
      <p>${advice}</p>
    `;

  } catch (err) {
    console.error(err);
    weatherInfo.innerHTML = "<h2>⚠️ Error fetching weather data.</h2>";
  }
}
