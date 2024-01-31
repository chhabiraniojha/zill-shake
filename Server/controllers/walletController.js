const { connection } = require("../sql/connection")
const { v4: uuid } = require('uuid')

const getWalletInfo = (req, res) => {
    try {
        const { user } = req
        const walletId = user.wallet_id
        connection.query(`SELECT * FROM wallet WHERE id = ?`, [walletId], (err, results) => {
            if(err) {
                return res.status(404)
                .json({
                    success: false,
                    message: "No wallet found associated to this user",
                })
            }

            res.json({
                success: true,
                message: "Successfully fetched user's wallet",
                result: results?.[0]
            })
        })
    } catch (error) {
        console.log(error)
        res
        .status(500)
        .json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const addAmount = (req, res) => {
    try {
        const { user } = req
        const { amount } = req.body ?? {}

        if(!amount) {
            return res
            .status(400)
            .json({
                success: false,
                message: "Missing field 'amount'"
            })
        }

        const walletId = user.wallet_id
        const userId = user.id
        const transactionId = uuid()
        connection.query(`INSERT INTO transactions (id, amount, wallet_id, user_id, status) VALUES (?, ?, ?, ?, ?)`, [transactionId, amount, walletId, userId, 'pending'], (err, results) => {
            if(err) {
                console.log(err)
                return res
                .status(400)
                .json({
                    success: false,
                    message: "Failed to transact amount"
                })
            }

            res
            .json({
                success: true,
                message: "Transaction successfull",
                result: results
            })
        })
    } catch (error) {
        console.log(error)
        res
        .status(500)
        .json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

module.exports = {
    getWalletInfo,
    addAmount,
}