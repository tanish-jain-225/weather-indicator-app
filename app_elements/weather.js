// console.log("Start");

// (https://home.openweathermap.org/api_keys)

const API_KEY = "71edbd3e037224eff002421719136c85";

const weatherDataElement = document.getElementById("weather-data");
const cityInputElement = document.getElementById("city-input");
const formElement = document.querySelector("form");

async function getWeatherData(cityValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Network response null");
    }

    const data = await response.json();
    console.log(data);

    const temperature = Math.round(data.main.temp);

    const description = data.weather[0].description;

    const icon = data.weather[0].icon;

    const details = [
      `Feels like: ${Math.round(data.main.feels_like)}&#8451`,
      `Humidity: ${data.main.humidity}%`,
      `Wind Speed: ${data.wind.speed}m/s`,
    ];

    weatherDataElement.querySelector(
      ".icon"
    ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Could not load">`;
    weatherDataElement.querySelector(
      ".temperature"
    ).innerHTML = `${temperature}&#8451`;
    weatherDataElement.querySelector(
      ".description"
    ).innerHTML = `${description}`;

    weatherDataElement.querySelector(".details").innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join("");
  } catch (error) {
    weatherDataElement.querySelector(".icon").innerHTML = "";
    weatherDataElement.querySelector(".temperature").innerHTML = "";
    weatherDataElement.querySelector(".details").innerHTML = "";
    weatherDataElement.querySelector(".description").innerHTML =
      "An error occoured. Please try again later!";
  }
}

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityInputElement.value;
  console.log(cityValue);
  getWeatherData(cityValue);
});

console.log("End");
