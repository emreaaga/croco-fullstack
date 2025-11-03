import nodemailer from 'nodemailer';
import { config } from './index.js';

const configs = config.email;

export const transporter = nodemailer.createTransport({
  host: configs.smtpHost,
  port: configs.smtpPort,
  secure: true,
  auth: {
    user: configs.smtpUser,
    pass: configs.smtpPass,
  },
});
