
const nodemailer = require('nodemailer');
// const email= {
//     service: 'Gmail',
//     user: 'royabhayjeet@gmail.com',
//     pass: 'abhayjeetroy21@gmail.com',
//   }

const generateOTP = ()=> {
    return Math.floor(1000 + Math.random() * 9000).toString();
}


// Create a transporter object
// const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: 'jeanne11@ethereal.email',
//         pass: 'ZVxKmvMBpRApGejQu8'
//     },
// });


// Send OTP via email
// function sendOTP(receiverEmail, otp) {
//     const mailOptions = {
//       from: email.user,
//       to: receiverEmail,
//       subject: 'Your OTP Code',
//       text: `Your OTP code is: ${otp}`,
//     };
  
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error('Error sending OTP:', error);
//       } else {
//         console.log('OTP sent:', info.response);
//       }
//     });
// }

const sendEmail = async (req,res)=>{
    const otp = generateOTP();
    try {
      // Create a test account with Ethereal
      const testAccount = await nodemailer.createTestAccount();
  
      // Use the test account details for sending email
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'jeanne11@ethereal.email',
            pass: 'ZVxKmvMBpRApGejQu8'
        },
      });
  
      // Define email data
      const mailOptions = {
        from: 'Abhayjeet <abhayjeet@gmail.com>',
        to: 'royabhayjeet@gmail.com', // Replace with the recipient's email address
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otp}`,
      };
  
      // Send the email
      const info = await transporter.sendMail(mailOptions);
  
      console.log('Email sent. Preview URL:', nodemailer.getTestMessageUrl(info));
      res.json(info)
    } catch (error) {
        res.json(error)
        console.error('Error sending email:', error);
    }
  }
  





// config.js
module.exports = sendEmail;
  