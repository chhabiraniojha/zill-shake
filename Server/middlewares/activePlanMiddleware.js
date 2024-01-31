const { connection } = require("../sql/connection")

const activePlanMiddleware = (req, res, next) => {
    try {
        const { user } = req
        connection.query(`SELECT * FROM users_plan WHERE user_id = ?`, [user.id], (err, result) => {
            if(err) {       
                return res
                .status(400)
                .json({
                    success: false,
                    message: "Failed to fetch user's active plans"
                })
            }

            req['user'] = {
                ...user,
                plans: result
            }

            next()
        })
    } catch (error) {
        res
        .status(500)
        .json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

module.exports = activePlanMiddleware