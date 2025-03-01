import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  default_password: process.env.DEFAULT_PASS,
  jwt: {
    access_secret: process.env.JWT_ACCESS_SECRET,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
    access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
    refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  },
  sp: {
    sp_endpoint: 'https://sandbox.shurjopayment.com',
    sp_username: 'sp_sandbox',
    sp_password: 'pyyk97hu&6u6',
    sp_prefix: 'SP',
    sp_return_url: 'https://cycle-labs.netlify.app/order-response',
  },
};

// SP_ENDPOINT=https://sandbox.shurjopayment.com
// SP_USERNAME=sp_sandbox
// SP_PASSWORD=pyyk97hu&6u6
// SP_PREFIX=SP
// SP_RETURN_URL=https://<your.app.com>/shurjopay-response
