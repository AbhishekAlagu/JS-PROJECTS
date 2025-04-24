document.addEventListener("DOMContentLoaded", () => {
  const cityinput = document.getElementById("city-input");
  const getweatherbtn = document.getElementById("get-weather-btn");
  const weatherinfo = document.getElementById("weather-info");
  const citynamedisplay = document.getElementById("city-name");
  const temperaturedisplay = document.getElementById("temperature");
  const descriptiondisplay = document.getElementById("description");
  const winddisplay = document.getElementById("wind");
  const errormessage = document.getElementById("error-message");

  const API_KEY = "3ed8cdbd3f46a375665607a8e16df445";

  getweatherbtn.addEventListener("click", async () => {
    const city = cityinput.value.trim();
    if (!city) return;

    try {
      const weatherdata = await fetchweatherdata(city);
      displayweatherdata(weatherdata);
    } catch (error) {
      showerror();
    }
  });

  async function fetchweatherdata(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City Not Found");
    }

    const data = await response.json();
    return data;
  }

  function displayweatherdata(data) {
    //display the data
    console.log(data);
    const { name, main, weather, wind } = data;
    citynamedisplay.textContent = name;
    temperaturedisplay.textContent = `Temperature: ${main.temp}`;
    descriptiondisplay.textContent = `weather: ${weather[0].description}`;
    winddisplay.textContent = `wind: ${wind.speed}, ${wind.deg}, ${wind.gust}`;

    //unlock the display
    weatherinfo.classList.remove("hidden");
    errormessage.classList.add("hidden");
  }

  function showerror() {
    //unlock the display for error message
    weatherinfo.classList.add("hidden");
    errormessage.classList.remove("hidden");
  }
});
