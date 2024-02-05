const { connection } = require("../sql/connection")
const { v4: uuid } = require('uuid')

const getIssueList = async (req, res) => {
	try {
		connection.query("SELECT * FROM issues", (err, result) => {
			if (err) {
				console.log(err);
				return res.status(400).json({
					success: false,
					message: "Failed to fetch issues",
				});
			}

			res.json({
				success: true,
				message: "Successfully fetched issues",
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

const addSupportIssue = async (req, res) => {
	try {
		const { user } = req
		const { issue, issue_id, note, other_id } = req.body;
		connection.query(
			"INSERT INTO support (id, issue_id, issue, note, user_id, other_id) VALUES (?, ?, ?, ?, ?, ?)",
			[uuid(), issue_id, issue, note, user.id, other_id],
			(err, result) => {
				if (err) {
					console.log(err);
					return res.status(400).json({
						success: false,
						message: "Failed to add issue",
					});
				}

				res.json({
					success: true,
					message: "Successfully added issue",
					result,
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
}

module.exports = {
    getIssueList,
	addSupportIssue
};