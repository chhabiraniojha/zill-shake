const mysql = require('mysql2')

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

connection.on('connection', (connection) => {
    console.log('mysql connected')
})

connection.on('error', (err) => {
    console.log('mysql error', err)
})

module.exports = {
    connection
}