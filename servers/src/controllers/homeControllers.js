import db from '../models/index.js'
let getHomePage = async (req,res)=>{
    try {
        let data = db.User.findAll()
        console.log("Data",data);
        
        return res.render('homePage.ejs',{
            data:JSON.stringify(data)
            // data:data
        })
        
    } catch (error) {
        console.log(error)
    }
}

module.exports ={
    getHomePage:getHomePage
}