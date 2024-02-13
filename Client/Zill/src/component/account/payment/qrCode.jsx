import { useEffect, useState } from "react";
import QrCode from "../../../assets/img/qrcode.jpeg";
import "./style.css";
import { useSearchParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { Modal, Button, Spinner } from "react-bootstrap";

function Wallet() {
	const [searchParam, setSearchParam] = useSearchParams();

	const [plan, setPlan] = useState({});
	const [transactionHash, setTransactionHash] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [modalMessage, setModalMessage] = useState("");

	const buyPlan = async (plan) => {
		try {
			setIsLoading(true);
			const res = await axios.post(
				`${import.meta.env.VITE_BASE_URL}/api/user/plans`,
				{ plan_id: searchParam.get("plan"), transaction_hash: transactionHash },
				{ withCredentials: true }
			);
			setModalMessage(res.data.message);
			setShowModal(true);
		} catch (error) {
			if (error instanceof AxiosError) {
				setModalMessage(error.response?.data.message);
				setShowModal(true);
			}
		} finally {
			setIsLoading(false);
		}
	};

	const getPlanDetails = async () => {
		try {
			const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/plan/${searchParam.get("plan")}`, {
				withCredentials: true,
			});
			setPlan(res.data.result);
		} catch (error) {
			if (error instanceof AxiosError) {
				// setShowModal(true); // Show modal on error
			}
		}
	};

	useEffect(() => {
		getPlanDetails();
	}, []);

	return (
		<>
			<div className="main">
				<div className="back"></div>
				<div id="tip11" className="center tip">
					<span>This address only supports recharge USDT-TRC20,Other currencies are not supported</span>
				</div>
				<div id="tip21" className="center tip">
					<span>The credited amount is calculated according to the actual recharge amount</span>
				</div>
				<div className="code center">
					<div id="qrcode">
						<img src={QrCode} style={{ display: "block" }} />
					</div>
					<div id="usdtAmount" style={{ display: "block" }}>
						<div className="code-font1" id="usdtAmountSpan">
							{plan?.amount} USD
						</div>
						<form>
							<div className="mb-3">
								<label for="exampleInputPassword1" className="form-label">
									After paying the USDT submit your transaction hash{" "}
								</label>
								<input
									type="text"
									className="form-control"
									id="exampleInputPassword1"
									placeholder="Enter Transaction hash here..."
									value={transactionHash}
									onChange={(e) => setTransactionHash(e.target.value)}
								/>
							</div>
							<button type="button" className="btn btn-success mb-2" onClick={() => buyPlan("")} disabled={isLoading}>
								{isLoading ? (
									<>
										<Spinner animation="border" size="sm" /> Loading...
									</>
								) : (
									"Submit"
								)}
							</button>{" "}
							{/* Add loading state and disable button */}
						</form>
					</div>
				</div>
				<div className="label">USDT-TRC20：</div>
				<div className="label-content">
					<span>Tron（USDT-TRC20）</span>
				</div>
				<div className="label" style={{ marginTop: "25px;" }}>
					USDT Address：
				</div>
				<div className="address">
					<span style={{ fontSize: "12px" }} id="tronAddress">
						0xCeED22695f478bcac129BAb19db57C6dC3E8aDf3
					</span>
					<input id="demoInput" value="sss" style={{ opacity: "0", position: "absolute" }} readonly="" />
					<i className="fa fa-copy"></i>
				</div>
			</div>

			<Modal show={showModal} onHide={() => setShowModal(false)} centered>
				<Modal.Header closeButton>
					<Modal.Title>Modal Title</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{isLoading ? (
						<div className="text-center">
							<Spinner animation="border" />
							<p>Loading...</p>
						</div>
					) : (
						<p>{modalMessage}</p>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={() => setShowModal(false)}>
						Confirm
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default Wallet;
