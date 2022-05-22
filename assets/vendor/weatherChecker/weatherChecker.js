const wrapper = document.querySelector(".wrapper"),
    inputPart = document.querySelector(".input-part"),
    infoTxt = inputPart.querySelector(".info-txt"),
    inputField = inputPart.querySelector("input"),
    locationBtn = inputPart.querySelector("button"),
    weatherPart = wrapper.querySelector(".weather-part"),
    wIcon = weatherPart.querySelector("img#img1"),
    wIcon2 = weatherPart.querySelector("img#img2"),
    arrowBack = wrapper.querySelector("header i");

let api;

inputField.addEventListener("keyup", e =>{
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener("click", () =>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        alert("Your browser not support geolocation api");
    }
});

function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=076f71defbe81d40d41d898d3e06b5f9`;
    fetchData();
}

function onSuccess(position){
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=076f71defbe81d40d41d898d3e06b5f9`;
    fetchData();
}

function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}

function fetchData(){
    infoTxt.innerText = "Getting weather details...";
    infoTxt.classList.add("pending");
    fetch(api).then(res => res.json()).then(result => weatherDetails(result)).catch(() =>{
        infoTxt.innerText = "Something went wrong";
        infoTxt.classList.replace("pending", "error");
    });
}

function weatherDetails(info){
    if(info.cod == "404"){
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = `${inputField.value} isn't a valid city name`;
    }else{
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {temp, feels_like, humidity} = info.main;

        if(id == 800){
            wIcon.src = "https://bmcdn.nl/assets/weather-icons/v3.0/line/svg/clear-day.svg";
        }else if(id >= 200 && id <= 232){
            wIcon.src = "https://bmcdn.nl/assets/weather-icons/v3.0/line/svg/thunderstorms.svg";
        }else if(id >= 600 && id <= 622){
            wIcon.src = "https://bmcdn.nl/assets/weather-icons/v3.0/line/svg/snow.svg";
        }else if(id >= 300 && id <= 321){
            wIcon.src = "https://bmcdn.nl/assets/weather-icons/v3.0/line/svg/drizzle.svg";
        }else if(id >= 701 && id <= 781){
            wIcon.src = "https://bmcdn.nl/assets/weather-icons/v3.0/line/svg/overcast-haze.svg";
        }else if(id >= 801 && id <= 804){
            wIcon.src = "https://bmcdn.nl/assets/weather-icons/v3.0/line/svg/cloudy.svg";
        }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
            wIcon.src = "https://bmcdn.nl/assets/weather-icons/v3.0/line/svg/rain.svg";
        }


        weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);
        weatherPart.querySelector(".weathers").innerText = description;
        weatherPart.querySelector(".location span").innerText = `${city}, ${country}`;


        if (((temp * 9/5) + 32) >= 80 ){

            weatherPart.querySelector(".temp .numb-2").innerText = Math.floor(
                (((
                    -42.379 + 2.04901523*((temp * 9/5) + 32)
                    + 10.14333127*humidity
                    - 0.22475541*((temp * 9/5) + 32)*humidity
                    - 0.00683783*((temp * 9/5) + 32)*((temp * 9/5) + 32)
                    - 0.05481717*humidity*humidity
                    + 0.00122874*((temp * 9/5) + 32)*((temp * 9/5) + 32)*humidity
                    + 0.00085282*((temp * 9/5) + 32)*humidity*humidity
                    - 0.00000199*((temp * 9/5) + 32)*((temp * 9/5) + 32)*humidity*humidity
                )-32)* 5/9)
            );
            var heatIndex = Math.floor(
                (((
                    -42.379 + 2.04901523*((temp * 9/5) + 32)
                    + 10.14333127*humidity
                    - 0.22475541*((temp * 9/5) + 32)*humidity
                    - 0.00683783*((temp * 9/5) + 32)*((temp * 9/5) + 32)
                    - 0.05481717*humidity*humidity
                    + 0.00122874*((temp * 9/5) + 32)*((temp * 9/5) + 32)*humidity
                    + 0.00085282*((temp * 9/5) + 32)*humidity*humidity
                    - 0.00000199*((temp * 9/5) + 32)*((temp * 9/5) + 32)*humidity*humidity
                )-32)* 5/9)
            );

            if (heatIndex <= 27){
                weatherPart.querySelector(".tips").innerText = "Enjoy Your Life";
                weatherPart.querySelector(".tips").style.color = "#27AE60";
                wIcon2.src = "http://4upets.live/wp-content/uploads/2022/05/safety.png";
                document.getElementById('myImage')
                    .src="http://4upets.live/wp-content/uploads/2022/05/tem5-e1651588790664.png";
                document.getElementById('message')
                    .innerHTML="<span style='color: #2ECC71; font-size: 23px; margin-left: 20px; font-family: Comic Sans MS, cursive, sans-serif;'>Safe &nbsp Below 27°C</span>";
                document.getElementById('message2')
                    .innerHTML="<span style='color: #2ECC71; font-family: Comic Sans MS, cursive, sans-serif;margin-top: 25px;'>Enjoy your life and feel free to take your dog outside to play.</span>";
                document.getElementById('heatindex')
                    .innerHTML= "Your heatIndex is: " + heatIndex + "°C";
                if (content === '') {
                    openMaps();
                } else {
                    updateMaps();
                }
                let contents = '<i class=\"fa fa-info-circle\" aria-hidden=\"true\"></i>'+
                    '<span style=\'font-family: Comic Sans MS, cursive, sans-serif;margin-bottom: -50px;\'>Tips:We find some park near you</span>'
                    + '   '+
                    '<i class="fa fa-arrow-down" aria-hidden="true"></i>'
                document.getElementById('message4')
                    .innerHTML=contents;

            }else if (heatIndex >27 && heatIndex <= 32){
                weatherPart.querySelector(".tips").innerText = "Caution";
                weatherPart.querySelector(".tips").style.color = "#F4D03F";
                wIcon2.src = "http://4upets.live/wp-content/uploads/2022/05/caution.png";
                document.getElementById('myImage')
                    .src="http://4upets.live/wp-content/uploads/2022/05/tem-1-e1651381866210.png";
                document.getElementById('message')
                    .innerHTML="<span style='color: #E67E22; font-family: Comic Sans MS, cursive, sans-serif;margin-top: 23px; margin-left: 10px; font-size: 25px;'>Caution &nbsp 27-32°C</span>"
                document.getElementById('message2')
                    .innerHTML="<span style='color: #E67E22; font-family: Comic Sans MS, cursive, sans-serif;margin-top: 25px;'>Fatigue is possible in your dog with prolonged exposure and activity. Continuing activity could result in heat cramps in your dog but less likely to get heat stroke.</span>";
                document.getElementById('heatindex')
                    .innerHTML= "Your heatindex is: " + heatIndex + "°C";
                closeMaps();
                let content =
                    '<h2 style=\'font-family: Comic Sans MS, cursive, sans-serif\'><i class=\"fa fa-info-circle\" aria-hidden=\"true\"></i>Tips:</h2>' + '<h2 style=\'font-family: Comic Sans MS, cursive, sans-serif\'>check our symptoms maps, see if your dog sufuring heatstock</h2>'+'<br>'+
                    '<div style="text-align: center"><a href="#" class="button-55">Symptoms Map</a></div>'
                document.getElementById('message4')
                    .innerHTML=content;
            }else if (heatIndex >32 && heatIndex <= 41){
                weatherPart.querySelector(".tips").innerText = "Extreme Caution";
                weatherPart.querySelector(".tips").style.color = "#F39C12";
                wIcon2.src = "http://4upets.live/wp-content/uploads/2022/05/excaution.png";
                document.getElementById('myImage')
                    .src="http://4upets.live/wp-content/uploads/2022/05/tem-2-e1651382228958.png";
                document.getElementById('message')
                    .innerHTML="<span style='color: #D35400; font-size: 23px; margin-left: 20px; font-family: Comic Sans MS, cursive, sans-serif;'>Extreme Caution &nbsp 32-41°C</span>";
                document.getElementById('message2')
                    .innerHTML="<span style='color: #D35400; font-family: Comic Sans MS, cursive, sans-serif;margin-top: 25px;'>If you expose your dog to this temperature for a long time, heat cramps and heat exhaustion are possible; Your dog is likely to get heat stroke from constant exercise.</span>";
                document.getElementById('heatindex')
                    .innerHTML= "Your heatindex is: " + heatIndex + "°C";
                closeMaps();
                let content =
                    '<h2 style=\'font-family: Comic Sans MS, cursive, sans-serif\'><i class=\"fa fa-info-circle\" aria-hidden=\"true\"></i>Tips:</h2>' + '<h2 style=\'font-family: Comic Sans MS, cursive, sans-serif\'>check our symptoms maps, see if your dog sufuring heatstock</h2>'+'<br>'+
                    '<div style="text-align: center"><a href="#" class="button-55">Symptoms Map</a></div>'
                document.getElementById('message4')
                    .innerHTML=content;
            }else if (heatIndex > 41 && heatIndex <= 54){
                weatherPart.querySelector(".tips").innerText = "Danger";
                weatherPart.querySelector(".tips").style.color = "#EC7063";
                wIcon2.src = "http://4upets.live/wp-content/uploads/2022/05/danger.png";
                document.getElementById('myImage')
                    .src="http://4upets.live/wp-content/uploads/2022/05/tem-3-e1651382241257.png";
                document.getElementById('message')
                    .innerHTML="<span style='color: #E74C3C; font-size: 23px; margin-left: 20px; font-family: Comic Sans MS, cursive, sans-serif;'>Danger &nbsp 41-54°C</span>";
                document.getElementById('message2')
                    .innerHTML="<span style='color: #E74C3C; font-family: Comic Sans MS, cursive, sans-serif;margin-top: 25px;'>If you expose your dog to this temperature for a while, heat cramps and heat exhaustion are likely; Your dog is more likely to get heat stroke from constant exercise.</span>";
                document.getElementById('heatindex')
                    .innerHTML= "Your heatindex is: " + heatIndex + "°C";
                closeMaps();
                let content =
                    '<h2 style=\'font-family: Comic Sans MS, cursive, sans-serif\'><i class=\"fa fa-info-circle\" aria-hidden=\"true\"></i>Tips:</h2>' + '<h2 style=\'font-family: Comic Sans MS, cursive, sans-serif\'>check our symptoms maps, see if your dog sufuring heatstock</h2>'+'<br>'+
                    '<div style="text-align: center"><a href="#" class="button-55">Symptoms Map</a></div>'
                document.getElementById('message4')
                    .innerHTML=content;
            }else if (heatIndex > 54){
                weatherPart.querySelector(".tips").innerText = "Extreme Danger";
                weatherPart.querySelector(".tips").style.color = "#C0392B";
                wIcon2.src = "http://4upets.live/wp-content/uploads/2022/05/exdanger.png";
                document.getElementById('myImage')
                    .src="http://4upets.live/wp-content/uploads/2022/05/tem-4-e1651382254705.png";
                document.getElementById('message')
                    .innerHTML="<span style='color: #A93226; font-size: 23px; margin-left: 20px; font-family: Comic Sans MS, cursive, sans-serif;'>Extreme Danger &nbsp Over 54°C</span>";
                document.getElementById('message2')
                    .innerHTML="<span style='color: #A93226; font-family: Comic Sans MS, cursive, sans-serif;margin-top: 25px;'>Heat stroke is imminent. Do not take your dog outside in this weather; Do not leave your dog outside or even trapped in the car. </span>";
                document.getElementById('heatindex')
                    .innerHTML= "Your heatindex is: " + heatIndex + "°C";
                closeMaps();
                let content =
                    '<h2 style=\'font-family: Comic Sans MS, cursive, sans-serif\'><i class=\"fa fa-info-circle\" aria-hidden=\"true\"></i>Tips:</h2>' + '<h2 style=\'font-family: Comic Sans MS, cursive, sans-serif\'>check our symptoms maps, see if your dog sufuring heatstock</h2>'+'<br>'+
                    '<div style="text-align: center"><a href="#" class="button-55">Symptoms Map</a></div>'
                document.getElementById('message4')
                    .innerHTML=content;
            }


        }
        else if (humidity <= 13){
            weatherPart.querySelector(".temp .numb-2").innerText = Math.floor(
                (((
                    -42.379 + 2.04901523*((temp * 9/5) + 32)
                    + 10.14333127*humidity
                    - 0.22475541*((temp * 9/5) + 32)*humidity
                    - 0.00683783*((temp * 9/5) + 32)*((temp * 9/5) + 32)
                    - 0.05481717*humidity*humidity
                    + 0.00122874*((temp * 9/5) + 32)*((temp * 9/5) + 32)*humidity
                    + 0.00085282*((temp * 9/5) + 32)*humidity*humidity
                    - 0.00000199*((temp * 9/5) + 32)*((temp * 9/5) + 32)*humidity*humidity
                    -((13-humidity)/4)*sqrt((17-ABS(T-95.))/17)
                )-32)* 5/9)
            );

            var heatIndex = Math.floor(
                (((
                    -42.379 + 2.04901523*((temp * 9/5) + 32)
                    + 10.14333127*humidity
                    - 0.22475541*((temp * 9/5) + 32)*humidity
                    - 0.00683783*((temp * 9/5) + 32)*((temp * 9/5) + 32)
                    - 0.05481717*humidity*humidity
                    + 0.00122874*((temp * 9/5) + 32)*((temp * 9/5) + 32)*humidity
                    + 0.00085282*((temp * 9/5) + 32)*humidity*humidity
                    - 0.00000199*((temp * 9/5) + 32)*((temp * 9/5) + 32)*humidity*humidity
                    -((13-humidity)/4)*sqrt((17-ABS(T-95.))/17)
                )-32)* 5/9)
            );
            if (heatIndex <= 27){
                weatherPart.querySelector(".tips").innerText = "Enjoy Your Life";
                weatherPart.querySelector(".tips").style.color = "#27AE60";
                wIcon2.src = "http://4upets.live/wp-content/uploads/2022/05/safety.png";
                document.getElementById('myImage')
                    .src="http://4upets.live/wp-content/uploads/2022/05/tem5-e1651588790664.png";
                document.getElementById('message')
                    .innerHTML="<span style='color: #2ECC71; font-size: 23px; margin-left: 20px; font-family: Comic Sans MS, cursive, sans-serif;'>Safe &nbsp Below 27°C</span>";
                document.getElementById('message2')
                    .innerHTML="<span style='color: #2ECC71; font-family: Comic Sans MS, cursive, sans-serif;margin-top: 25px;'>Enjoy your life and feel free to take your dog outside to play.</span>";
                document.getElementById('heatindex')
                    .innerHTML= "Your heatindex is: " + heatIndex + "°C";
                if (content === '') {
                    openMaps();
                } else {
                    updateMaps();
                }
                let contents = '<i class=\"fa fa-info-circle\" aria-hidden=\"true\"></i>'+
                    '<span style=\'font-family: Comic Sans MS, cursive, sans-serif;margin-bottom: -50px;\'>Tips:We find some park near you</span>'
                    + '   '+
                    '<i class="fa fa-arrow-down" aria-hidden="true"></i>'
                document.getElementById('message4')
                    .innerHTML=contents;

            }else if (heatIndex >27 && heatIndex <= 32){
                weatherPart.querySelector(".tips").innerText = "Caution";
                weatherPart.querySelector(".tips").style.color = "#F4D03F";
                wIcon2.src = "http://4upets.live/wp-content/uploads/2022/05/caution.png";
                document.getElementById('myImage')
                    .src="http://4upets.live/wp-content/uploads/2022/05/tem-1-e1651381866210.png";
                document.getElementById('message')
                    .innerHTML="<span style='color: #E67E22; font-family: Comic Sans MS, cursive, sans-serif;margin-top: 23px; margin-left: 10px; font-size: 25px;'>Caution &nbsp 27-32°C</span>"
                document.getElementById('message2')
                    .innerHTML="<span style='color: #E67E22; font-family: Comic Sans MS, cursive, sans-serif;margin-top: 25px;'>Fatigue is possible in your dog with prolonged exposure and activity. Continuing activity could result in heat cramps in your dog but less likely to get heat stroke.</span>";
                document.getElementById('heatindex')
                    .innerHTML= "Your heatindex is: " + heatIndex + "°C";
                closeMaps();
                let content =
                    '<h2 style=\'font-family: Comic Sans MS, cursive, sans-serif\'><i class=\"fa fa-info-circle\" aria-hidden=\"true\"></i>Tips:</h2>' + '<h2 style=\'font-family: Comic Sans MS, cursive, sans-serif\'>check our symptoms maps, see if your dog sufuring heatstock</h2>'+'<br>'+
                    '<div style="text-align: center"><a href="#" class="button-55">Symptoms Map</a></div>'
                document.getElementById('message4')
                    .innerHTML=content;

            }else if (heatIndex >32 && heatIndex <= 41){
                weatherPart.querySelector(".tips").innerText = "Extreme Caution";
                weatherPart.querySelector(".tips").style.color = "#F39C12";
                wIcon2.src = "http://4upets.live/wp-content/uploads/2022/05/excaution.png";
                document.getElementById('myImage')
                    .src="http://4upets.live/wp-content/uploads/2022/05/tem-2-e1651382228958.png";
                document.getElementById('message')
                    .innerHTML="<span style='color: #D35400; font-size: 23px; margin-left: 20px; font-family: Comic Sans MS, cursive, sans-serif;'>Extreme Caution &nbsp 32-41°C</span>";
                document.getElementById('message2')
                    .innerHTML="<span style='color: #D35400; font-family: Comic Sans MS, cursive, sans-serif;margin-top: 25px;'>If you expose your dog to this temperature for a long time, heat cramps and heat exhaustion are possible; Your dog is likely to get heat stroke from constant exercise.</span>";
                document.getElementById('heatindex')
                    .innerHTML= "Your heatindex is: " + heatIndex + "°C";
                closeMaps();
                let content =
                    '<h2 style=\'font-family: Comic Sans MS, cursive, sans-serif\'><i class=\"fa fa-info-circle\" aria-hidden=\"true\"></i>Tips:</h2>' + '<h2 style=\'font-family: Comic Sans MS, cursive, sans-serif\'>check our symptoms maps, see if your dog sufuring heatstock</h2>'+'<br>'+
                    '<div style="text-align: center"><a href="#" class="button-55">Symptoms Map</a></div>'
                document.getElementById('message4')
                    .innerHTML=content;

            }else if (heatIndex > 41 && heatIndex <= 54){
                weatherPart.querySelector(".tips").innerText = "Danger";
                weatherPart.querySelector(".tips").style.color = "#EC7063";
                wIcon2.src = "http://4upets.live/wp-content/uploads/2022/05/danger.png";
                document.getElementById('myImage')
                    .src="http://4upets.live/wp-content/uploads/2022/05/tem-3-e1651382241257.png";
                document.getElementById('message')
                    .innerHTML="<span style='color: #E74C3C; font-size: 23px; margin-left: 20px; font-family: Comic Sans MS, cursive, sans-serif;'>Danger &nbsp 41-54°C</span>";
                document.getElementById('message2')
                    .innerHTML="<span style='color: #E74C3C; font-family: Comic Sans MS, cursive, sans-serif;margin-top: 25px;'>If you expose your dog to this temperature for a while, heat cramps and heat exhaustion are likely; Your dog is more likely to get heat stroke from constant exercise.</span>";
                document.getElementById('heatindex')
                    .innerHTML= "Your heatindex is: " + heatIndex + "°C";
                closeMaps();
                let content =
                    '<h2 style=\'font-family: Comic Sans MS, cursive, sans-serif\'><i class=\"fa fa-info-circle\" aria-hidden=\"true\"></i>Tips:</h2>' + '<h2 style=\'font-family: Comic Sans MS, cursive, sans-serif\'>check our symptoms maps, see if your dog sufuring heatstock</h2>'+'<br>'+
                    '<div style="text-align: center"><a href="#" class="button-55">Symptoms Map</a></div>'
                document.getElementById('message4')
                    .innerHTML=content;

            }else if (heatIndex > 54){
                weatherPart.querySelector(".tips").innerText = "Extreme Danger";
                weatherPart.querySelector(".tips").style.color = "#C0392B";
                wIcon2.src = "http://4upets.live/wp-content/uploads/2022/05/exdanger.png";
                document.getElementById('myImage')
                    .src="http://4upets.live/wp-content/uploads/2022/05/tem-4-e1651382254705.png";
                document.getElementById('message')
                    .innerHTML="<span style='color: #A93226; font-size: 23px; margin-left: 20px; font-family: Comic Sans MS, cursive, sans-serif;'>Extreme Danger &nbsp Over 54°C</span>";
                document.getElementById('message2')
                    .innerHTML="<span style='color: #A93226; font-family: Comic Sans MS, cursive, sans-serif;margin-top: 25px;'>Heat stroke is imminent. Do not take your dog outside in this weather; Do not leave your dog outside or even trapped in the car. </span>";
                document.getElementById('heatindex')
                    .innerHTML= "Your heatindex is: " + heatIndex + "°C";
                closeMaps();
                let content =
                    '<h2 style=\'font-family: Comic Sans MS, cursive, sans-serif\'><i class=\"fa fa-info-circle\" aria-hidden=\"true\"></i>Tips:</h2>' + '<h2 style=\'font-family: Comic Sans MS, cursive, sans-serif\'>check our symptoms maps, see if your dog sufuring heatstock</h2>'+'<br>'+
                    '<div style="text-align: center"><a href="#" class="button-55">Symptoms Map</a></div>'
                document.getElementById('message4')
                    .innerHTML=content;

            }




        }else if (humidity >= 85 && ((temp * 9/5) + 32)>= 80 && ((temp * 9/5) + 32) <= 87){
            weatherPart.querySelector(".temp .numb-2").innerText = Math.floor(
                (((
                    -42.379 + 2.04901523*((temp * 9/5) + 32)
                    + 10.14333127*humidity
                    - 0.22475541*((temp * 9/5) + 32)*humidity
                    - 0.00683783*((temp * 9/5) + 32)*((temp * 9/5) + 32)
                    - 0.05481717*humidity*humidity
                    + 0.00122874*((temp * 9/5) + 32)*((temp * 9/5) + 32)*humidity
                    + 0.00085282*((temp * 9/5) + 32)*humidity*humidity
                    - 0.00000199*((temp * 9/5) + 32)*((temp * 9/5) + 32)*humidity*humidity
                    +((humidity-85)/10) * ((87-((temp * 9/5) + 32))/5)
                )-32)* 5/9)
            );

            var heatIndex = Math.floor(
                (((
                    -42.379 + 2.04901523*((temp * 9/5) + 32)
                    + 10.14333127*humidity
                    - 0.22475541*((temp * 9/5) + 32)*humidity
                    - 0.00683783*((temp * 9/5) + 32)*((temp * 9/5) + 32)
                    - 0.05481717*humidity*humidity
                    + 0.00122874*((temp * 9/5) + 32)*((temp * 9/5) + 32)*humidity
                    + 0.00085282*((temp * 9/5) + 32)*humidity*humidity
                    - 0.00000199*((temp * 9/5) + 32)*((temp * 9/5) + 32)*humidity*humidity
                    +((humidity-85)/10) * ((87-((temp * 9/5) + 32))/5)
                )-32)* 5/9)
            );

            if (heatIndex <= 27){
                weatherPart.querySelector(".tips").innerText = "Enjoy Your Life";
                weatherPart.querySelector(".tips").style.color = "#27AE60";
                wIcon2.src = "http://4upets.live/wp-content/uploads/2022/05/safety.png";
                document.getElementById('myImage')
                    .src="http://4upets.live/wp-content/uploads/2022/05/tem5-e1651588790664.png";
                document.getElementById('message')
                    .innerHTML="<span style='color: #2ECC71; font-size: 23px; margin-left: 20px; font-family: Comic Sans MS, cursive, sans-serif;'>Safe &nbsp Below 27°C</span>";
                document.getElementById('message2')
                    .innerHTML="<span style='color: #2ECC71; font-family: Comic Sans MS, cursive, sans-serif;margin-top: 25px;'>Enjoy your life and feel free to take your dog outside to play.</span>";
                document.getElementById('heatindex')
                    .innerHTML= "Your heatindex is: " + heatIndex + "°C";
                if (content === '') {
                    openMaps();
                } else {
                    updateMaps();
                }
                let contents = '<i class=\"fa fa-info-circle\" aria-hidden=\"true\"></i>'+
                    '<span style=\'font-family: Comic Sans MS, cursive, sans-serif;margin-bottom: -50px;\'>Tips:We find some park near you</span>'
                    + '   '+
                    '<i class="fa fa-arrow-down" aria-hidden="true"></i>'
                document.getElementById('message4')
                    .innerHTML=contents;

            }else if (heatIndex >27 && heatIndex <= 32){
                weatherPart.querySelector(".tips").innerText = "Caution";
                weatherPart.querySelector(".tips").style.color = "#F4D03F";
                wIcon2.src = "http://4upets.live/wp-content/uploads/2022/05/caution.png";
                document.getElementById('myImage')
                    .src="http://4upets.live/wp-content/uploads/2022/05/tem-1-e1651381866210.png";
                document.getElementById('message')
                    .innerHTML="<span style='color: #E67E22; font-family: Comic Sans MS, cursive, sans-serif;margin-top: 23px; margin-left: 10px; font-size: 25px;'>Caution &nbsp 27-32°C</span>"
                document.getElementById('message2')
                    .innerHTML="<span style='color: #E67E22; font-family: Comic Sans MS, cursive, sans-serif;margin-top: 25px;'>Fatigue is possible in your dog with prolonged exposure and activity. Continuing activity could result in heat cramps in your dog but less likely to get heat stroke.</span>";
                document.getElementById('heatindex')
                    .innerHTML= "Your heatindex is: " + heatIndex + "°C";
                closeMaps();
                let content =
                    '<h2 style=\'font-family: Comic Sans MS, cursive, sans-serif\'><i class=\"fa fa-info-circle\" aria-hidden=\"true\"></i>Tips:</h2>' + '<h2 style=\'font-family: Comic Sans MS, cursive, sans-serif\'>check our symptoms maps, see if your dog sufuring heatstock</h2>'+'<br>'+
                    '<div style="text-align: center"><a href="#" class="button-55">Symptoms Map</a></div>'
                document.getElementById('message4')
                    .innerHTML=content;

            }else if (heatIndex >32 && heatIndex <= 41){
                weatherPart.querySelector(".tips").innerText = "Extreme Caution";
                weatherPart.querySelector(".tips").style.color = "#F39C12";
                wIcon2.src = "http://4upets.live/wp-content/uploads/2022/05/excaution.png";
                document.getElementById('myImage')
                    .src="http://4upets.live/wp-content/uploads/2022/05/tem-2-e1651382228958.png";
                document.getElementById('message')
                    .innerHTML="<span style='color: #D35400; font-size: 23px; margin-left: 20px; font-family: Comic Sans MS, cursive, sans-serif;'>Extreme Caution &nbsp 32-41°C</span>";
                document.getElementById('message2')
                    .innerHTML="<span style='color: #D35400; font-family: Comic Sans MS, cursive, sans-serif;margin-top: 25px;'>If you expose your dog to this temperature for a long time, heat cramps and heat exhaustion are possible; Your dog is likely to get heat stroke from constant exercise.</span>";
                document.getElementById('heatindex')
                    .innerHTML= "Your heatindex is: " + heatIndex + "°C";
                closeMaps();
                let content =
                    '<h2 style=\'font-family: Comic Sans MS, cursive, sans-serif\'><i class=\"fa fa-info-circle\" aria-hidden=\"true\"></i>Tips:</h2>' + '<h2 style=\'font-family: Comic Sans MS, cursive, sans-serif\'>check our symptoms maps, see if your dog sufuring heatstock</h2>'+'<br>'+
                    '<div style="text-align: center"><a href="#" class="button-55">Symptoms Map</a></div>'
                document.getElementById('message4')
                    .innerHTML=content;

            }else if (heatIndex > 41 && heatIndex <= 54){
                weatherPart.querySelector(".tips").innerText = "Danger";
                weatherPart.querySelector(".tips").style.color = "#EC7063";
                wIcon2.src = "http://4upets.live/wp-content/uploads/2022/05/danger.png";
                document.getElementById('myImage')
                    .src="http://4upets.live/wp-content/uploads/2022/05/tem-3-e1651382241257.png";
                document.getElementById('message')
                    .innerHTML="<span style='color: #E74C3C; font-size: 23px; margin-left: 20px; font-family: Comic Sans MS, cursive, sans-serif;'>Danger &nbsp 41-54°C</span>";
                document.getElementById('message2')
                    .innerHTML="<span style='color: #E74C3C; font-family: Comic Sans MS, cursive, sans-serif;margin-top: 25px;'>If you expose your dog to this temperature for a while, heat cramps and heat exhaustion are likely; Your dog is more likely to get heat stroke from constant exercise.</span>";
                document.getElementById('heatindex')
                    .innerHTML= "Your heatindex is: " + heatIndex + "°C";
                closeMaps();
                let content =
                    '<h2 style=\'font-family: Comic Sans MS, cursive, sans-serif\'><i class=\"fa fa-info-circle\" aria-hidden=\"true\"></i>Tips:</h2>' + '<h2 style=\'font-family: Comic Sans MS, cursive, sans-serif\'>check our symptoms maps, see if your dog sufuring heatstock</h2>'+'<br>'+
                    '<div style="text-align: center"><a href="#" class="button-55">Symptoms Map</a></div>'
                document.getElementById('message4')
                    .innerHTML=content;

            }else if (heatIndex > 54){
                weatherPart.querySelector(".tips").innerText = "Extreme Danger";
                weatherPart.querySelector(".tips").style.color = "#C0392B";
                wIcon2.src = "http://4upets.live/wp-content/uploads/2022/05/exdanger.png";
                document.getElementById('myImage')
                    .src="http://4upets.live/wp-content/uploads/2022/05/tem-4-e1651382254705.png";
                document.getElementById('message')
                    .innerHTML="<span style='color: #A93226; font-size: 23px; margin-left: 20px; font-family: Comic Sans MS, cursive, sans-serif;'>Extreme Danger &nbsp Over 54°C</span>";
                document.getElementById('message2')
                    .innerHTML="<span style='color: #A93226; font-family: Comic Sans MS, cursive, sans-serif;margin-top: 25px;'>Heat stroke is imminent. Do not take your dog outside in this weather; Do not leave your dog outside or even trapped in the car. </span>";
                document.getElementById('heatindex')
                    .innerHTML= "Your heatindex is: " + heatIndex + "°C";
                closeMaps();
                let content =
                    '<h2 style=\'font-family: Comic Sans MS, cursive, sans-serif\'><i class=\"fa fa-info-circle\" aria-hidden=\"true\"></i>Tips:</h2>' + '<h2 style=\'font-family: Comic Sans MS, cursive, sans-serif\'>check our symptoms maps, see if your dog sufuring heatstock</h2>'+'<br>'+
                    '<div style="text-align: center"><a href="#" class="button-55">Symptoms Map</a></div>'
                document.getElementById('message4')
                    .innerHTML=content;

            }



        }else if (((temp * 9/5) + 32) < 80 ) {
            weatherPart.querySelector(".temp .numb-2").innerText = Math.floor(
                (((
                    0.5 * (((temp * 9/5) + 32)+ 61.0 + ((((temp * 9/5) + 32)-68.0)*1.2) + (humidity*0.094))
                )-32)* 5/9)
            );
            var heatIndex = Math.floor(
                (((
                    0.5 * (((temp * 9/5) + 32)+ 61.0 + ((((temp * 9/5) + 32)-68.0)*1.2) + (humidity*0.094))
                )-32)* 5/9)
            );

            if (heatIndex <= 27){
                weatherPart.querySelector(".tips").innerText = "Enjoy Your Life";
                weatherPart.querySelector(".tips").style.color = "#27AE60";
                wIcon2.src = "http://4upets.live/wp-content/uploads/2022/05/safety.png";
                document.getElementById('myImage')
                    .src="http://4upets.live/wp-content/uploads/2022/05/tem5-e1651588790664.png";
                document.getElementById('message')
                    .innerHTML="<span style='color: #2ECC71; font-size: 23px; margin-left: 20px; font-family: Comic Sans MS, cursive, sans-serif;'>Safe &nbsp Below 27°C</span>";
                document.getElementById('message2')
                    .innerHTML="<span style='color: #2ECC71; font-family: Comic Sans MS, cursive, sans-serif;margin-top: 25px;'>Enjoy your life and feel free to take your dog outside to play.</span>";
                document.getElementById('heatindex')
                    .innerHTML= "Your heatindex is: " + heatIndex + "°C";


                let content = document.getElementById("InputAddress").value;
                console.log(document.getElementById("InputAddress").value);
                console.log(document.getElementById("InputAddress"));
                console.log(content);
                if (content === '') {
                    openMaps();
                } else {
                    updateMaps();
                }
                let contents = '<i class=\"fa fa-info-circle\" aria-hidden=\"true\"></i>'+
                    '<span style=\'font-family: Comic Sans MS, cursive, sans-serif;margin-bottom: -50px;\'>Tips:We find some park near you</span>'
                    + '   '+
                    '<i class="fa fa-arrow-down" aria-hidden="true"></i>'
                document.getElementById('message4')
                    .innerHTML=contents;


            }else if (heatIndex >27 && heatIndex <= 32){
                weatherPart.querySelector(".tips").innerText = "Caution";
                weatherPart.querySelector(".tips").style.color = "#F4D03F";
                wIcon2.src = "http://4upets.live/wp-content/uploads/2022/05/caution.png";
                document.getElementById('myImage')
                    .src="http://4upets.live/wp-content/uploads/2022/05/tem-1-e1651381866210.png";
                document.getElementById('message')
                    .innerHTML="<span style='color: #E67E22; font-family: Comic Sans MS, cursive, sans-serif;margin-top: 23px; margin-left: 10px; font-size: 25px;'>Caution &nbsp 27-32°C</span>"
                document.getElementById('message2')
                    .innerHTML="<span style='color: #E67E22; font-family: Comic Sans MS, cursive, sans-serif;margin-top: 25px;'>Fatigue is possible in your dog with prolonged exposure and activity. Continuing activity could result in heat cramps in your dog but less likely to get heat stroke.</span>";
                document.getElementById('heatindex')
                    .innerHTML= "Your heatindex is: " + heatIndex + "°C";
                closeMaps();
                let content =
                    '<h2 style=\'font-family: Comic Sans MS, cursive, sans-serif\'><i class=\"fa fa-info-circle\" aria-hidden=\"true\"></i>Tips:</h2>' + '<h2 style=\'font-family: Comic Sans MS, cursive, sans-serif\'>check our symptoms maps, see if your dog sufuring heatstock</h2>'+'<br>'+
                    '<div style="text-align: center"><a href="#" class="button-55">Symptoms Map</a></div>'
                document.getElementById('message4')
                    .innerHTML=content;
            }else if (heatIndex >32 && heatIndex <= 41){
                weatherPart.querySelector(".tips").innerText = "Extreme Caution";
                weatherPart.querySelector(".tips").style.color = "#F39C12";
                wIcon2.src = "http://4upets.live/wp-content/uploads/2022/05/excaution.png";
                document.getElementById('myImage')
                    .src="http://4upets.live/wp-content/uploads/2022/05/tem-2-e1651382228958.png";
                document.getElementById('message')
                    .innerHTML="<span style='color: #D35400; font-size: 23px; margin-left: 20px; font-family: Comic Sans MS, cursive, sans-serif;'>Extreme Caution &nbsp 32-41°C</span>";
                document.getElementById('message2')
                    .innerHTML="<span style='color: #D35400; font-family: Comic Sans MS, cursive, sans-serif;margin-top: 25px;'>If you expose your dog to this temperature for a long time, heat cramps and heat exhaustion are possible; Your dog is likely to get heat stroke from constant exercise.</span>";
                document.getElementById('heatindex')
                    .innerHTML= "Your heatindex is: " + heatIndex + "°C";
                closeMaps();
                let content =
                    '<h2 style=\'font-family: Comic Sans MS, cursive, sans-serif\'><i class=\"fa fa-info-circle\" aria-hidden=\"true\"></i>Tips:</h2>' + '<h2 style=\'font-family: Comic Sans MS, cursive, sans-serif\'>check our symptoms maps, see if your dog sufuring heatstock</h2>'+'<br>'+
                    '<div style="text-align: center"><a href="#" class="button-55">Symptoms Map</a></div>'
                document.getElementById('message4')
                    .innerHTML=content;

            }else if (heatIndex > 41 && heatIndex <= 54){
                weatherPart.querySelector(".tips").innerText = "Danger";
                weatherPart.querySelector(".tips").style.color = "#EC7063";
                wIcon2.src = "http://4upets.live/wp-content/uploads/2022/05/danger.png";
                document.getElementById('myImage')
                    .src="http://4upets.live/wp-content/uploads/2022/05/tem-3-e1651382241257.png";
                document.getElementById('message')
                    .innerHTML="<span style='color: #E74C3C; font-size: 23px; margin-left: 20px; font-family: Comic Sans MS, cursive, sans-serif;'>Danger &nbsp 41-54°C</span>";
                document.getElementById('message2')
                    .innerHTML="<span style='color: #E74C3C; font-family: Comic Sans MS, cursive, sans-serif;margin-top: 25px;'>If you expose your dog to this temperature for a while, heat cramps and heat exhaustion are likely; Your dog is more likely to get heat stroke from constant exercise.</span>";
                document.getElementById('heatindex')
                    .innerHTML= "Your heatindex is: " + heatIndex + "°C";
                closeMaps();
                let content =
                    '<h2 style=\'font-family: Comic Sans MS, cursive, sans-serif\'><i class=\"fa fa-info-circle\" aria-hidden=\"true\"></i>Tips:</h2>' + '<h2 style=\'font-family: Comic Sans MS, cursive, sans-serif\'>check our symptoms maps, see if your dog sufuring heatstock</h2>'+'<br>'+
                    '<div style="text-align: center"><a href="#" class="button-55">Symptoms Map</a></div>'
                document.getElementById('message4')
                    .innerHTML=content;

            }else if (heatIndex > 54){
                weatherPart.querySelector(".tips").innerText = "Extreme Danger";
                weatherPart.querySelector(".tips").style.color = "#C0392B";
                wIcon2.src = "http://4upets.live/wp-content/uploads/2022/05/exdanger.png";
                document.getElementById('myImage')
                    .src="http://4upets.live/wp-content/uploads/2022/05/tem-4-e1651382254705.png";
                document.getElementById('message')
                    .innerHTML="<span style='color: #A93226; font-size: 23px; margin-left: 20px; font-family: Comic Sans MS, cursive, sans-serif;'>Extreme Danger &nbsp Over 54°C</span>";
                document.getElementById('message2')
                    .innerHTML="<span style='color: #A93226; font-family: Comic Sans MS, cursive, sans-serif;margin-top: 25px;'>Heat stroke is imminent. Do not take your dog outside in this weather; Do not leave your dog outside or even trapped in the car.</span>";
                document.getElementById('heatindex')
                    .innerHTML= "Your heatindex is: " + heatIndex + "°C";
                closeMaps();
                let content =
                    '<h2 style=\'font-family: Comic Sans MS, cursive, sans-serif\'><i class=\"fa fa-info-circle\" aria-hidden=\"true\"></i>Tips:</h2>' + '<h2 style=\'font-family: Comic Sans MS, cursive, sans-serif\'>check our symptoms maps, see if your dog sufuring heatstock</h2>'+'<br>'+
                    '<div style="text-align: center"><a href="#" class="button-55">Symptoms Map</a></div>'
                document.getElementById('message4')
                    .innerHTML=content;

            }

        }
        weatherPart.querySelector(".humidity span").innerText = `${humidity}%`;
        infoTxt.classList.remove("pending", "error");
        infoTxt.innerText = "";
        inputField.value = "";
        wrapper.classList.add("active");
    }
}
arrowBack.addEventListener("click", ()=>{
    wrapper.classList.remove("active");
});
function caution(){
    document.getElementById('myImage')
        .src="http://4upets.live/wp-content/uploads/2022/05/tem-1-e1651381866210.png";
    document.getElementById('message')
        .innerHTML="<span style='color: #E67E22; font-family: Comic Sans MS, cursive, sans-serif;margin-top: 23px; margin-left: 10px; font-size: 25px;'>Caution &nbsp 27-32°C</span>"
    document.getElementById('message2')
        .innerHTML="<span style='color: #E67E22; font-family: Comic Sans MS, cursive, sans-serif;margin-top: 25px;'>Fatigue is possible in your dog with prolonged exposure and activity. Continuing activity could result in heat cramps in your dog but less likely to get heat stroke.</span>";
    closeMaps();
    let content =
        '<h2 style=\'font-family: Comic Sans MS, cursive, sans-serif\'><i class=\"fa fa-info-circle\" aria-hidden=\"true\"></i>Tips:</h2>' + '<h2 style=\'font-family: Comic Sans MS, cursive, sans-serif\'>check our symptoms maps, see if your dog sufuring heatstock</h2>'+'<br>'+
        '<div style="text-align: center"><a href="#" class="button-55">Symptoms Map</a></div>'
    document.getElementById('message4')
        .innerHTML=content;
}

