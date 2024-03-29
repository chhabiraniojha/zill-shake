const { connection } = require("../sql/connection");
const { v4: uuid } = require("uuid");
const express = require('express')


const getMe = (req, res) => {
	try {
		const { user } = req;
		const userId = user.id;
		connection.query(`SELECT * FROM users WHERE id = ?`, [userId], (err, results) => {
			if (err) {
				return res.status(400).json({
					success: false,
					message: "Failed to fetch user",
				});
			}

			const user = results[0];
			res.json({
				success: true,
				message: "Successfully fetched your info",
				result: user,
			});
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
		const { plan_id, transaction_hash } = req.body ?? {};
		if (
			plan_id !== "bronze" &&
			plan_id !== "copper" &&
			plan_id !== "silver" &&
			plan_id !== "diamond" &&
			plan_id !== "gold" &&
			plan_id !== "platinum" &&
			plan_id !== "vip" &&
			!plan_id
			&& !transaction_hash
		) {
			return res.status(400).json({
				success: false,
				message: "Missing field 'plan_id' or 'transaction_hash'",
			});
		}

		connection.query(`SELECT * FROM orders WHERE user_id = ? AND plan = ? AND status = ? AND tag = ?`, [user.id, plan_id, 'pending', 'buy'], (err, result) => {
			if (err) {
				return res.status(400).json({
					success: false,
					message: "Failed to fetch orders",
				});
			}


			if (result.length > 0) {
				return res.status(400).json({
					success: false,
					message: `Already order is in ${result[0].status} status`,
				});
			}

			connection.query(`SELECT * FROM plans WHERE id = ?`, [plan_id], (err, result) => {
				if (err) {
					return res.status(400).json({
						success: false,
						message: "Failed to fetch plan",
					});
				}
				const plan = result?.[0];
				connection.query(
					"INSERT INTO orders (id, user_id, transaction_hash, amount, status, plan, tag) VALUES (?, ?, ?, ?, ?, ?, ?)",
					[uuid(), user.id, transaction_hash, plan.amount, "pending", plan_id, 'buy'],
					(err, result) => {
						if (err) {
							console.log(err);
							return res.status(400).json({
								success: false,
								message: "Failed to add plan",
							});
						}

						res.json({
							success: true,
							message: "Plan Buying Request Sent. Plan will Be activated within 24 Hours",
						});
					}
				);
			});
		});
	} catch (error) {
		console.log(error)
		res.status(500).json({
			success: false,
			message: "Internal Server Error",
		});
	}
};

const terminatePlan = (req, res) => {
	try {
		const { user } = req;
		const { plan } = req.params ?? {};
		const { wallet_address } = req.body ?? {};
		const userId = user.id;
		console.log(plan)
		if (!plan || !wallet_address) {
			return res.status(400).json({
				success: false,
				message: "Missing field plan or wallet_address",
			});
		}

		connection.query("SELECT * FROM users_plan WHERE user_id = ? AND plan_id = ?", [userId, plan], (err, result) => {
			if (err) {
				return res.status(400).json({
					success: false,
					message: "Failed to fetch plan",
				});
			}

			if (result.length === 0) {
				return res.status(404).json({
					success: false,
					message: "No plan found",
				});
			}

			connection.query(
				"INSERT INTO orders (id, user_id, wallet_address, amount, status, tag,plan) VALUES (?, ?, ?, ?, ?, ?,?)",
				[uuid(), user.id, wallet_address, result[0].amount, "pending", 'terminate',plan],
				(err, result) => {
					if (err) {
						return res.status(400).json({
							success: false,
							message: "Failed to terminate plan",
						});
					}

					res.json({
						success: true,
						message: "Successfully terminated plan",
					});
				}
			);
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
		const limit = 10; // Default limit is 10, can be changed as per requirement
		const page = Number(req.query.page) || 1; // Default page is 1, can be changed as per requirement

		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;

		const countQuery = `SELECT COUNT(*) as total FROM orders WHERE user_id = ?`;
		const selectQuery = `SELECT * FROM orders WHERE user_id = ? LIMIT ?, ?`;

		connection.query(countQuery, [user.id], (err, countResult) => {
			if (err) {
				return res.status(400).json({
					success: false,
					message: "Cannot fetch order count",
				});
			}


			const totalOrders = countResult[0].total;
			const totalPages = Math.ceil(totalOrders / limit);

			connection.query(selectQuery, [user.id, startIndex, endIndex], (err, result) => {
				if (err) {
					return res.status(400).json({
						success: false,
						message: "Cannot fetch orders",
					});
				}

				res.json({
					success: true,
					message: "Orders fetched successfully",
					result,
					totalPages,
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

const myWallet = async (req, res) => {
	try {
		const { user } = req;
		connection.query(`SELECT * FROM wallet WHERE id = ?`, [user.wallet_id], (err, result) => {
			if (err) {
				return res.status(400).json({
					success: false,
					message: "Cannot fetch wallet info",
				});
			}

			res.json({
				success: true,
				message: "Successfully fecthed wallet info",
				result: result?.[0],
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

const myTransactions = (req, res) => {
	try {
		const { user } = req;
		const { pageNumber, pageOffset } = req.query;
		const limit = 10; // Number of transactions per page

		const startIndex = (Number(pageNumber) - 1) * limit;
		const endIndex = Number(pageNumber) * limit;
		

		connection.query(`SELECT COUNT(*) as total FROM transactions WHERE user_id = ?`, [user.id], (err, countResult) => {
			if (err) {
				console.log(err)
				return res.status(400).json({
					success: false,
					message: "Failed to fetch transactions",
				});
			}

			const totalTransactions = countResult[0].total;
			const totalPages = Math.ceil(totalTransactions / limit);

			connection.query(`SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC LIMIT ?, ?`, [user.id, startIndex, limit], (err, result) => {
				if (err) {
					return res.status(400).json({
						success: false,
						message: "Failed to fetch transactions",
					});
				}

				res.json({
					success: true,
					message: "Successfully fetched transactions",
					result,
					totalPages
				});
			});
		});
	} catch (error) {
		res.json({
			success: false,
			message: "Internal Server Error",
			result,
		});
	}
};

const mySubordinates = (req, res) => {
	try {
		const { user } = req;
		connection.query("SELECT phone FROM users WHERE invite_code = ?", [user.refferal_code], (err, result) => {
			if (err) {
				return res.status(400).json({
					success: false,
					message: "Failed to fetch subordinates",
				});
			}

			res.json({
				success: true,
				message: "Successfully fetched subordinates",
				result,
			});
		});
	} catch (error) {
		res.json({
			success: false,
			message: "Internal Server Error",
			result,
		});
	}
};

const getTodaysCommissionData = (req, res) => {
	try {
		const { user } = req;
		connection.query(
			"SELECT phone, SUM(commission) AS totalCommission, SUM(reward) AS totalReward, COUNT(*) AS totalCommissions FROM claimed_rewards WHERE DATE(created_at) = CURDATE() AND invite_code = ? GROUP BY phone",
			[user.refferal_code],
			(err, result) => {
				if (err) {
					console.log(err);
					return res.status(400).json({
						success: false,
						message: "Failed to fetch commissions",
					});
				}

				res.json({
					success: true,
					message: "Successfully fetched commissions",
					result: result,
				});
			}
		);
	} catch (error) {
		res.json({
			success: false,
			message: "Internal Server Error",
		});
	}
};

const getTotalCommissionEarned = (req, res) => {
	try {
		const { user } = req;
		connection.query(
			"SELECT SUM(commission) AS totalCommission, COUNT(*) AS totalCommissions FROM claimed_rewards WHERE invite_code = ?",
			[user.refferal_code],
			(err, result) => {
				if (err) {
					console.log(err);
					return res.status(400).json({
						success: false,
						message: "Failed to fetch commissions",
					});
				}

				const { totalCommission, totalCommissions } = result[0];

				res.json({
					success: true,
					message: "Successfully fetched commissions",
					totalCommission,
					totalCommissions,
				});
			}
		);
	} catch (error) {
		res.json({
			success: false,
			message: "Internal Server Error",
		});
	}
};

const totalSpentInLifeTime = (req, res) => {
	const { user } = req;
	try {
		connection.query("SELECT SUM(amount) AS totalSpent FROM orders WHERE user_id = ? AND status = ?", [user.id, "confirm"], (err, result) => {
			if (err) {
				console.log(err);
				return res.status(400).json({
					success: false,
					message: "Failed to fetch total spent",
				});
			}

			const { totalSpent } = result[0];

			res.json({
				success: true,
				message: "Successfully fetched total spent",
				totalSpent,
			});
		});
	} catch (error) {
		res.json({
			success: false,
			message: "Internal Server Error",
		});
	}
};

const withDrawBalance = (req, res) => {
	try {
		const { user } = req;
		const { amount, wallet_address }  = req.body ?? {}

		if(!amount || !wallet_address) {
			return res.status(400).json({
				success: false,
				message: "Missing field 'amount' or 'wallet_address'"
			})
		}

		connection.query(`SELECT * FROM wallet WHERE id = ?`, [user.wallet_id], (err, result) => {
			if (err) {
				console.log(err);
				return res.status(400).json({
					success: false,
					message: "Failed to fetch wallet",
				});
			}

			if(result?.[0].amount < amount) {
				return res.status(400).json({
					success: false,
					message: "Insufficient balance",
				});
			}

			connection.query(`UPDATE wallet SET amount = amount - ? WHERE id = ?`, [amount, user.wallet_id], (err, result) => {
				if (err) {
					console.log(err)
					console.log(err);
					return res.status(400).json({
						success: false,
						message: "Failed to update wallet",
					});
				}

				connection.query(`INSERT INTO transactions (id, amount, user_id, status, wallet_address, tag) VALUES (?, ?, ?, ?, ?, ?)`, [uuid(), amount, user.id, 'pending', wallet_address, 'withdraw'], (err, result) => {
					if (err) {
						console.log(err);
						return res.status(400).json({
							success: false,
							message: "Failed to add transaction",
						});
					}

					res.json({
						success: true,
						message: "Successfully added transaction",
					});
				});
			});
		});
	} catch (error) {
		res.json({
			success: false,
			message: "Internal Server Error",
		});
	}
}

const lifeTimeComissionEarned = (req, res) => {
	const { user } = req;
	try {
		connection.query("SELECT SUM(commission) AS totalCommission FROM claimed_rewards WHERE invite_code = ?", [user.refferal_code], (err, result) => {
			if (err) {
				console.log(err);
				return res.status(400).json({
					success: false,
					message: "Failed to fetch commissions",
				});
			}

			const { totalCommission } = result[0];

			res.json({
				success: true,
				message: "Successfully fetched commissions",
				totalCommission,
			});
		});
	} catch (error) {
		res.json({
			success: false,
			message: "Internal Server Error",
		});
	}
}

const lifeTimeWalletCredited = (req, res) => {
	const { user } = req
	try {
		connection.query('SELECT SUM(amount) AS totalCredited FROM transactions WHERE user_id = ? AND status = ? AND tag = ?', [user.id, 'success', 'withdraw'], (err, result) => {
			if(err) {
				console.log(err)
				return res.status(400).json({
					success: false,
					message: "Failed to fetch credited amount"
				})
			}

			const { totalCredited } = result[0]

			res.json({
				success: true,
				message: "Successfully fetched credited amount",
				totalCredited
			})
		}
		)
	} catch (error) {
		console.log(error)
		res.json({
			success: false,
			message: "Internal Server Error"
		})
	}
}

/**
 * @param { express.Request } req
 * @param { express.Response } res
 */

const logout = (req, res) => {
	try {
		res.clearCookie("token");
		res.json({
			success: true,
			message: "Successfully logged out",
		});
	} catch (error) {
		console.log(error);
		res.json({
			success: false,
			message: "Internal Server Error",
		});
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
	mySubordinates,
	getTodaysCommissionData,
	getTotalCommissionEarned,
	totalSpentInLifeTime,
	withDrawBalance,
	lifeTimeComissionEarned,
	lifeTimeWalletCredited,
	logout
};
