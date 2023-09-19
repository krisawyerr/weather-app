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


            document.querySelector(".body").innerHTML = `
            <!-- Weather Stats -->
            <div class="weatherStats" style="box-shadow: 0px 0px 10px #001f54;">
                <div class="mainTemp">
                    <p class="temp"></p>
                </div>
                <div class="altTemp">
                    <div class="tempRow">
                        <h3 class="wordFeelsLike"></h3>
                        <p class="feelsLike tempRowTemp"></p>
                    </div>
                    <div class="tempRow">
                        <h3 class="wordTempMin"></h3>
                        <p class="tempMin tempRowTemp"></p>
                    </div>
                    <div class="tempRow">
                        <h3 class="wordTempMax"></h3>
                        <p class="tempMax tempRowTemp"></p>
                    </div>
                </div>
                <div class="location">
                    <img src="icons8-compass-50.png" alt="" width="30">
                    <p class="latLong"></p>
                </div>
                <div class="mainWind">
                    <img src="icons8-wind-50.png" alt="">
                    <p class="windSpeed"></p>
                </div>
                <div class="mainHumid">
                    <img src="icons8-water-drop-50.png" alt="">
                    <p class="humi"></p>
                </div>
                
            </div>
            <!-- Maps -->
            <div class="mapSection" style="box-shadow: 0px 0px 10px #001f54;">
                <div class="mappy"></div>
            </div> 
            <!-- Weather Desc -->
            <div class="weatherDesc" style="box-shadow: 0px 0px 10px #001f54;">
                <p class="desc"></p>
            </div>  `;

            document.querySelector(".wordFeelsLike").innerHTML = 'Feels Like:';
            document.querySelector(".wordTempMin").innerHTML = 'Daily Low:';
            document.querySelector(".wordTempMax").innerHTML = 'Daily High:';


            document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)}°F`;
            document.querySelector(".humi").innerHTML = `${data.main.humidity}%`;
            document.querySelector(".latLong").innerHTML = `${data.coord.lat}, ${data.coord.lon}`;
            document.querySelector(".feelsLike").innerHTML = `${Math.round(data.main.feels_like)}°F`;
            document.querySelector(".tempMin").innerHTML = `${Math.round(data.main.temp_min)}°F`;
            document.querySelector(".tempMax").innerHTML = `${Math.round(data.main.temp_max)}°F`;
            document.querySelector(".windSpeed").innerHTML = `${Math.round(data.wind.speed)} mph`;
            document.querySelector(".desc").innerHTML = `${data.name} is currently ${Math.round(data.main.temp)}°F, but it feels like ${Math.round(data.main.feels_like)}°F. Today is going to give you a high of ${data.main.temp_max}°F and a low of ${Math.round(data.main.temp_min)}°F. With a humidity of ${data.main.humidity}%, be ready to ${humDesc}. The wind speed is ${Math.round(data.wind.speed)} mph, so ${windDesc}.`;
            document.querySelector(".city").innerHTML = `${data.name}, ${data.sys.country}`;
            document.querySelector(".mappy").innerHTML = `<iframe width='1200px' height='400px' src="https://api.mapbox.com/styles/v1/krisawyerr/clmodveur01vt01ragti210rz.html?title=false&access_token=${mapKey}&zoomwheel=false#11/${mapLat}/${mapLon}" title="Satellite Streets" style="border:none;"></iframe>`
        }
        
        checkCoin();
    }

   

    
}