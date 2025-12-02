export const PORT = Number(process.env.PORT);
export const IS_PRODUCTION_ENV = process.env.ENV_NAME === "PRODUCTION";
export const CLIENT_URL = process.env.CLIENT_URL;
export const BASE_API_PATH = process.env.BASE_API_PATH;
export const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
export const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY || "";
export const TOKEN_EXPIRE_AT = process.env.TOKEN_EXPIRE_AT;
export const CREDENTIAL_ENCRYPTION_KEY = process.env.CREDENTIAL_ENCRYPTION_KEY;
export const DATABASE_URL = process.env.DATABASE_URL;
