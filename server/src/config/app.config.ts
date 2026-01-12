import "dotenv/config";

const AppConfig = Object.freeze({
  PORT: Number(process.env.PORT),
  IS_PRODUCTION_ENV: String(process.env.ENV_NAME) === "PRODUCTION",
  CLIENT_URL: String(process.env.CLIENT_URL),
  ALLOWED_METHODS: String(process.env.ALLOWED_METHODS?.split(",")),
  ALLOWED_HEADERS: String(process.env.ALLOWED_HEADERS?.split(",")),
  BASE_API_PATH: String(process.env.BASE_API_PATH),
  BASE_SERVE_PATH: String(process.env.BASE_SERVE_PATH),
  SALT_ROUNDS: Number(process.env.SALT_ROUNDS),
  TOKEN_SECRET_KEY: String(process.env.TOKEN_SECRET_KEY),
  TOKEN_EXPIRE_AT: String(process.env.TOKEN_EXPIRE_AT),
  CREDENTIAL_ENCRYPTION_KEY: String(process.env.CREDENTIAL_ENCRYPTION_KEY),
  DATABASE_URL: String(process.env.DATABASE_URL),
  PF_JWT_SECRET: String(process.env.PF_JWT_SECRET),
  SMTP_HOST: String(process.env.SMTP_HOST),
  SMTP_FROM: String(process.env.SMTP_FROM),
  SMTP_PASSWORD: String(process.env.SMTP_PASSWORD),
});

export default AppConfig;
