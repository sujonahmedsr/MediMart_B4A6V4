import { NextFunction, Request, Response } from "express"
import asyncFunc from "../../utils/asyncFunc"
import jwt, { JwtPayload } from "jsonwebtoken"
import { userModel } from "../User Model/userSchema.model"
import AppError from "../../errors/AppError"
import { StatusCodes } from "http-status-codes"

const authMid = (...requiredRole: string[]) => {
    return asyncFunc(async (req: Request, res: Response, next: NextFunction) => {

        const authToken = req.headers.authorization as string
    
        const token =  authToken.split(" ")[1] ||  authToken 

        if (token == 'undefined' || !token) {
            throw new AppError(StatusCodes.UNAUTHORIZED,"You are not authorized")
        }

        let decoded;

        try {
            decoded = jwt.verify(token, process.env.SECRET_JWT as string) as JwtPayload
        } catch (error) {
            
            throw new AppError(StatusCodes.BAD_GATEWAY,"Expire Access Token.")
        }
        
        const { email, role, id } = decoded
        

        const user = await userModel.findOne({ _id: id })
        
        if (!user) {
            throw new AppError(StatusCodes.NOT_FOUND,"This user is not found !")
        }

        const userStatus = user?.isBlocked

        if (userStatus) {
            throw new AppError(StatusCodes.BAD_REQUEST,'This user is blocked ! !')
        }

        if (requiredRole && !requiredRole.includes(role)) {
            throw new AppError(StatusCodes.UNAUTHORIZED,'You are not authorized');
        }

        req.user = decoded as JwtPayload;

        next();
    })
}
export default authMid