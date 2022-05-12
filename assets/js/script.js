var apiUrl = "https://data.cdc.gov/resource/n8mc-b4w4.json";
var getUserRepos = function (user) {
  // format the github api url
  var apiUrl = "https://data.cdc.gov/resource/n8mc-b4w4.json";
  // make a get request to url
  fetch(apiUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          var newData = data.map((el) => {
            return {
              current_status: el.current_status,
              res_state: el.res_state,
            };
          });
          var hiData = newData.filter((el) => el.res_state == "PA");

          document.querySelector("#tempDiv").textContent =
            JSON.stringify(hiData);
          //displayRepos(data, user);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to GitHub");
    });
};

/*posCases = res_state.map;*/

/*function getData(apiUrl) {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((result) => result);
}
*/
//getData(apiUrl, (res_state) => console.log({ res_state }));
getUserRepos();
