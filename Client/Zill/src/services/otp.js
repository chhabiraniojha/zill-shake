

// Function to send OTP
async function sendOtp(phoneNumber) {
  
}


// Function to verify OTP
async function verifyOtp(confirmationResult, code) {
	try {
		const result = await confirmationResult.confirm(code);
    return result
	} catch (error) {
		console.error("Error during OTP verification: ", error);
		return null;
	}
}

export { sendOtp, verifyOtp };
