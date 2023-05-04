const nodemailer = require("nodemailer");

async function main(mail) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "bustosmv@gmail.com", // generated ethereal user
      pass: "rnydpzgagpkamlqj", // generated gmail password
    },
  });

  // send mail with defined transport object

  let info = await transporter.sendMail({
    from: "Mirada Animal <bustosmv@gmail.com>", // sender address
    to: mail, // list of receivers
    subject: "Bienvenido a Mirada Animal", // Subject line
    text: "Bienvenido a Mirada Animal", // plain text body
    html: "<b>Bienvenido a Mirada Animal</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = { main };
