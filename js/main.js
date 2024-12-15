//today
let dayName = document.getElementById("dayName");
let dayNumber = document.getElementById("dayNumber");
let todayMonth = document.getElementById("todayMonth");
let todayCurrent = document.getElementById("todayCurrent");
let todayLocation = document.getElementById("todayLocation");
let todayTemp = document.getElementById("todayTemp");
let todayImg = document.getElementById("todayImg");
let todayText = document.getElementById("todayText");
let todayUmb = document.getElementById("todayUmb");
let todayWind = document.getElementById("todayWind");
let todayDirection = document.getElementById("todayDirection");
//end today

// next day
let nextDayName = document.getElementById("nextDayName");
let nextImg = document.getElementById("nextImg");
let nextMaxTemp = document.getElementById("nextMaxTemp");
let nextMinTemp = document.getElementById("nextMinTemp");
let nextText = document.getElementById("nextText");
// end next day


// after next day
let afterNextDayName = document.getElementById("afterNextDayName");
let afterNextDayImg = document.getElementById("afterNextDayImg");
let afterNextDayMaxTemp = document.getElementById("afterNextDayMaxTemp");
let afterNextDayMinTemp = document.getElementById("afterNextDayMinTemp");
let afterNextText = document.getElementById("afterNextText");
// end of after next day

let searchLocation = document.getElementById("searchLocation");


searchLocation.addEventListener('input', (e) => {
    let currentValue = e.target.value;
  
    if (currentValue.length > 3) {         
        getWeatherDate(currentValue);
    }
});


navigator.geolocation.getCurrentPosition((position) => {
    console.log(position.coords);

    let myLatitude = position.coords.latitude;
    let myLongitude = position.coords.longitude;
    getWeatherDate(`${myLatitude},${myLongitude}`);
});


async function getWeatherDate(query) {
    let response = fetch(`https://api.weatherapi.com/v1/forecast.json?key=0b643408a3184b22a0d180928241412&q=${query}&days=3&aqi=no&alerts=no`);
    let data = await response;
    let allData = await data.json();
    console.log(allData);
    displayWeatherData(allData);
    displayTomorrowDate(allData);
    displayAftetTomorrow(allData);

}

function displayWeatherData(allData) {
    let todayDate = allData.current.last_updated;
    console.log(todayDate);

    let myDateName = new Date(todayDate);
    let todayName = myDateName.toLocaleString("en-us", { weekday: "long" });
    dayName.innerHTML = todayName;

    let monthDay = myDateName.toLocaleString("en-us", { month: "long" });
    let todayDay = myDateName.getDate();

    dayNumber.innerHTML = todayDay;
    todayMonth.innerHTML = monthDay;

    todayLocation.innerHTML = allData.location.country;
    todayTemp.innerHTML = allData.current.temp_c;
    todayText.innerHTML = allData.current.condition.text;
    let currentImg = allData.current.condition.icon;
    let currentSource = `https:${currentImg}`;
    todayImg.setAttribute('src', currentSource);
    todayUmb.innerHTML = allData.current.humidity;
    todayWind.innerHTML = allData.current.wind_kph + " km/h";
    todayDirection.innerHTML = allData.current.wind_dir;

}

function displayTomorrowDate(allData) {
    let tomorrowDate = allData.forecast.forecastday[1];

    let myTomorrowDate = new Date(tomorrowDate.date);
    let tomorrowName = myTomorrowDate.toLocaleString("en-us", { weekday: "long" });
    nextDayName.innerHTML = tomorrowName;

    let currentImgTomorrow = tomorrowDate.day.condition.icon;
    let cuurentImgTomorrowSrc = `https:${currentImgTomorrow}`;
    nextImg.setAttribute('src', cuurentImgTomorrowSrc);

    nextMaxTemp.innerHTML = tomorrowDate.day.maxtemp_c + `<sup>o</sup>C`;
    nextMinTemp.innerHTML = tomorrowDate.day.mintemp_c + `<sup>o</sup>C `;

    nextText.innerHTML = tomorrowDate.day.condition.text;
}


function displayAftetTomorrow(allData) {
    let afterNextDate = allData.forecast.forecastday[2];

    let myAfterNext = new Date(afterNextDate.date);
    let AfterName = myAfterNext.toLocaleString("en-us", { weekday: "long" });
    afterNextDayName.innerHTML = AfterName;

    let afterCurrentImg = afterNextDate.day.condition.icon;
    let afterSrc = `https:${afterCurrentImg}`;
    afterNextDayImg.setAttribute("src", afterSrc);

    afterNextDayMaxTemp.innerHTML = afterNextDate.day.maxtemp_c + `<sup>o</sup>C`;
    afterNextDayMinTemp.innerHTML = afterNextDate.day.mintemp_c + `<sup>o</sup>C`;

    afterNextText.innerHTML = afterNextDate.day.condition.text;
}


