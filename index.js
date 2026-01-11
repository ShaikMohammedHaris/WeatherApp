function dateformat(timestamp) {
  return new Date(timestamp * 1000).toLocaleString('en-GB', {
    hour12: true
  });
}
  async function fetchAqi(lat,lon) {
    let aqiFetch = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${your_apiKey}`);
    let aqiFormat = await aqiFetch.json();
    //console.log('aqi data',aqiFormat);
    let list = aqiFormat.list[0].components;
    //console.log("list",list);
    $('#no')[0].innerText = "NO";
    $('#noValue')[0].innerText = list.no;

    $('#no2')[0].innerText = "NO2";
    $('#no2Value')[0].innerText = list.no2;

    $('#co')[0].innerText = "CO";
    $('#coValue')[0].innerText = list.co;

    $('#o3')[0].innerText = "O3";
    $('#o3Value')[0].innerText = list.o3;
    nextFive(lat,lon);
    
      
  }
  async function nextFive(lat,lon) {
    let nextFetch = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${your_apiKey}&units=metric`);
    let nextFormat = await nextFetch.json();
    console.log("next five",nextFormat);
    
  }
  async function fetchData(){
    let city = document.querySelector(".inputfield").value;
    
    let a = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${your_apiKey}&units=metric`);
    let formatdata= await a.json();
    //console.log("formatdata",formatdata);
    
    let formatdataCity = formatdata.name;
    let formatdataTemp = formatdata.main.temp;
    let descrp = formatdata.weather[0].description;
    //jquery
    $('#city-name')[0].innerText = formatdataCity;
    $('#city-temp')[0].innerText = formatdataTemp;
    $('#sky-descrip')[0].innerText = descrp; 
    let properdate = dateformat(formatdata.dt);
    //console.log(properdate);
    
    let data = properdate.split(',');
    let date = data[0];
    let time = data[1];
    $('#date')[0].innerText = date; 
    $('#time')[0].innerText = time; 
    let sunrisetime = dateformat(formatdata.sys.sunrise).split(',')[1];
    let sunsettime = dateformat(formatdata.sys.sunset).split(',')[1];
    $('#sunriseTime')[0].innerText = sunrisetime;
    $('#sunsetTime')[0].innerText = sunsettime;
    let lattitude = formatdata.coord.lat;
    let longitude = formatdata.coord.lon;
    let pressure = formatdata.main.pressure;
    let humidity = formatdata.main.humidity;
    let speed = formatdata.wind.speed;
    let direc = formatdata.wind.deg;
    //console.log('direc',direc);
    
    $("#presValue")[0].innerText = `${pressure} hpa`;
    $("#humiValue")[0].innerText = humidity;

    $("#windDir")[0].innerText = `${direc} deg`;
    $("#windSpeed")[0].innerText =`${speed} m/s`;
    fetchAqi(lattitude,longitude);
    
  }
