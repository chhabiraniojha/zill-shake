import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./style.css";
import { UserContext } from "../../../context/userContext";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

function Wallet() {
	const [amount, setAmount] = useState(0);
	const [transactions, setTransactions] = useState([]);

	const { wallet } = useContext(UserContext);

	const addMoney = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post("http://localhost:3000/api/wallet/add", { amount }, { withCredentials: true });
            getTransactions()
			toast.success(res.data.message);
		} catch (error) {
			if (error instanceof AxiosError) {
				toast.error(error.response.data.message);
			}
		}
	};

	const getTransactions = async () => {
		try {
			const res = await axios.get("http://localhost:3000/api/user/transactions", { withCredentials: true });
            setTransactions(res.data.result)
            console.log("transactions -> ", res.data)
		} catch (error) {
            if (error instanceof AxiosError) {
				toast.error(error.response.data.message);
			}
        }
	};

    useEffect(() => {
        getTransactions()
    }, [])

	return (
		<>
			<div className="Wallet_dv">
				<div className="Wallet_amount_show">
					<h4 className="WalletTitle">Wallet</h4>
					<i className="fa fa-credit-card"></i>
					<p className="shoe_amount">${wallet.amount}</p>
					<p className="Total_balanc">Total balance</p>
				</div>
				<div className="Main_wallet_totel_wallet">
					<div className="Main_wallet">
						<p className="shoe_amount">$1.50</p>
						<p className="Main_wallet">Main wallet</p>
					</div>
					<div className="totel_wallet">
						<p className="shoe_amount">$100000</p>
						<p className="Main_wallet">totel wallet</p>
					</div>
				</div>

				<form className="Wallet_dv_form" onSubmit={addMoney}>
					<div class="form-group">
						<label for="exampleInputEmail1">Enter Amount</label>
						<div className="dolloar_wallet">
							<i class="fa fa-dollar"></i>
							<input
								type="number"
								class="form-control"
								id="exampleInputEmail1"
								aria-describedby="emailHelp"
								placeholder="Asmount Add"
								onChange={(e) => setAmount(Number(e.target.value))}
							/>
						</div>
						{/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
					</div>

					<button type="submit" class="btn btn_Submit">
						Submit
					</button>
				</form>

				<div className="amount_history">
					<ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
						<li className="nav-item" role="presentation">
							<button
								className="nav-link active"
								id="pills-home-tab"
								data-bs-toggle="pill"
								data-bs-target="#pills-home"
								type="button"
								role="tab"
								aria-controls="pills-home"
								aria-selected="true">
								Transactions
							</button>
						</li>
						{/* <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">orders</button>
                        </li> */}
					</ul>
					<div className="tab-content" id="pills-tabContent">
						<div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
							<div className="claimRewardManeDv">
								{transactions.map((item) => {
									if (item.status === "pending") {
										return (
											<div className="claimReward panding">
												<div className="icon_right">
													<i class="fa fa-arrow-circle-o-down"></i>
												</div>
												<div className="content_center">
													<h5>
														<b>Transactions Id</b> {item.id}
													</h5>
													<p>{new Date(item.created_at).toLocaleDateString()}</p>
												</div>
												<div className="amount_get">
													<p>${item.amount}</p>
												</div>
												<div className="geat_claim_reward_right">
													<p>Pending</p>
												</div>
											</div>
										);
									} else {
										return (
											<div className="claimReward Claimeded">
												<div className="icon_right">
													<i class="fa fa-check"></i>
												</div>
												<div className="content_center">
													<h5>
														<b>Transactions Id</b>{item.id}
													</h5>
													<p>{new Date(item.created_at).toLocaleDateString()}</p>
												</div>
												<div className="amount_get">
													<p>${item.amount}</p>
												</div>
												<div className="geat_claim_reward_right">
													<p>Paid</p>
												</div>
											</div>
										);
									}
								})}
							</div>
						</div>
						{/* <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                            <div className="claimRewardManeDv">
                                <div className="claimReward Claimeded">
                                    <div className="icon_right">
                                        <i class="fa fa-check"></i>
                                    </div>
                                    <div className="content_center">
                                        <h5><b>User Id</b>5468974531</h5>
                                        <p>1/22/2024</p>
                                    </div>
                                    <div className="geat_claim_reward_right">
                                        <p>Claimed</p>
                                    </div>
                                </div>
                                <div className="claimReward panding">
                                    <div className="icon_right">
                                        <i class="fa fa-arrow-circle-o-down"></i>
                                    </div>
                                    <div className="content_center">
                                        <h5><b>User Id</b> 5468974531</h5>
                                        <p>1/22/2024</p>
                                    </div>
                                    <div className="geat_claim_reward_right">
                                        <p>panding</p>
                                    </div>
                                </div>

                            </div>
                        </div> */}
					</div>
				</div>
			</div>
		</>
	);
}

export default Wallet;
