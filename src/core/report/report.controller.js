import ReportRepository from "./report.repository.js";

export default class ReportController{
    constructor(){
        this.reportRepository = new ReportRepository();
    }


    //----- creating report ---------//

    async createReport(req,res,next){
        try{
            const {patientId, status} = req.body;
            const doctorId = req.doctorId;

            if(!patientId || !status){
                return res.status(404).json({success:false, msg:"PatientId and staus is required!"})
            }

            const result = await this.reportRepository.createReport(doctorId, patientId, status);
            if(!result.success){
                return res.status(404).json({success:false, msg:result.msg})
            }

            return res.status(201).json({success:true, msg:result.msg, report:result.report});

        }catch(error){

            return res.status(404).json(error.message);
        }
    }


    //---------- getAll patient report by patient ID -------//
    async getAllReports(req,res,next){
        try{

            const patientId = req.params.patientId;
            console.log("patientId : ", patientId);


            if(!patientId){
                return res.status(404).json({success:false, msg:"Pateint Id is requied to get patient report!"})
            }

            const result = await this.reportRepository.getAllReport(patientId);
            if(!result.success){
                return res.status(404).json({success:false, msg:result.msg});
            }else{
                return res.status(200).json({success:true, msg:result.msg, reports:result.reports});
            }

        }catch(error){
            console.log("error in getAllReport: ", error);
            return res.status(404).json(error.message);
        }
    }


    //-------- List all the reports of all the patients filtered by a specific status-----------//

    async getReportByStatus(req,res,next){
        try{
            const status = req.query.status ;

            const result  = await this.reportRepository.getReportByStatus(status);
            if(!result.success){
                return res.status(404).json({success:false, msg:result.msg});
            }

            return res.status(200).json({success:true, msg:result.msg, reports:result.reports});

        }catch(error){
            console.log("error in getReportByStatus: ", error);
            return res.status(404).json(error.message);
        }
    }
}