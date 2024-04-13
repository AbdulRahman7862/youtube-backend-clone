import mongoose, { Schema } from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        index:true, // for indexing to optimize search
        trim:true,
        lowercase:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
    },
    fullname:{
        type:String,
        required:true,
        index:true, 
        trim:true,
    },
    avatar:{
        type:String,
        required:true
    },
    coverImage:{
        type:String,
    },
    watchHistory:[{
        type:Schema.Types.ObjectId,
        ref:"Video"
    }],
    password:{
        type:String,
        required:[true,"Password is required"],  
    },
    refreshToken:{
        type:String,
    }

},{timestamps:true})

userSchema.pre("save",async function (next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordValid = async function (password) {
    console.log(`password is : ${password} and this passwors is ${this.password}`)
    return await bcrypt.compare(password,this.password);
}

userSchema.models.generateAccessToken = function(){
    return jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email,
        fullname: this.fullname,
    },process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: ACCESS_TOKEN_SECRET_EXPIRY})
}

userSchema.models.generateRefreshToken = function(){
    return jwt.sign({
        _id: this._id,
    },process.env.REFRESH_TOKEN_SECRET,
    {expiresIn: REFRESH_TOKEN_SECRET_EXPIRY})
}



export const User = mongoose.Model("User",userSchema)