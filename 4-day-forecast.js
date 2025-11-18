const apiKey = "7558ab5ea690ce52340a8c17cd3685c0";

async function getForecast() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return; // No alert, just skip if empty

  try {
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    const forecastRes = await fetch(forecastURL);
    const forecastData = await forecastRes.json();

    if (forecastData.cod !== "200") return;

    // Update city name
    document.getElementById("cityName").textContent = `${forecastData.city.name}, ${forecastData.city.country}`;

    // Extract 4 unique days
    const forecastContainer = document.getElementById("forecastCards");
    forecastContainer.innerHTML = "";

    const days = {};

    forecastData.list.forEach(f => {
      const date = f.dt_txt.split(" ")[0];
      if (!days[date]) days[date] = f;
    });

    const next4Days = Object.keys(days).slice(1, 5); // skip today

    next4Days.forEach(day => {
      const f = days[day];
      const card = document.createElement("div");
      card.className = "forecast-card";
      card.innerHTML = `
        <h4>${new Date(day).toLocaleDateString("en-US", { weekday: "short" })}</h4>
        <img src="https://openweathermap.org/img/wn/${f.weather[0].icon}@2x.png" alt="icon">
        <p>${Math.round(f.main.temp)}°C</p>
        <p>${f.weather[0].main}</p>
      `;
      forecastContainer.appendChild(card);
    });
  } catch (err) {
    console.error("Error fetching forecast:", err);
  }
}
