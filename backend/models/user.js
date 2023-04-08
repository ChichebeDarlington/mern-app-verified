const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const validator = require("validator")


const {Schema, model} = mongoose;

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
}, {timestamps: true})

// static user sign up
userSchema.statics.signup = async function (username, email, password) {

    if(!username || !email || !password){
        throw new Error("Input characters in all fields")
    }
    if(!validator.isEmail(email)){
        throw new Error("Invalid email")
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("Password is weak, increase the strength of your password")
    }
    
    const emailAndusernameExist = await this.findOne({username, email})
    if(emailAndusernameExist){
        throw new Error("Username or Email already in use")
    }

    const salt = await bcrypt.genSalt(12)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({username, email, password: hash})

    return user
}

// static login format
userSchema.statics.login = async function(email, password){
    if(!email || !password){
        throw new Error("Input characters in all fields")
    }
    const user = await this.findOne({email})

    if(!user){
        throw new Error("Email not exist")
    }

    const compare = await bcrypt.compare(password, user.password)

    if(!compare){
        throw new Error("Invalid password")
    }

    return user;
}


module.exports = model("User", userSchema)