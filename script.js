async function search() {
  const locationName = document.querySelector(".text-box").value;
  if (locationName == "") {
    alert("Please Enter a City Name");
    return;
  } else if (!isAlphabetic(locationName)) {
    alert("Input contains symbols or non-alphabetic characters.");
    document.querySelector(".text-box").value = "";
    return;
  }
  try {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${locationName}&days=5&key=13f64561991b46729db1868cff12e6b5&units=Metric`;
    const fetching = await fetch(url); //waits for the fetch promise to resolve
    const response = await fetching.json(); //waiting for the json parsing to complete
    console.log(response);
    document.querySelector(
      ".current-weather h2"
    ).innerHTML = `${response.city_name} (${response.data[0].datetime})`;
    document.querySelector("#temp").innerHTML = `Temperature : ${Math.round(
      response.data[0].temp
    )}°C`;
    document.querySelector(
      "#wind"
    ).innerHTML = `Wind : ${response.data[0].wind_spd}M/S`;
    document.querySelector(
      "#humidity"
    ).innerHTML = `Humidity : ${response.data[0].rh}%`;

    const icon = document.createElement("img");
    icon.src = `./icons/${response.data[0].weather.icon}.png`;
    document.querySelector(".today_icon").appendChild(icon);
    document.querySelector(".today_icon h4").innerHTML =
      response.data[0].weather.description;

    document.querySelector(".forecast").style.display = "block";
    document.querySelector(".btn-reset").style.display = "block";
    for (let i = 1; i < response.data.length; i++) {
      let data = response.data[i];
      const div = document.createElement("div");
      const h4 = document.createElement("h4");
      const h4_1 = document.createElement("h4");
      const h4_2 = document.createElement("h4");
      const h4_3 = document.createElement("h4");

      const icon = document.createElement("img");
      icon.src = `./icons/${data.weather.icon}.png`;
      const icon_description = document.createElement("h4");

      h4.innerHTML = `${response.city_name} (${data.datetime})`;
      h4_1.innerHTML = `Temperature : ${Math.round(data.temp)}°C`;
      h4_2.innerHTML = `Wind : ${data.wind_spd}M/S`;
      h4_3.innerHTML = `Humidity : ${data.rh}%`;

      icon_description.innerHTML = `Clouds : ${data.weather.description}`;
      document.querySelector(".future-updates").appendChild(div);

      div.appendChild(h4);
      div.appendChild(icon);
      div.appendChild(icon_description);
      div.appendChild(h4_1);
      div.appendChild(h4_2);
      div.appendChild(h4_3);
    }
  } catch (err) {
    alert(err);
  } finally {
    document.querySelector(".text-box").value = "";
    document.querySelector(".btn-search").classList.toggle("start-active"); //classList Css
    document.querySelector(".btn-location").classList.toggle("start-active"); //classList Css
  }

  function isAlphabetic(x) {
    const testCondition = /^[A-Za-z]+$/;
    return testCondition.test(x);
  }
}
function reset() {
  setTimeout(() => window.location.reload(), 500);
}

function getLocation() {
  //Geolocation functionn defintion
  document.querySelector(".btn-location").classList.toggle("start-active");
  document.querySelector(".btn-search").classList.toggle("start-active");
  document.querySelector(".btn-reset").style.display = "block";
  document.querySelector(".forecast").style.display = "block";

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(success, failure);
  } else {
    alert("Location cant access");
  }

  async function success(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=13f64561991b46729db1868cff12e6b5&units=Metric&days=5`;
    const fetching = await fetch(url); //waits for the fetch promise to resolve
    const response = await fetching.json(); //waiting for the json parsing to complete
    document.querySelector(
      ".current-weather h2"
    ).innerHTML = `${response.city_name} (${response.data[0].datetime})`;
    document.querySelector("#temp").innerHTML = `Temperature : ${Math.round(
      response.data[0].temp
    )}°C`;
    document.querySelector(
      "#wind"
    ).innerHTML = `Wind : ${response.data[0].wind_spd}M/S`;
    document.querySelector(
      "#humidity"
    ).innerHTML = `Humidity : ${response.data[0].rh}%`;

    const icon = document.createElement("img");
    icon.src = `./icons/${response.data[0].weather.icon}.png`;
    document.querySelector(".today_icon").appendChild(icon);
    document.querySelector(".today_icon h4").innerHTML =
      response.data[0].weather.description;

    for (let i = 1; i < response.data.length; i++) {
      let data = response.data[i];
      const div = document.createElement("div");
      const h4 = document.createElement("h4");
      const h4_1 = document.createElement("h4");
      const h4_2 = document.createElement("h4");
      const h4_3 = document.createElement("h4");

      const icon = document.createElement("img");
      icon.src = `./icons/${data.weather.icon}.png`;
      const icon_description = document.createElement("h4");

      h4.innerHTML = `${response.city_name} (${data.datetime})`;
      h4_1.innerHTML = `Temperature : ${Math.round(data.temp)}°C`;
      h4_2.innerHTML = `Wind : ${data.wind_spd}M/S`;
      h4_3.innerHTML = `Humidity : ${data.rh}%`;

      icon_description.innerHTML = `Clouds : ${data.weather.description}`;
      document.querySelector(".future-updates").appendChild(div);

      div.appendChild(h4);
      div.appendChild(icon);
      div.appendChild(icon_description);
      div.appendChild(h4_1);
      div.appendChild(h4_2);
      div.appendChild(h4_3);
    }
  }

  function failure() {
    alert("Location Not found ");
  }
}
