require("dotenv").config();
const app = require("./src/app")
const connectDb = require("./src/config/db/db")


// =======================
// Data base connecting
// =======================
connectDb();

// ======================
// server 
// ======================
app.listen(process.env.PORT, ()=>{
    console.log("SERVER IS STARTED");
})
