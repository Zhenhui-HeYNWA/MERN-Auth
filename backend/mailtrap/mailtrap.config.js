import Nodemailer from 'nodemailer';
import { MailtrapTransport } from 'mailtrap';
import dotenv from 'dotenv';
dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN;

export const mailtrapClient = Nodemailer.createTransport(
  MailtrapTransport({
    token: TOKEN,
  })
);

export const sender = {
  address: 'hello@demomailtrap.com',
  name: 'Hello!',
};
