import Mail from 'nodemailer';

interface IRequestData {  
  name: string;
  status: string;
  email: string;  
}

export default class Mailer {

  public transporter;

  constructor() {
    const host = process.env.SMTP_HOST;
    const port = +process.env.SMTP_PORT;
    const user = process.env.SMTP_USERNAME;
    const password = process.env.SMTP_PASSWORD;    

    this.transporter = Mail.createTransport({
      host,
      port,
      secure: false,
      requireTLS: true,
      auth: {
        user,
        pass: password
      },
      logger: true,
    });
  }

  async sendMail({name, email, status}: IRequestData) {    
    let message: string; 

    if(status === "approved") {
      message =`<h1> Hello ${name} </h1> <p> We are happy to tell you that your request to be part of our institution was approved and you <b> earned R$ 200 </b> for been approved, enjoy it! </p>`;
    } else {
      message = `<h1> Hello ${name} </h1> <p> We are sad to tell you that your request to be part of our institution was denied. </p>`;
    }
    
    const info = await this.transporter.sendMail({
      from: 'Bet-Lotery <admin@bet.lotery.com>',
      to: email,
      subject: 'Account request on LubyCash',      
      html: message,
      headers: { 'x-myheader': 'New User Header' }
    });

    return info;
  }
}