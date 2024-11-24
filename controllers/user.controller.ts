import { IUser, User } from "../models/user.model";
import bcryptjs from "bcryptjs";
import { NextFunction, Request, Response } from "express";

import { createOne, deleteOne, getAll, getOne, updateOne } from "./generic.controller";
import { createAuthenticationToken } from "../middlewares/auth";

const createUser = createOne(User, "User");
const getAllUsers = getAll(User);
const getUser = getOne(User, "User");
const deleteUser = deleteOne(User, "User");
const updateUser = updateOne(User, "User");


export interface RequestWithUser extends Request {
    user: IUser
}

const signIn = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const {username,password}:{username:string, password:string} = req.body;
        const user = await User.findOne({ username }).select("+password");
        if (!user) {
            res.status(404).json({
                status: "failure",
                message: "Invalid username or password",
            }) 
            return;
        }

        const isMatch = user && await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            res.status(404).json({
                status: "failure",
                message: "Invalid username or password",
            })
            return;
        }
        
        // user.password = undefined;
        //req.user = user
        (req as RequestWithUser).user = user;
        (user.password as unknown) = undefined;
        
        createAuthenticationToken(req, res, next);
    }catch(err:any){
        res.status(500).json({
            status: "failure",
            message: err.message ? err.message : "Internal Server error",
        });
    }
}

export { createUser, getAllUsers, getUser, deleteUser, updateUser, signIn };
