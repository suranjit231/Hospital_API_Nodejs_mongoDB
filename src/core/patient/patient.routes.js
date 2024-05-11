import express from "express";
import PatientController from "./patient.controller.js";

const patientRoutes = express.Router();
const patientController = new PatientController();


//-------- routes for regster patient ------//

patientRoutes.post("/register", (req,res,next)=>{
    patientController.register(req,res,next);
});


export default patientRoutes;