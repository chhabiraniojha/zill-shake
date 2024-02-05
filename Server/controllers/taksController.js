const { connection } = require("../sql/connection");
const { v4: uuid } = require("uuid");

const getTasks = (req, res) => {
	try {
		const { user } = req;
		const { planId } = req.params ?? {};
		const isPlanIsActiveForUser = user.plans.filter((item, i) => planId === item.plan_id)?.[0];
		if (!isPlanIsActiveForUser) {
			return res.status(404).json({
				success: false,
				message: "No active plan found",
			});
		}
		connection.query(`SELECT * FROM tasks WHERE plan = ?`, [planId], (err, result) => {
			if (err) {
				return res.status(400).json({
					success: false,
					message: "Successfully tasks fetched",
				});
			}

			res.json({
				success: true,
				message: "Successfully fetched plans",
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

const claimRewardFromTasks = async (req, res) => {
	try {
		const { user } = req;
		let { taskId, planId } = req.params ?? {};
		taskId = Number(taskId);
		console.log(user);
		if (!taskId || !planId) {
			return res.status(400).json({
				success: false,
				message: "Missing field 'tasks_id' or 'plan_id' in params",
			});
		}

		// check if already claimed
		connection.query(
			"SELECT * FROM claimed_rewards WHERE phone = ? AND plan = ? AND task = ? AND DATE(created_at) = CURDATE()",
			[user.phone, planId, taskId],
			(err, result) => {
				if (err) {
					console.log(err);
					return res.status(400).json({
						success: false,
						message: "Failed to fetch claimed rewards",
					});
				}

				if (result.length > 0) {
					return res.status(400).json({
						success: false,
						message: "Reward already claimed",
					});
				}

				// Fetch task
				connection.query(`SELECT * FROM tasks WHERE id = ?`, [taskId], (err, result) => {
					const task = result?.[0];
					console.log(task);
					if (err) {
						console.log(err);
						return res.status(400).json({
							success: false,
							message: "Failed to fetch tasks",
						});
					}

					// Check if user is subscribed to the plan
					const checkForIfUserIsSubscribedToPlan = user.plans.filter((plan) => plan.plan_id === task.plan)?.[0];
					console.log(checkForIfUserIsSubscribedToPlan);
					if (!checkForIfUserIsSubscribedToPlan) {
						return res.status(404).json({
							success: false,
							message: "No active plan subscription found",
						});
					}

					// Fetch plan
					connection.query("SELECT * FROM plans WHERE id = ?", [planId], (err, result) => {
						const plan = result?.[0];
						if (err) {
							console.log(err);
							return res.status(400).json({
								success: false,
								message: "Failed to fetch plan",
							});
						}

						// Commission
						const commission = (task.reward * plan.commission_percentage) / 100;
						console.log(commission);

						// Add reward to claimed_rewards
						connection.query(
							"INSERT INTO claimed_rewards (id, task, reward, status, invite_code, plan, commission, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
							[uuid(), task.id, task.reward, "claimed", user.invite_code, planId, commission, user.phone],
							(err, result) => {
								if (err) {
									console.log(err);
									return res.status(400).json({
										success: false,
										message: "Failed to add reward",
									});
								}

								// Add reward transaction to user's transaction
								connection.query(
									"INSERT INTO transactions (id, user_id, amount, tag, status) VALUES (?, ?, ?, ?, ?)",
									[uuid(), user.id, task.reward, "reward", "success"],
									(err, result) => {
										if (err) {
											console.log(err);
											return res.status(400).json({
												success: false,
												message: "Failed to add reward",
											});
										}

										// Add reward to user's wallet
										connection.query("UPDATE wallet SET amount = amount + ? WHERE id = ?", [task.reward, user.wallet_id], (err, result) => {
											if (err) {
												console.log(err);
												return res.status(400).json({
													success: false,
													message: "Failed to add reward",
												});
											}

											// fetch refferal user
											connection.query("SELECT * FROM users WHERE refferal_code = ?", [user.invite_code], (err, result) => {
												const refferal = result?.[0];
												if (err) {
													console.log(err);
													return res.status(400).json({
														success: false,
														message: "Failed to fetch refferal",
													});
												}

												if (!refferal) {
													return res.json({
														success: true,
														message: "Successfully added reward But no refferal found",
														result,
													});
												}

												// Add commission transaction to refferal's transaction's
												connection.query(
													"INSERT INTO transactions (id, user_id, amount, tag, status) VALUES (?, ?, ?, ?, ?)",
													[uuid(), refferal.id, commission, "commission", "success"],
													(err, result) => {
														if (err) {
															console.log(err);
															return res.status(400).json({
																success: false,
																message: "Failed to add reward",
															});
														}

														// Add commission to refferals wallet
														connection.query(
															"UPDATE wallet SET amount = amount + ? WHERE id = ?",
															[commission, refferal.wallet_id],
															(err, result) => {
																if (err) {
																	console.log(err);
																	return res.status(400).json({
																		success: false,
																		message: "Failed to add reward",
																	});
																}

																res.json({
																	success: true,
																	message: "Successfully added reward",
																	result,
																});
															}
														);
													}
												);
											});
										});
									}
								);
							}
						);
					});
				});
			}
		);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: "Internal Server Error",
		});
	}
};

const claimedRewards = async (req, res) => {
	try {
		const { user } = req;
		const { planId } = req.params ?? {};
		if (!planId) {
			return res.status(400).json({
				success: false,
				message: "Missing field 'plan_id' in params",
			});
		}
		connection.query(`SELECT * FROM claimed_rewards WHERE phone = ? AND plan = ? AND DATE(created_at) = CURDATE()`, [user.phone, planId], (err, result) => {
			if (err) {
				console.log(err);
				return res.status(400).json({
					success: false,
					message: "Failed to fetch claimed rewards",
				});
			}

			res.json({
				success: true,
				message: "Successfully fetched claimed rewards",
				result,
			});
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal Server Error",
		});
	}
};

module.exports = {
	getTasks,
	claimRewardFromTasks,
	claimedRewards,
};
