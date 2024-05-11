import mongoose from "mongoose";


//--- connection of mongodb database 
const connectMongodb=async()=>{
    await mongoose.connect("mongodb://localhost:27017/Hospital_API", {
        useNewUrlParser:true,
        useUnifiedTopology:true
    });

    console.log("mongodb is connected");
}

export {connectMongodb};