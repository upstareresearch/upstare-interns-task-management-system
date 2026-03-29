const mongoose = require("mongoose");

const connectDb = async()=>{
    try {
        const response = await mongoose.connect(process.env.MONGOOSE_URI);
        if(response){
            console.log("MongoBb connected successfully");
        }
    } catch (error) {
        console.log("error in connecting mongoDb", error);
    }
}

module.exports = connectDb;