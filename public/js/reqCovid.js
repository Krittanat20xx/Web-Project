const covidContainer = document.querySelector(".ctryContainer");

const renderCovid = function (data , className="") {


    // console.log(data);
  const html = `<article class="covid-19 ${className}">
                        <div><p>${data.country}</p></div>
                        <div><ul>
                        ☠ : Deaths = ${data.deaths}</li>
                        </ul></div>
                </article>`;

covidContainer.insertAdjacentHTML("beforeend", html);
covidContainer.style.opacity = 1;
};

const fetchCovidData = function (name) 
{
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