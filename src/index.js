let apiKey = "39a10a67974af3aca0cd78d46812daa1";

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();
if (hour < 10) {
  hour = `0${hour}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let currentTime = document.querySelector("h3");
currentTime.innerHTML = day + " " + hour + ":" + minutes;
let searchedCity = document.querySelector(".search-bar");
let currentLocationButton = document.querySelector(".current-location");

let units = "metric";
let city = "Lisbon";

function searchCity(city) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(url).then(changeTemperature);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function formatIcon(icon) {
  if (icon === "01d" || icon === "01n") {
    return "sun";
  }

  if (icon === "02d" || icon === "02n") {
    return "clouds";
  }

  if (icon === "03d" || icon === "03n" || icon === "04d" || icon === "04d") {
    return "cloudy";
  }

  if (icon === "09d" || icon === "09n") {
    return "rain2";
  }

  if (icon === "10d" || icon === "10n") {
    return "rain";
  }

  if (icon === "11d" || icon === "11n") {
    return "storm";
  }

  if (icon === "13d" || icon === "13n") {
    return "snow";
  }

  if (icon === "50d" || icon === "50n") {
    return "clouds";
  }
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";
  forecast.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML += `<div class="col-sm">
          <div><strong>${formatDay(day.dt)}</strong></div> 
          <img class="prevision-img" src="images/${formatIcon(
            day.weather[0].icon
          )}.gif" alt="${day.weather[0].description}" /> 
          <p class="temperature"><span id="forecast-max-temp">${Math.round(
            day.temp.max
          )}</span>?? / <span id="forecast-min-temp">${Math.round(
        day.temp.min
      )}</span>??</p> 
          </div>`;
    }
  });
  forecastHTML += "";
  forecastElement.innerHTML = forecastHTML;
}

function setPosition(coordinates) {
  let latitude = coordinates.data.coord.lat;
  let longitude = coordinates.data.coord.lon;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showForecast);
}

function changeCity(event) {
  event.preventDefault();
  document.querySelector("#fahrenheit-link").classList.remove("active-link");
  document.querySelector("#celsius-link").classList.add("active-link");
  let city = document.querySelector(".search-bar");
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=${units}&appid=${apiKey}`;
  axios.get(url).then(changeTemperature);
  axios.get(url).then(setPosition);
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

function updateShowForecast(response) {
  let latitude = response.data.coord.lat;
  let longitude = response.data.coord.lon;
  let apiKey = "39a10a67974af3aca0cd78d46812daa1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showForecast);
}

function searchLocation(position) {
  document.querySelector("#fahrenheit-link").classList.remove("active-link");
  document.querySelector("#celsius-link").classList.add("active-link");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(changeTemperature);
  axios.get(apiUrl).then(setPosition);
  axios.get(apiUrl).then(updateShowForecast);
}

function showCurrentPlace() {
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function showFahrenheit(event) {
  event.preventDefault();
  if (units === "metric") {
    units = "imperial";
    city = document.querySelector("#city").innerHTML;
    document.querySelector("#fahrenheit-link").classList.add("active-link");
    document.querySelector("#celsius-link").classList.remove("active-link");
    document.querySelector("#temperature").innerHTML = Math.round(
      document.querySelector("#temperature").innerHTML * 1.8 + 32
    );
    let maxTemp = document.querySelectorAll("#forecast-max-temp");
    let minTemp = document.querySelectorAll("#forecast-min-temp");
    maxTemp.forEach(function (maxTemp) {
      maxTemp.innerHTML = Math.round(maxTemp.innerHTML * 1.8 + 32);
    });
    minTemp.forEach(function (minTemp) {
      minTemp.innerHTML = Math.round(minTemp.innerHTML * 1.8 + 32);
    });
  }
}

function showCelsius(event) {
  event.preventDefault();
  if (units === "imperial") {
    units = "metric";
    document.querySelector("#fahrenheit-link").classList.remove("active-link");
    document.querySelector("#celsius-link").classList.add("active-link");
    document.querySelector("#temperature").innerHTML = Math.round(
      ((document.querySelector("#temperature").innerHTML - 32) * 5) / 9
    );
    let maxTemp = document.querySelectorAll("#forecast-max-temp");
    let minTemp = document.querySelectorAll("#forecast-min-temp");
    maxTemp.forEach(function (maxTemp) {
      maxTemp.innerHTML = Math.round(((maxTemp.innerHTML - 32) * 5) / 9);
    });
    minTemp.forEach(function (minTemp) {
      minTemp.innerHTML = Math.round(((minTemp.innerHTML - 32) * 5) / 9);
    });
  }
}

let celsius = null;

let form = document.querySelector("form");
form.addEventListener("submit", changeCity);
searchCity(city);
axios
  .get(
    `https://api.openweathermap.org/data/2.5/onecall?lat=38.71667&lon=-9.13333&exclude=current,minutely,hourly,alerts&appid=39a10a67974af3aca0cd78d46812daa1&units=${units}`
  )
  .then(showForecast);
currentLocationButton.addEventListener("click", showCurrentPlace);
document
  .querySelector("#fahrenheit-link")
  .addEventListener("click", showFahrenheit);
document.querySelector("#celsius-link").addEventListener("click", showCelsius);
