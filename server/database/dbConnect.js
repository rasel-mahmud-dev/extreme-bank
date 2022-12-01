import mysql from "mysql2/promise"
import errorConsole from "../logger/errorConsole";

function dbConnect(){
  return new Promise(async (resolve, reject)=>{
    try {
      const connection = await mysql.createConnection(process.env.NODE_ENV === "development" ? {
        host: "127.0.0.1",
        port: "3306",
        user: "root",
        password: "12345",
        database: "extreme_bank",
        connectionLimit: 5
      } : process.env.DATABASE_URL )
  
      await connection.connect()

      resolve(connection)
      
    } catch (ex){
      errorConsole(ex)
      reject("database connection fail")
    }
  
  })
}
export default dbConnect

