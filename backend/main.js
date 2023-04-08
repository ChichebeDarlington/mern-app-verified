const express = require("express")
const sportsRoute = require("./routes/sports.js")
const userRoute = require("./routes/user.js")
const mongooseConnect = require("./db/database.js")
const cors = require("cors")

require("dotenv").config()

// express web
const web = express()

// express middlewares
web.use(cors())
web.use(express.json())

// middlewares route
web.use("/api/user", userRoute)
web.use("/api/sports", sportsRoute)


// listening to requests
const port = process.env.PORT || 9000

const start = async()=>{
    try {
        await mongooseConnect(process.env.MONGO_URI);
         web.listen(port, ()=>{
         console.log(`listening to port ${port}`);
     })
    } catch (error) {
       console.log(error) 
    }
}

start()