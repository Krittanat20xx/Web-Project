const cvContainer = document.querySelector(".cvContainer");

const renderCountry = function(data, className = "") {
  // console.log(data);
  const cur = Object.values(data.currencies)[0]
  const lg = Object.values(data.languages)[0]

  const html = `<article class="country ${className}">
  <img class="country_img" src="${data.flags[1]}" />
  <div class="country_data">
  <p class="country_name">${data.name.common}</p>
  <p class="country_region">${data.region}</p>
  <p class="country_region"> เมืองหลวง 🏰 : ${data.capital}</p>
  <p class="country_region"> ประชากร 👨‍👩‍👦‍👦 : ${data.population}</p>
  <p class="country_region"> ภาษาที่ใช้ 📢 : ${lg}</p>
  <p class="country_region"> สกุลเงิน 💵 : ${cur.name} </p>
  <p class="country_region"> เนื้อที่ 🗺 : ${data.area} </p>
  <p class="country__item"><span class="country_region">สถานการณ์ Covid-19 </span><a onclick="fetchCovidData('${data.name.common}')">คลิกที่นี่</a></p>
  <div/>
</article>`;

cvContainer.insertAdjacentHTML("beforeend", html);
cvContainer.style.opacity = 1;
};

const fetchCountryData = function (name) {
  let neighbour;
  cvContainer.innerHTML = "";
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
          .finally(() => (cvContainer.style.opacity = 1.5));
      }
    });
};
  