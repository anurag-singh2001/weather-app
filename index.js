function getCoordintes() {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function success(pos) {
        var crd = pos.coords;
        var lat = crd.latitude.toString();
        var lng = crd.longitude.toString();
        var coordinates = [lat, lng];
        console.log(`Latitude: ${lat}, Longitude: ${lng}`);
        getCity(coordinates);
        return;

    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
}

// Step 2: Get city name
function getCity(coordinates) {
    var xhr = new XMLHttpRequest();
    var lat = coordinates[0];
    var lng = coordinates[1];

    // Paste your LocationIQ token below.
    xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=pk.093cd43140e50beba856ae6d0324dab6&lat=" +
        lat + "&lon=" + lng + "&format=json", true);
    xhr.send();
    xhr.onreadystatechange = processRequest;
    xhr.addEventListener("readystatechange", processRequest, false);

    function processRequest(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            var city = response.address.city;
            console.log(city);
            getWeather(city);
            return;
        }
    }
}

getCoordintes();
submit.addEventListener("click",(e)=>{
    e.preventDefault()
    getWeather(city.value)
    
})


const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '9592cdb736msh5b030ae68081a1cp1503d5jsn515d284c9829',
        'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    }
};

const getWeather=(city)=>{

    cityName.innerHTML=city

    fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city='+city, options)
    .then(response => response.json())
    .then((response) => {

        console.log(response)
        wind_speed.innerHTML = response.wind_speed
        wind_speed2.innerHTML = response.wind_speed
        wind_degrees.innerHTML = response.wind_degrees
        temp.innerHTML = response.temp
        temp2.innerHTML = response.temp
        humidity.innerHTML = response.humidity
        humidity2.innerHTML = response.humidity
        sunset.innerHTML = response.sunset
        min_temp.innerHTML = response.min_temp
        // cloud_pct.innerHTML = response.cloud_pct
        feels_like.innerHTML = response.feels_like
        sunrise.innerHTML = response.sunrise
        max_temp.innerHTML = response.max_temp

    })
    .catch(err => console.error(err));

}



