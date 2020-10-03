import express from "express";

import  configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";

let app=express();
require("dotenv").config();
//use body-parser to post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//config view engine
configViewEngine(app);

//init all web routes
initWebRoutes(app);
let port=process.env.PORT || 8080;
app.listen(port, ()=>{
    console.log('page access '+process.env.PAGE_ACCESS_TOKEN);
   // console.log(require('dotenv').config())
console.log('App is runnig at the port '+port);
});