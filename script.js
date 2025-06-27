document.querySelector(".busca").addEventListener("submit", async (event) => {
  event.preventDefault();

  let input = document.querySelector("#searchInput").value;
  document.querySelector(".resultado").style.display = "none";

  if (input !== "") {
    clearInfo();
    showWarning("caregando...");
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
      input
    )}&appid=af71b042c31a55c3b9adfa927d6b242d&units=metric`;
    let result = await fetch(url);
    let json = await result.json();

    if (json.cod === 200) {
      showInfo({
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempIcon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        windAngle: json.wind.deg,
      });
    } else {
      clearInfo();
      showWarning("Não encontramos essa localização.");
    }
  } else {
    clearInfo();
  }
});

function showInfo(json) {
  showWarning("");
  document.querySelector(".resultado").style.display = "block";
  document.querySelector(".titulo").innerHTML = `${json.name}, ${json.country}`;
  document.querySelector(".tempInfo").innerHTML = `${json.temp} <sup>ºC</sup>`;
  document.querySelector(".ventoInfo");

  document.querySelector(".ventoPonto").style.transform = `rotate(${
    json.windAngle - 90
  }deg)`;
  document.querySelector(
    ".ventoInfo"
  ).innerHTML = `${json.windSpeed}<span>km/h</span>`;

  document
    .querySelector(".temp img")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`
    );
  console.log("esse", json.tempIcon);
}

function showWarning(msg) {
  document.querySelector(".aviso").innerHTML = msg;
}
function clearInfo() {
  showWarning("");
  document.querySelector(".resultado").style.display = "none";
}
