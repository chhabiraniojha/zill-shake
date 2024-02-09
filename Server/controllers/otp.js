const twilio = require("twilio");

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const serviceSid = process.env.TWILIO_SERVICE_SID;

const sendOTP = (req, res) => {
	const { phoneNumber } = req.body;

	client.verify.v2
		.services(serviceSid)
		.verifications.create({ to: phoneNumber, channel: "sms" })
		.then(() => {
			res.status(200).json({ message: "OTP sent successfully" });
		})
		.catch((error) => {
			res.status(500).json({ error: "Failed to send OTP" });
		});
};

const verifyOTP = async (phoneNumber, otp) => {
	return client.verify.v2
		.services(serviceSid)
		.verificationChecks.create({ to: phoneNumber, code: otp })
		.then((verification_check) => {
			if (verification_check.status === "approved") {
				return true;
			} else {
				return false;
			}
		})
		.catch((error) => {
			console.error(error);
			return false;
		});
};

const resendOTP = (req, res) => {
	const { phoneNumber } = req.body;

	client.verify.v2
		.services(serviceSid)
		.verifications.create({ to: phoneNumber, channel: "sms" })
		.then(() => {
			res.status(200).json({ message: "New OTP sent successfully" });
		})
		.catch((error) => {
			res.status(500).json({ error: "Failed to send new OTP" });
		});
};

module.exports = {
	sendOTP,
	verifyOTP,
	resendOTP,
};