import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import loginRouter from "./login.js"; 
import registerRouter from "./register.js"; 
import emailRouter from "./email.js"
import rolesRouter from "./roles.js"
import reportRouter from "./report.js"
import forgotpasswordRouter from "./forgotPassword.js"
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use(loginRouter); 
app.use(registerRouter); 
app.use(emailRouter); 
app.use(rolesRouter); 
app.use(reportRouter); 
app.use(forgotpasswordRouter); 


app.listen(process.env.DB_PORT, () => {
    console.log("Server is running on port 8081");
});

