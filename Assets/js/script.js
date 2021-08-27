var searchIn = "";
var dayUrl = "";
var cityLat = "";
var cityLon = "";
var cleanedIn = "";
var oneUrl = "";
var fromUrl = location;


console.log(fromUrl);





//Function that sends user input to openWeather API and receives data
function search() {
    dayUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchIn + "&units=imperial&appid=24d006899a454dfd2614392530a22f1a"
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

            return response.json();

        })

        .then(function (data) {
            console.log(data);
            console.log(data.main.temp);
            updateMain(data);
            getCord(data);
            search02();
            // $("#cTemp").text('Current Temp: '+data.main.temp);
            // $("#minTemp").text("Minimum Temp: "+data.main.temp_min);
            // $("#maxTemp").text("Maximum Temp: "+data.main.temp_max);
            // $("#wind").text("Wind: "+data.wind.speed+ "MPH");
            // $("#humidity").text("Humidity: "+data.main.humidity);
            // $("#UV").text("UV Index: "+data.main.temp_max);

        });

}

function search02() {
    oneUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&units=imperial&appid=24d006899a454dfd2614392530a22f1a"
    fetch(oneUrl, {

        method: 'get', //get is the default
    })
        // checks if response is an error and errors out if it is
        .then(function (response) {
            if (response.status !== 200) {
                console.log(response);
                console.log("Error: City Not Found!")
                return;
            }

            return response.json();

        })

        .then(function (data) {
            console.log(data);
            updateCard(data);


        });

}




/*This function handles updating each of the text elements in the
main forcast card */
//note: uv index is updated by updateCard due to limitations of weather API
function updateMain(data) {
    $("#nameMain").text(data.name);
    $("#cTemp").text('Current Temp: ' + data.main.temp);
    $("#minTemp").text("Minimum Temp: " + data.main.temp_min);
    $("#maxTemp").text("Maximum Temp: " + data.main.temp_max);
    $("#wind").text("Wind: " + data.wind.speed + "MPH");
    $("#humidity").text("Humidity: " + data.main.humidity);
    $("#UV").text("UV Index: " + data.main.temp_max);


};

// extracts coordinates from the first weather data call
function getCord(data) {
    cityLat = data.coord.lat;
    cityLon = data.coord.lon;
    console.log(cityLat);
};

//updates all cards, note that this also updates UV index on main
function updateCard(data) {
    $(".card-group").html("");
    for (var i = 0; i < 5; i++) {

        $(".card-group").append('<div class="card col-12 col-md-2 c0' + [i] + '"></div>');
        $(".c0"+[i]).append('<img src="https://images.unsplash.com/photo-1509114397022-ed747cca3f65?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80" class="card-img-top" alt="a red cloud in the sky ">');
        $(".c0"+[i]).append('<div class="card-body c1'+[i]+'"></div>');
        $(".c1"+[i]).append('<h5 class="card-title" id="date-card">Date: <span> </span></h5>')
        $(".c1"+[i]).append('<p class="card-text-1">Temp: <span>'+data.daily[i].temp.day+'</span></p>')
        $(".c1"+[i]).append('<p class="card-text-2">Wind: <span>'+data.daily[i].wind_speed+' MPH</span></p>')
        $(".c1"+[i]).append('<p class="card-text-3">Humidity: <span>'+data.daily[i].humidity+'</span></p>')
        $(".c1"+[i]).append(' ' )

    };

};

//Cleans user input and stores it as a seperate var
function cleanIn() {
    cleanedIn = searchIn.trim();
    cleanedIn = cleanedIn.replace(/ /g, "%20")

};


//Function that saves user input and enters it into search history
//also sets local storage equal to list
function history() {
    $("ul").append("<a class= 'btn btn-secondary btn-history' href=./index.html?=" + cleanedIn + ">" + searchIn + "</a>");
    localStorage.setItem("history", $("ul").html());

};

function loadHistory() {
    $("ul").html(localStorage.getItem("history"));
};

//reads url and passes location.search over to the search function
// This allows links in history to work
function onLoad() {
    var tempVar = location.search;
    tempVar = tempVar.split("=");
    searchIn = tempVar[1];
    // console.log(searchIn);
    search();
}


// listens for a click on the search button and fires multiple functions
$(".btn-search").on("click", function (event) {
    // console.log("test");
    event.preventDefault()
    searchIn = $("#search-input").val()
    cleanIn()
    history()



    search()
});



onLoad();
loadHistory();