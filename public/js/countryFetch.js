"use strict";

const countryContainer = document.querySelector(".ctryContainer")

const renderCountry = function (data, className = "") {
  const html = `<article>
                    <div><h1>${data[0].name.common}</h1></div>
                    <div><h4> 🏰 : ${data[0].capital}</h4>
                        <h4> 🌐 : ${data[0].region}</h4>
                    </div>
                    <div>
                        <p>🗣 : ${data[0].languages.tha}</p>
                        <p>💰 : ${data[0].currencies.THB.name}</p>
                    </div>
                </article>`;

    countryContainer.insertAdjacentHTML("beforeend", html);
    countryContainer.style.opacity = 1;
}

const fetchCountryData = function () {
  fetch(`https://restcountries.com/v3/name/Thailand`)
  .then((response)=> {

    console.log(response)

    if (!response.ok) 
    throw new Error(`Error (${response.status})`)
    return response.json()
  }) 

  .then((data)=> {
    renderCountry(data);
    console.log(data);
    }
  )}

  fetchCountryData()