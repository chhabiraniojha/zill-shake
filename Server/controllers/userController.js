const { connection } = require("../sql/connection");
const { v4: uuid } = require("uuid");

const getMe = (req, res) => {
	try {
		const { user } = req;
		res.json({
			success: true,
			message: "Successfully fetched your info",
			result: user,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal Server Error",
		});
	}
};

const myActivePlans = (req, res) => {
	try {
		const { user } = req;
		const userId = user.id;
		connection.query(`SELECT * FROM users_plan WHERE user_id = ?`, [userId], (err, results) => {
			if (err) {
				return res.status(400).json({
					success: false,
					message: "Failed to fetch your plans",
				});
			}

			res.json({
				success: true,
				message: "Successfully fetched plans",
				result: results,
			});
		});
	} catch (error) {
		if (error) {
			return res.status(500).json({
				success: false,
				message: "Internal Server Error",
			});
		}
	}
};

const addPlan = (req, res) => {
	try {
		const { user } = req;
		const { plan_id } = req.body ?? {};
		if (
			plan_id !== "bronze" &&
			plan_id !== "copper" &&
			plan_id !== "silver" &&
			plan_id !== "diamond" &&
			plan_id !== "gold" &&
			plan_id !== "platinum" &&
			plan_id !== "vip" &&
			!plan_id
		) {
			return res.status(400).json({
				success: false,
				message: "Missing field 'plan_id'",
			});
		}
		const walletId = user.wallet_id;

		connection.query(`SELECT * FROM plans WHERE id = ?`, [plan_id], (err, results) => {
			const plan = results?.[0];
			if (err) {
				return res.status(400).json({
					success: false,
					message: "Failed to fetch wallet details",
				});
			}

			const wallet = user.wallet;
			if (wallet.amount < plan.amount) {
				return res.status(400).json({
					success: false,
					message: "Insufficient wallet amount",
				});
			}

			const totalWalletAmount = wallet.amount - plan.amount;
			console.log(totalWalletAmount);
			connection.query(`UPDATE wallet SET amount = ? WHERE id = ?`, [totalWalletAmount, walletId], (err, results) => {
				if (err) {
					console.log(err);
					return res.status(400).json({
						success: false,
						message: "Failed to deduct amount from wallet",
					});
				}

				connection.query(
					`INSERT INTO users_plan (user_id, plan_id, status, name) VALUES (?, ?, ?, ?)`,
					[user.id, plan_id, "active", plan_id],
					(err, results) => {
						if (err) {
							console.log(err);
							return res.status(400).json({
								success: false,
								message: "Failed to activate plan for user",
							});
						}

						const orderId = uuid();
						connection.query(`INSERT INTO orders (id, amount, user_id) VALUES (?, ?, ?)`, [orderId, plan.amount, user.id]);

						res.json({
							success: true,
							message: "Successfully plan activated",
						});
					}
				);
			});
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal Server Error",
		});
	}
};

const terminatePlan = (req, res) => {
	try {
		const { user } = req;
		const { plan_id } = req.body ?? {};
		const userId = user.id;
		if (!plan_id) {
			return res.status(400).json({
				success: false,
				message: "Missing field plan_id",
			});
		}
		connection.query(`DELETE FROM users_plan WHERE user_id = ? AND plan_id = ?`, [userId, plan_id], (err, results) => {
			if (err) {
				res.status(400).json({
					success: false,
					message: "Failed to terminate plan",
				});
			}

			res.json({
				success: true,
				message: "Successfully plan terminated",
			});
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal Server Error",
		});
	}
};

const getOrders = (req, res) => {
	try {
		const { user } = req;
		connection.query(`SELECT * FROM orders WHERE user_id = ?`, [user.id], (err, result) => {
			if (err) {
				return res.status(400).json({
					success: false,
					message: "Cannot fetch order's",
				});
			}

			res.json({
				success: true,
				message: "Order's fetched successfully",
				result,
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

const myWallet = async (req, res) => {
	try {
		const { user } = req;
		console.log(user.id)
		connection.query(`SELECT * FROM wallet WHERE id = ?`, [user.wallet_id], (err, result) => {
			if (err) {
				return res.status(400).json({
					success: false,
					message: "Cannot fetch wallet info",
				});
			}

			res
			.json({
				success: true,
				message: "Successfully fecthed wallet info",
				result: result?.[0]
			})
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: "Internal Server Error",
		});
	}
};

const myTransactions = (req, res) => {
	try {
		const { user } = req
		connection.query(`SELECT * FROM transactions WHERE user_id = ?`, [user.id], (err, result) => {
			if(err) {
				return res
				.status(400)
				.json({
					success: false,
					message: "Failed to fetch transactions"
				})
			}

			res
			.json({
				success: true,
				message: "Successfully fetched transaction's",
				result
			})
		})
	} catch (error) {
		res
		.json({
			success: false,
			message: "Internal Server Error",
			result
		})
	}
}

const mySubordinates = (req, res) => {
	try {
		const { user } = req
		connection.query(`SELECT * FROM users WHERE invite_code = ?`, [user.refferal_code], (err, result) => {
			if(err) {
				return res
				.status(400)
				.json({
					success: false,
					message: "Failed to fetch subordinates"
				})
			}

			res
			.json({
				success: true,
				message: "Successfully fetched subordinates",
				result
			})
		})
	} catch (error) {
		res
		.json({
			success: false,
			message: "Internal Server Error",
			result
		})
	}
}

module.exports = {
	getMe,
	addPlan,
	myActivePlans,
	terminatePlan,
	getOrders,
	myWallet,
	myTransactions,
	mySubordinates
};
