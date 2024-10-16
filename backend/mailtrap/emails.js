import { VERIFICATION_EMAIL_TEMPLATE } from './emailTemplates.js';
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
