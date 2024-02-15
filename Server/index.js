require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// routes
const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");
const walletRouter = require("./routes/walletRoute");
const tasksRouter = require("./routes/tasksRoute");
const planRouter = require("./routes/planRoute");
const supportRouter = require("./routes/supportRoute");
const otpRouter = require("./routes/otpRoute");
const { connection } = require("./sql/connection");

// db
require("./sql/connection");

const port = 80;

const app = express();

app.use(bodyParser.json({extended:false}));
app.use(cookieParser(process.env.JWT_SECRET));

app.use(
	cors({
		origin: "https://zillmoney.in",
		credentials: true,
	})
);
// origin: "http://localhost:5173",
// origin: "https://zillmoney.in",




// routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/wallet", walletRouter);
app.use("/api/tasks", tasksRouter);
app.use("/api/plan", planRouter);
app.use("/api/support", supportRouter);
app.use("/api/otp", otpRouter);

// models

const tables = [
	`CREATE TABLE IF NOT EXISTS claimed_rewards (
      id varchar(255) NOT NULL,
      plan varchar(255) NOT NULL,
      task varchar(255) NOT NULL,
      reward decimal(10,5) NOT NULL,
      created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      status varchar(255) NOT NULL,
      invite_code int NOT NULL,
      commission decimal(10,5) NOT NULL,
      phone varchar(255) NOT NULL,
      PRIMARY KEY (id)
    )`,
	`CREATE TABLE IF NOT EXISTS issues (
      name varchar(255) NOT NULL,
      id int NOT NULL AUTO_INCREMENT,
      slug varchar(255) NOT NULL,
      PRIMARY KEY (id)
    )`,
	`CREATE TABLE IF NOT EXISTS orders (
      id varchar(255) NOT NULL,
      created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      amount decimal(10,5) NOT NULL,
      status enum('pending','terminated','confirm') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'pending',
      user_id varchar(255) NOT NULL,
      transaction_hash varchar(255) NOT NULL,
      wallet_address varchar(255) NOT NULL,
      plan enum('bronze','copper','silver','gold','diamond','platinum','vip') NOT NULL,
      tag enum('terminate','buy') NOT NULL,
      PRIMARY KEY (id)
    )`,
	`CREATE TABLE IF NOT EXISTS plans (
      id varchar(255) NOT NULL,
      amount int NOT NULL,
      name varchar(255) NOT NULL,
      commission_percentage int NOT NULL,
      PRIMARY KEY (id)
    )`,
	`CREATE TABLE IF NOT EXISTS support (
      id varchar(255) NOT NULL,
      issue varchar(255) NOT NULL,
      user_id varchar(255) NOT NULL,
      note text NOT NULL,
      other_id varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
      issue_id int NOT NULL,
      resolved enum('solved','pending') NOT NULL DEFAULT 'pending',
      PRIMARY KEY (id),
      KEY issue_support (issue_id),
      created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT issue_support FOREIGN KEY (issue_id) REFERENCES issues (id) ON DELETE RESTRICT ON UPDATE RESTRICT
    )`,
	`CREATE TABLE IF NOT EXISTS tasks (
      id int NOT NULL AUTO_INCREMENT,
      reward decimal(10, 5) NOT NULL,
      plan varchar(255) NOT NULL,
      name varchar(255) NOT NULL,
      image varchar(255) NOT NULL,
      PRIMARY KEY (id)
    )`,
	`CREATE TABLE IF NOT EXISTS transactions (
      id varchar(255) NOT NULL,
      created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      amount decimal(10,5) NOT NULL,
      status enum('pending','success') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
      user_id varchar(255) NOT NULL,
      transaction_hash varchar(255) NOT NULL,
      wallet_address varchar(255) NOT NULL,
      updated_at timestamp NOT NULL,
      tag enum('commission','reward','withdraw','') NOT NULL,
      PRIMARY KEY (id)
    )`,
    `CREATE TABLE IF NOT EXISTS wallet (
      id varchar(255) NOT NULL,
      user_id varchar(255) NOT NULL,
      amount decimal(10,5) NOT NULL DEFAULT '0.00000',
      PRIMARY KEY (id),
      UNIQUE KEY wallet_user_id (user_id)
    )`,
	`CREATE TABLE IF NOT EXISTS users (
      id varchar(255) NOT NULL,
      password varchar(255) NOT NULL,
      phone varchar(255) NOT NULL,
      invite_code varchar(255) NOT NULL,
      subordinate varchar(255) NOT NULL,
      refferal_code varchar(255) NOT NULL,
      created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      last_login timestamp NOT NULL,
      wallet_id varchar(255) NOT NULL,
      total_refferals int NOT NULL,
      PRIMARY KEY (id),
      UNIQUE KEY refferal_code (refferal_code),
      KEY users_wallet_id (wallet_id),
      CONSTRAINT users_wallet_id FOREIGN KEY (wallet_id) REFERENCES wallet (id) ON DELETE RESTRICT ON UPDATE RESTRICT
    )`,
	`CREATE TABLE IF NOT EXISTS users_plan (
      name varchar(255) NOT NULL,
      created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      status varchar(255) NOT NULL DEFAULT 'inactive',
      amount decimal(10,5) NOT NULL,
      id int NOT NULL AUTO_INCREMENT,
      plan_id varchar(255) NOT NULL,
      user_id varchar(255) NOT NULL,
      PRIMARY KEY (id)
    )`
	
];

tables.forEach((table) => {
	connection.query(table, function (err, results, fields) {
		if (err) throw err;
	});
});

app.listen(port, () => {
  
	console.log(`server is running on http://localhost:${port}`);
});
