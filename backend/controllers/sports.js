const Sport = require("../models/sports.js")
const mongoose = require("mongoose")



const getAllSports = async(req, res)=>{
    try {
        const allSports = await Sport.find({})
        .sort({createdAt: -1})
        return res.status(200).json(allSports)
    } catch (error) {
        
        return res.json({error: error.message})
    }
}

 const getSingleSport =  async(req, res)=>{
    try {
        const  {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: "No sport with such the " + id })
        }

        const singleSport = await Sport.findById(id)
        if(!singleSport){
            return res.status(400).json({error: "No existing sport as such"})
        }
        return res.json(singleSport)
    } catch (error) {
        console.log(error)
        return res.status(400).json(error.message)

    }
}

 const postSport = async(req, res)=>{
    const {title, reps, load} = req.body;


    let fieldsEmpty = new Array()

    if(!title){
        fieldsEmpty.push("title")
    }

    if(!reps){
        fieldsEmpty.push("reps")
    }

    if(!load){
        fieldsEmpty.push("load")
    }

    if(fieldsEmpty.length > 0){
        return res.status(401).json({error:"Input fields can not be empty....", fieldsEmpty})
    }

    try {
        const sport = await Sport.create({title, reps, load});
        res.status(201).json(sport)
    } catch (error) {
        console.log(error)
        res.status(400).json({error: error.message})
    }
    // return res.json({msg: "Post a single sport request"})
}

 const deleteSport = async(req, res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No sport with such the " + id })
    }

    try {
        const sport = await Sport.findOneAndDelete({_id:id})
        if(!sport){
           return res.status(400).json({error: "No such sport", sport})
        }
       return res.status(200).json({msg: "Successfully deleted"})
    } catch (error) {
        console.log(error);
    }

    // return res.json({msg: "Delete a single sport request"})

}

 const updateSport = async(req, res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No sport with such the " + id })
    }

    try {
        const sport = await Sport.findOneAndUpdate({_id:id}, {...req.body}, {new:true})
        if(!sport){
           return res.status(400).json({error: "No such sport to be updated"})
        }
       return res.status(200).json(sport)
    } catch(error){
        console.log(error)
        return res.status(400).json({error: error.message})
    }
}

module.exports = {
getAllSports, 
getSingleSport, 
postSport, 
deleteSport, 
updateSport
}