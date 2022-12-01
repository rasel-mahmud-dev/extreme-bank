

const { v2: cloudinary} = require("cloudinary");


export const cloudinaryHandler = ()=>{
    cloudinary.config({
        cloud_name: process.env.cloud_name,
        api_key: process.env.api_key,
        api_secret: process.env.api_secret
    });

    return cloudinary
}



export const imageUpload = (imagePath, dir)=>{
    return new Promise(async (resolve, reject)=>{
        try{
            let s = await cloudinaryHandler().uploader.upload(
                imagePath,
                {
                    use_filename: true,
                    unique_filename: false,
                    folder: dir ? dir : "",
                    overwrite: false
                })
            resolve(s)
        } catch (ex){

            if(ex.message){
                if(typeof ex.message === "string"){

                }
            }
            if(ex.error){
                if(typeof ex.error === "string"){

                } else {

                }
            }
            reject(ex)
        }
    })

}


export default imageUpload