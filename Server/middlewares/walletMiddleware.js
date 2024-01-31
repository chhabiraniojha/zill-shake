const { connection } = require("../sql/connection")

const walletInfoMiddleware = (req, res, next) => {
    try {
        const { user } = req
        connection.query(`SELECT * FROM wallet WHERE id = ?`, [user.wallet_id], (err, result) => {
            if(err) {
                return res
                .status(400)
                .json({
                    success: false,
                    message: "Failed to fetch user's wallet info"
                })
            }

            req['user'] = {
                ...user,
                wallet: result?.[0]
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

module.exports = walletInfoMiddleware