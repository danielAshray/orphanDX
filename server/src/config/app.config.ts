import "dotenv/config";

const AppConfig = Object.freeze({
  PORT: Number(process.env.PORT),
  IS_PRODUCTION_ENV: String(process.env.ENV_NAME) === "PRODUCTION",
  CLIENT_URL: String(process.env.CLIENT_URL),
  BASE_API_PATH: String(process.env.BASE_API_PATH),
  SALT_ROUNDS: Number(process.env.SALT_ROUNDS),
  TOKEN_SECRET_KEY: String(process.env.TOKEN_SECRET_KEY),
  TOKEN_EXPIRE_AT: String(process.env.TOKEN_EXPIRE_AT),
  CREDENTIAL_ENCRYPTION_KEY: String(process.env.CREDENTIAL_ENCRYPTION_KEY),
  DATABASE_URL: String(process.env.DATABASE_URL),
  PF_JWT_SECRET: String(process.env.PF_JWT_SECRET),
});

export default AppConfig;
