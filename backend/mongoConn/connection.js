const mongoose=require('mongoose');
require('dotenv').config();

const connection=async (req,res)=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log("Connected to MongoDB"))
    }catch(err){
        res.status(400).json({message:"MongoDb Not Connected"});
    }
}
connection()