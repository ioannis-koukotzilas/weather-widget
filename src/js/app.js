// Create a top-level function to obtain the JSON using the Fetch API
async function weatherWidgetInit() {

  const requestURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=40.58725980318928&lon=22.948223362612612&exclude=hourly,minutely&appid=11b0499bd13ab56063de7565a440eb97&units=metric';
  const request = new Request(requestURL);
  const response = await fetch(request);
  const responseObject = await response.json();

  // Pass the object based on the JSON to two function calls
  currentWeather(responseObject);
  dailyWeather(responseObject);

}

// Create and display the current weather information
function currentWeather(object) {

  const curWeather = document.querySelector('.current-weather');
  const curForecast = object.current;

  // Create the HTML elements
  const forecastDate = document.createElement('time');
  const forecastLocation = document.createElement('div');
  const forecastTempContainer = document.createElement('div');
  const forecastIcon = document.createElement('span');
  const forecastTemp = document.createElement('div');
  const forecastFeelsLike = document.createElement('div');
  const forecastListItems = document.createElement('ul');
  const pressure = document.createElement('li');
  const humidity = document.createElement('li');
  const windSpeed = document.createElement('li');
  const windDeg = document.createElement('li');
  const clouds = document.createElement('li');

  // Set attributes
  forecastDate.classList.add('forecast-date');
  forecastDate.setAttribute('datetime', new Date(curForecast.dt * 1000).toISOString());
  forecastLocation.classList.add('forecast-location');
  forecastTempContainer.classList.add('forecast-temperature-container');
  forecastIcon.classList.add('forecast-icon');
  forecastIcon.dataset.icon = curForecast.weather[0].icon;
  forecastTemp.classList.add('forecast-temperature');
  forecastFeelsLike.classList.add('feels-like');
  forecastListItems.classList.add('forecast-list-items');

  // Add content
  const formattedDate = new Date(curForecast.dt * 1000).toDateString().split(' ');
  forecastDate.textContent = `${formattedDate[0]}, ${formattedDate[1]} ${formattedDate[2]}`;
  forecastLocation.textContent = 'Thessaloniki, GR';
  forecastTemp.textContent = Math.round(curForecast.temp) + '°C';
  let forecastDesc = curForecast.weather[0].description;
  forecastDesc = forecastDesc.charAt(0).toUpperCase() + forecastDesc.slice(1);
  console.log(forecastDesc);
  forecastFeelsLike.textContent = `Feels like ${Math.round(curForecast.feels_like)}°C. ${forecastDesc}.`;
  pressure.textContent = `Pressure: ${curForecast.pressure}hPa`;
  humidity.textContent = `Humidity: ${curForecast.humidity}%`;
  windSpeed.textContent = `Wind speed: ${curForecast.wind_speed}m/s E`;
  windDeg.textContent = `Wind direction: ${curForecast.wind_deg}°`;;
  clouds.textContent = `Clouds: ${curForecast.clouds}%`;

  // Append
  curWeather.appendChild(forecastDate);
  curWeather.appendChild(forecastLocation);
  curWeather.appendChild(forecastTempContainer);
  forecastTempContainer.appendChild(forecastIcon);
  forecastTempContainer.appendChild(forecastTemp);
  curWeather.appendChild(forecastFeelsLike);
  curWeather.appendChild(forecastListItems);
  forecastListItems.appendChild(pressure);
  forecastListItems.appendChild(humidity);
  forecastListItems.appendChild(windSpeed);
  forecastListItems.appendChild(windDeg);
  forecastListItems.appendChild(clouds);

}

