import express from "express"

const path = require("path");
import cors from "cors";
import logger from "./logger";
const morgan = require("morgan");

require("dotenv").config()


import routes  from "./routes"

// import logger from "./logger";
//
// const initialDbQuery = require("./database/initialDbQuery")
// // initialDbQuery()
//
const port = 1000;
const host = "localhost";



const app = express()

const whitelist = [process.env.FRONTEND]
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

app.use(routes)

// // Capture 500 errors
// app.use((err,req,res,next) => {
//   res.status(err.status || 500).send('Internal server Error');
//   // res.status(err.status || 500).send(err.message || 'Could not perform the calculation!');
//   logger.error(`${err.status || 500} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${res.statusMessage} - ${err.message}`);
// })
// // Capture 404 errors
// app.use((req,res,next) => {
//   res.status(404).send("PAGE NOT FOUND");
//   logger.info(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
// })


app.listen(port, host, ()=>{
  logger.info(`Server started and running on http://${host}:${port}`)
})
