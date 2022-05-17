var cityInput = document.querySelector("#cityInput");
var provinceInput = document.querySelector("#provinceInput");
var button = document.querySelector("#button");
var key = "875d8b2bc5669857900a5eb3c0830a8c";

var formSearchHandler = function (event) {
  // prevent page from refreshing
  event.preventDefault();
  var city = cityInput.value.trim();
  var province = provinceInput.value.trim();
  console.log(city);
  console.log(province);
  getNewcases(province);
  if ((city, province)) {
    // clear old content
  } else {
    alert("Please enter a city");
  }
};

var getNewcases = function (province) {
  fetch("https://corona.lmao.ninja/v2/states/" + province + "?yesterday=").then(
    function (response) {
      // request was successful
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          var activeCases = data.active;
          var todaysCases = data.todayCases;
          console.log(activeCases);
          console.log(todaysCases);
          if (activeCases < 5000) {
            document.querySelector("#response").innerHTML =
              "Active cases are less than 5,000 for selcted state. No mask required.";
            console.log(
              "Active cases are less than 5,000 for selcted state. No mask required."
            );
          } else if (activeCases > 5000) {
            document.querySelector("#response").innerHTML =
              "Active cases are more than 5,000 for selected state. Wearing a mask is recomended.";
            console.log(
              "Active cases are more than 5,000 for selected state. Wearing a mask is recomended."
            );
          }

          document.querySelector("#Cases").innerHTML =
            "Current active cases for " + province + ": " + activeCases;
          document.querySelector("#todays-cases").innerHTML =
            "New cases reported today for " + province + ": " + todaysCases;
          if (todaysCases == 0) {
            document.querySelector("#todays-cases").innerHTML =
              "New cases reported today for " +
              province +
              ": " +
              todaysCases +
              ". " +
              "New cases update at various times throughout the day for each state. This might reflect as '0' until states have updated cases.";
          }
        });
      } else {
        alert("Error: " + response.statusText);
      }
    }
  );
};

var getCoordinates = function (city) {
  var apiUrl =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&limit=1&appid=" +
    key;
  fetch(apiUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          var cityLat = data[0].lat;
          var cityLon = data[0].lon;
          console.log(cityLat);
          console.log(cityLon);
          getPollution(cityLat, cityLon);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to OpenWeather");
    });
};

var getPollution = function (cityLat, cityLon) {
  fetch(
    "https://api.openweathermap.org/data/2.5/air_pollution?lat=" +
      cityLat +
      "&lon=" +
      cityLon +
      "&appid=" +
      key
  )
    .then(function (response) {
      // request was successful
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          var airQualityIndex = data.list[0].main.aqi;
          console.log(airQualityIndex);
        });
      }
      if (airQualityIndex == 2) {
        document.querySelector("#air-1").innerHTML =
          "Air  quality is very poor. Mask Recommended.";
        console.log("Air  quality is very poor. Mask Recommended.");
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to OpenWeather");
    });
};

button.addEventListener("click", formSearchHandler);

//modal
var searchButton = document.querySelector("#button");
var modalBg = document.querySelector(".modal-background");
var modal = document.querySelector(".modal");
var closeButton = document.querySelector("#button2");

searchButton.addEventListener("click", () => {
  modal.classList.add("is-active");
});

modalBg.addEventListener("click", () => {
  modal.classList.remove("is-active");
});

closeButton.addEventListener("click", () => {
  modal.classList.remove("is-active");
});

button.addEventListener("click", formSearchHandler);
button.addEventListener("click", getPollution);
