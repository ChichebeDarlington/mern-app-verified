const jsonWebToken = require("jsonwebtoken");
const User = require("../models/user.js");



const authentification = async(req, res, next)=>{


    const {authorization} = req.headers;

    if(!authorization){
        return res.status(401).json({error: "Token authorization is required"})
    }

    const token = authorization.split(" ")[1];

    try {

        const {id} = jsonWebToken.verify(token, process.env.SECRET);


        req.auth = await User.findOne({_id:id})

        next()

    } catch (error) {
        console.log(error);
        res.status(401).json({error: "Unauthorized resquest"})
    }
}

module.exports = authentification;