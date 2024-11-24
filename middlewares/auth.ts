import jwt, {JwtPayload} from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { RequestWithUser } from "../controllers/user.controller";
import { IUser } from "../models/user.model";


interface JwtPayloadWithUser extends IUser, JwtPayload {
    iat?: number,
    exp?: number,
}


const createAuthenticationToken = async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as RequestWithUser).user;
    //console.log(user);
    //console.log(req.body, (req as RequestWithUser).user);

    const token = jwt.sign({...user._doc}, process.env.JWT_SECRET as string, {
        expiresIn: process.env.JWT_EXPIRATION as string,
    });    
    res.json({
        status: "success",
        success: true,
        token,        
        user
    })
}

const verifyAuthenticationToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if(!token) {
        res.status(401).json({
            status: "failure",
            message: "Unauthorized access",
        });
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
        if(err) {
            res.status(401).json({
                status: "failure",
                message: "Unauthorized access",
            });
            return;
        }        
        if (user && typeof user !== "string") (req as RequestWithUser).user = user as IUser;
        //console.log((req as RequestWithUser).user);        
        next();
    });
}

const restrictTo = (roles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes((req as RequestWithUser).user.role)) {
        res.status(403).json({
            status: "failure",
            message: "You do not have permission to perform this action",
        });
        return;
    }

    next();
}

const sameUser = async (req: Request, res: Response, next: NextFunction) => {
    if((req as RequestWithUser).user._id !== req.params.id) {
        res.status(403).json({
            status: "failure",
            message: "You do not have permission to perform this action",
        });
        return;
    }
    next();
}

export {createAuthenticationToken, verifyAuthenticationToken, restrictTo, sameUser};