// Setup empty JS object to act as endpoint for all routes

const projectData = {};

// Require Express to run server and routes
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fetch = require('fetch')


// Start up an instance of app
const app = express()

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Cors for cross origin allowance
app.use(cors())

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.listen(8000 , () => {
    console.log(`server started at http://localhost:8000`)
})



app.get("/all" , (_,res) => {

    
    fetch.fetchUrl(`https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${projectData.key}`, (error ,meta ,  reponse) => {
        if(!error && meta.status == 200){
            let weather_data = JSON.parse(reponse.toString())
            Object.assign(projectData , weather_data)
            
            res.status(200).send(projectData)
        }
    })
   
    
})

app.post('/api' , (req,res) => {
    Object.assign(projectData , req.body)
    res.status(200).send('done')
})