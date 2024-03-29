const twilio = require("twilio");
const { connection } = require("../sql/connection");

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const serviceSid = process.env.TWILIO_SERVICE_SID;

const sendOTP = (req, res) => {
	const { phoneNumber } = req.body;
	const phoneWithOutCountryCode = phoneNumber.replace("+91", "");
	connection.query("Select * from users where phone = ?", [phoneWithOutCountryCode], (err, result) => {
		if (err) {
			console.log("db",err);
			return res.status(500).json({ message: "Failed to send OTP" });
		}
		if (result.length === 0){
			console.log("isse error aa rha hai", err);
			return res.status(500).json({ message: "phone number is not registered" });
		}

		client.verify.v2
			.services(serviceSid)
			.verifications.create({ to: phoneNumber, channel: "sms" })
			.then(() => {
				res.status(200).json({ message: "OTP sent successfully" });
			})
			.catch((error) => {
				console.log('error twilio se aa rha hai',error)
				res.status(500).json({ error: "Failed to send OTP" });
			});
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
	res.send("hi there something");
};

module.exports = {
	sendOTP,
	verifyOTP,
	resendOTP,
};
