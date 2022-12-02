require("dotenv").config()

const MongoClient = require("mongodb").MongoClient;

const client = new MongoClient(process.env.DATABASE_URL);
let database;


function dbConnect() {
    return new Promise(async (resolve, reject) => {
        const clientPromise = client.connect();
        try {
            // we use mongodb client caching
            if(!database) {
                database = (await clientPromise).db("extreme_bank");
            }
            resolve(database)
        } catch (ex){
            reject(ex)
        }
    })
}


export default dbConnect