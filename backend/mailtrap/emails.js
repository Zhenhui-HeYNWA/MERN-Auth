import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from './emailTemplates.js';
import { mailtrapClient, sender } from './mailtrap.config.js';

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = email;
  console.log(recipient);

  try {
    const response = await mailtrapClient.sendMail({
      from: `${sender.name} <${sender.address}>`,
      to: recipient,
      subject: 'Verify your email',
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        '{verificationCode}',
        verificationToken
      ),
      category: 'Email verification',
    });

    console.log('Email sent successfully', response);
  } catch (error) {
    console.error('Email sending verification', error);

    throw new Error(`Error sending verification email:${error}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = email;
  try {
    const response = await mailtrapClient
      .sendMail({
        from: `${sender.name} <${sender.address}>`,
        to: recipient,
        subject: 'Welcome!',
        html: WELCOME_EMAIL_TEMPLATE.replace('{name}', name),
      })
      .then(console.log, console.error);

    console.log('Welcome email sent successfully', response);
  } catch (error) {
    console.error('Email sending verification', error);

    throw new Error(`Error sending Welcome email:${error}`);
  }
};

export const sendPasswordResetEmail = async (email, resetUrl) => {
  const recipient = email;
  console.log(resetUrl);

  try {
    const response = await mailtrapClient
      .sendMail({
        from: `${sender.name} <${sender.address}>`,
        to: recipient,
        subject: 'Reset your password',
        html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURl}', resetUrl),
      })
      .then(console.log, console.error);
    console.log('Password reset email sent successfully', response);
  } catch (error) {
    console.error(`Error sending password reset email`, error);
    throw new Error(`Error sending password reset email:${error}`);
  }
};

export const sendResetSuccessEmail = async (email) => {
  const recipient = email;
  try {
    const response = await mailtrapClient.sendMail({
      from: `${sender.name} <${sender.address}>`,
      to: recipient,
      subject: 'Password Reset Successful',
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: 'password reset',
    });

    console.log('Password reset email sent successfully', response);
  } catch (error) {
    console.error(`Error sending password reset success email`, error);
    throw new Error(`Error sending password reset success email:${error}`);
  }
};
