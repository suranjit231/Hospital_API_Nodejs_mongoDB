import PatientRepository from "./patient.repository.js";

export default class PatientController{

    constructor(){
        this.patientRepository = new PatientRepository();
    }


    //------ regster patient ------//

    async register(req,res,next){
        try{
            const doctorId = req.doctorId;
            const {patientName, phoneNumber} = req.body;
            if(!doctorId || !patientName || !phoneNumber){
                return {success:false, msg:"Can't register patient missing input!"}
            }

            const registerResult = await this.patientRepository.register(patientName, phoneNumber, doctorId);

            if(!registerResult.success){
                console.log("request failds")
                return res.status(404).json({success:false, msg:registerResult.msg});

            }else{
               console.log("registerResult: ", registerResult);
                return res.status(201).send({success:true, msg:"register sucessfull!", data:registerResult.data});
            }

        }catch(error){

            return res.status(404).json({error:error.message});
        }
    }
}