function getForecast(coordinates){
  console.log(coordinates);
  let key = "a3c7d7e43998da127d7076ec879183cf";
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${key}&units=metric`; 
  axios.get(url).then(showForecast);
}


function displaySearch(response) {
  
    getForecast(response.data.coord);
    celciusTemp = response.data.main.temp;
    document.querySelector("#citySearch").innerHTML = response.data.name;
    document.querySelector("#nowT").innerHTML = Math.round(
        celciusTemp);
    document.querySelector("#feels").innerHTML = `${Math.round(
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
    document.querySelector("#update").innerHTML = `Last forecast update: ${lastUpdate(response.data.dt*1000)}`;
    document.querySelector("#iconSource").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    document.querySelector("#iconSource").setAttribute("alt", response.data.weather[0].description);
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
  
  let now = new Date();
  let date = now.getDate();
  let month = now.getMonth();
  let year = now.getUTCFullYear();
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let followingMonths = [
    "01", 
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12"
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
let monthN = followingMonths[now.getMonth()]; 

  let nowDay = document.querySelector("#date");
  nowDay.innerHTML = `${date}.${monthN}.${year} ${day},`;
  let nowTime = document.querySelector("#time");
  nowTime.innerHTML = `${timeH}:${timeM}`;
  
  function lastUpdate(timestamp) {
    let date = new Date(timestamp);
    let hourU = date.getHours();
    if (hourU < 10) {
      hourU = `0${hourU}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    return ` ${hourU}:${minutes}`;
}

function dayFormat(dateStamp) {
  let date = new Date(dateStamp*1000);
  day = date.getDay();
let days = ["Sunday",
"Monday",
"Tuesday",
"Wednesday",
"Thursday",
"Friday",
"Saturday"];
return days[day]; 
}
 
function showForecast(response) {
 let nextDays = response.data.daily;

  let forecast = document.querySelector("#forecast");

  let forecastHTLM = `<div class= "row">`;


nextDays.forEach(function (forecastDay, index) {
   
  if (index < 5) {

  forecastHTLM = forecastHTLM +
   `
   <div class="col">
   <div class="forecast-date">${dayFormat(forecastDay.dt)}</div>
   <img
     src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
     width="42"/>
   <div class="forecast-temperatures">
     <span class="temperature-next"> ${Math.round(forecastDay.temp.day)}°C </span>
   </div>
 </div>
  `;
  }
});

  forecastHTLM = forecastHTLM + `</div>`;
  forecast.innerHTML = forecastHTLM; 
}



let celciusTemp = null;

let cityName = document.querySelector("#search-form");
cityName.addEventListener("submit", showCity);


search("Gdansk");