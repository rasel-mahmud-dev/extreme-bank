import express from "express"

const path = require("path");
import cors from "cors";
import logger from "./logger";
const morgan = require("morgan");

require("dotenv").config()


import routes  from "./routes"
import dbConnect from "./database/dbConnect";
import uuid from "./utilities/uuid";
import passport from "passport";


// import logger from "./logger";

const port = process.env.PORT || 1000;


const app = express()

const whitelist = [process.env.FRONTEND, process.env.FRONTEND2]
    const corsOptions = {
        credentials: true,
        origin: function (origin, callback) {

    if(whitelist.indexOf(origin) !== -1) {
      callback(null, true)

    } else {
      // no access
      callback(null, false)
    }
  }
    }

app.use(cors(corsOptions))
app.use(express.json())
app.use("/static/", express.static("static"))
app.use(morgan("dev"))


app.use(passport.initialize({}))

require("./oauth/google")
require("./oauth/facebook")


app.use(routes)

// Capture 500 errors
app.use((err, req, res, next)=>{
    let message = "Internal error, Please try again"
    let status = 500
    if(err && err.message){
        message = err.message
    }
    if(err && err.status){
        status = err.status
    }
    res.status(status).json({message: message})
})

// Capture 404 errors
app.use((req,res,next) => {
  res.status(404).send("PAGE NOT FOUND");
})


app.listen(port,  ()=>{
  logger.info(`Server started and running on http://localhost:${port}`)
})
