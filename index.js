const userTab=document.querySelector("[data-userWeather]");
const searchTab=document.querySelector("[data-searchWeather]");
const userContainer=document.querySelector(".weather-container");

const grantAccessContainer=document.querySelector(".grant-location-container");
const searchForm=document.querySelector("[data-searchForm]");
const loadingScreen=document.querySelector(".loading-container");
const userInfoContainer=document.querySelector(".user-info-container");

// initially variables need??

let oldTab = userTab;
const API_key= "f29233ccf524b40a8908ab6be800a3e5";
oldTab.classList.add("current-tab");
getfromSessionStorage();

function switchTab(newTab){
    if(newTab!=oldTab){
        oldTab.classList.remove("current-tab");
        oldTab=newTab;
        oldTab.classList.add("current-tab");

        if(!searchForm.classList.contains("active")){
            // kya search form vala container is invisible,if yes then make it visible
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        else{
            // main phele search wale tab par the ,ab your weather tab visible karna hai
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            // ab mein your weather tab me aagaya hu, toh weather bhi display karna padega ,so let's check local storage first
            // for coordinates if we haved saved them there.
            getfromSessionStorage();
        }
    }   
}

userTab.addEventListener("click",()=>{
    // pass clicked tab as input parameter
    switchTab(userTab);
})

searchTab.addEventListener("click",()=>{
    // pass clicked tab as input parameter
    switchTab(searchTab);
})

// check if coordinates are already present in session storage
function getfromSessionStorage(){
    const localCoordinates=sessionStorage.getItem("user-coordinates");
    if(!localCoordinates){
        // agar local coordinates nhi mile
        grantAccessContainer.classList.add("active");
    }
    else{
        const coordinates=JSON.parse(localCoordinates);//json string ko json object mein convert karta hai .parse
        fetchUserWeatherInfo(coordinates);
    }

}

async function fetchUserWeatherInfo(coordinates){ // since api call kiya async function  use kiys hai
    const {lat,lon}=coordinates;
    // make grantcontainer invisible
    grantAccessContainer.classList.remove("active");
    // make loader visible
    loadingScreen.classList.add("active");

    // API Call
    try{
        const response=await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`
        );
        const data=await response.json(); //converts the response from the API into son format

        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);// api call ke bad jo data ata hai usko UI pe render karte hai
    }
    catch(err){
        loadingScreen.classList.remove("active")
        //HW
        handleError(err);

    }

}

function renderWeatherInfo(weatherInfo){
    // first we have to fetch the Elements

    const cityName=document.querySelector("[data-cityName]");
    const countryIcon=document.querySelector("[data-countryIcon]");
    const desc=document.querySelector("[data-weatherDesc]");
    const weatherIcon=document.querySelector("[data-weatherIcon]");
    const temp=document.querySelector("[data-temp]");
    const windspeed=document.querySelector("[data-windspeed]");
    const humidity=document.querySelector("[data-humidity]");
    const cloudiness=document.querySelector("[data-cloudiness]");

    console.log(weatherInfo);

    // fetch values from weatherInfo object and put it in UI elements
    cityName.innerText=weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText=weatherInfo?.weather?.[0]?.description
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText=`${weatherInfo?.main?.temp}℃`;
    windspeed.innerText=`${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText=`${weatherInfo?.main?.humidity}%`;
    cloudiness.innerText=`${weatherInfo?.clouds?.all} %`;


}

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition); // A callback functoin is passed in getcurrentlocation
    }
    else{
        // HW - to show an alert for no geolocation support available
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position){
    const userCoordinates={
        lat:position.coords.latitude,
        lon:position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);

}

const grantAccessButton=document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click",getLocation);

const searchInput =document.querySelector("[data-searchInput]");

searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    let cityName=searchInput.value;

    if(cityName==="")
        return;
    else
        fetchSearchWeatherInfo(cityName);
})
// since api will be called function is asynced
async function fetchSearchWeatherInfo(city){
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try{
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`
        );
        if (!response.ok) {  // Use .ok to check for HTTP error status
            const errrorImage = document.querySelector(".error-container")
            errrorImage.classList.add('active');
            loadingScreen.classList.remove('active');
            return;
        }
        else
        {   
        loadingScreen.classList.remove("active")
        const data=await response.json();
        console.log(data)
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data); 
        }
    }
    catch(err){
    // HW
    handleError(err);
    }
}

function handleError(status) {
    loadingScreen.classList.remove("active");
    errrorImage.classList.add("active");
    if (typeof status === 'number') {
        switch (status) {
            case 400:
                errorMessage.innerText = "Bad request. Please check the entered city name.";
                break;
            case 401:
                errorMessage.innerText = "Unauthorized. Please check your API key.";
                break;
            case 404:
                errorMessage.innerText = "City not found. Please try a different city.";
                break;
            case 500:
                errorMessage.innerText = "Internal server error. Please try again later.";
                break;
            default:
                errorMessage.innerText = "An error occurred. Please try again.";
        }
    } else {
        errorMessage.innerText = "Network error. Please check your internet connection.";
    }
}