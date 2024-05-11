import mongoose from "mongoose";
import patientModel from "./patientSchema.js";

export default class PatientRepository{

    //------ register patient ------//

    async register(patientName, phoneNumber, doctorId){
        try{
            phoneNumber = Number(phoneNumber);
            let patient =await patientModel.findOne({phoneNumber:phoneNumber}).populate({path:"doctor", select:"name"});;

            //----- if patient is already exist then find the patient and return patient data
            if(patient){
                console.log("patient: ", patient)
                return {success:true, msg:"patient data fetch sucessfully!", data:patient};

            }

            //----- if patient not exist create new patient and return new patient data
            const newPatient = new patientModel({
                patientName:patientName,
                phoneNumber:phoneNumber,
                doctor:doctorId
            });

            const savedPatient  = await newPatient.save();
           
            // Populate the doctor field with only the name in the savedPatient object
            patient = await savedPatient.populate({
                path: 'doctor',
                select: 'name' 
            });

         
            console.log("savedpatient: ", savedPatient)
            
            return {success:true, msg:"patent register successful!", data:patient};

        }catch(error){
            console.log("register patient error in pRepo: ", error);

            throw new Error(error.message);
        }
    }
}
