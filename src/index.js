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
let minutes = now.getMinutes();
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
