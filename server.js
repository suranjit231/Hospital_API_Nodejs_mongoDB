import cookieParser from "cookie-parser";
import express from "express";
import { connectMongodb } from "./src/config/mongodbConnect.js";
import doctorRoutes from "./src/core/doctors/doctor.routes.js";
import patientRoutes from "./src/core/patient/patient.routes.js";
import reportRoutes from "./src/core/report/report.routes.js";
import auth from "./src/middleware/jwtAuth.middleware.js"


const app = express();


//--------------*** setup middleware for parsing request body and cookie ----*/
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


//--------------*** setup routes -------------- */
app.use("/api/doctor", doctorRoutes);

app.use("/api/patient", auth, patientRoutes);

app.use("/api/report", auth, reportRoutes);





app.get("/", (req,res)=>{
    res.json("Server is responding for root GET request!")
});


app.listen(3200, ()=>{
    console.log("server is listeningon port 3200");
    connectMongodb();
})