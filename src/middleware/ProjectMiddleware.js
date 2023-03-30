import User from "../models/authModels";
import jwt from "jsonwebtoken";

async function ProjectMiddleware(req, res, next){
    let token;
    token = req.headers.companyauth;
    try {
        if (!token){
            return res.status(401).json({ message: "No token provided" });
        }
        else{
            const decoded = await jwt.verify(token, process.env.JWT_SECRET);
            const loggedUser = await User.findOne({_id: decoded.id});
            if(!loggedUser){
                return res.status(401).json({
                    status:"Failed",
                    message: "Invalid token"
                });
            }

            if(loggedUser.role === "company"){
                req.loggedCompany = loggedUser;
                next(); 
            }
            else{
                return res.status(403).json({
                    status:"Failed",
                    message: "Only Company can create Project"
                });
            }
        }
    }
    catch (error) {
        return res.status(401).json({
            status:"error",
            message: error.message,
        });
    }
}

export default ProjectMiddleware;