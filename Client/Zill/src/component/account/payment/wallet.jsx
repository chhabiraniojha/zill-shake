import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./style.css";
import { UserContext } from "../../../context/userContext";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";
import { CustomAlertContext } from "../../../context/customAlertContext";

function Wallet() {
	const { user } = useContext(UserContext);

	const [amount, setAmount] = useState(0);
	const [walletAddress, setWalletAddress] = useState("");
	const [transactions, setTransactions] = useState([]);
	const [openConfirmationForm, setOpenConfirmationForm] = useState(false);
	const [openSuccessModal, setOpenSuccessModal] = useState(false);
	const [phone, setPhone] = useState(user?.phone);
	const [lifeTimeWalletCredited, setLifeTimeWalletCredited] = useState(0);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [loading, setLoading] = useState(false);

	const { wallet } = useContext(UserContext);
	const { open, setOpen, type, setType, message, setMessage } = useContext(CustomAlertContext);

	const addMoney = async (e) => {
		e.preventDefault();
		if (amount < 0.1) {
			setType("error");
			setMessage("Amount should be greater than $0.10");
			setOpen(true);
			return;
		}

		if (wallet.amount < amount) {
			setType("error");
			setMessage("Insufficient balance");
			setOpen(true);
			return;
		}

		setOpenConfirmationForm(true);
	};

	const handleConfirmationFormSubmit = (e) => {
		e.preventDefault();
		try {
			axios
				.post(
					"http://localhost:3000/api/user/withdraw",
					{
						amount,
						wallet_address: walletAddress,
					},
					{ withCredentials: true }
				)
				.then(({ data }) => {
					setOpenConfirmationForm(false);
					setOpenSuccessModal(true);
					setAmount(0);
				})
				.catch((err) => {
					if (err instanceof AxiosError) {
						setType("error");
						setMessage(err.response.data.message);
						setOpen(true);
					}
				});
		} catch (error) {
			if (error instanceof AxiosError) {
				setType("error");
				setMessage(error.response.data.message);
				setOpen(true);
			}
		}
	};

	const getTransactions = async () => {
		try {
			const query = new URLSearchParams({ pageNumber: page });
			const res = await axios.get(`http://localhost:3000/api/user/transactions?${query.toString()}`, { withCredentials: true });
			setTransactions(res.data.result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
			setTotalPages(res.data?.totalPages ?? 0);
			console.log("transactions -> ", res.data);
		} catch (error) {
			if (error instanceof AxiosError) {
				toast.error(error.response.data.message);
			}
		}
	};

	useEffect(() => {
		getTransactions();

		axios
			.get("http://localhost:3000/api/user/life-time-wallet-credited", { withCredentials: true })
			.then(({ data }) => {
				setLifeTimeWalletCredited(data.totalCredited);
			})
			.catch((err) => {
				if (err instanceof AxiosError) {
					setType("error");
					setMessage(err.response.data.message);
					setOpen(true);
				}
			});
	}, [page]);

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
						<p className="shoe_amount">$0.10</p>
						<p className="Main_wallet">min withdrawal</p>
					</div>
					<div className="totel_wallet">
						<p className="shoe_amount">${lifeTimeWalletCredited}</p>
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
								value={amount}
								onChange={(e) => setAmount(Number(e.target.value))}
								step={0.01}
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
								{
									transactions.length === 0 && <p>No transactions available</p>
								}
								{transactions.map((item) => {
									if (item.status === "pending") {
										return (
											<div className="claimReward panding">
												<div className="icon_right">
													<i class="fa fa-arrow-circle-o-down"></i>
												</div>
												<div className="content_center">
													<h5>
														<b>Transactions Id ( {item.tag} )</b> {item.id}
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
														<b>Transactions Id ( {item.tag} )</b> {item.id}
														{item.id}
													</h5>
													<p>{new Date(item.created_at).toDateString("en-IN")}</p>
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
								{
									loading && <p>Loading...</p>
								}
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
				<div style={{ display: "flex", gap: 2, justifyItems: "space-between" }}>
					<Button disabled={page <= 1} onClick={() => setPage((prev) => prev - 1)}>&larr; Previous</Button>
					<Button disabled={totalPages <= page} onClick={() => setPage((prev) => prev + 1)}>Next &rarr;</Button>
				</div>
			</div>
			<Modal show={openConfirmationForm} onHide={() => setOpenConfirmationForm(false)} centered>
				<Modal.Header>Withdraw Confirmation Form</Modal.Header>
				<Modal.Body>
					<form onSubmit={handleConfirmationFormSubmit}>
						<div className="mb-3">
							<label htmlFor="walletAddress" className="form-label">
								Wallet Address
							</label>
							<input
								type="text"
								className="form-control"
								id="walletAddress"
								value={walletAddress}
								onChange={(e) => setWalletAddress(e.target.value)}
								required
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="phone" className="form-label ">
								Phone
							</label>
							<input type="text" className="form-control" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
						</div>
						<div className="mb-3">
							<label htmlFor="amount" className="form-label">
								Amount
							</label>
							<input type="number" className="form-control" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
						</div>
						<button type="submit" className="btn btn-success mb-2">
							Submit
						</button>
						<button type="button" className="btn btn-danger mb-2" onClick={() => setOpenConfirmationForm(false)}>
							Cancel
						</button>
					</form>
				</Modal.Body>
			</Modal>
			<Modal show={openSuccessModal} onHide={() => setOpenSuccessModal(false)} centered>
				<Modal.Header>Success</Modal.Header>
				<Modal.Body>
					<p>Your withdrawal request is on status pending pls wait for 1 ~ 3 days to transfer in you're wallet</p>
				</Modal.Body>
				<Modal.Footer>
					<button className="btn btn-success" onClick={() => setOpenSuccessModal(false)}>
						Ok
					</button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default Wallet;
