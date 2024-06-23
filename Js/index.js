let searchInput = document.querySelector('#search_input');
let currentCard = document.querySelector('#currentDay');
let nextDay = document.querySelector('#nextDay');
let afterNextDay = document.querySelector('#afterNextDay');
let navLinks = document.querySelectorAll('.nav-link');
let deleteBtn = document.querySelector('.deleteBtn');

for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener('click', function (e) {
    navLinks[i].classList.replace('', 'active')
  })
}

deleteBtn.addEventListener('click', function () {
  searchInput.value = null
  getWeather('cairo')
})

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
let date = new Date().getDay();
let month = new Date().getMonth()
let currentDate = new Date().getDate()
// console.log(months[month]);


async function getWeather(city) {
  let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=20b5423eb47a45d185984307232402&q=${city}&days=5`);
  let data = await response.json()
  displayCurrentDay(data)
  displayNextDay(data.forecast.forecastday[1])
  displayAfterNextDay(data.forecast.forecastday[2])
  // console.log(data);
}

searchInput.addEventListener('input', function () {
  getWeather(searchInput.value)
})
getWeather('cairo')

function displayCurrentDay(currentDay) {
  // console.log(currentDay);
  let box = ''

  box += `
    <div class="card">
    <div class="card-header p-0 px-2">
      <div
        class="d-flex justify-content-between align-items-center pt-1">
        <p>${days[date]}</p>
        <p>${currentDate} ${months[month]}</p>
      </div>
    </div>
    <div class="card-body pb-4">
      <span class='fs-3'>${currentDay.location.name}</span>
      <div class="d-flex mb-3">
        <h2 class="text-white me-5">
          ${currentDay.current.temp_c}<sup>o</sup>C
        </h2>
        <img
          src='${currentDay.current.condition.icon}'
          class="w-25"
          alt=""
        />
      </div>
      <span class="custom">${currentDay.current.condition.text}</span>
      <div class="d-flex my-3">
        <div class="flex">
          <img
            src="./images/icon-umberella.png"
            class="me-1"
            alt=""
          />
          <span>${currentDay.current.humidity}%</span>
        </div>
        <div class="flex mx-3">
          <img
            src="./images/icon-wind.png"
            class="me-1"
            alt=""
          />
          <span>${currentDay.current.wind_kph} skm/h</span>
        </div>
        <div class="flex">
          <img
            src="./images/icon-compass.png"
            class="me-1"
            alt=""
          />
          <span>${currentDay.current.wind_dir}</span>
        </div>
      </div>
    </div>
  </div>
    `;

  currentCard.innerHTML = box;
}

function displayNextDay(data) {
  // console.log(data);

  let showNextDay = new Date(data.date).getDay()

  let box = ''

  box += `
  <div class="card sec_card">
<div class="card-header p-0 px-2 pt-1">
  <div class="d-flex justify-content-center">
    <p>${days[showNextDay]}</p>
  </div>
</div>
<div class="card-body py-5">
  <div class="d-flex flex-column align-items-center">
    <img
      src='${data.day.condition.icon}'
      class="img-fluid mb-3"
    />
    <h4 class="text-white">${data.day.maxtemp_c} <sup>o</sup>C</h4>
    <span class="text-white">${data.day.mintemp_c}<sup>o</sup></span>
    <span class="custom mt-4">${data.day.condition.text}</span>
  </div>
</div>
</div>
  `

  nextDay.innerHTML = box;
}

function displayAfterNextDay(data) {
  // console.log(data);

  let showAfterNextDay = new Date(data.date).getDay()

  let box = '';

  box += `
  <div class="card">
<div class="card-header p-0 px-2 pt-1">
  <div class="d-flex justify-content-center">
    <p>${days[showAfterNextDay]}</p>
  </div>
</div>
<div class="card-body py-5">
  <div class="d-flex flex-column align-items-center">
    <img
      src='${data.day.condition.icon}'
      class="img-fluid mb-3"
      alt=""
    />
    <h4 class="text-white" id="next_max_temp">${data.day.maxtemp_c} <sup>o</sup>C</h4>
    <span class="text-white">${data.day.mintemp_c}<sup>o</sup></span>
    <span class="custom mt-4">${data.day.condition.text}</span>
  </div>
</div>
</div>
  `
  afterNextDay.innerHTML = box;
}