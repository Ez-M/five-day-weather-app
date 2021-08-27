# five-day-weather-app

city search
    -text entry field
        -need to receive user input as text
    
fetch current and future conditions for that city 
    -Pass city searched to OneWeather API, 
        -request current weather data for the city, and future weather data
            -divide weather information into relevant day blocks 
            -city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index 
                - UV index is color coded to indicate favorable, moderate, or severe


presents the current and future conditions for that city 
    - populate main card with today's information
        - 5 day forcast of dynamically generated cards

and that city is added to search history
    - saves search to local storage, and assigns all previous searches to a list of buttons
        - can just save the URL as a string, and fetch relevant search terms from the URL?
        - could just save the city name in local, and on click push the city name to the search field?