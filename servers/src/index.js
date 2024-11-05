import express from "express";
import bodyParser from "body-parser";
import view from "./config/viewEngine.js";
import initWebRoutes from "./routes/web.js";
import connectDB from "./config/connectDatabase.js"
// require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config(); // Gọi hàm config để tải biến môi trường

let app =express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

view(app);
initWebRoutes(app);

connectDB()

let port = process.env.PORT || 6969;

app.listen(port , () =>{
    console.log("OK Backend Nodejs is coming on the port : " + port)
})