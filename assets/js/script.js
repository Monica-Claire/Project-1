
var cityInput = document.querySelector('#cityInput');
var provinceInput = document.querySelector('#provinceInput');
var button = document.querySelector('#button');

var formSearchHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();
    var city = cityInput.value.trim();
	var province = provinceInput.value.trim();
    console.log(city);
	console.log(province);
	getNewcases(province);
    if (city, province) {
	
      // clear old content
      searchInputEl.value = "";
    } else {
      alert("Please enter a city");
    }
  };

var getNewcases = function(province) {
	
	fetch("https://corona.lmao.ninja/v2/states/" + province + "?yesterday=")
	.then(function(response) {
		// request was successful
		if (response.ok) {
		  response.json().then(function(data) {
		
			console.log(data);
			var activeCases = data.active;
			console.log(activeCases);

		  });
		} else {
		  alert("Error: " + response.statusText);
		}
	  });
	};
  
	var getPollen = function(city) {
		fetch("https://api.ambeedata.com/latest/pollen/by-place?place=" + city, {
	"method": "GET",
	"headers": {
		"x-api-key": "0040ab3d6bc0a15df3ee65425992bc72c7d5b5b600f7f804956943e58ad7e35f",
		"Content-type": "application/json"
	}
})
.then(function(response) {
	  // request was successful
	  if (response.ok) {
        response.json().then(function(data) {
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


button.addEventListener("click", formSearchHandler);