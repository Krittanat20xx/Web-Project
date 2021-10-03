"use strict";

const countryContainer = document.querySelector(".ctryContainer");
// const ctryName = document.querySelector(".ctryName");

const renderCountry = function (data, className = "") {
  console.log(data);
  const html = `<article class="country ${className}">
                    <div><h1>${data.name.common}</h1></div>
                    <div><h4> 🏰 : ${data.capital}</h4>
                        <h4> 🌐 : ${data.region}</h4>
                    </div>
                </article>`;

  countryContainer.insertAdjacentHTML("beforeend", html);
  countryContainer.style.opacity = 1;
};

const fetchCountryData = function (name) {
  let neighbour;

  fetch(`https://restcountries.com/v3/name/${name}`)
    .then((response) => {
      console.log(response);

      if (!response.ok) throw new Error(`Error (${response.status})`);
      return response.json();
    })

    .then((data) => {
      renderCountry(data[0]);
      console.log(data[0]);

      neighbour = data[0].borders;
      console.log(neighbour);

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
            console.log(data[0]);
            renderCountry(data[0], "neighbour");
          })

          .catch((err) => {
            renderErrMsg(`Something wrong, ${err.message}, Try again`);
          })
          .finally(() => (countryContainer.style.opacity = 1));
      }
    });
};

function submit() {
  const ctryName = document.getElementsByClassName("ctryName");
  console.log(ctryName[0].value);
  fetchCountryData(ctryName[0].value);
}
