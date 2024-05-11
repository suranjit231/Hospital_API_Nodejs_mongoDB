import mongoose from "mongoose";


//----- schema for patient report
const reportSchema = new mongoose.Schema({
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Patient",
        required:true,

    },

    createdByDoctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doctor",
        required:true,
    },

    status:{
        type:String,
        enum:['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit'],
        required:true
    },

    date:{
        type:Date,
        default:Date.now
    }
});


const reportModel = mongoose.model("Report", reportSchema);
export default reportModel;