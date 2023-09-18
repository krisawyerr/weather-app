function logValue(event) {
    if (event.key === "Enter") {
        console.log(event.target.value);

        let apiUrlPtOne = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&q=';
        let coin = `${event.target.value}`;
        let apiUrlPtTwo = '&appid=';
        let apiKey = 'ae5ca4598a7efe2201b6aaa13af60a17';

        console.log(apiUrlPtOne + coin + apiUrlPtTwo + apiKey)

        let mapKey = 'pk.eyJ1Ijoia3Jpc2F3eWVyciIsImEiOiJjbG1vZHFiY2wxMDJ5MmxwbjVwNm5qZnVzIn0.-toq3H6oxw1OCdkI2ZERsA'

        async function checkCoin() {
            let response = await fetch(apiUrlPtOne + coin + apiUrlPtTwo + apiKey);
            let data = await response.json();
            let mapLat = data.coord.lat
            let mapLon = data.coord.lon
            let humDesc
            if (data.main.humidity < 25) {
                humDesc = 'moisturize to avoid skin cracking'
            } else if (data.main.humidity >= 25 && data.main.humidity < 30) {
                humDesc = 'feel a bit of dryness in the air'
            } else if (data.main.humidity >= 30 && data.main.humidity < 60) {
                humDesc = 'enjoy the optimal humidity level'
            } else if (data.main.humidity >= 60 && data.main.humidity < 70) {
                humDesc = 'feel some moisture in the air'
            } else {
                humDesc = 'consistently breaking a sweat'
            }

            let windDesc
            if (data.wind.speed < 12) {
                windDesc = 'the wind is gentle and barely noticeable'
            } else if (data.wind.speed >= 12 && data.wind.speed < 24) {
                windDesc = "you'll feel the breeze but can still comfortably go about your day"
            } else if (data.wind.speed >= 24 && data.wind.speed < 46) {
                windDesc = "it'll be challenging to hold onto lightweight objects"
            } else {
                windDesc = 'it is advised to stay indoors'
            }

           

            document.querySelector(".wordTemp").innerHTML = 'temp:';
            document.querySelector(".wordTempMin").innerHTML = 'temp min:';
            document.querySelector(".wordTempMax").innerHTML = 'temp max:';
            document.querySelector(".wordWindSpeed").innerHTML = 'wind speed:';
            document.querySelector(".wordLat").innerHTML = 'lat:';
            document.querySelector(".wordLong").innerHTML = 'long:';
            document.querySelector(".wordDesc").innerHTML = 'description:';
            document.querySelector(".wordHumi").innerHTML = 'humidity:';


            document.querySelector(".temp").innerHTML = data.main.temp;
            document.querySelector(".humi").innerHTML = data.main.humidity;
            document.querySelector(".long").innerHTML = data.coord.lon;
            document.querySelector(".lat").innerHTML = data.coord.lat;
            document.querySelector(".feelsLike").innerHTML = data.main.feels_like;
            document.querySelector(".wordFeelsLike").innerHTML = 'feels like:';
            document.querySelector(".tempMin").innerHTML = data.main.temp_min;
            document.querySelector(".tempMax").innerHTML = data.main.temp_max;
            document.querySelector(".windSpeed").innerHTML = data.wind.speed;
            document.querySelector(".desc").innerHTML = `${data.name} is currently ${data.main.temp}°F, but it feels like ${data.main.feels_like}°F. Today is going to give you a high of ${data.main.temp_max}°F and a low of ${data.main.temp_min}°F. With a humidity of ${data.main.humidity}%, be ready to ${humDesc}. The wind speed is ${data.wind.speed}, so ${windDesc}.`;
            document.querySelector(".city").innerHTML = `${data.name}, ${data.sys.country}`;
            document.querySelector(".mappy").innerHTML = `<iframe width='1200px' height='400px' src="https://api.mapbox.com/styles/v1/krisawyerr/clmodveur01vt01ragti210rz.html?title=false&access_token=${mapKey}&zoomwheel=false#11/${mapLat}/${mapLon}" title="Satellite Streets" style="border:none;"></iframe>`
        }
        
        checkCoin();
    }

   

    
}