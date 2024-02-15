import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/userContext";
import { Modal, Form, Button } from "react-bootstrap";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

function TerminationForm() {
	const [searchParam, setSearchParam] = useSearchParams();

	const { user, plans, orders } = useContext(UserContext);
	const [openSuccessModal, setOpenSuccessModal] = useState(false);
	const [walletAddress, setWalletAddress] = useState("");

	const [getPlanDetails, setPlanDetails] = useState();

	const navigate = useNavigate();
	const handleTerminationFormHandler = async (e) => {
		e.preventDefault();
		try {
			axios
				.delete(`${import.meta.env.VITE_BASE_URL}/api/user/plans/${searchParam.get("plan")}`, {
					data: {
						amount: Number(getPlanDetails?.amount),
						wallet_address: walletAddress,
						plan_id: searchParam.get("plan"),
					},
					withCredentials: true,
				})
				.then(({ data }) => {
					setOpenSuccessModal(true);
				})
				.catch((err) => {
					if (err instanceof AxiosError) {
						toast.error(err.response.data.message);
					}
				});
		} catch (error) {
			console.log(error);
			if (error instanceof AxiosError) {
				toast.error(error.response.data.message);
			}
		}
	};

	const getTerminatePlanStatus = (plan) => orders?.filter((currentValue) => currentValue.plan === plan && currentValue.tag === "terminate")?.[0]?.status;

	useEffect(() => {
		if(getTerminatePlanStatus(searchParam.get('plan'))){
			setOpenSuccessModal(true);
		}
	}, [orders]);

	return (
		<div className="h-full w-full flex items-center justify-center">
			<form onSubmit={handleTerminationFormHandler} className="h-fit">
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
					<label htmlFor="phone" className="form-label">
						Phone
					</label>
					<input type="text" className="form-control" id="phone" value={user.phone} readOnly required />
				</div>
				<div className="mb-3">
					<label htmlFor="amount" className="form-label">
						Amount
					</label>
					<input type="number" className="form-control" id="amount" value={getPlanDetails?.amount} readOnly required />
				</div>
				<div className="mb-3">
					<label htmlFor="plan" className="form-label">
						Plan
					</label>
					<Form.Select name="plan" id="plan" value={searchParam.get("plan")} readOnly>
						<option value={searchParam.get("plan")}>{searchParam.get("plan")}</option>
					</Form.Select>
				</div>
				<Button type="submit" variant="danger" className="mb-2 mx-2">
					Terminate
				</Button>
				<Link to={"/"}>
					<Button type="button" variant="primary" className="mb-2 mx-2">
						Cancel
					</Button>
				</Link>
			</form>
			<Modal show={openSuccessModal} onHide={() => setOpenSuccessModal(false)} centered>
				<Modal.Header>Success</Modal.Header>
				<Modal.Body>
					<p>Your withdrawal termination is on status pending. Please wait for 1 ~ 3 days to transfer to your wallet.</p>
				</Modal.Body>
				<Modal.Footer>
					<Link to={'/'}>
						<Button variant="success" onClick={() => setOpenSuccessModal(false)}>
							Ok
						</Button>
					</Link>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default TerminationForm;
