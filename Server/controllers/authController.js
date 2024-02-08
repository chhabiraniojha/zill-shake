const { Request, Response } = require("express");
const { connection } = require("../sql/connection");
const { v4: uuid } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verifyOTP } = require("./otp");


/**
 *
 * @param { Request } req
 * @param { Response } res
 */
const registerUser = async (req, res) => {
	try {
		const { phone, password, invite_code } = req.body ?? {};
		console.table(req.body);

		if (!phone || !password) {
			return res.status(400).json({
				success: false,
				message: "Missing field valid fields are phone, password and inviteCode <- optional",
			});
		}

		// Check if the phone number is already registered
		connection.query(`SELECT * FROM users WHERE phone = ?`, [phone], async (err, results) => {
			if (err) {
				console.log(err);
				return res.status(400).json({
					success: false,
					message: "Failed to check phone number",
				});
			}

			if (results.length > 0) {
				return res.status(400).json({
					success: false,
					message: "Phone number already registered",
				});
			}

			connection.query("SELECT * FROM users WHERE refferal_code = ?", [invite_code], async (err, results) => {
				if (err) {
					console.log(err);
					return res.status(400).json({
						success: false,
						message: "Failed to check invite code",
					});
				}

				if (results.length === 0) {
					return res.status(400).json({
						success: false,
						message: "Invalid invite code",
					});
				}

				const id = uuid();
				const walletId = uuid();
				const hashedPassword = await bcrypt.hash(password, 10);

				// First, insert the record into the wallet table
				connection.query(`INSERT INTO wallet (id, user_id) VALUES (?, ?)`, [walletId, id], (err) => {
					if (err) {
						console.log(err);
						return res.status(400).json({
							success: false,
							message: "Failed to create wallet",
						});
					}

					const query = `INSERT INTO users (id, password, phone, invite_code, wallet_id, refferal_code) VALUES (?, ?, ?, ?, ?, ?)`;
					connection.query(query, [id, hashedPassword, phone, invite_code, walletId, phone], (err, results) => {
						if (err) {
							console.log(err);
							return res.status(400).json({
								success: false,
								message: "Failed to register user",
							});
						}

						connection.query(`UPDATE users SET total_refferals = total_refferals + 1 WHERE refferal_code = ?`, [invite_code]);

						res.json({
							success: true,
							message: "Successfully registered",
						});
					});
				});
			});
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: "Internal Server Error",
		});
	}
};

/**
 *
 * @param { Request } req
 * @param { Response } res
 */
const loginUser = async (req, res) => {
	try {
		const { phone, password } = req.body ?? {};
		console.table({ phone, password });

		if (!phone || !password) {
			return res.status(400).json({
				success: false,
				message: "Missing fields",
			});
		}

		connection.query(`SELECT * FROM users WHERE phone= ?`, [phone], async (err, results) => {
			if (err) {
				console.log(err);
				return res.status(400).json({
					success: false,
					message: "Failed to login user",
				});
			}

			if (results.length === 0) {
				return res.status(404).json({
					success: false,
					message: "Phone number is not registered pls sign up first",
				});
			}

			const checkPassword = await bcrypt.compare(password, results?.[0]?.password);

			if (!checkPassword) {
				return res.status(401).json({
					success: false,
					message: "Incorrect password",
				});
			}

			const token = jwt.sign(JSON.stringify(results?.[0]), process.env.JWT_SECRET);

			connection.query(`UPDATE users SET last_login = ? WHERE id = ?`, [Date.now(), results[0].id]);

			res.cookie("token", token, {
				maxAge: 1000 * 60 * 60 * 24 * 7,
			}).json({
				success: true,
				message: "Successfully logged in user",
				result: results?.[0],
			});
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: "Internal Server Error",
		});
	}
};

const resetPassword = async (req, res) => {
	try {
		const { phone, password, otp } = req.body ?? {};
		
		// check otp
		const result = await verifyOTP(phone, otp);
		console.log(result)

		if (!result) {
			return res.status(400).json({
				success: false,
				message: "Invalid OTP",
			});
		}

		console.table({ phone, password });

		if (!phone || !password) {
			return res.status(400).json({
				success: false,
				message: "Missing fields",
			});
		}

		connection.query(`SELECT * FROM users WHERE phone = ?`, [phone], async (err, results) => {
			if (err) {
				console.log(err);
				return res.status(400).json({
					success: false,
					message: "Failed to check phone number",
				});
			}

			if (results.length === 0) {
				return res.status(404).json({
					success: false,
					message: "Phone number not registered",
				});
			}

			const hashedPassword = await bcrypt.hash(password, 10);
			connection.query(`UPDATE users SET password = ? WHERE phone = ?`, [hashedPassword, phone], (err, results) => {
				if (err) {
					console.log(err);
					return res.status(400).json({
						success: false,
						message: "Failed to reset password",
					});
				}

				res.json({
					success: true,
					message: "Successfully reset password",
				});
			});
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: "Internal Server Error",
		});
	}
}

module.exports = {
	registerUser,
	loginUser,
	resetPassword
};
