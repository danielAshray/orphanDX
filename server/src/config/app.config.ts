export class AppConfig {
  static readonly PORT = Number(process.env.PORT);
  static readonly IS_PRODUCTION_ENV = process.env.ENV_NAME === "PRODUCTION";
  static readonly CLIENT_URL = process.env.CLIENT_URL;
  static readonly BASE_API_PATH = process.env.BASE_API_PATH;
  static readonly SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
  static readonly TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;
  static readonly TOKEN_EXPIRE_AT = process.env.TOKEN_EXPIRE_AT;
  static readonly CREDENTIAL_ENCRYPTION_KEY =
    process.env.CREDENTIAL_ENCRYPTION_KEY;
  static readonly DATABASE_URL = process.env.DATABASE_URL;
}
