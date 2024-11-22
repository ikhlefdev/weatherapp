

async function fetchinfos(location) {
    try{
        
        const response= await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=ENU9K6H5444M2QL3U37KHEWJ7`)
        const infos=await response.json()
        return infos
    }
    catch(error){
        return;
    }
}
function process(infos){
    try{
        const {resolvedAddress,currentConditions,days}= infos
        const {temp,humidity,cloudcover,conditions,icon,windspeed,uvindex}=currentConditions
        // The icon pattern will be something like this
        const iconUrl = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/4th%20Set%20-%20Color/${icon}.png`;
        


       
        const weeksdata=days.slice(1,8).map(day=>({
            
            date:day.datetime,
            iconUrl: `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/4th%20Set%20-%20Color/${day.icon}.png`,
            condition:day.conditions,
            temp:day.temp
        }))
        return{
            location:resolvedAddress,
            temp:temp,
            conditions,
            iconUrl,

            humidity,
            cloudcover,
            windspeed,
            uvindex,

            weeksdata,
        
        }
    }
    catch(error){
        return error
    }
}


async function weather() {

    const btn=document.getElementById("btn")
    const input=document.getElementById("inputy")
    const main=document.querySelector(".main")
    const additions=document.querySelector(".additions")
    const week=document.querySelector(".week")


    const all=document.querySelector(".all")

    const loaderContainer = document.getElementById('loader-container');
    



    btn.addEventListener("click",async()=>{
    try{


        loaderContainer.style.display = 'block';
        all.style.display = 'none';

     const location=input.value
     if(!location){
        console.log("please enter a location")
        return;
     }


     const apidata=await fetchinfos(location)
    if(!apidata){
        console.log("no data available for the given location")
        return;
     }
   


     const processeddata=process(apidata)
    
     if(!processeddata){
        console.log("error processing the data")
        return;
     }
     all.style.display = 'grid';
    loaderContainer.style.display = 'none';
    


     main.innerHTML=`
     <div class="crazydiv">
     <h1 id="countryname">${location}</h1>
     <h5 id="condition">${processeddata.conditions}</h5>
     </div>
     <img src="${processeddata.iconUrl}" alt="please work" id="bigicon">
     <h1 id="temp" class="number">${processeddata.temp}°</h1>
    
     `
     additions.innerHTML=`
     <div class="addition1">
     <h4>humidity</h4>
     <h1 class="number">${processeddata.humidity}</h1>
     </div>
      <div class="addition2">
     <h4>cloudcover</h4>
     <h1 class="number">${processeddata.cloudcover}</h1>
     </div>
      <div class="addition3">
     <h4>windspeed</h4>
     <h1 class="number">${processeddata.windspeed}</h1>
     </div>
      <div class="addition4">
     <h4>uvindex</h4>
     <h1 class="number">${processeddata.uvindex}</h1>
     </div>
     
     `
     const weeklyForecast = processeddata.weeksdata.map(day => {
        const weekday = getWeekday(day.date) // Using the getWeekday function from previous example
        

        return `
            <div class="dayforecast">
                <h3  style="display:inline" class="days">${weekday}</h3>
                <img  src="${day.iconUrl}" alt="please work" class="smallicon">
                <p style="display:inline" class="number w" >${day.temp}°</p>
                <p style="display:inline" class="c">${day.condition}</p>
                
            </div>
        `
    }).join('') // join() converts array to string
     week.innerHTML=`<h4 style="opacity:0.5">7-day Forcast</h4>
     ${weeklyForecast}
     `


     console.log("here is ur data:",processeddata) 
    }
    catch(error){
            loaderContainer.style.display = 'none';
            all.innerHTML=`<h4 class="error">error please try again.</h4>`
    }})

    function getWeekday(dateString) {
        const date = new Date(dateString)
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        return weekdays[date.getDay()]
    }
}





document.addEventListener('DOMContentLoaded', weather);




