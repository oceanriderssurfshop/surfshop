// 1. WEATHER WIDGET

const weatherBox = document.getElementById("weatherBox");

fetch("https://api.open-meteo.com/v1/forecast?latitude=52.93&longitude=-9.35&current_weather=true")
  .then(res => res.json())
  .then(data => {
    const w = data.current_weather;

    weatherBox.innerHTML = `
      <p class="mb-1">Temperature: <strong>${w.temperature}°C</strong></p>
      <p class="mb-0">Wind: <strong>${w.windspeed} km/h</strong></p>
    `;
  })
  .catch(() => {
    weatherBox.innerHTML = "Weather unavailable.";
  });


// 2. WAVE CONDITIONS METER

const conditionsBox = document.getElementById("wave-conditions-box");

fetch("https://api.open-meteo.com/v1/forecast?latitude=52.93&longitude=-9.35&current_weather=true")
  .then(res => res.json())
  .then(data => {
    const wind = data.current_weather.windspeed;

    let conditionsText = "";
    let emoji = "";

    if (wind <= 12) {
      emoji = "🌊";
      conditionsText = "PERFECT conditions — clean, small, and smooth waves!";
    } 
    else if (wind <= 24) {
      emoji = "👍";
      conditionsText = "Good surf — light wind with rideable waves.";
    } 
    else if (wind <= 40) {
      emoji = "😬";
      conditionsText = "Choppy conditions — wind is making waves messy.";
    } 
    else {
      emoji = "🚫";
      conditionsText = "Not great today — strong winds creating rough surf.";
    }

    conditionsBox.innerHTML = `
      <h4 style="margin-bottom: 0.5rem;">${emoji} Wave Conditions</h4>
      <p style="margin-bottom: 0rem; font-weight: 600;">Wind Speed: ${wind} km/h</p>
      <p style="margin-top: 0.3rem;">${conditionsText}</p>
    `;
  })
  .catch(() => {
    conditionsBox.innerHTML = "Unable to load surf conditions.";
  });
