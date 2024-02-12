import { Link, useParams } from "react-router-dom";
import { useCallback, useContext, useState } from "react";
import "./style.css";
import { useEffect } from "react";
import axios, { AxiosError } from "axios";
import { Modal, Spinner } from "react-bootstrap";
import { UserContext } from "../../context/userContext";
import { CustomAlertContext } from "../../context/customAlertContext";

function ClaimReward() {
	const { plan } = useParams();
	const capitalizedPlan = plan.charAt(0).toUpperCase() + plan.slice(1);
	const [tasks, setTasks] = useState([]);
	const [claimedTasks, setClaimedTasks] = useState([]);
	const [loading, setLoading] = useState(false)

	const { open, message, type, setType, setOpen, setMessage } = useContext(CustomAlertContext)

	const claimReward = (taskId) => {
		setLoading(true)
		axios
			.get(`http://localhost:3000/api/tasks/claim/${plan}/${taskId}`, {
				withCredentials: true,
			})
			.then((res) => {
				setTimeout(() => {
					setLoading(false);
					setType("success");
					setMessage(res.data.message);
					setOpen(true);
				}, 4000)
			})
			.catch((err) => {
				console.log(err);
				if (err instanceof AxiosError) {
					setType("error");
					setMessage(err.response.data.message);
					setOpen(true);
				}
			})
	};

	useEffect(() => {
		setType("loading");
		setOpen(loading);
	}, [loading])

	useEffect(() => {
		axios
			.get(`http://localhost:3000/api/tasks/${plan}`, {
				withCredentials: true,
			})
			.then((res) => {
				setTasks(res.data.result);
			})
			.catch((err) => {
				console.log(err);
				if (err instanceof AxiosError) {
					console.log(err.response.data.message);
				}
			});

		axios
			.get(`http://localhost:3000/api/tasks/claimed-rewards/${plan}`, {
				withCredentials: true,
			})
			.then((res) => {
				setClaimedTasks(res.data.result);
			})
			.catch((err) => {
				console.log(err);
				if (err instanceof AxiosError) {
					console.log(err.response.data.message);
				}
			});
	}, [open]);

	const isTasksClaimed = useCallback(
		(id) => !!claimedTasks.find((task) => task?.task == id),
		[claimedTasks]
	);

	return (
		<>
			<nav aria-label="breadcrumb">
				<ol className="breadcrumb">
					<li className="breadcrumb-item">
						<Link to="/">
							<i className="fa fa-angle-double-left"></i> Home
						</Link>
					</li>
					<li className="breadcrumb-item active" aria-current="page">
						{capitalizedPlan}
					</li>
				</ol>
			</nav>
			<h4 className="claimRewardManeDvPlane">{capitalizedPlan}</h4>
			<div className="claimRewardManeDv">
				{claimedTasks && tasks?.map((item, i) => {
					if (!isTasksClaimed(item.id)) {
						return (
							<div className="claimReward panding">
								<div className="icon_right">
									<i class="fa fa-quote-left"></i>
								</div>
								<div className="content_center">
									<h5>{item.name}</h5>
									<p>You're done 0 out of {(item.reward).toFixed(5)}</p>
								</div>
								<div
									className="geat_claim_reward_right"
									onClick={() => claimReward(item.id)}
								>
									<Link to="">
										<p>
											 {(item.reward).toFixed(5)}
										</p>
									</Link>
								</div>
							</div>
						);
					} else {
						return (
							<div className="claimReward Claimeded">
								<div className="icon_right">
									<i class="fa fa-quote-left"></i>
								</div>
								<div className="content_center">
									<h5>{item.name}</h5>
									<p>coines successfully acquired</p>
								</div>
								<div className="geat_claim_reward_right">
									<p>Claimed</p>
								</div>
							</div>
						);
					}
				})}
			</div>
			<Modal show={loading}>
			<Modal.Header>
				<Modal.Title>Claim Reward</Modal.Title>
			</Modal.Header>
			<Modal.Body className="d-flex justify-content-center align-items-center">
				<Spinner/>
			</Modal.Body>
			</Modal>
			</>
	);
}

export default ClaimReward;
