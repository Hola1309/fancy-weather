const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
var myLocal;
var myWeather;
var bgimg;
var city;
let celsius = 1;
var search;
// https://www.weatherbit.io/static/img/icons/c01d.png        icons
fetch('https://ipinfo.io?token=25085b57ba9953')
    .then(response => response.json())
    .then(commits => localData(commits));


    
fetch('https://api.unsplash.com/collections/10579225:id/photos?client_id=lIRX-HJiNS0zUbJnpPzR5NqzCQnyCfrkIsZNaEKtUXY')
    .then(response => response.json())
    .then(commits => arrofbg(commits));


var date = new Date();

// час в текущей временной зоне
// alert( days[date.getDay()%7] );
// alert( date.getHours()+':'+date.getMinutes()+':'+date.getSeconds() );
function initSearch(city){
    search = `city=${city}`;
    weatherSearch(search)
}

function weatherSearch(search){
    fetch(`https://api.weatherbit.io/v2.0/forecast/daily?${search}&days=4&lang=en&key=bec3007bca594698a77b75a755839878`)
    .then(response => response.json()).catch(function(e) {alert('Incorrect request\n' + e);})
    .then(commits => weatherData(commits))
}


function myMap(){mapboxgl.accessToken = 'pk.eyJ1IjoiaG9sYTEzMTAiLCJhIjoiY2thcmVhaGplMGh4bzJycHJyNGZzaDc2OSJ9.mPkYMm1SmHt9v854Xot8Rw';
var map = new mapboxgl.Map({
container: 'map', // container id
style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
center: [myWeather.lon,myWeather.lat], // starting position [lng, lat]                    перевернуть обязательно !!!!!!!
zoom: 9 // starting zoom
});}

function fill(){
    document.querySelectorAll('#day')[0].innerText = days[date.getDay()%7];
    
}

function Weather(){
    document.getElementById('city').innerText = myWeather.city_name;
    document.getElementById('country').innerText = myWeather.country_code;
    for(i=0; i<4; i++){
    document.querySelectorAll('#day')[i].innerText = days[(date.getDay() +i)%7];
    document.querySelectorAll('#datetime')[i].innerText = myWeather.data[i].datetime;
    document.querySelectorAll('#weatherimg')[i].src = `https://www.weatherbit.io/static/img/icons/${myWeather.data[i].weather.icon}.png`;
    document.querySelectorAll('#weather')[i].innerText = myWeather.data[i].weather.description; //myWeather.data[0].weather.description;
    
    }
}

function setBackgroungImg(){
    document.getElementById('body').style.backgroundImage = `url(${bgimg[Math.floor(Math.random() * 10)].urls.full})`;
}
function arrofbg(commits){
    bgimg = commits;
    setBackgroungImg()
}

function weatherData(commits){
    myWeather = commits;
    myMap();
    Weather()
    setTemp()
   
}
function localData(commits){
    myLocal = commits;
    onload()
    fill()
    
}
function setTemp(){
    if (celsius){
        for (i=0; i<4; i++){
            document.querySelectorAll('#temp')[i].innerText = `${+myWeather.data[i].min_temp} °С - ${+myWeather.data[i].max_temp} °С`;
            }
    } else {
        for (i=0; i<4; i++){
            document.querySelectorAll('#temp')[i].innerText = `${(+myWeather.data[i].min_temp*9/5)+32} °F - ${(+myWeather.data[i].max_temp*9/5)+32} °F`;
            }
    }
    
}


function onload(){
    search = `postal_code=${myLocal.postal}`
    weatherSearch(search)
}
