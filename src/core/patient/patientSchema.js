import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    patientName:{
        type:String,
        required:true
    },

    phoneNumber:{
        type:Number,
        maxlength:10,
        unique:true,
        required:true
    },

    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doctor"
    }
},{timestamps:true});

const patientModel = mongoose.model("Patient", patientSchema);

export default patientModel;