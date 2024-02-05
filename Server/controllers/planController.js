const {connection} = require('../sql/connection');

const getPlan = async (req, res) => {
    try {
        const { planId } = req.params ?? {}

        if(!planId) {
            return res.status(400).json({ status: false, message: 'Missing field \'planId\'' })
        }

        const query = `SELECT * FROM plans WHERE id = ?`;
        connection.query(query, [planId], (err, result) => {
            if(err) {
                return res.status(400).json({ status: false, message: 'Failed to fetch plan' })
            }

            res.json({ status: true, message: 'Successfully fetched plan', result: result?.[0] })
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error', reason: error.message });
    }
};

module.exports = {
    getPlan
};
