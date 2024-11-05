import express from "express";
let routes = express.Router();
import homeControllers from "../controllers/homeControllers.js";
let initWebRoutes = (app) =>{
    routes.get('/',homeControllers.getHomePage)
    return app.use("/",routes)
}
export default initWebRoutes ;