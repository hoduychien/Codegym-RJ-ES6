// config
const KEY = `f48820e368fc63731e7028f896c8374f`;
let city = "Quang Tri";
let cityName = document.querySelector(".weather-box-cityname span");
let dateDisplay = document.querySelector(".weather-box-time span");
let tempDisplay = document.querySelector(".weather-box-temperature");
let statusDisplay = document.querySelector(".weather-box-status");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let seaLevel = document.querySelector(".sea-level");
let errorMessage = document.querySelector(".search-message");
let weatherIcon = document.querySelector(".weather-box-image img");

let checkInput = (input) => {
  if (input) {
    return true;
  } else {
    return false;
  }
};

let renderWeather = (data) => {
  cityName.innerHTML = data.name;
  dateDisplay.innerHTML = formatDate(data.dt);
  tempDisplay.innerHTML = `${parseInt(data.main.temp)} °C`;
  statusDisplay.innerHTML = data.weather[0].description;
  humidity.innerHTML = `${data.main.humidity} %`;
  wind.innerHTML = `${data.wind.speed} km/h`;
  seaLevel.innerHTML = `${data.main.pressure} m`;

  renderImage(data.weather[0].icon);
};

let searchWeather = async (inputData) => {
  try {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${inputData}&units=metric&appid=${KEY}`;
    let res = await axios.get(url);
    let data = await res.data;

    console.log(res);

    if (res) {
      errorHandling("", "none");
      renderWeather(data);
    }
  } catch (error) {
    if (error.response.data.cod === "404") {
      let message = error.response.data.message;
      let status = "block";
      errorHandling(message, status);
    }
  }
};

let formatDate = (timeStamp) => {
  let date = new Date(timeStamp * 1000);
  let week = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let weekday = date.getDay();
  let month = date.getMonth();
  let day = date.getDate();
  let year = date.getFullYear();

  let dateFormat = `${week[weekday]}, ${months[month]} ${day}, ${year}`;

  return dateFormat;
};

let renderImage = (iconId) => {
  switch (iconId) {
    case "01d":
      weatherIcon.src =
        "https://cdn-icons-png.flaticon.com/512/4814/4814268.png";
      break;
    case "02d":
      weatherIcon.src =
        "https://cdn-icons-png.flaticon.com/512/1163/1163661.png";
      break;
    case "03d":
      weatherIcon.src =
        "https://cdn-icons-png.flaticon.com/512/1163/1163624.png";
      break;
    case "04d":
      weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/414/414927.png";
      break;
    case "09d":
      weatherIcon.src =
        "https://cdn-icons-png.flaticon.com/512/4735/4735072.png";
      break;
    case "10d":
      weatherIcon.src =
        "https://cdn-icons-png.flaticon.com/512/3093/3093390.png";
      break;
    case "11d":
      weatherIcon.src =
        "https://cdn-icons-png.flaticon.com/512/3236/3236860.png";
      break;
    case "13d":
      weatherIcon.src =
        "https://cdn-icons-png.flaticon.com/512/2529/2529995.png";
      break;
    case "50d":
      weatherIcon.src =
        "https://cdn-icons-png.flaticon.com/512/3750/3750506.png";
      break;
    case "01n":
      weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/581/581601.png";
      break;
    case "02n":
      weatherIcon.src =
        "https://cdn-icons-png.flaticon.com/512/3094/3094159.png";
      break;
    case "03n":
      weatherIcon.src =
        "https://cdn-icons-png.flaticon.com/512/1163/1163624.png";
      break;
    case "04n":
      weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/414/414927.png";
      break;
    case "09n":
      weatherIcon.src =
        "https://cdn-icons-png.flaticon.com/512/4735/4735072.png";
      break;
    case "10n":
      weatherIcon.src =
        "https://cdn-icons-png.flaticon.com/512/5903/5903792.png";
      break;
    case "11n":
      weatherIcon.src =
        "https://cdn-icons-png.flaticon.com/512/3236/3236860.png";
      break;
    case "13n":
      weatherIcon.src =
        "https://cdn-icons-png.flaticon.com/512/2529/2529995.png";
      break;
    case "50n":
      weatherIcon.src =
        "https://cdn-icons-png.flaticon.com/512/3750/3750506.png";
      break;
  }
};

let errorHandling = (message, status) => {
  errorMessage.innerHTML = message;
  errorMessage.style.display = status;
};

// Handle click search button
document.getElementById("search-btn").addEventListener("click", () => {
  let city = document.querySelector("#input-data").value;
  let check = checkInput(city);
  if (!check) {
    errorHandling("Enter city name here !", "block");
  } else {
    searchWeather(city);
  }
});
