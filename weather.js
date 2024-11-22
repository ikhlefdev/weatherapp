

async function fetchinfos(location) {
    try{
        
        const response= await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=ENU9K6H5444M2QL3U37KHEWJ7`)
        const infos=await response.json()
        console.log(infos)
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
        
        const weeksdata=days.slice(1,8).map(day=>({
            date:day.date,
            condition:day.conditions,
            temp:day.temp
        }))
        return{
            location:resolvedAddress,
            temp:temp,
            conditions,
            icon,

            humidity,
            cloudcover,
            windspeed,
            uvindex,

            weeksdata
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
    //btn.addEventListener("click",async()=>{
    try{
     const location="algeria"
     //if(!location){
        //console.log("please enter a location")
        //return;
     //}


     const apidata=await fetchinfos(location)
    // if(!apidata){
        //console.log("no data available for the given location")
        //return;
     //}


     const processeddata=process(apidata)
    // if(!processeddata){
        //console.log("error processing the data")
        //return;
     //}
     main.innerHTML=`
     <h1>${location}</h1>
     <h5>${processeddata.conditions}</h5>
    
    
     `
     console.log("here is ur data:",processeddata) 
    }
    catch(error){
            console.log("error!try again")
    }}//)


//}


weather()






