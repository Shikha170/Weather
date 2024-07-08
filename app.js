// const express=require("express");
// const https=require("https");
// const bodyParser=require("body-parser");
// const app=express();

// app.use(bodyParser.urlencoded({extended:true}));

// app.get("/",function(req,res){
//     res.sendFile(__dirname+"/index.html");
// }) ;
// app.post("/",function(req,res){
//     const dest=req.body.cityName;
//     const apiKey="4e8758074946496841da4bf2c31a27b9";
//     unit="metric";
//     const url="https://api.openweathermap.org/data/2.5/weather?q="+ dest +"&appid="+ apiKey +"&units="+unit;
//     https.get(url,function(response){
//         console.log(response.statusCode);
//         response.on("data",function(data){
//             const weatherdata=JSON.parse(data);
//             const temp=weatherdata.main.temp;
//             const humidity=weatherdata.main.pressure;
//             const weatdesc=weatherdata.weather[0].description;
//             const icon=weatherdata.weather[0].icon;
//             const imageurl="https://openweathermap.org/img/wn/"+icon+ "@2x.png";
            
//             res.write("<h1>The temperature in "+ dest+ " is "+ temp +" degree <br/>currently " +weatdesc+" in " + dest + "</h1>");
//             res.write("<h1>humidity is now in lucknow " + humidity + "</h1>");
//             res.write("<img src=" +imageurl+ ">");
//             res.send();
//         })
//     });
//     //res.send("server is started");
// });

// app.listen(3000,function(){
//     console.log("Server started at port 30000");
// });
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const dest = req.body.cityName;
    const apiKey = "4e8758074946496841da4bf2c31a27b9";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + dest + "&appid=" + apiKey + "&units=" + unit;
    
    https.get(url, function (response) {
        console.log(response.statusCode);
        
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const humidity = weatherData.main.pressure;
            const weatherDesc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            
            res.write("<h1>The temperature in " + dest + " is " + temp + " degree <br/>currently " + weatherDesc + " in " + dest + "</h1>");
            res.write("<h1>Humidity is now in " + dest + " is " + humidity + "</h1>");
            res.write("<img src=" + imageUrl + ">");
            res.send();
        });
    });
    //res.send("server is started");
});

app.listen(3000, function () {
    console.log("Server started at port 3000");
});
