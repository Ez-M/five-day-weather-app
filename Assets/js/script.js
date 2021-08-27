var searchIn = "";
var dayUrl = "";
var cityLat = "";
var cityLon = "";
var fromUrl = location;

console.log(fromUrl);





//Function that sends user input to openWeather API and receives data
function search() {
    dayUrl = "https://api.openweathermap.org/data/2.5/weather?" + searchIn + "&units=imperial&appid=24d006899a454dfd2614392530a22f1a"
    fetch(dayUrl, {

        method: 'get', //get is the default
    })
        // checks if response is an error and errors out if it is
        .then(function (response) {
            if (response.status !== 200) {
                console.log(response);
                console.log("Error: City Not Found!")
                return;
            }
            function getCord(data) {
                cityLat = ""
            };
            return response.json();

        })

        .then(function (data) {
            console.log(data);
            console.log(data.main.temp);
            updateMain(data);
            getCord(data);
            // $("#cTemp").text('Current Temp: '+data.main.temp);
            // $("#minTemp").text("Minimum Temp: "+data.main.temp_min);
            // $("#maxTemp").text("Maximum Temp: "+data.main.temp_max);
            // $("#wind").text("Wind: "+data.wind.speed+ "MPH");
            // $("#humidity").text("Humidity: "+data.main.humidity);
            // $("#UV").text("UV Index: "+data.main.temp_max);

        });

}
// extracts coordinates from the first weather data call
function getCord(data) {
    cityLat = data.coord.lat;
    cityLon = data.coord.lon;
    console.log(cityLat);
};


/*This function handles updating each of the text elements in the
main forcast card */
function updateMain(data) {
    $("#nameMain").text(data.name);
    $("#cTemp").text('Current Temp: ' + data.main.temp);
    $("#minTemp").text("Minimum Temp: " + data.main.temp_min);
    $("#maxTemp").text("Maximum Temp: " + data.main.temp_max);
    $("#wind").text("Wind: " + data.wind.speed + "MPH");
    $("#humidity").text("Humidity: " + data.main.humidity);
    $("#UV").text("UV Index: " + data.main.temp_max);


}




//Function that saves user input and enters it into search history
function history() {
    $("ul").append("<button class= 'btn btn-secondary' href=./index.html?q=" + searchIn + ">" + searchIn + "</button>");

}

// function cleanIn () {
//     searchIn.trim();
//     searchIn.replace(/ /g, "%20")

// }


// listens for a click on the search button and fires multiple functions
$(".btn").on("click", function (event) {
    // console.log("test");
    event.preventDefault()
    searchIn = $("#search-input").val()
    history()
    // cleanIn()


    search()
});
