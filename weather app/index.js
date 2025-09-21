const cityInput = document.getElementById("city");
const submit = document.getElementById("submit");
// const Delhi = document.getElementById("Delhi");
// const Mumbai = document.getElementById("Mumbai");
// const Lucknow = document.getElementById("Lucknow");
// const cities = ["Tokyo", "London", "Dubai", "Rome", "New_York", "Hongkong"];

const getWeather = async (city) => {
  cityName.innerHTML = city;
  const url = `http://api.weatherapi.com/v1/current.json?key=7ab7873c42104b7785393334250209&q=${city}&aqi=yes`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    // Map WeatherAPI response to your old property names
    const result = {
      weather: data.current.condition.text,
      weather2: data.current.condition.text,
      humidity: data.current.humidity,
      wind: data.current.wind_kph,
      pressure: data.current.pressure_mb,
      visibility: data.current.vis_km,
      cloud: data.current.cloud,
      cloud2: data.current.cloud,
      sunrise: data.current.uv,
      sunset: data.current.precip_mm,
      temperature: data.current.temp_c,
      temperature2: data.current.temp_c,
      feels_like: data.current.feelslike_c,
      Temp_min: data.current.wind_dir,
      Temp_max: data.current.gust_kph,
    };
    // const oc = {
    //   TemperatureTokyo:data.current.temp_c,
    // }
    // TemperatureTokyo.innerHTML = oc.TemperatureTokyo;


    Weather.innerHTML = result.weather;
    Weather2.innerHTML = result.weather2;
    Humidity.innerHTML = result.humidity;
    Wind.innerHTML = result.wind;
    Pressure.innerHTML = result.pressure;
    Visiblity.innerHTML = result.visibility;
    Cloud.innerHTML = result.cloud;
    Cloud2.innerHTML = result.cloud2;
    Sunrise.innerHTML = result.sunrise;
    Sunset.innerHTML = result.sunset;
    Temperature.innerHTML = result.temperature;
    Temperature2.innerHTML = result.temperature2;
    feels_like.innerHTML = result.feels_like;
    Temp_min.innerHTML = result.Temp_min;
    Temp_max.innerHTML = result.Temp_max;


    document.getElementById(`${city}-weather`).innerHTML = data.current.condition.text;
     document.getElementById(`${city}-humidity`).innerHTML = data.current.humidity;
    document.getElementById(`${city}-wind`).innerHTML = data.current.wind_kph;
    document.getElementById(`${city}-pressure`).innerHTML = data.current.pressure_mb;
    document.getElementById(`${city}-visibility`).innerHTML = data.current.vis_km;
    document.getElementById(`${city}-clouds`).innerHTML = data.current.cloud;
    document.getElementById(`${city}-sunrise`).innerHTML = data.location.localtime.split(" ")[1]; // fake sunrise for demo
    document.getElementById(`${city}-sunset`).innerHTML = data.current.precip_mm; // fake sunset for demo
    document.getElementById(`${city}-temp`).innerHTML = data.current.temp_c;
    document.getElementById(`${city}-feels`).innerHTML = data.current.feelslike_c;
    document.getElementById(`${city}-tempmin`).innerHTML = data.current.wind_dir;
    document.getElementById(`${city}-tempmax`).innerHTML = data.current.gust_kph;
  } catch (error) {
    console.error(error);
  }
};

// Delhi.addEventListener("click", (e) => {
//   e.preventDefault();
//   getWeather("Delhi");
// });

// Mumbai.addEventListener("click", (e) => {
//   e.preventDefault();
//   getWeather("Mumbai");
// }); 

// Lucknow.addEventListener("click", (e) => {
//   e.preventDefault();
//   getWeather("Lucknow");
// });

// cities.forEach(city => getWeather(city));

submit.addEventListener("click", (e) => {
  e.preventDefault();
  getWeather(cityInput.value); // << this fixes your bug
});

getWeather("Kanpur");
