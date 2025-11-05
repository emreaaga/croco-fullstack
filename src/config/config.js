import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('4000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  JWT_SECRET: z.string(),
  JWT_ACCESS_EXPIRATION_MINUTES: z.coerce.number().default(30),

  REFRESH_SECRET: z.string(),
  JWT_REFRESH_EXPIRATION_DAYS: z.coerce.number().default(3),

  EMAIL_SECRET: z.string(),
  JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: z.coerce.number().default(3),

  DATABASE_URL: z.string(),

  CLIENT_URL: z.string().default('http://localhost:3000'),
  API_BASE_URL: z.string().default('http://localhost:4000/api'),

  SMTP_HOST: z.string(),
  SMTP_PORT: z.coerce.number().default(465),
  SMTP_USER: z.string(),
  SMTP_PASS: z.string(),
});

const env = envSchema.parse(process.env);

export const config = {
  app: {
    port: env.PORT,
    env: env.NODE_ENV,
  },
  jwt: {
    jwtSecret: env.JWT_SECRET,
    jwtAccessExpiration: env.JWT_ACCESS_EXPIRATION_MINUTES,

    refreshSecret: env.REFRESH_SECRET,
    jwtRefreshExpiration: env.JWT_REFRESH_EXPIRATION_DAYS,

    emailSecret: env.EMAIL_SECRET,
    jwtEmailExpiration: env.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  db: {
    dbUrl: env.DATABASE_URL,
    clientUrl: env.CLIENT_URL,
  },
  email: {
    emailFrom: env.API_BASE_URL,
    smtpHost: env.SMTP_HOST,
    smtpPort: env.SMTP_PORT,
    smtpUser: env.SMTP_USER,
    smtpPass: env.SMTP_PASS,
  },
};
