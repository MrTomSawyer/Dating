export interface IEmailData {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export interface ITrasport {
  host: string;
  port: string;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  }
}
