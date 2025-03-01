import { model, Schema } from "mongoose";
import { userInterface } from "./user.Interface";
import bcrypt from 'bcrypt'
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";

const userSchema = new Schema<userInterface>({
    name: {
        type: String,
        required: [true, 'Name field is required.']
    },
    email: {
        type: String,
        required: [true, 'Email field is required.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password field is required.'],
        select: false
    },
    role: {
        type: String,
        enum: ["admin", "customer"],
        default: "customer"
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    phone: { type: String, default: null },
    address: { type: String, default: null },
    city: { type: String, default: null },
    image: { type: String, default: null }
}, {
    timestamps: true
})

userSchema.pre('save', async function (next) {
    const user = this;
    user.password = await bcrypt.hash(user.password, 10)
    next()
})

userSchema.pre("save", async function (next) {
    const { email } = this
    const user = await userModel.findOne({ email })
    if (user) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'User already exists')
    }
})

userSchema.post('save', async function (doc, next) {
    doc.password = ''
    next()
})

export const userModel = model<userInterface>('User', userSchema)
