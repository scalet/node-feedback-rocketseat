import nodemailer from 'nodemailer'
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "f4f3bced0b85c5",
    pass: "8fd49e6db92bb5"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail ({ subject, body}: SendMailData) {
    await transport.sendMail({
    from: "Equipe Feedget <oi@feedget.com>",
    to: "Renan Scalet Manoel <renan.scalet@gmail.com>",
    subject: subject, 
    html: body
  });   
  }
}