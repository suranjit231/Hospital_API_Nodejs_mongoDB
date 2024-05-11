import express from "express";
import DoctorController from "./doctor.controller.js";

const doctorRoutes = express.Router();
const doctorController = new DoctorController();


//------- doctor signup routes --------//

doctorRoutes.post("/signup", (req,res,next)=>{
    doctorController.signup(req,res,next);
});


//-------- doctor signin rotes  ------//
doctorRoutes.post("/signin", (req,res,next)=>{
    doctorController.login(req,res,next);
});


export default doctorRoutes;
