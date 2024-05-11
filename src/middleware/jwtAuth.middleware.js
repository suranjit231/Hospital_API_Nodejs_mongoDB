import jwt from "jsonwebtoken";

const auth = async(req,res,next)=>{
    console.log("req.cookie ", req.cookies)
   const {jwtToken} = req.cookies;

   if(!jwtToken){
    return res.status(400).send("UnAuthorized! login to continue")
   }

   jwt.verify(jwtToken, "M2EddwM8DEunbvHLzxOLLoHcjsC2NKwt", (err, data)=>{
        if(err){
            return res.status(400).send("UnAuthorized! login to continue");

        }else{
            req.doctorId = data.doctorId;
            next();
        }

   })
}

export default auth;