import mongoose from "mongoose";
import doctorModel from "./doctorSchema.js";
import { hashedPassword,comparedPassword } from "../../utility/hashedPassword.js";


export default class DoctorRepository{


    //------- doctor register ------//
    async signup(name, email, password){
        try{
            const passwordHashed = await hashedPassword(password);
            const newDoctor =new doctorModel({
                name:name,
                email:email,
                password:passwordHashed,
            });

           const savedDoctor= await newDoctor.save();
           // Return doctor data with password excluded
           const doctorData = this.excludePassword(savedDoctor);

           return {success:true, msg:"Doctor register sucessful!", data:doctorData};


        }catch(error){
            if (error.code === 11000 && error.keyPattern.email) {
                // If the error is due to a duplicate email
                throw new Error("Email already exists. Please choose a different email.");
            } else {
                // For other errors, log the error and throw a generic error message
                console.log(error);
                throw new Error("Something went wrong.");
            }
        }
    }


    //------- doctor login -----//
    async signin(email, password){

        try{

            const doctor = await doctorModel.findOne({email:email});

            if(!doctor){
                throw new Error("doctor is not found!")
            }

            const compardResult = await comparedPassword(password, doctor.password);
            if(compardResult){
                const doctorData = this.excludePassword(doctor);

                return {success:true, msg:"Login sucessful!", data:doctorData};
            }else{
                return {success:false, msg:"Invlaid password, login falis!"}
            }

        }catch(error){

            console.log("doctor signin error: ", error);
            throw new Error(error.message);
        }
    }





    // Method to exclude password from doctor object
    excludePassword(doctor) {
        const { password, ...doctorData } = doctor.toObject();
        return doctorData;
    }
}