import { AppConfiguration } from "../../configs/Application.config"
import { IEmailData } from "../interfaces/request/IEmailTransport"
import * as nodemailer from 'nodemailer'
import { emailTypes } from "../enums/emailTypes"
import { EmailTemplateService } from "./EmailTemplateService"
import { IUser } from "../../src/database/user.model"

export class EmailService {
  private static fromEmail: string
  private static transporter: nodemailer.transporter

  static init(login?: string, password?: string): void {
    EmailService.fromEmail = AppConfiguration.fromEmail

    EmailService.transporter = {
      host: AppConfiguration.emailHost,
      port: AppConfiguration.emailPort,
      secure: AppConfiguration.emailPort === '465' ? true : false,
      auth: {
        user: login,
        pass: password
      }
    }
  }

  private static createEmail(email: string, 
                              emailType: emailTypes, user: IUser, source: string): IEmailData {
    let subject: string;
    let emailTemplate: string;
    let button: string;

    switch(emailType) {
      case emailTypes.SIGNUP:
        subject = 'Подтвердите адрес почты'
        emailTemplate = 'signup'
        button = 'Подтвердить'
        break;
      case emailTypes.PASSWORD_RESET:
        subject = 'Сброс пароля'
        emailTemplate = 'passwordReset'
        button = 'Сбросить'
        break;
    }

    const replacements = {
      name: user.name,
      button 
    }

    return {
      from: EmailService.fromEmail,
      to: email,
      subject,
      html: EmailTemplateService.createEmailHtml(emailTemplate, replacements, source)
    }
  }

  static async sendEmail(email: string, emailType: emailTypes, user: any, source: string): Promise<void> {
    const emailData = EmailService.createEmail(email, emailType, user, source)
    await EmailService.transporter(emailData)
  }
}
