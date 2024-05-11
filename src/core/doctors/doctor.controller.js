import DoctorRepository from "./doctor.repository.js";
import jwt from "jsonwebtoken";

export default class DoctorController{
    constructor(){
        this.doctorRepository = new DoctorRepository();
    }


    //----- doctor signup ---------//
    async signup(req,res,next){
        try{
            const {name, email, password } = req.body;

            if(!name.trim() || !email.trim() || !password.trim()){
               return res.status(404).json({sucess:false, msg:"registration falid, empty input field!"})
            }

            const signupResult = await this.doctorRepository.signup(name, email, password);

            if(signupResult){
                return res.status(201).json(signupResult);

            }else{
                return res.status(404).json(signupResult);
            }

        }catch(error){

            console.log("error doctor login controller: ", error);
            res.status(404).json(error.message);
        }
    }


    //------ doctor login ------//

    async login(req,res, next){


        try{
            const {email, password} = req.body;

        const loginResult = await this.doctorRepository.signin(email, password);
        if(!loginResult.success){
            return res.status(404).json(loginResult);

        }

        //---- login successful then create a jwtToken --------//
        const token = jwt.sign({doctorId:loginResult.data._id, email:loginResult.data.email},
            "M2EddwM8DEunbvHLzxOLLoHcjsC2NKwt", 
            {expiresIn:"1h"}
        );

        return res.status(200).cookie("jwtToken", token, {maxAge:1000*60*60*2, httpOnly:true}).json({result:loginResult, token:token});

        }catch(error){
            res.status(404).json(error.message);
        }
        
    }
}