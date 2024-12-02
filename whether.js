// https://ip-api.com/docs/api:json

//API منطقه
// http://ip-api.com/json/?fields=country,city,lat,lon,timezone

//API آب و هوا
// `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=eb997a86ed54b28443bb0b3a396ca2b9`;



const getLoc = async () => {
  const url1 =
    "http://ip-api.com/json/?fields=country,region,regionName,city,lat,lon,timezone";
  const response = await fetch(url1);
  const data = await response.json();

  return data;
};

const getWeather = async () => {
  const url2 = `https://api.openweathermap.org/data/2.5/weather?q=mashhad&appid=eb997a86ed54b28443bb0b3a396ca2b9`;

  const response = await fetch(url2);
  const data = await response.json();

  return data;
};

function getDayOrNight() {
  let DayOrNight;
  let d = new Date();

  if (d.getHours() >= 6 && d.getHours() <= 19) {
    DayOrNight = "Day";
  } else {
    DayOrNight = "Night";
  }
}

function getIcon(weMain) {
  let icon;
  switch (weMain) {
    case "Thunderstorm":
      icon = `${weMain}.svg`;
      break;
    case "Drizzle":
      icon = `${weMain}.svg`;
      break;
    case "Rain":
      icon = `${weMain}.svg`;
      break;
    case "Snow":
      icon = `${weMain}.svg`;
      break;
    case "Clear":
      const DayOrNight = getDayOrNight();
      icon = `${weMain}-${DayOrNight}.svg`;
      break;
    case "Clouds":
      icon = `${weMain}.svg`;
      break;
    case "Atmosphere":
      icon = `${weMain}.png`;
      break;
  }

  return icon;
}

function getTemp(weTemp) {
  const k = weTemp;
  const f = (k - 273.15) * 9.5 + 32;
  const c = k - 273.15;
  return (temp = {
    kel: Math.floor(k),
    far: Math.floor(f),
    can: Math.floor(c),
  });
}

const loca = document.querySelector(".location");
const icon = document.querySelector(".icon");
const dese = document.querySelector(".degree-section");
const deg = document.querySelector(".degree-section h2");
const unit = document.querySelector(".degree-section span");
const tede = document.querySelector(".temperatyre-description");

getLoc()
  .then((locData) => {
    // console.log(locData);
    const city = locData.city;
    const country = locData.country;
    loca.textContent = `${city}, ${country}`;
    console.log(`${city}, ${country}`);
    return getWeather(locData.lat, locData.lon);
  })
  .then((weData) => {
    // console.log(weData);
    const weTemp = weData.main.temp;
    const weMain = weData.weather[0].main;
    const weDes = weData.weather[0].description;
    console.log(weTemp, weMain, weDes);

    const iconName = getIcon(weMain);
    icon.innerHTML = `<img src='icons/${iconName}'style='width: 200px; height: 200px'></img>`;

    deg.textContent = Math.floor(weTemp);
    unit.textContent = 'K';

    dese.addEventListener('click', function(e){
        if(unit.textContent == 'K'){
            deg.textContent = getTemp(weTemp).far;
            unit.textContent = 'F';
        }
        else if (unit.textContent == 'F') {
            deg.textContent = getTemp(weTemp).can;
            unit.textContent = 'C';
        } 
        else {
            deg.textContent = getTemp(weTemp).kel;
            unit.textContent = 'K';
        }
    })

    tede.textContent = weDes;

  });


