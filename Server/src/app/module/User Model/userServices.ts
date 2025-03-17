import { StatusCodes } from "http-status-codes"
import AppError from "../../errors/AppError"
import { loginInterface, userInterface } from "./user.Interface"
import { userModel } from "./userSchema.model"
import bcrypt from "bcrypt"
import jwt, { JwtPayload } from "jsonwebtoken"
import configOut from "../../../configOut"

const resgisterUserIntoDb = async (paylod: userInterface) => {
    const result = await userModel.create(paylod)
    return result
}

const loginUserDb = async (paylod: loginInterface) => {
    const user = await userModel.findOne({ email: paylod.email }).select("+password")

    if (!user) {
        throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !')
    }

    const userStatus = user?.isBlocked
    if (userStatus) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'User is already blocked!')
    }

    const isPassMatched = await bcrypt.compare(paylod?.password, user?.password)
    if (!isPassMatched) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'Wrong Password!!! Tell me who are you? 😈')
    }

    const jwtPayload = {
        email: user?.email,
        role: user?.role,
        id: user?._id
    }
    const token = jwt.sign(jwtPayload, configOut.SECRET_JWT as string, { expiresIn: '30d' })

    return { token };
}


const resetPassword = async (payload: { oldPassword: string, newPassword: string }, userData: JwtPayload) => {
    const user = await userModel.findOne({ _id: userData.id }).select("+password")

    const isPassMatched = await bcrypt.compare(payload?.oldPassword, user?.password as string)

    if (!isPassMatched) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'Please enter current password.')
    }

    const newPass = await bcrypt.hash(payload?.newPassword, 10)

    const result = await userModel.findByIdAndUpdate({ _id: user?.id }, { password: newPass }, { new: true })

    return result
}

const singleUser = async (id: string) => {
    const user = await userModel.findOne({ _id: id })
    if (!user) {
        throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !')
    }
    return user
}
const updateUser = async (id: string, payload: any) => {
    
    const user = await userModel.findByIdAndUpdate(id, payload, {new: true})
    if (!user) {
        throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !')
    }
    return user
}


export const userServices = {
    resgisterUserIntoDb,
    loginUserDb,
    resetPassword,
    updateUser,
    singleUser
}