var cityInput = document.querySelector("#cityInput");
var provinceInput = document.querySelector("#provinceInput");
var button = document.querySelector("#button");
const str = (1234567890).toLocaleString();
console.log(str);

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
    searchInputEl.value = "";
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

var displayCases = function () {
  casesWarningEl.textContent = "For more information, please visit: ";

  var casesEl = document.createElement("a");
  casesEl.textContent = "CDC.gov";
  casesEl.setAttribute("href", "https://cdc.gov");
  casesEl.setAttribute("target", "_blank");
};

var getPollen = function (city) {
  fetch("https://api.ambeedata.com/latest/pollen/by-place?place=" + city, {
    method: "GET",
    headers: {
      "x-api-key":
        "0040ab3d6bc0a15df3ee65425992bc72c7d5b5b600f7f804956943e58ad7e35f",
      "Content-type": "application/json",
    },
  }).then(function (response) {
    // request was successful
    if (response.ok) {
      response.json().then(function (data) {
        var riskGrass = data.data[0].Risk.grass_pollen;
        console.log(riskGrass);
        var riskTree = data.data[0].Risk.tree_pollen;
        console.log(riskTree);
        var riskWeed = data.data[0].Risk.weed_pollen;
        console.log(riskWeed);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
};

//modal
var searchButton = document.querySelector("#button");
var modalBg = document.querySelector(".modal-background");
var modal = document.querySelector(".modal");

searchButton.addEventListener("click", () => {
  modal.classList.add("is-active");
});

modalBg.addEventListener("click", () => {
  modal.classList.remove("is-active");
});

button.addEventListener("click", formSearchHandler);
