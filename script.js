let result = document.getElementById('result');
let searchBtn = document.getElementById('search-btn');
let cityRef = document.getElementById('city');

const API_KEY = "a1be2f7331344ddb9bb778b478edec31";

// Function to fetch the weather
let getWeather = () => {
    let cityValue = cityRef.value.trim();

    if (cityValue.length == 0) {
        result.innerHTML = `<h3>Please enter a city name</h3>`;
    } else {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${API_KEY}&units=metric`;

        cityRef.value = "";
        
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                // this is done by check the console its all there in form of json
                // &#176;C is a icon image for celcius
                result.innerHTML = `
                    <h2>${data.name}, ${data.sys.country}</h2>
                    <h4 class="weather">${data.weather[0].main}</h4>
                    <h4 class="desc">${data.weather[0].description}</h4>
                    <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
                    <h1>${Math.round(data.main.temp)} &#176;C</h1>
                    <div class="temp-container">
                        <div>
                            <h4 class="title">min</h4>
                            <h4 class="temp">${Math.round(data.main.temp_min)}&#176;C</h4>
                        </div>
                        <div>
                            <h4 class="title">max</h4>
                            <h4 class="temp">${Math.round(data.main.temp_max)}&#176;C</h4>
                        </div>
                    </div>
                `;
            })
            .catch(() => {
                result.innerHTML = `<h3 class="msg">City not found</h3>`;
            });
    }
};

searchBtn.addEventListener('click', getWeather);
cityRef.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        getWeather();
    }
});

// Load default city on page load
window.addEventListener('load', () => {
    cityRef.value = "Gaya";  // my default city is gaya
    getWeather();
});
