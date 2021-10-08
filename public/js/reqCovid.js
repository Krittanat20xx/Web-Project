const countriesContainer = document.querySelector(".ctryContainer");

const renderCovid = function (data , className="") {
    // console.log(data);
  const html = `<article class="covid ${className}">
                    <div class="covid_data" style="width: 50rem;">
                    <p class="country_covid_name"><a onclick="fetchCountryData('${data.country}')">${data.country}</a></p>
                    <p class="covid_item"> เมืองหลวง : ${data.capital_city} </p>
                    <p class="covid_item"> ประชากรทั้งหมด : ${data.population} </p>
                    <p class="covid_item"> Deaths : ${data.deaths} </p>
                    <p class="covid_item"> ติดเชื้อสะสม : ${data.confirmed} </p>
                    </ul></div>
                </article>`;

countriesContainer.insertAdjacentHTML("beforeend", html);
countriesContainer.style.opacity = 1;
};

const fetchCovidData = function(name) 
{
  countriesContainer.innerHTML = "";
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