function extremeCaution(){
    document.getElementById('myImage')
        .src="http://4upets.live/wp-content/uploads/2022/05/tem-2-e1651382228958.png";
    document.getElementById('message')
        .innerHTML="<span style='color: #D35400; font-size: 23px; margin-left: 20px; font-family: Comic Sans MS, cursive, sans-serif;'>Extreme Caution &nbsp 32-41°C</span>";
    document.getElementById('message2')
        .innerHTML="<span style='color: #D35400; font-family: Comic Sans MS, cursive, sans-serif;margin-top: 25px;'>If you expose your dog to this temperature for a long time, heat cramps and heat exhaustion are possible; Your dog is likely to get heat stroke from constant exercise.</span>";
    closeMaps();
    let content =
        '<h2 style=\'font-family: Comic Sans MS, cursive, sans-serif\'><i class=\"fa fa-info-circle\" aria-hidden=\"true\"></i>Tips:</h2>' + '<h2 style=\'font-family: Comic Sans MS, cursive, sans-serif\'>check our symptoms maps, see if your dog sufuring heatstock</h2>'+'<br>'+
        '<div style="text-align: center"><a href="#" class="button-55">Symptoms Map</a></div>'
    document.getElementById('message4')
        .innerHTML=content;
}

function danger(){
    document.getElementById('myImage')
        .src="http://4upets.live/wp-content/uploads/2022/05/tem-3-e1651382241257.png";
    document.getElementById('message')
        .innerHTML="<span style='color: #E74C3C; font-size: 23px; margin-left: 20px; font-family: Comic Sans MS, cursive, sans-serif;'>Danger &nbsp 41-54°C</span>";
    document.getElementById('message2')
        .innerHTML="<span style='color: #E74C3C; font-family: Comic Sans MS, cursive, sans-serif;margin-top: 25px;'>If you expose your dog to this temperature for a while, heat cramps and heat exhaustion are likely; Your dog is more likely to get heat stroke from constant exercise.</span>";
    closeMaps();
    let content =
        '<h2 style=\'font-family: Comic Sans MS, cursive, sans-serif\'><i class=\"fa fa-info-circle\" aria-hidden=\"true\"></i>Tips:</h2>' + '<h2 style=\'font-family: Comic Sans MS, cursive, sans-serif\'>check our symptoms maps, see if your dog sufuring heatstock</h2>'+'<br>'+
        '<div style="text-align: center"><a href="#" class="button-55">Symptoms Map</a></div>'
    document.getElementById('message4')
        .innerHTML=content;


}

