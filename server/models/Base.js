// import errorConsole from "../logger/errorConsole";
// import dbConnect from "../database/dbConnect";
//
// import logger from "../logger";

import dbConnect from "../database/dbConnect";


class Base {
    tableName = "";

    constructor(tableName) {
        // when call with new keyword extend classes...
        this.tableName = tableName;
    }

    static databaseConnection;

    static get Db(){
        return new Promise(async (resolve, reject) => {
            try {
                if (!Base.databaseConnection) {
                    Base.databaseConnection = await dbConnect();
                }
                resolve(Base.databaseConnection);
            } catch (ex) {
                reject(ex);
            }
        });
    }

    save(){

          return new Promise(async (resolve, reject)=>{
              let { tableName, ...other } = this

              let values = '';
              let fields = ''

              for (const otherValueKey in other) {
                  // if value and key exists
                  if(otherValueKey && other[otherValueKey]) {
                      fields += otherValueKey + ", "
                      values += `'${other[otherValueKey]}'` + ","
                  }
              }

              let trimLastComma = (value, negationIndex)=> value.slice(0, value.length - negationIndex)

              try {
                  let Db = await Base.Db;
                  let sql = `
                  INSERT INTO ${tableName} (${trimLastComma(fields, 2)})
                  VALUES (${trimLastComma(values, 1)})
              `
                  let [r, _] = await Db.execute(sql)
                  if(r.affectedRows > 0){
                      resolve({
                          ...other,
                          id: r.insertId
                      })
                  }
              } catch (ex) {
                  if(ex.code === "ER_DUP_ENTRY"){
                      reject({
                          type: "ER_DUP_ENTRY",
                          message: ex.sqlMessage
                      })
                  } else {
                      reject(ex)
                  }
              }
          })
    }


    static findOne(valuesObj, selectFields) {
        return new Promise(async (resolve, reject) => {
            let db;

            try {
                db = await dbConnect();
                let tableName = this.tableName;
                let fieldName = "";
                let value = "";
                for (let key in valuesObj) {
                    fieldName = key;
                    value = valuesObj[key];
                }

                let sql = `SELECT ${
                    selectFields ? selectFields : "*"
                } from ${tableName} where ${fieldName} = "${value}"  `;
                let [r, _] = await db.execute(sql);

                if (r.length > 0) {
                    resolve(r[0]);
                } else {
                    resolve(null);
                }
            } catch (ex) {
                reject(ex);
                console.log(ex);
            }
        });
    }

    // static removeOne(valuesObj){
    //   return new Promise(async (resolve, reject) => {
    //     let db
    //     try{
    //       db = await dbConnect()
    //       let tableName = this.tableName
    //
    //       let fieldName = ""
    //       let value = ""
    //       for(let key in valuesObj){
    //         fieldName = key
    //         value = valuesObj[key]
    //       }
    //
    //       let sql  = `DELETE from ${tableName} where ${fieldName} = "${value}"  `
    //       let [r, _] = await db.execute(sql)
    //       if(r.affectedRows > 0){
    //         resolve(true)
    //       } else {
    //         resolve(false)
    //       }
    //     } catch (ex){
    //       errorConsole(ex)
    //       reject(ex)
    //     } finally {
    //       db && db.end && db.end()
    //     }
    //   })
    // }
    //
    // static async find(sql){
    //
    //   return new Promise(async (resolve, reject)=>{
    //     let db;
    //     try {
    //       db = await dbConnect()
    //       let [docs, _] = await db.execute( sql ? sql : `SELECT * from ${this.tableName}`)
    //       resolve(docs)
    //     } catch (ex){
    //       errorConsole(ex)
    //       reject(ex)
    //     }
    //     finally{
    //       db && db.end && db.end()
    //     }
    //   })
    // }
}

export default Base;
