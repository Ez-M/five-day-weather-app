var searchIn = ""






var dayUrl = ""
//Function that saves user input and enters it into search history
function history() {
$("ul").append("<a href=#>"+searchIn+"<a>");

}

// function cleanIn () {
//     searchIn.trim();
//     searchIn.replace(/ /g, "%20")

// }

//Function that sends user input to openWeather API and receives data
function search() {
    dayUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchIn + "&appid=24d006899a454dfd2614392530a22f1a"
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

            $("#cTemp").text('Current Temp: '+data.main.temp);
            $("#minTemp").text("Minimum Temp: "+data.main.temp_min);
            $("#maxTemp").text("Maximum Temp: "+data.main.temp_max);

        });

}



// listens for a click on the search button and fires multiple functions
$(".btn").on("click",function(event){
    // console.log("test");
    event.preventDefault()
    searchIn= $("#search-input").val()
    history()
    // cleanIn()


    search()
} );
