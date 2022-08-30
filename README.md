# OpenWeatherMap Weather Widget

The goal here is to create a simple, modern and elegant weather widget using data from an API for Thessaloniki. The data will be provided by [OpenWeatherMap](https://openweathermap.org/api).

### Summary

The widget should display current weather information (temperature, feels like, pressure, humidity, wind speed & wind deg, clouds and a weather icon), using the current object, returned by the API call.

Additionally, a menu should exist inside the widget, which will allow the user to select a future date (up to 7 days ahead) and display the forecast information inside the widget. For the forecast temperature and feels like, you can use a mean value of day and night temperatures.

Finally, a max temperature line-chart for the next seven days should be also available inside the widget.

Special care should be taken in order for the resulting work to be elegant and responsive.

---

### Installation Process

We created a top-level `weatherWidgetInit()` function. The function looks like this:

```javascript
async function weatherWidgetInit() {

    const requestURL = '{URL}';
    const request = new Request(requestURL);
    const response = await fetch(request);
    const responseObject = await response.json();

    currentWeather(responseObject);
    dailyWeather(responseObject);

}
```
To obtain the JSON, we used the Fetch API. This API allows us to make network requests to retrieve resources from the server via JavaScript.

In our function, the first four lines use the Fetch API to fetch the JSON from the server:

- we declare the `requestURL` variable to store the OpenWeatherMap URL.
- we use the URL to initialize a new Request object.
- we make the network request using the `fetch()` function, and this returns a Response object.
- we retrieve the response as JSON using the `json()` function of the Response object.

After all that, the `responseObject` variable will contain the JavaScript object based on the JSON. We are then passed that object to two function calls: `currentWeather(responseObject)` and `dailyWeather(responseObject)` — the first one fills the `<section class="current-weather">` with the correct data, while the second one creates the `<details>` disclosure element which contains the forecast information for each day of the next seven days, and inserts it into the `<section class="daily-weather”>`, as it also pass the correct data into the next seven days max temperature chart we created using the [Chart.js](https://www.chartjs.org/docs/latest/) JavaScript charting.

We use a for...of loop to loop through each object in the array. For each one, we create several new elements:

```javascript
for (const forecast of dailyForecast) {

    const forecastDetails = document.createElement('details');
    const forecastSummary = document.createElement('summary');
    const forecastDate = document.createElement('time');

    forecastDate.classList.add('forecast-date');
    forecastDate.setAttribute('datetime', new Date(forecast.dt * 1000).toISOString());

    const formattedDate = new Date(forecast.dt * 1000).toDateString().split(' ');
    forecastDate.textContent = `${formattedDate[0]}, ${formattedDate[1]} ${formattedDate[2]}`;

    forecastDetails.appendChild(forecastSummary);
    forecastSummary.appendChild(forecastDate);

}
```
We created the `chartMaxTemps`, `chartMinTemps` and `chartMinTemps` arrays to store the dates and max temperatures for each day of the next seven days and then passed the data into the datasets of the max temperature chart that we rendered in our page.

```javascript
const chartMaxTemps = [];
const chartMinTemps = [];
const chartDates = [];

for (const chartForecast of dailyForecast) {

    chartMaxTemps.push(Math.round(chartForecast.temp.max));
    chartMinTemps.push(Math.round(chartForecast.temp.min));

    let chartDate = new Date(chartForecast.dt * 1000).toDateString().split(' ');
    chartDate = `${chartDate[1]} ${chartDate[2]}`;
    chartDates.push(chartDate);

}
```

```javascript
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
    }
});
```

Finally, we called our top-level `weatherWidgetInit()` function:

```javascript
weatherWidgetInit();
```

### Browser Compatibility

Tested in the following browsers/versions:

- Google Chrome 104.0.5112
- Firefox 105.0b4
- Safari 15.6.1

### Live Demo

- [OpenWeatherMap Weather Widget](https://weatherwidget.monoscopic.net/)
