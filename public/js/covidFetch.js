"use strict";
const btnCovid = document.querySelector(".btnCovid");
const covidContainer = document.querySelector(".cvContainer");
// const ctryName = document.querySelector(".ctryName");

const renderCovid = function (data , className="") {
    // console.log(data);
  const html = `<article class="covid-19 ${className}">
                        <div><p>${data.country}</p></div>
                        <div><ul>
                        ☠ : Deaths =${data.deaths}</li>
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
      .then((data)=> {
        renderCovid(data.All);
        console.log(data.All);
        })
    }
// fetchCovidData()

// function submit() {
//     const covidCtry = document.getElementsByClassName("covid19");
//     console.log(covidCtry[0].value);
//     fetchCovidData(covidCtry[0].value);
//   }

  btnCovid.addEventListener('click' , () => fetchCovidData(input.value));