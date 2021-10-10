"use strict";
const btnCovid = document.querySelector(".btnCovid");
const covidContainer = document.querySelector(".cvContainer");

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const countryName = urlParams.get("countryName");

console.log(countryName);

const renderCovid = function (data , className="") {
    // console.log(data);
  const html = `<article class="covid ${className}">       
                <div class="covid_data">
               <p class="linkCountry">
                    <a  href="/country?countryName=${data.country}">${data.country} Click!</a>
                <p class="covid_row"><span>เมืองหลวง 🏛 :</span>${data.capital_city} </p>
                <p class="covid_row"><span>อายุขัยเฉลี่ย 👴🏻 :</span>${data.life_expectancy} years</p>
                <p class="covid_row"><span>เสียชีวิต 💀 :</span>${data.deaths} People</p>
                <p class="covid_row"><span>ติดเชื้อสะสม 😷 :</span>${data.confirmed} People</p>
                </div>
                </article>`;

covidContainer.insertAdjacentHTML("beforeend", html);
covidContainer.style.opacity = 1;
};

const renderVac = function(data, className="" ) 
{
    const html = `<article class="covid ${className}">
        <div class ="covid_data">
        <p class="linkVaccines">Vaccines</p>
        <p class="covid_row"><span>ประชากรทั้งหมด 👨‍👨‍👧‍👦 :</span>${data.population}  People</p>
        <p class="covid_row"><span>ประชากรที่ฉีดวัคซีน 💉 :</span>${data.people_partially_vaccinated}  People</p>
        <p class="covid_row"><span>State Quarantine 🏥 :</span>${data.sq_km_area} km<sup>2</sup></p>
        <p class="covid_row"><span>Updated 📊 :</span>${data.updated}</p>
        </div>
</article>`;

covidContainer.insertAdjacentHTML("beforeend", html);
covidContainer.style.opacity = 1;
}

const renderErrMsg = function(msg)
{
  covidContainer.insertAdjacentText('beforeend',msg);
  covidContainer.style.opacity = 0;
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
        throw new Error(`not found (${response.status})`);
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

  if(countryName == null){
  }else{
    fetchCovidData(countryName);
  }

 
  