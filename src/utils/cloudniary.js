import {v2 as cloudniary} from "cloudinary"
import fs from "fs"

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
  });
  
  
const uploadOnCloudinary = async(path)=>{
    try {
        if(!path) return null;
        const response = await cloudniary.uploader.upload(path,{
            resource_type:'auto' 
        })
        //file uploaded successfully now unlink
        console.log(`file uploaded on cloudinary ${response.url}`);
        return response;
    } catch (error) {
        fs.unlinkSync(path) // remove the locally saved temp file as the upload operation got failed
        return null;
    }
}

export { uploadOnCloudinary }