function extremeDanger(){
    document.getElementById('myImage')
        .src="http://4upets.live/wp-content/uploads/2022/05/tem-4-e1651382254705.png";
    document.getElementById('message')
        .innerHTML="<span style='color: #A93226; font-size: 23px; margin-left: 20px; font-family: Comic Sans MS, cursive, sans-serif;'>Extreme Danger &nbsp Over 54°C</span>";
    document.getElementById('message2')
        .innerHTML="<span style='color: #A93226; font-family: Comic Sans MS, cursive, sans-serif;margin-top: 25px;'>Heat stroke is imminent. Do not take your dog outside in this weather; Do not leave your dog outside or even trapped in the car. </span>";
    closeMaps();
    let content =
        '<h2 style=\'font-family: Comic Sans MS, cursive, sans-serif\'><i class=\"fa fa-info-circle\" aria-hidden=\"true\"></i>Tips:</h2>' +
        '<h2 style=\'font-family: Comic Sans MS, cursive, sans-serif\'>check our symptoms maps, see if your dog sufuring heatstock.</h2>'+
        '<h2 style=\'font-family: Comic Sans MS, cursive, sans-serif\'><i class="fa fa-asterisk" aria-hidden="true"></i>Maybe you need Vets, try our Vet Finder!</h2>'+'<br>'+
        '<div style="text-align: center"><a href="#" class="button-55">Symptoms Map</a>' +
        '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'+
        '<a href="#" class="button-55">Vet Finder</a>'+
        '</div>'
    document.getElementById('message4')
        .innerHTML=content;

    const myModal = document.getElementById('myModal')
    const myInput = document.getElementById('myInput')

    myModal.addEventListener('shown.bs.modal', () => {
        myInput.focus()
    })

}
function safety(){
    document.getElementById('myImage')
        .src="http://4upets.live/wp-content/uploads/2022/05/tem5-e1651588790664.png";
    document.getElementById('message')
        .innerHTML="<span style='color: #2ECC71; font-size: 23px; margin-left: 20px; font-family: Comic Sans MS, cursive, sans-serif;'>Safe &nbsp Below 27°C</span>";
    document.getElementById('message2')
        .innerHTML="<span style='color: #2ECC71; font-family: Comic Sans MS, cursive, sans-serif;margin-top: 25px;'>Enjoy your life and feel free to take your dog outside to play</span>";
    let contents = '<i class=\"fa fa-info-circle\" aria-hidden=\"true\"></i>'+
        '<span style=\'font-family: Comic Sans MS, cursive, sans-serif;margin-bottom: -50px;\'>Tips:We find some park near you</span>'
    + '   '+
        '<i class="fa fa-arrow-down" aria-hidden="true"></i>'
    document.getElementById('message4')
        .innerHTML=contents;

    openMaps()
}

function updateMaps() {
    let content = '<div class="mapCard" id="magCard">' +
        '<div id="map"></div>' +
        '</div>'
    document.getElementById('maps')
        .innerHTML=content;
    saveUserData();
}



function openMaps(){
    let content = '<div class="mapCard" id="magCard">' +
        '<div id="map"></div>' +
        '</div>'
    document.getElementById('maps')
        .innerHTML=content;
    initMap();
}

function closeMaps(){
    let content = '';
    document.getElementById('maps')
        .innerHTML=content;
}

