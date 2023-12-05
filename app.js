let apiKey = "Y8W1DK1Zo3ZHo5aS2GZumrzz3WDCGu0RNEUBHJlD";

document.getElementById("search").addEventListener("click", () => {
    displayCountry();
    clearCountryUI();
});

document.getElementById("region").addEventListener("click", () => {
    displayRegion();
    clearUI();
});
async function displayCountry() {  
    const cityName = document.getElementById("city").value;
    const city = await getCountry(cityName);           
    addCountryUI(city);
 
}

async function displayRegion() {  
    const regionName = document.getElementById("select").value;
    const region = await getRegion(regionName);           
    addRegionUI(region);
}

async function getCountry(city='Hermosillo') {
    try {
        const response = await fetch (`https://countryapi.io/api/name/${city}?apikey=${apiKey}`);
        if (response.status ===404)  {        
            messageUI(`City ${city} Doesn't Exist`);                                      
            return;
        }         
        const r = await response.json();
        
        return r;
        } catch (e) {            
            messageUI("Bad Connection! Try Again");        
            
        }
}

async function getRegion(region) {
    try {
        const response = await fetch (`https://countryapi.io/api/region/${region}?apikey=${apiKey}`);
        if (response.status ===404)  {        
            messageUI(`Region ${region} Doesn't Exist`);                                      
            return;
        }         
        const r = await response.json();
        return r;
        } catch (e) {            
            messageUI("Bad Connection! Try Again");        
            
        }
}


function addCountryUI(city) {
    const key = Object.keys(city)[0];
    const country = city[key];
    const countryList = document.getElementById('country-container');
    const element = document.createElement("div");
    element.innerHTML = `
        <img src=${country.flag.medium} width="30px"/>
        <br>  
        <strong class="otros"> Name: </strong> ${country.official_name}
        <br>  
        <strong class="otros"> Capital: </strong> ${country.capital}
        <br>   
        <strong class="otros"> Region: </strong> ${country.region}
        <br>   
        <strong class="otros"> SubRegion: </strong> ${country.subregion}
        <br>   
        `;
    countryList.appendChild(element);
}

function addRegionUI(regions) {
    const keys = Object.keys(regions)
    const countryList = document.getElementById('region-container');
    
    for (let key of keys) {
        const country = regions[key]
        const element = document.createElement("div");
        element.innerHTML = `
            <div class="contenedor-paises">
            <strong class="otros"></strong> ${country.name}
            <br>   
            <img src=${country.flag.medium} width="55px"/>
            <br>  
            <strong class="otros"></strong> ${country.official_name}
            <br>   
            </div> 
        `;
        countryList.appendChild(element);
      }
}


function clearUI() {
    document.getElementById("message").innerHTML = "";
    document.getElementById("region-container").innerHTML = "";
    
}

function clearCountryUI() {
    document.getElementById("message").innerHTML = "";
    document.getElementById("country-container").innerHTML = "";
    document.getElementById("city").value = "";
}

function messageUI(message) { 
    const mes = document.getElementById('message');
    const element = document.createElement("div");    
    element.innerHTML = `<h3> ${message} </h3>`; 
    mes.appendChild(element);    
}   