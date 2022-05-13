
fetch("https://api.ambeedata.com/latest/pollen/by-place?place=Bengaluru", {
	"method": "GET",
	"headers": {
		"x-api-key": "0040ab3d6bc0a15df3ee65425992bc72c7d5b5b600f7f804956943e58ad7e35f",
		"Content-type": "application/json"
	}
})
.then(function(response) {
	  // request was successful
	  if (response.ok) {
        console.log(response);
        response.json().then(function(data) {
          console.log(data);
		  var riskGrass = data[0].lat;
		  console.log(riskGrass);
		  var riskTree = data[0].Risk.tree_pollen;
		  console.log(riskTree);
		  var riskWeed = data[0].Risk.weed_pollen;
		  console.log(riskWeed);

		});
	  } else {
		alert("Error: " + response.statusText);
	  }
	});
