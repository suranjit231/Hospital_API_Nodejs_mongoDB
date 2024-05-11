import mongoose from "mongoose";
import reportModel from "./reportSchema.js";
import doctorModel from "../doctors/doctorSchema.js";
import patientModel from "../patient/patientSchema.js"

export default class ReportRepository{

    //---- creating patient report
    async createReport(doctorId, patientId, status){
        try{

            const doctor = await doctorModel.findOne({_id:doctorId});
            const patient = await patientModel.findOne({_id:patientId});

            if(!doctor || !patient){
                return {success:false, msg:"No doctor or no patient find with this ID!"}
            }
            const newReport = new reportModel({
                patient:patientId,
                createdByDoctor:doctorId,
                status:status
            });

            const savedReport = await newReport.save();
            console.log("savedReport: ", savedReport);


       let report = await reportModel.find({_id:savedReport._id}).populate("createdByDoctor", "name").populate("patient", "patientName phoneNumber")

        return {success:true, msg:"Patient report is created sucessfully!", report:report};

            
        }catch(error){
            console.log("error creating report: ", error);
            throw error;
        }
    }
    
    
    //-------- get all patient report by the patient ID --------//
    async getAllReport(patientId){
        try{

            const reports = await reportModel.find({patient:patientId}).sort({date:1}).populate("patient", "patientName phoneNumber").populate("createdByDoctor", "name");

            if(!reports){
                return {success:false, msg:"No report find for this patient!"}
            }

            return {success:true, msg:"Patient report fetch sucessfully!", reports:reports};

        }catch(error){
            throw new Error(error.message);
        }
    }


    //--------- List all the reports of all the patients filtered by a specific status ---------//
    async getReportByStatus(status){
        try{
            let reports = await reportModel.find({status:status}).populate("patient", "patientName phoneNumber").populate("createdByDoctor", "name");

            
            if(reports.length<=0){
                return {success:false, msg:`No report find with the status: ${status}`};
            };

            return {success:true, msg:`Report fetch successfully with the status: ${status}`, reports:reports};

        }catch(error){
            throw new Error(error.message);
        }
    }
}