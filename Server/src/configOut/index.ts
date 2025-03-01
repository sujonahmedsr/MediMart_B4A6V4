import dotenv from 'dotenv'
import path from 'path'
dotenv.config({path:path.join(process.cwd(),'.env')})

export default {
    DBURL:process.env.DBURL,
    PORT:process.env.PORT,
    NODE_DEV:process.env.NODE_DEV,
    SECRET_JWT: process.env.SECRET_JWT,
    JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
    // bcrypt_salt_round:process.env.BCRYPT_SALT_ROUND,
    // jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    // jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
}