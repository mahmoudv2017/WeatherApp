/* Global Variables */
const api_key = "02daa4af18db45d22d12b68e7260b673&units=imperial"

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();
const zip_code = document.getElementById('zip').textContent


async function  poster_request(){
  const post_req = await fetch('/api' , {
    method : 'POST',
    headers : {
      "Content-Type" : 'application/json'
    },
    body : JSON.stringify( {date : newDate , key : api_key}),
    
  })

  return post_req
}





const retrieveData = async () =>{


    await poster_request()
 
    await fetch('/all').then(async results => {
      try {
        // Transform into JSON
      
        const allData = await results.json()
        console.log(allData)
        // Write updated data to DOM elements
        document.getElementById('temp').innerHTML = Math.round(allData.main.temp)+ 'degrees';
        document.getElementById('content').innerHTML = allData.main.feels_like;
        document.getElementById("date").innerHTML = allData.date;
        }
        catch(error) {
          console.log("error", error);
          // appropriately handle the error
        }
    })
   
   }

//making my events



document.getElementById('generate').addEventListener('click' , retrieveData)

