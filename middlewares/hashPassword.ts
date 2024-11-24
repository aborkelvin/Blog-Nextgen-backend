import { Request, Response, NextFunction } from "express"
const bcryptjs = require("bcryptjs");
// Purpose: Hash the password before saving it to the database

const hashPassword = async (req:Request, res:Response, next:NextFunction) => {
    if (!req.body.password) next();
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);    
    console.log(`Old password: ${req.body.password} \nNew password: ${hashedPassword}`);
    req.body.password = hashedPassword;
    next();
}

export {hashPassword}