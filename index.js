// Initializing all elements constants
const weatherDiv = document.querySelector(".weather");
const temperateField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchField");
const windFeild = document.querySelector(".weather4");
const wind = document.getElementById("wind");
const form = document.querySelector("form");
const fc = document.getElementById("favC");
const favCityList = document.getElementById("favcity-div");
const loader = document.getElementById("loader");
const dayNight = document.getElementById("mode");
const mainContainer = document.getElementById("maincon");
const RemoveCity = document.getElementById("RemoveCity");
const forcast = document.getElementById("Forcast");
const forcastdiv = document.querySelector(".forcastdiv");
const forcastdivp = document.getElementById("cityname");
const f = document.querySelector(".forcast");
//

//
let day = 1;
let reguler = 1;

// Adding event listen to the form
form.addEventListener("submit", search);
fc.addEventListener("click", addCity);
dayNight.addEventListener("click", () => {

    if (day) {
        mainContainer.classList.add("night");
        day = 0;
        dayNight.innerText = "Day";
    }
    else {
        mainContainer.classList.remove("night");
        day = 1;
        dayNight.innerText = "Night";
    }
});
RemoveCity.addEventListener("click", RemoveFromFav);
forcast.addEventListener("click", showForcast);





//Rendering Favcity-->
const favCity = [];

function renderFabcity() {
    favCity.map((item) => {
        const ll = document.createElement("li");
        ll.innerText = item;
        ll.setAttribute("class", "city");
        ll.addEventListener("click", () => {
            fetchData(item);
        });
        favCityList.append(ll);
    });
};

renderFabcity();

function addCity() {
    // console.log("HI");
    const currentCity = cityField.innerText;
    if (!favCity.includes(currentCity)) {
        del();
        favCity.push(currentCity);
        renderFabcity();
    }
};

function del() {
    favCity.forEach(() => {
        const ll2 = document.querySelector(".city");
        ll2.remove();
    })
};







// Default Location
let target = "jalpaiguri";

// Function to fetch Data from Weather API
const fetchData = async (target) => {
    try {
        f.classList.add("hidden");
        loader.classList.remove("hidden");
        weatherDiv.classList.add("hidden");
        reguler = 1;
        forcast.innerText = "Forcast";
        const url = `https://api.weatherapi.com/v1/current.json?key=5b27a6ef3547402582e62007222306&q=${target}`;



        const response = await fetch(url);
        const data = await response.json();




        loader.classList.add("hidden");
        weatherDiv.classList.remove("hidden");

        // Destructuring
        const {
            current: {
                temp_c,
                condition: { text, icon },
                wind_kph
            },
            location: { name, localtime },
        } = data;

        updateDom(temp_c, name, localtime, icon, text, wind_kph);
    } catch (error) {
        console.log(error);

        temperateField.innerText = null;
        cityField.innerText = "Location Not Found";
        dateField.innerText = null;
        emojiField.src = null;
        weatherField.innerText = null;
        windFeild.innerText = "None";

    }
};

// Function to update Dom
function updateDom(temperate, city, time, emoji, text, wind) {
    const exactTime = time.split(" ")[1];
    const exactDate = time.split(" ")[0];
    const exactDay = getDayFullName(new Date(exactDate).getDay());

    temperateField.innerText = `${temperate}°`;
    cityField.innerText = city;
    dateField.innerText = `${exactTime} - ${exactDay}   ${exactDate}`;
    emojiField.src = emoji;
    weatherField.innerText = text;
    windFeild.innerText = `${wind} Kph`
}

fetchData(target);

// Function to search the location
function search(e) {
    e.preventDefault();

    target = searchField.value;

    fetchData(target);
}

// Function to get the name of day
function getDayFullName(num) {
    switch (num) {
        case 0:
            return "Sunday";

        case 1:
            return "Monday";

        case 2:
            return "Tuesday";

        case 3:
            return "Wednesday";

        case 4:
            return "Thursday";

        case 5:
            return "Friday";

        case 6:
            return "Saturday";

        default:
            return "Don't Know";
    }
}

function RemoveFromFav() {
    if (favCity.length) {
        del();
        favCity.pop();
        renderFabcity();
    }
};


async function showForcast() {
    if (reguler) {
        try {

            for (let i = 0; i < 3; i++) {
                const div = document.querySelector(".day");
                div.remove();
            };

            weatherDiv.classList.add("hidden");
            f.classList.remove("hidden");
            loader.classList.remove("hidden");
            reguler = 0;
            const city = cityField.innerText;

            const forcast_url = `https://api.weatherapi.com/v1/forecast.json?key=5b27a6ef3547402582e62007222306&q=${city}&days=3`;

            const forcast_response = await fetch(forcast_url);
            const forcat_data = await forcast_response.json();
            loader.classList.add("hidden");

            const {
                forecast: {
                    forecastday
                },
            } = forcat_data;







            appendForcast(forecastday, city);
            forcast.innerText = "Weather";



        } catch (error) {
            weatherDiv.classList.remove("hidden");
            f.classList.add("hidden");
            loader.classList.add("hidden");


            alert(error);
        }



    }
    else {
        weatherDiv.classList.remove("hidden");
        f.classList.add("hidden");
        reguler = 1;
        forcast.innerText = "Forcast";
    }
};

function appendForcast(arr, city) {
    arr.map((item) => {
        const exactDate = item.date;
        const exactDay = getDayFullName(new Date(exactDate).getDay());


        const div = document.createElement("div");
        div.setAttribute("class", "day");


        const div_div1 = document.createElement("div");
        const div_div2 = document.createElement("div");
        const div_div3 = document.createElement("div");
        const div_div4 = document.createElement("div");

        const div_div_2_p = document.createElement("p");
        const div_div_2_p_img = document.createElement("img");
        const div_div_2_span = document.createElement("p");

        div_div3.setAttribute("class", "design");
        div_div4.setAttribute("class", "design");
        div_div1.setAttribute("class", "design");
        div_div_2_span.setAttribute("class", "design");


        div_div3.innerText = item.date;
        div_div4.innerText = exactDay;
        div_div1.innerText = `${item.day.avgtemp_c}°`;
        div_div_2_p_img.src = item.day.condition.icon;
        div_div_2_span.innerText = item.day.condition.text;

        div.append(div_div3);
        div.append(div_div4);
        div.append(div_div1);
        div_div_2_p.append(div_div_2_p_img);
        div_div2.append(div_div_2_p);
        div_div2.append(div_div_2_span);

        div.append(div_div2);
        forcastdiv.append(div);
        forcastdivp.innerText = city;

    })
}