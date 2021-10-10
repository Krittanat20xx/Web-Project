"use strict";
const countryContainer = document.querySelector(".ctryContainer");
const btnCountry = document.querySelector(".btn-Country");

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const countryName = urlParams.get("countryName");

const renderCountry = function (data, className = "") {
  // console.log(data);
  const cur = Object.values(data.currencies)[0]
  const lg = Object.values(data.languages)[0]
  const html = `<article class="country ${className}">
  <img class="country_img" src="${data.flags[1]}" />
  <div class="country_data">
  <p class="country_name">${data.name.common}</p>
  <p class="country_region">
    <a href="/country/region?countryName=${data.region}">${data.region} Click!</a></p>
  <p class="country_item"> เมืองหลวง 🏰 : ${data.capital}</p>
  <p class="country_item"> ประชากร 👨‍👩‍👦‍👦 : ${data.population}</p>
  <p class="country_item"> ภาษาที่ใช้ 📢 : ${lg}</p>
  <p class="country_item"> สกุลเงิน 💵 : ${cur.name} </p>
  <p class="country_item"> เนื้อที่ 🗺 : ${data.area} </p>
  <p class="country_region">
    <a href="/covid?countryName=${data.name.common}">สถานการณ์ Covid-19 Click!</a></p>
  <div/>
</article>`;

  countryContainer.insertAdjacentHTML("beforeend", html);
  countryContainer.style.opacity = 1;
};

const renderErrMsg = function(msg)
{
  countryContainer.insertAdjacentText('beforeend',msg);
  countryContainer.style.opacity = 0;
}

const fetchCountryData = function (name) {
  let neighbour;
  countryContainer.innerHTML = "";
  fetch(`https://restcountries.com/v3/name/${name}`)
    .then((response) => {
      console.log(response);

      if (!response.ok) {
        throw new Error(`Error (${response.status})`);
      }
      return response.json();
    })

    .then((data) => {
      renderCountry(data[0]);
      console.log(data[0]);

      neighbour = data[0].borders;
      if(!neighbour) throw new Error(`No neighbour was found`);
      if(!neighbour) return;
      // console.log(neighbour);

      // if (!neighbour) throw new Error(`No neighbour was found`);
      // return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })

    .then(() => {
      for (let i = 0; i < neighbour.length; i++) {
        fetch(`https://restcountries.com/v3/alpha/${neighbour[i]}`)
          .then((response) => {
            if (!response.ok)
              throw new Error(`Country Not Found (${response.status})`);

            return response.json();
          })

          .then((data) => {
            // console.log(data[0]);
            renderCountry(data[0], "neighbour");
          })

          .catch((err) => {
            renderErrMsg(`Something wrong, ${err.message}, Try again`);
          })
          .finally(() => (countryContainer.style.opacity = 1.5));
      }
    });
};

// function submit() {
//   const ctryName = document.getElementsByClassName("ctryName");
//   console.log(ctryName[0].value);
//   fetchCountryData(ctryName[0].value);
// }

btnCountry.addEventListener('click' , () => fetchCountryData(input.value));


if(countryName == null){
}else{
  fetchCountryData(countryName);
}
