import express from "express";
import ReportController from "./report.controller.js";

const reportRoutes = express.Router();
const reportController = new ReportController();


// -------- routes for report ----------//



//-------- creating new report -------//
reportRoutes.post("/createReport", (req,res,next)=>{
    reportController.createReport(req,res,next);
});


//-------- getAll patient report by the patient ID
reportRoutes.get("/getAllReport/:patientId", (req,res,next)=>{
    reportController.getAllReports(req,res,next);
});


//------- getReport by status -----------//
reportRoutes.get("/getReportByStatus", (req,res,next)=>{
    reportController.getReportByStatus(req,res,next);
})





export default reportRoutes;