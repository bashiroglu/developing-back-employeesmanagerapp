const nodemailer = require('nodemailer');

module.exports = class Email {
  constructor(user) {
    this.to = user.email;
    this.firstName = user.fullname.split(' ')[0];
    this.password = user.password;
    this.username = user.username;
    this.groupname = user.groupname;
    this.from = `Abdulla <bashiroglu.abdulla@gmail.com>`;
  }
  newTransport() {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASSWORD
      }
    });
  }
  async send(subject) {
    const text = `Hey ${this.firstName} welcome to our agency. We sent your cridentials to you via this email. Your user name: ${this.username} , Your password: ${this.password} , Your group name: ${this.groupname} . Please be aware that these cridentials will be known only by you, not even by managers.`;
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text
    };

    await this.newTransport().sendMail(mailOptions);
  }
};
