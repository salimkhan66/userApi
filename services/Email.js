const nodemailer = require("nodemailer");
require('dotenv').config()
const sendEmail = async (otp) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

 
  try {
    const info = await transporter.sendMail({
      from: '"Salim Khan 👻" <salimkhan668580s@gmail.com>', // sender address
      to: "khansalim0193@gmail.com", // list of receivers (you may want to replace this with the user's email)
      subject: "Node mailer Test", // Subject line
      text: `Please don't share with anyone. Your OTP is: ${otp}`, // plain text body
      html: `<b>Your OTP is: ${otp}</b>`, // html body
    });

   
    return info; // return the response instead of logging

    
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // rethrow error to be handled in the calling context
  }
};

// ================================ forget=================
const forgetAck=async ()=>{
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  // Send mail with defined transport object
  try {
    const info = await transporter.sendMail({
      from: '"Salim Khan 👻" <salimkhan668580s@gmail.com>', // sender address
      to: "khansalim0193@gmail.com", // list of receivers (you may want to replace this with the user's email)
      subject: "Forget Password successfully", // Subject line
      text: ` your password is reset successfully`, // plain text body
      html: `<b>your password is reset successfully</b>`, // html body
    });

   
    return info; // return the response instead of logging

    
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // rethrow error to be handled in the calling context
  }
}

module.exports = {
  sendEmail,
  forgetAck
};
