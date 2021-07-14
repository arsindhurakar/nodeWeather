const submitBtn = document.getElementById("submitBtn");
const userInput = document.getElementById("userInput");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const tempStatus = document.getElementById("tempStatus");
const outputBody = document.getElementById("outputBody");
const day = document.getElementById("day");
const date = document.getElementById("date");

const newDate = new Date();

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

day.innerHTML = days[newDate.getDay()];
date.innerHTML = `${newDate.getDate()} ${
  months[newDate.getMonth()]
} ${newDate.getFullYear()}`;

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!userInput.value) {
    alert("City name required..");
  } else {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${userInput.value}&appid=ef35c631bdf94a479a2ff86495944a2b`
      );
      const jsonData = await response.json();
      const data = [jsonData];
      cityName.innerText = `${data[0].name}, ${data[0].sys.country}`;
      temperature.innerText = data[0].main.temp;
      const tempMood = data[0].weather[0].main;

      if (tempMood === "Clear") {
        tempStatus.innerHTML = `<i class="fas fa-sun" style="color: #eccc68"></i>`;
      } else if (tempMood === "Clouds") {
        tempStatus.innerHTML = `<i class="fas fa-cloud" style="color: #6D6968"></i>`;
      } else if (tempMood === "Rain") {
        tempStatus.innerHTML = `<i class="fas fa-cloud-rain" style="color: #a4b0be"></i>`;
      } else {
        tempStatus.innerHTML = `<i class="fas fa-cloud" style="color: #6D6968"></i>`;
      }

      outputBody.classList.add("weather__outputBody");
    } catch (error) {
      console.log(error);
      alert("Unidentified city name.. Please try again");
    }
  }
};

submitBtn.addEventListener("click", handleSubmit);

// `https://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&appid=ef35c631bdf94a479a2ff86495944a2b`
