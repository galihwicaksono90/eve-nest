import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  async sendEmail({
    to,
    subject,
    text,
  }: {
    to: string;
    subject: string;
    text: string;
  }) {
    //TODO: implement email sending
    console.log(
      '==================================================================',
    );
    console.log({ to, subject, text });
    console.log(
      '==================================================================',
    );
  }

  async sendResetPassword({ email, url }: { email: string; url: string }) {
    await this.sendEmail({
      to: email,
      subject: 'Reset your password',
      text: `Click the link to reset your password: ${url}`,
    });
  }

  async sendVerificationEmail({ email, url }: { email: string; url: string }) {
    await this.sendEmail({
      to: email,
      subject: 'Verify your email address',
      text: `Click the link to verify your email: ${url}`,
    });
  }
}
