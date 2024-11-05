import db from '../models/index.js';

let getHomePage = async (req, res) => {
    try {
        // Thêm await để đợi dữ liệu từ db trả về
        let data = await db.User.findAll();
        console.log("Data", data);
        
        return res.render('homePage.ejs', {
            data: JSON.stringify(data)
            // data: data
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while fetching data");
    }
};

export default {
    getHomePage: getHomePage
};
