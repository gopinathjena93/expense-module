const nodemailer = require('nodemailer');
const sendEmail = async (toMailId, subject, text) => {
	const transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'gopinathjena93@gmail.com',
			pass: 'bapunijali2020'
		}
	});

	const mailOptions = {
		from: 'gopinathjena93@gmail.com',
		to: toMailId,
		subject: subject,
		text: text
	};
	try {
		await transporter.sendMail(mailOptions);
		console.log('Email sent successfully.');
	} catch (error) {
		console.error('Error sending email:', error);
	}
};

module.exports = { sendEmail };