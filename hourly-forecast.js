const apiKey = "7558ab5ea690ce52340a8c17cd3685c0";

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return; // no alerts

  try {
    const [weatherRes, forecastRes] = await Promise.all([
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`),
      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
    ]);

    const weatherData = await weatherRes.json();
    const forecastData = await forecastRes.json();
    if (weatherData.cod !== 200) return;

    // Air Quality
    const { lon, lat } = weatherData.coord;
    const airRes = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );
    const airData = await airRes.json();
    const airQualityLevels = ["Good 😊", "Fair 🙂", "Moderate 😐", "Poor 😷", "Very Poor 😵"];
    document.getElementById("airQuality").textContent =
      airQualityLevels[airData.list[0].main.aqi - 1];

    // Current Weather
    document.getElementById("cityName").textContent = `${weatherData.name}, ${weatherData.sys.country}`;
    document.getElementById("temperature").textContent = `${Math.round(weatherData.main.temp)}°C`;
    document.getElementById("description").textContent = weatherData.weather[0].description;
    document.getElementById("humidity").textContent = `${weatherData.main.humidity}%`;
    document.getElementById("wind").textContent = `${weatherData.wind.speed} km/h`;
    document.getElementById("precip").textContent = `${weatherData.rain ? weatherData.rain["1h"] || 0 : 0} mm`;

    // Hourly Forecast
    const hourlyContainer = document.getElementById("hourlyCards");
    hourlyContainer.innerHTML = "";
    const next12Hours = forecastData.list.slice(0, 12);

    next12Hours.forEach((hour) => {
      const time = new Date(hour.dt_txt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      });
      const card = document.createElement("div");
      card.className = "hourly-card";
      card.innerHTML = `
        <h4>${time}</h4>
        <img src="https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png" alt="">
        <p>${Math.round(hour.main.temp)}°C</p>
        <small>${hour.weather[0].main}</small>
      `;
      hourlyContainer.appendChild(card);
    });

    createHourlyChart(next12Hours);

    // 4-Day Forecast (Separate Div)
    const forecastContainer = document.getElementById("forecastCards");
    forecastContainer.innerHTML = "";
    const days = {};
    forecastData.list.forEach((f) => {
      const date = f.dt_txt.split(" ")[0];
      if (!days[date]) days[date] = f;
    });

    Object.keys(days)
      .slice(1, 5)
      .forEach((day) => {
        const f = days[day];
        const card = document.createElement("div");
        card.className = "forecast-card";
        card.innerHTML = `
          <h4>${new Date(day).toLocaleDateString("en-US", { weekday: "short" })}</h4>
          <img src="https://openweathermap.org/img/wn/${f.weather[0].icon}@2x.png" alt="">
          <p>${Math.round(f.main.temp)}°C</p>
          <p>${f.weather[0].main}</p>
        `;
        forecastContainer.appendChild(card);
      });

  } catch (err) {
    console.error(err);
  }
}

// Chart
function createHourlyChart(hourlyData) {
  const ctx = document.getElementById("hourlyChart").getContext("2d");
  const labels = hourlyData.map((h) =>
    new Date(h.dt_txt).toLocaleTimeString([], { hour: "2-digit", hour12: true })
  );
  const temps = hourlyData.map((h) => h.main.temp);

  if (window.hourlyChart) window.hourlyChart.destroy();

  window.hourlyChart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Temperature (°C)",
          data: temps,
          borderColor: "#2e7d32",
          backgroundColor: "rgba(46, 125, 50, 0.2)",
          tension: 0.3,
          fill: true,
        },
      ],
    },
    options: {
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: false } },
    },
  });
}

