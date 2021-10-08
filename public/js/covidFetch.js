"use strict";
const btnCovid = document.querySelector(".btnCovid");
const covidContainer = document.querySelector(".cvContainer");
// const ctryName = document.querySelector(".ctryName");

const renderCovid = function (data , className="") {
    // console.log(data);
  const html = `<article class="covid ${className}">       
                <div class="covid_data">
                <p class="country_covid_name"><a onclick="fetchCountryData('${data.country}')">${data.country}</a></p>
                <p class="covid_row"><span>เมืองหลวง :</span>${data.capital_city} </p>
                <p class="covid_row"><span>ประชากรทั้งหมด :</span>${data.population} </p>
                <p class="covid_row"><span>Deaths :</span>${data.deaths} </p>
                <p class="covid_row">ติดเชื้อสะสม :<span></span>${data.confirmed} </p>
                </div>
                </article>`;

covidContainer.insertAdjacentHTML("beforeend", html);
covidContainer.style.opacity = 1;
};

const renderVac = function(data, className="" ) 
{
    const html = `<article class="covid ${className}">
        <div class ="covid_data">
        <p class="country_covid_name">Vaccines</p>
        <p class="covid_row">${data.abbreviation}</p>
        <p class="covid_row"><span>Partially Vaccinated:</span>${data.people_partially_vaccinated}  People</p>
        <p class="covid_row"><span>People Vaccinated:</span>${data.people_vaccinated}  People</p>
        <p class="covid_row"><span>State Quarantine🏡:</span>${data.sq_km_area} km<sup>2</sup></p>
        <p class="covid_row"><span>Updated👇:</span>${data.updated}</p>
        </div>
</article>`;

covidContainer.insertAdjacentHTML("beforeend", html);
covidContainer.style.opacity = 1;
}

const fetchCovidData = function (name) {
  covidContainer.innerHTML = "";
    fetch(`https://covid-api.mmediagroup.fr/v1/cases?country=${name}`)
    .then((response) => {
      console.log(response);

      if (!response.ok) 
      throw new Error(`Error (${response.status})`);
      return response.json();
    })
      .then((data)=> {
        renderCovid(data.All);
        console.log(data.All);
        })
    covidContainer.innerHTML = "";
    fetch(`https://covid-api.mmediagroup.fr/v1/vaccines?country=${name}`)
      .then((response) => {
        console.log(response);
        if(!response.ok) 
        throw new Error(`Vaccines not found (${response.status})`);
        return response.json();
      })
        .then((data) => 
        { 
          console.log(data.All);
          renderVac(data.All);
        })
      }
// fetchCovidData()

// function submit() {
//     const covidCtry = document.getElementsByClassName("covid19");
//     console.log(covidCtry[0].value);
//     fetchCovidData(covidCtry[0].value);
//   }

  btnCovid.addEventListener('click' , () => fetchCovidData(input.value));