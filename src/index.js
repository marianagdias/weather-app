let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thurday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${minutes}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let currentTime = document.querySelector("h3");
currentTime.innerHTML = day + " " + hour + ":" + minutes;
let searchedCity = document.querySelector(".search-bar");
let currentLocationButton = document.querySelector(".current-location");

function searchCity(event) {
  let apiKey = "39a10a67974af3aca0cd78d46812daa1";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${event}&units=metric&appid=${apiKey}`;
  axios.get(url).then(changeTemperature);
}

function changeCity(event) {
  event.preventDefault();
  let searchedCity = document.querySelector(".search-bar");
  let cityName = document.querySelector("#city");
  let apiKey = "39a10a67974af3aca0cd78d46812daa1";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity.value}&units=metric&appid=${apiKey}`;
  axios.get(url).then(changeTemperature);
}

function changeTemperature(response) {
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  if (response.data.weather[0].description === "broken clouds") {
    document
      .querySelector(".current-temperature-img")
      .setAttribute("src", "images/clouds.gif");
    document
      .querySelector(".current-temperature-img")
      .setAttribute("alt", "broken-clouds");
  }
  if (response.data.weather[0].description === "clear sky") {
    document
      .querySelector(".current-temperature-img")
      .setAttribute("src", "images/sun.gif");
    document
      .querySelector(".current-temperature-img")
      .setAttribute("alt", "clear-sky");
  }
  if (response.data.weather[0].description === "few clouds") {
    document
      .querySelector(".current-temperature-img")
      .setAttribute("src", "images/cloudy.gif");
    document
      .querySelector(".current-temperature-img")
      .setAttribute("alt", "few-clouds");
  }
  if (response.data.weather[0].description === "scattered clouds") {
    document
      .querySelector(".current-temperature-img")
      .setAttribute("src", "images/clouds.gif");
    document
      .querySelector(".current-temperature-img")
      .setAttribute("alt", "scattered-clouds");
  }
  if (response.data.weather[0].description === "shower rain") {
    document
      .querySelector(".current-temperature-img")
      .setAttribute("src", "images/rain2.gif");
    document
      .querySelector(".current-temperature-img")
      .setAttribute("alt", "shower-rain");
  }
  if (response.data.weather[0].description === "rain") {
    document
      .querySelector(".current-temperature-img")
      .setAttribute("src", "images/rain.gif");
    document
      .querySelector(".current-temperature-img")
      .setAttribute("alt", "rain");
  }
  if (response.data.weather[0].description === "thunderstorm") {
    document
      .querySelector(".current-temperature-img")
      .setAttribute("src", "images/storm.gif");
    document
      .querySelector(".current-temperature-img")
      .setAttribute("alt", "thunderstorm");
  }
  if (response.data.weather[0].description === "snow") {
    document
      .querySelector(".current-temperature-img")
      .setAttribute("src", "images/snow.gif");
    document
      .querySelector(".current-temperature-img")
      .setAttribute("alt", "snow");
  }
  if (response.data.weather[0].description === "mist") {
    document
      .querySelector(".current-temperature-img")
      .setAttribute("src", "images/clouds.gif");
    document
      .querySelector(".current-temperature-img")
      .setAttribute("alt", "mist");
  }
}

function searchLocation(position) {
  let key = "39a10a67974af3aca0cd78d46812daa1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${key}`;
  axios.get(apiUrl).then(changeTemperature);
}

function showCurrentPlace(event) {
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let form = document.querySelector("form");
form.addEventListener("submit", changeCity);
searchCity("Lisbon");
currentLocationButton.addEventListener("click", showCurrentPlace);
