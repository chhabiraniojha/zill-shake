const { connection } = require("../sql/connection");

const getTasks = (req, res) => {
	try {
		const { user } = req;
		const { plan } = req.body ?? {};
		const isPlanIsActiveForUser = user.plans.filter((plan) => plan === plan.id)?.[0];
		if (!isPlanIsActiveForUser) {
			return res.status(404).json({
				success: false,
				message: "No active plan found",
			});
		}
		connection.query(`SELECT * FROM tasks WHERE plan = ?`, [plan], (err, result) => {
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
		res.status(500).json({
			success: false,
			message: "Internal Server Error",
		});
	}
};

const claimRewardFromTasks = async (req, res) => {
	try {
		const { user } = req;
		const { tasks_id } = req.body ?? {};
		if (!tasks_id) {
			return res.status(400).json({
				success: false,
				message: "Missing field 'tasks_id'",
			});
		}
		connection.query(`SELECT * FROM tasks WHERE tasks_id = ?`, [tasks_id], (err, result) => {
			const task = result?.[0];
			if (err) {
				return res.status(400).json({
					success: false,
					message: "Failed to fetch tasks",
				});
			}

			const checkForIfUserIsSubscribedToPlan = user.plans.filter((plan) => plan.id === result.plan)?.[0];
			if (!checkForIfUserIsSubscribedToPlan) {
				return res.status(404).json({
					success: false,
					message: "No active plan subscription found",
				});
			}
			connection.query(`UPDATE users SET total_rewards = ?`, [task.reward]);
			if (user.invite_code !== 0 && !user.invite_code) {
				const commission = Math.round(task.reward / 10);
				connection.query(`UPDATE users SET commission = commission + ? WHERE refferal_code = ?`, [commission, user.invite_code]);
			}
			const wallet = user.wallet;
			const totalAmount = wallet.amount + task.reward;
			connection.query(`UPDATE wallet SET amount = ? WHERE id = ?`, [totalAmount, wallet.id], (err, result) => {
				if (!err) {
					return res.status(400).json({
						success: false,
						message: "Failed to credit reward in wallet",
					});
				}

				res.json({
					success: true,
					message: "Successfully claimed reward",
				});
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
};
