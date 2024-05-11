import mongoose from "mongoose";

//---- doctor schema defining --

const doctorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        unique:true,
        required:true,
    },

    password:{
        type:String,
        required:true
    },

    
});


const doctorModel = mongoose.model("Doctor", doctorSchema);

export default doctorModel;

