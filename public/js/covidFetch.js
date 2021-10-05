"use strict";

const covidContainer = document.querySelector(".cv-Container");
// const ctryName = document.querySelector(".ctryName");

const renderCovid = function (data , className="") {
    // console.log(data);
  const html = `<article class="covid-19 ${className}">
                        <div><p>${data.country}</p></div>
                        <div><ul>
                        <li>Deaths = ${data.deaths}</li>
                        </ul></div>
                </article>`;

covidContainer.insertAdjacentHTML("beforeend", html);
covidContainer.style.opacity = 1;
};

const fetchCovidData = function (name) {
    fetch(`https://covid-api.mmediagroup.fr/v1/cases?country=${name}`)
    .then((response) => {
      console.log(response);

      if (!response.ok) 
      throw new Error(`Error (${response.status})`);
      return response.json();
    })
      .then((All)=> {
        // renderCovid(data[0]);
        console.log(All);
        })
    }
// fetchCovidData()

function submit() {
    const covidCtry = document.getElementsByClassName("covid-19");
    console.log(covidCtry[0].value);
    fetchCovidData(covidCtry[0].value);
  }
