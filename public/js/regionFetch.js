"use strict";
const regionContainer = document.querySelector(".regionContainer");

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const countryName = urlParams.get("countryName");

// const ctryName = document.querySelector(".ctryName");

const renderCountry = function (data, className = "") {
  // console.log(data);
  const cur = Object.values(data.currencies)[0]
  const lg = Object.values(data.languages)[0]

  const html = `<article class="country ${className}">
  <img class="country_img" src="${data.flags[1]}" />
  <div class="country_data">
  <p class="country_name">${data.name.common}</p>
  <p class="country_item">${data.region}</p>
  <p class="country_item"> เมืองหลวง 🏰 : ${data.capital}</p>
  <p class="country_item"> ประชากร 👨‍👩‍👦‍👦 : ${data.population}</p>
  <p class="country_item"> ภาษาที่ใช้ 📢 : ${lg}</p>
  <p class="country_item"> สกุลเงิน 💵 : ${cur.name} </p>
  <p class="country_item"> เนื้อที่ 🗺 : ${data.area} </p>
  <p class="country_region">
    <a href="/covid?countryName=${data.name.common}">สถานการณ์ Covid-19</a></p>
  <div/>
  <div/>
</article>`;

regionContainer .insertAdjacentHTML("beforeend", html);
regionContainer .style.opacity = 1;
};

const fetchRegionData = function (name) {
  regionContainer.innerHTML = "";
  fetch(`https://restcountries.com/v3/region/${name}`)
    .then((response) => {
      console.log(response);

      if (!response.ok) {
        throw new Error(`Error (${response.status})`);
      }
      return response.json();
    })

    .then((data) => {
        console.log(data);
        for(let i=0 ; i<data.length ; i++){
            console.log(data[i]);
            renderCountry(data[i])
        }
    })
};

// function submit() {
//   const ctryName = document.getElementsByClassName("ctryName");
//   console.log(ctryName[0].value);
//   fetchCountryData(ctryName[0].value);
// }


if(countryName == null){
}else{
  fetchRegionData(countryName);
}
