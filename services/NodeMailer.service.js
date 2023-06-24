import nodemailer from 'nodemailer'

const transporter = new nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nurullaamannula05@gmail.com',
        pass: 'exxjyqzghrxgosyi',
    }
})

/**
 * Sends email to user
 * @param {string} email 
 * @param {string} text -text of email
 * @returns {void}
 */
export const sendEmail = async (email, text) => {
  const mailOptions = {
    from: 'nurullaamannula05@gmail.com',
    to: email,
    subject: 'Confirm authorization',
    text: `${text}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if(error) {
        console.log('Sending email failed', error);
    } else {
        console.log('Email sent successfully');
    }
  });
}