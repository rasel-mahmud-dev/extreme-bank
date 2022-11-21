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
	
	// save(){
	//   return new Promise(async (resolve, reject)=>{
	//     try{
	//       let { tableName } = this
	//
	//       this.validationBeforeSave( async (err)=>{
	//         if(err){
	//           return reject({type: "VALIDATION_ERROR", errors: err})
	//         }
	//
	//         let values = '';
	//         let fields = ''
	//
	//         for (const otherValueKey in this.databaseSaveFields) {
	//             // if value and key exists
	//           if(otherValueKey && this.databaseSaveFields[otherValueKey]) {
	//             fields += otherValueKey + ", "
	//             values += `'${this.databaseSaveFields[otherValueKey]}'` + ","
	//           }
	//         }
	//
	//         let trimLastComma = (value, negationIndex)=> value.slice(0, value.length - negationIndex)
	//         let db;
	//         try {
	//           db = await dbConnect()
	//           let sql = `
	//               INSERT INTO ${tableName} (${trimLastComma(fields, 2)})
	//               VALUES (${trimLastComma(values, 1)})
	//           `
	//           let [r, _] = await db.execute(sql)
	//           console.log(sql)
	//           if(r.affectedRows > 0){
	//             resolve({
	//               ...this.databaseSaveFields,
	//               id: r.insertId
	//             })
	//           }
	//         } catch (ex) {
	//           errorConsole(ex)
	//           if(ex.code === "ER_DUP_ENTRY"){
	//             reject({
	//               type: "ER_DUP_ENTRY",
	//               message: ex.sqlMessage
	//             })
	//             logger.error(ex.message)
	//           } else {
	//             reject(ex)
	//           }
	//         } finally {
	//           db && db.end && db.end()
	//         }
	//       })
	//
	//     } catch (ex){
	//       reject(ex)
	//     }
	//   })
	// }
	
	// static getCollection(collectionName){
	//   return new Promise(async (resolve, reject)=>{
	//   try {
	//
	//     // let {c, client} = await dbConnect(collectionName ? collectionName : Base.collectionName)
	//     // resolve({collection: c, client: client})
	//
	//     } catch (ex){
	//       reject({collection: undefined, client: undefined})
	//     }
	//   })
	// }
	
	// static async dbConnect(collectionName){
	//   return new Promise(async (resolve, reject)=>{
	//     try {
	//       let { c, client} = await dbConnect(collectionName)
	//       resolve({collection: c, client: client})
	//     } catch (ex){
	//       reject(ex)
	//     }
	//   })
	// }
	
	// static insertInto(values){
	//   return new Promise<mongoDB.InsertOneResult>(async (resolve, reject)=>{
	//     let client;
	//     try {
	//
	//       let {collection, client: cc} = await Base.dbConnect(this.collectionName)
	//       client = cc
	//       if(values) {
	//         let {_id, ...other} = values
	//         let cursor = await collection?.insertOne({
	//           ...other,
	//           created_at: new Date(),
	//           updated_at: new Date()
	//         })
	//
	//         resolve(cursor)
	//       }
	//       // console.log(cursor, other)
	//       client?.close()
	//
	//     } catch (ex){
	//       client?.close()
	//       reject(new Error(ex.message))
	//     } finally {
	//       client?.close()
	//     }
	//   })
	// }
	// static update(values){
	//   return new Promise(async (resolve, reject)=> {
	//     let client;
	//     try {
	//       let {collection, client: cc} = await Base.dbConnect(Base.collectionName)
	//       client = cc
	//       let {_id, ...other} = values
	//       let cursor = await collection?.findOneAndUpdate({_id: new ObjectId(_id)},
	//         {  $set: {
	//             ...other,
	//             updated_at: new Date()
	//           }})
	//       resolve(cursor)
	//     } catch (ex){
	//
	//     } finally {
	//       client?.close()
	//     }
	//   })
	// }
	//
	// static deleteById(id: string){
	//
	//   return new Promise<mongoDB.DeleteResult>(async (resolve, reject)=> {
	//     if(id){
	//       let client;
	//       try {
	//         let {collection, client: cc} = await Base.dbConnect(this.collectionName)
	//         client = cc
	//         let doc = await collection.deleteOne({_id: new ObjectId(id)})
	//         resolve(doc)
	//       } catch (ex) {
	//         reject(new Error(ex.message))
	//       } finally {
	//         client?.close()
	//       }
	//     } else {
	//       reject(new Error("please provide id"))
	//     }
	//   })
	//
	// }
	
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
				
				let sql = `SELECT ${ selectFields ? selectFields : "*" } from ${tableName} where ${fieldName} = "${value}"  `;
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

    // static aggregate(pipeline: any){
    //   return new Promise(async (resolve, reject)=>{
    //     let client;
    //     try {
    //       let { collection, client: cc } = await Base.dbConnect(this.collectionName)
    //       client = cc
    //       let cursor = collection?.aggregate(pipeline)
    //       let products = []
    //       await cursor.forEach(p=>{
    //         products.push(p)
    //       })
    //       resolve(products)
    //       client?.close()
    //
    //     } catch (ex){
    //       reject(new Error(ex))
    //     }
    //     finally {
    //       client?.close()
    //     }
    //   })
    // }
}

export default Base