// Create and display the daily forecast information
function dailyWeather(object) {

  const dailyWeather = document.querySelector('.daily-weather');
  const dailyForecast = object.daily;

  // Remove the first element from the dailyForecast array
  dailyForecast.shift();

  // Loop through each object in the dailyForecast array
  for (const forecast of dailyForecast) {

    // Create several new HTML elements
    const forecastDetails = document.createElement('details');
    const forecastSummary = document.createElement('summary');
    const forecastDate = document.createElement('time');
    const forecastTempContainer = document.createElement('div');
    const forecastIcon = document.createElement('span');
    const forecastTemp = document.createElement('div');
    const forecastDesc = document.createElement('div');
    const forecastMaxMinTemp = document.createElement('div');
    const forecastListItems = document.createElement('ul');
    const feelsLike = document.createElement('li');
    const pressure = document.createElement('li');
    const humidity = document.createElement('li');
    const windSpeed = document.createElement('li');
    const windDeg = document.createElement('li');
    const clouds = document.createElement('li');

    // Set attributes
    forecastDate.classList.add('forecast-date');
    forecastDate.setAttribute('datetime', new Date(forecast.dt * 1000).toISOString());
    forecastTempContainer.classList.add('forecast-temperature-container');
    forecastTemp.classList.add('forecast-temperature');
    forecastIcon.classList.add('forecast-icon');
    forecastDesc.classList.add('forecast-description');
    forecastMaxMinTemp.classList.add('forecast-maxmin-temperature');

    // Add content
    const formattedDate = new Date(forecast.dt * 1000).toDateString().split(' ');
    forecastDate.textContent = `${formattedDate[0]}, ${formattedDate[1]} ${formattedDate[2]}`;
    const forecastTempMean = (forecast.temp.day + forecast.temp.night) / 2;
    forecastTemp.textContent = Math.round(forecastTempMean) + '°C';
    forecastIcon.dataset.icon = forecast.weather[0].icon;
    forecastDesc.textContent = forecast.weather[0].description;
    forecastMaxMinTemp.textContent = `The high will be ${Math.round(forecast.temp.max)}°C, the low will be ${Math.round(forecast.temp.min)}°C.`;
    const forecastFeelsLikeMean = (forecast.feels_like.day + forecast.feels_like.night) / 2;
    feelsLike.textContent = `Feels like: ${Math.round(forecastFeelsLikeMean)}°C`;
    pressure.textContent = `Pressure: ${forecast.pressure}hPa`;
    humidity.textContent = `Humidity: ${forecast.humidity}%`;
    windSpeed.textContent = `Wind speed: ${forecast.wind_speed}m/s E`;
    windDeg.textContent = `Wind direction: ${forecast.wind_deg}°`;;
    clouds.textContent = `Clouds: ${forecast.clouds}%`;

    // Append
    forecastDetails.appendChild(forecastSummary);
    forecastSummary.appendChild(forecastDate);
    forecastSummary.appendChild(forecastTempContainer);
    forecastTempContainer.appendChild(forecastIcon);
    forecastTempContainer.appendChild(forecastTemp);
    forecastSummary.appendChild(forecastDesc);
    forecastDetails.appendChild(forecastMaxMinTemp);
    forecastDetails.appendChild(forecastListItems);
    forecastListItems.appendChild(feelsLike);
    forecastListItems.appendChild(pressure);
    forecastListItems.appendChild(humidity);
    forecastListItems.appendChild(windSpeed);
    forecastListItems.appendChild(windDeg);
    forecastListItems.appendChild(clouds);
    dailyWeather.appendChild(forecastDetails);

  }

  const maxTempChartTitle = document.querySelector('.weather-chart__max-temp-title');
  maxTempChartTitle.textContent = `Max temperature for the next seven days`;

  // Create three new arrays to store information for each day of the next seven days
  const chartMaxTemps = [];
  const chartMinTemps = [];
  const chartDates = [];

  // Loop through each object in the dailyForecast array
  for (const chartForecast of dailyForecast) {

    // Pass the min/max temperatures into the chartMaxTemps and chartMinTemps arrays
    chartMaxTemps.push(Math.round(chartForecast.temp.max));
    chartMinTemps.push(Math.round(chartForecast.temp.min));

    // Pass the dates into the chartDates array
    let chartDate = new Date(chartForecast.dt * 1000).toDateString().split(' ');
    chartDate = `${chartDate[1]} ${chartDate[2]}`;
    chartDates.push(chartDate);

  }

  // Calculate the Min/Max temperatures in the two arrays and pass the values to the chart datasets
  const scalesYmax = Math.max(...chartMaxTemps) + 5;
  const scalesYmin = Math.min(...chartMinTemps);

  // Build the max temperature line-chart
  const ctx = document.querySelector('#weather-chart__max-temp');

  const maxTempChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: chartDates,
      datasets: [{
        label: 'Max temperature',
        data: chartMaxTemps,
        backgroundColor: '#ff9e8c',
        borderColor: '#8cb4ff',
        color: '#fff',
        pointBorderColor: '#ff9e8c',
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Date',
            color: '#c2c2c2',
            padding: {
              top: 12
            }
          },
          grid: {
            borderColor: '#fcfcfc',
            color: '#424242',
            offset: true
          },
          ticks: {
            color: '#fcfcfc',
          }
        },
        y: {
          display: true,
          min: scalesYmin,
          max: scalesYmax,
          title: {
            display: true,
            text: 'Temperature °C',
            color: '#c2c2c2',
            padding: {
              bottom: 12
            }
          },
          grid: {
            borderColor: '#fcfcfc',
            color: '#424242',
            borderDash: [5, 5],
            offset: true
          },
          ticks: {
            color: '#fcfcfc',
          }
        }
      },
      plugins: {
        legend: {
          display: false,
          labels: {
            color: '#fff'
          }
        },
        title: {
          display: false,
        },
        tooltip: {
          backgroundColor: '#fcfcfc',
          titleColor: '#1b1b1b',
          bodyColor: '#1b1b1b',
          cornerRadius: 4
        },
      },
      responsive: true,
      interaction: {
        mode: 'index',
        intersect: false
      },
      layout: {
        padding: 0
      },
      animations: {
        tension: {
          duration: 10000,
          easing: 'linear',
          from: 1,
          to: 0,
          loop: true
        }
      }
    }
  });

}

// Call the top-level function
weatherWidgetInit();