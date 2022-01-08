function displaySearch(response) {
    document.querySelector("#citySearch").innerHTML = response.data.name;
    document.querySelector("#nowT").innerHTML = Math.round(
      response.data.main.temp
    );
    document.querySelector("#feels").innerHTML = `Feels like ${Math.round(
      response.data.main.feels_like
    )}°C`;
    document.querySelector(
      "#wind"
    ).innerHTML = `Wind: ${response.data.wind.speed} m/s`;
    document.querySelector(
      "#pressure"
    ).innerHTML = `Pressure: ${response.data.main.pressure}hPa`;
    document.querySelector(
      "#humidity"
    ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
    document.querySelector("#descriptionW").innerHTML =
      response.data.weather[0].description;
    document.querySelector("#icon").innerHTML = response.data.weather[0].icon;
  }
  
  function search(city) {
    let units = "metric";
    let key = "a3c7d7e43998da127d7076ec879183cf";
  
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${units}`;
    axios.get(url).then(displaySearch);
  }
  
  function showCity(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    search(city);
  }
  
  let cityName = document.querySelector("#search-form");
  cityName.addEventListener("submit", showCity);
  
  search("Gdansk");
  
  let now = new Date();
  let date = now.getDate();
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = weekDays[now.getDay()];
  let timeH = now.getHours();
  if (timeH < 10) {
    timeH = `0${timeH}`;
  }
  let timeM = now.getMinutes();
  if (timeM < 10) {
    timeM = `0${timeM}`;
  }
  let nowDay = document.querySelector("#date");
  nowDay.innerHTML = `${day},`;
  let nowTime = document.querySelector("#time");
  nowTime.innerHTML = `${timeH}:${timeM}`;
  