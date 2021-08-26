var searchIn = ""


searchIn.trim();



var dayUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchIn + "&appid=24d006899a454dfd2614392530a22f1a"





function search() {
    dayUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchIn + "&appid=24d006899a454dfd2614392530a22f1a"
    fetch(dayUrl, {

        method: 'get', //get is the default
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });

}




$(".btn").on("click",function(event){
    event.preventDefault()

    searchIn= $("#search-input").val()
    console.log("test");
    search()
} );
