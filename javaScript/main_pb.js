/*
Name: Pedro Baron
Student Number: x12127400
Date: 20/11/2025
File: main_pb.js
*/

// Hamburger Menu Logic
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('.site-nav');

    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
}

// WEATHER WIDGET

// Get the HTML element where the weather info will be displayed
const weatherBox = document.getElementById("weatherBox");

// Fetch live weather data from Open-Meteo API (Lahinch coordinates)
fetch("https://api.open-meteo.com/v1/forecast?latitude=52.93&longitude=-9.35&current_weather=true")

  // Convert the response from API into JSON format
  .then(res => res.json())

  // When the API returns the weather data
  .then(data => {
    // Extract the "current_weather" object from the JSON
    const w = data.current_weather;

    // Insert temperature and wind speed into the weatherBox div
    weatherBox.innerHTML = `
      <p class="mb-1">Temperature: <strong>${w.temperature}°C</strong></p>
      <p class="mb-0">Wind: <strong>${w.windspeed} km/h</strong></p>
    `;
  })

  // If something goes wrong (API offline, no internet, etc.)
  .catch(() => {
    weatherBox.innerHTML = "Weather unavailable.";
  });


// WAVE CONDITIONS METER

// Get the HTML element where the surf conditions will be displayed
const conditionsBox = document.getElementById("wave-conditions-box");

// Fetch live weather data again (same API, same location)
fetch("https://api.open-meteo.com/v1/forecast?latitude=52.93&longitude=-9.35&current_weather=true")

  // Convert API response to JSON
  .then(res => res.json())

  // Process the weather data
  .then(data => {
    // Extract wind speed from the API (wind is a major surf condition factor)
    const wind = data.current_weather.windspeed;

    // Variables to store the text and emoji depending on wind speed
    let conditionsText = "";
    let emoji = "";


    // Wave condition logic based on wind speed

    // Calm conditions = great surfing
    if (wind <= 12) {
      emoji = "🌊";
      conditionsText = "PERFECT conditions — clean, small, and smooth waves!";
    } 
    // Light winds = still good
    else if (wind <= 24) {
      emoji = "👍";
      conditionsText = "Good surf — light wind with rideable waves.";
    } 
    // Stronger winds = choppy
    else if (wind <= 40) {
      emoji = "😬";
      conditionsText = "Choppy conditions — wind is making waves messy.";
    } 
    // Very strong winds = bad conditions
    else {
      emoji = "🚫";
      conditionsText = "Not great today — strong winds creating rough surf.";
    }

    // Insert formatted surf conditions into the page
    conditionsBox.innerHTML = `
      <h4 style="margin-bottom: 0.5rem;">${emoji} Wave Conditions</h4>
      <p style="margin-bottom: 0rem; font-weight: 600;">Wind Speed: ${wind} km/h</p>
      <p style="margin-top: 0.3rem;">${conditionsText}</p>
    `;
  })

  // If the API request fails, show an error message
  .catch(() => {
    conditionsBox.innerHTML = "Unable to load surf conditions.";
  });
