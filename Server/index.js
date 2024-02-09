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

const port = 3000;

const app = express();

app.use(bodyParser());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);

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
      CONSTRAINT issue_support FOREIGN KEY (issue_id) REFERENCES issues (id) ON DELETE RESTRICT ON UPDATE RESTRICT
    )`,
	`CREATE TABLE IF NOT EXISTS tasks (
      id int NOT NULL AUTO_INCREMENT,
      reward decimal(10,10) NOT NULL,
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
      PRIMARY KEY (id),
      KEY transaction_user_id (user_id),
      CONSTRAINT transaction_user_id FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE RESTRICT ON UPDATE RESTRICT
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
      amount decimal(10,10) NOT NULL,
      id int NOT NULL AUTO_INCREMENT,
      plan_id varchar(255) NOT NULL,
      user_id varchar(255) NOT NULL,
      PRIMARY KEY (id)
    )`,
	`CREATE TABLE IF NOT EXISTS wallet (
      id varchar(255) NOT NULL,
      user_id varchar(255) NOT NULL,
      amount decimal(10,5) NOT NULL DEFAULT '0.00000',
      PRIMARY KEY (id),
      UNIQUE KEY wallet_user_id (user_id)
    )`,
    // INSERT TASKS
   `INSERT INTO tasks (id, reward, plan, name, image) VALUES
(1, 0.0187500007, 'bronze', 'Bitcoin', ''),
(8, 0.0187500007, 'bronze', 'Ethereum', ''),
(9, 0.0187500007, 'bronze', 'Solana', ''),
(10, 0.0187500007, 'bronze', 'Solana', ''),
(11, 0.0187500007, 'bronze', 'Chainlink', ''),
(12, 0.0187500007, 'bronze', 'Matic', ''),
(13, 0.0187500007, 'bronze', 'Doge', ''),
(14, 0.0187500007, 'bronze', 'Waves', ''),
(15, 0.0187500007, 'bronze', 'Litecoin', ''),
(16, 0.0187500007, 'bronze', 'Nmr', ''),
(17, 0.0187500007, 'bronze', 'Band', ''),
(18, 0.0375000015, 'copper', 'Bitcoin', ''),
(19, 0.0375000015, 'copper', 'Ethereum', ''),
(20, 0.0375000015, 'copper', 'Solana', ''),
(21, 0.0375000015, 'copper', 'Chainlink', ''),
(22, 0.0375000015, 'copper', 'Matic', ''),
(23, 0.0375000015, 'copper', 'Doge', ''),
(24, 0.0375000015, 'copper', 'Waves', ''),
(25, 0.0375000015, 'copper', 'Litecoin', ''),
(26, 0.0375000015, 'copper', 'Nmr', ''),
(27, 0.0375000015, 'copper', 'Band', ''),
(28, 0.0625000000, 'silver', 'Bitcoin', ''),
(29, 0.0625000000, 'silver', 'Ethereum', ''),
(30, 0.0625000000, 'silver', 'Solana', ''),
(31, 0.0625000000, 'silver', 'Chainlink', ''),
(32, 0.0625000000, 'silver', 'Matic', ''),
(33, 0.0625000000, 'silver', 'Doge', ''),
(34, 0.0625000000, 'silver', 'Waves', ''),
(35, 0.0625000000, 'silver', 'Litecoin', ''),
(36, 0.0625000000, 'silver', 'Nmr', ''),
(37, 0.0625000000, 'silver', 'Band', ''),
(38, 0.1250000000, 'gold', 'Bitcoin', ''),
(39, 0.1250000000, 'gold', 'Ethereum', ''),
(40, 0.1250000000, 'gold', 'Solana', ''),
(41, 0.1250000000, 'gold', 'Chainlink', ''),
(42, 0.1250000000, 'gold', 'Matic', ''),
(43, 0.1250000000, 'gold', 'Doge', ''),
(44, 0.1250000000, 'gold', 'Waves', ''),
(45, 0.1250000000, 'gold', 'Litecoin', ''),
(46, 0.1250000000, 'gold', 'Nmr', ''),
(47, 0.1250000000, 'gold', 'Band', ''),
(48, 0.2500000000, 'diamond', 'Bitcoin', ''),
(49, 0.2500000000, 'diamond', 'Ethereum', ''),
(50, 0.2500000000, 'diamond', 'Solana', ''),
(51, 0.2500000000, 'diamond', 'Chainlink', ''),
(52, 0.2500000000, 'diamond', 'Matic', ''),
(53, 0.2500000000, 'diamond', 'Doge', ''),
(54, 0.2500000000, 'diamond', 'Waves', ''),
(55, 0.2500000000, 'diamond', 'Litecoin', ''),
(56, 0.2500000000, 'diamond', 'Nmr', ''),
(57, 0.2500000000, 'diamond', 'Band', ''),
(58, 0.5000000000, 'platinum', 'Bitcoin', ''),
(59, 0.5000000000, 'platinum', 'Ethereum', ''),
(60, 0.5000000000, 'platinum', 'Solana', ''),
(61, 0.5000000000, 'platinum', 'Chainlink', ''),
(62, 0.5000000000, 'platinum', 'Matic', ''),
(63, 0.5000000000, 'platinum', 'Doge', ''),
(64, 0.5000000000, 'platinum', 'Waves', ''),
(65, 0.5000000000, 'platinum', 'Litecoin', ''),
(66, 0.5000000000, 'platinum', 'Nmr', ''),
(67, 0.5000000000, 'platinum', 'Band', ''),
(68, 0.9999999999, 'vip', 'Bitcoin', ''),
(69, 0.9999999999, 'vip', 'Ethereum', ''),
(70, 0.9999999999, 'vip', 'Solana', ''),
(71, 0.9999999999, 'vip', 'Chainlink', ''),
(72, 0.9999999999, 'vip', 'Matic', ''),
(73, 0.9999999999, 'vip', 'Doge', ''),
(74, 0.9999999999, 'vip', 'Waves', ''),
(75, 0.9999999999, 'vip', 'Litecoin', ''),
(76, 0.9999999999, 'vip', 'Nmr', ''),
(77, 0.9999999999, 'vip', 'Band', '')
`,
`INSERT INTO plans (id, amount, name, commission_percentage) VALUES
('bronze', 8, 'bronze', 5),
('copper', 16, 'copper', 10),
('diamond', 128, 'diamond', 15),
('gold', 64, 'gold', 20),
('platinum', 256, 'platinum', 25),
('silver', 32, 'silver', 30),
('vip', 512, 'vip', 35);`
];

tables.forEach((table) => {
	connection.query(table, function (err, results, fields) {
		if (err) throw err;
		console.log("Table created!");
	});
});

app.listen(port, () => {
	console.log(`server is running on http://localhost:${port}`);
});
