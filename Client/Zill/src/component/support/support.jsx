// user id
// mobile no
// select your issue
// select your id
// description
// button

import { useContext, useEffect, useState } from "react";
import "./style.css";
import { UserContext } from "../../context/userContext";
import axios, { AxiosError } from "axios";
import { CustomAlertContext } from "../../context/customAlertContext";
import { Link } from "react-router-dom";

function Support() {
	const { user, orders, transactions } = useContext(UserContext);
	const [issuesList, setIssuesList] = useState([]);
	const [selectedIssue, setSelectedIssue] = useState(undefined);
	const [whichOtherIdToShow, setWhichOtherIdToShow] = useState("");
	const [otherId, setOtherId] = useState(undefined);
	const [description, setDescription] = useState("");
	const [prevTickets, setPrevTickets] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:3000/api/support/issues", { withCredentials: true })
			.then(({ data }) => {
				setIssuesList(data.result);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const getClaimRewardTransactions = transactions.filter((transaction) => transaction.tag === "reward");
	const getRefferalRewardTransactions = transactions.filter((transaction) => transaction.tag === "commission");
	const withdrawalTransactions = transactions.filter((transaction) => transaction.tag === "withdraw");
	const getBuyedOrders = orders.filter((order) => order.tag === "buy");
	const getTerminatedOrders = orders.filter((order) => order.tag === "terminate");

	useEffect(() => {
		if (selectedIssue === "1") {
			setWhichOtherIdToShow("order");
		}
		if (selectedIssue === "4") {
			setWhichOtherIdToShow("withdrawal");
		}
		if (selectedIssue === "3") {
			setWhichOtherIdToShow("refferalReward");
		}
		if (selectedIssue === "2") {
			setWhichOtherIdToShow("termination");
		}
		if (selectedIssue === "5") {
			setWhichOtherIdToShow("none");
		}
	}, [selectedIssue]);

	const { open, setOpen, type, setType, message, setMessage } = useContext(CustomAlertContext);

	const handleSubmit = (e) => {
		e.preventDefault();

		const issueSlug = issuesList.filter((issue) => issue.id === Number(selectedIssue))[0]?.slug;

		if (!selectedIssue) {
			setOpen(true);
			setType("error");
			setMessage("Please select your issue");
			return;
		}

		if (!otherId && issueSlug !== "other") {
			setOpen(true);
			setType("error");
			setMessage(`Please select your ${whichOtherIdToShow} id`);
			return;
		}

		if (description === "") {
			setOpen(true);
			setType("error");
			setMessage("Please write your issue");
			return;
		}

		axios
			.post(
				"http://localhost:3000/api/support",
				{
					issue: issuesList.filter((issue) => issue.id === Number(selectedIssue))[0]?.name ?? null,
					issue_id: Number(selectedIssue),
					note: description,
					other_id: !otherId ? null : otherId,
				},
				{ withCredentials: true }
			)
			.then((res) => {
				setType("success");
				setMessage("Your issue has been submitted successfully");
				setOpen(true);
				setSelectedIssue(undefined);
				setOtherId(undefined);
				setDescription("");
			})
			.catch((err) => {
				if (err instanceof AxiosError) {
					setType("error");
					setMessage(err?.response?.data?.message);
					setOpen(true);
				}
			});
	};

	useEffect(() => {
		axios
			.get("http://localhost:3000/api/support/prev-tickets", { withCredentials: true })
			.then(({ data }) => {
				setPrevTickets(data.result);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<>
			<div className="Support">
				<Link to={"/promotion"} type="button" className="btn btn-primary submit_support m-3">
					&larr; Back
				</Link>
				<form className="mt-3" onSubmit={handleSubmit}>
					<div className="mb-3">
						<label className="form-label">
							<i class="fa fa-user"></i> User Id
						</label>
						<input type="text" className="form-control" plaseholder="Enter your User Id" value={user?.id} readOnly />
					</div>
					<div className="mb-3">
						<label className="form-label">
							<i class="fa fa-mobile-phone"></i> Mobile no{" "}
						</label>
						<input type="number" className="form-control" plaseholder="Enter your mobile no" value={user?.phone} readOnly />
					</div>
					<div className="mb-3">
						<label class="form-label">
							<i class="fa fa-warning"></i> select your issue
						</label>
						<select
							className="form-select"
							value={selectedIssue}
							onChange={(e) => {
								setSelectedIssue(e.target.value);
							}}>
							<option selected disabled>
								select your issue{" "}
							</option>
							{issuesList.map((issue, index) => {
								return (
									<option key={index} value={issue.id}>
										{issue?.name}
									</option>
								);
							})}
						</select>
					</div>
					<div className="mb-3 ">
						<label class="form-label">
							<i class="fa fa-user"></i> select your id
						</label>
						<select disabled={whichOtherIdToShow === "none"} className="form-select" value={otherId} onChange={(e) => setOtherId(e.target.value)}>
							<option selected disabled>
								select your id{" "}
							</option>
							{whichOtherIdToShow === "order" &&
								getBuyedOrders.map((order, index) => {
									return (
										<option key={index} value={order.id}>
											{order?.id} ( {order.status} )
										</option>
									);
								})}
							{whichOtherIdToShow === "withdrawal" &&
								withdrawalTransactions.map((transaction, index) => {
									return (
										<option key={index} value={transaction.id}>
											{transaction?.id}
										</option>
									);
								})}
							{whichOtherIdToShow === "refferalReward" &&
								getRefferalRewardTransactions.map((transaction, index) => {
									return (
										<option key={index} value={transaction.id}>
											{transaction?.id}
										</option>
									);
								})}
							{whichOtherIdToShow === "termination" &&
								getTerminatedOrders.map((transaction, index) => {
									return (
										<option key={index} value={transaction.id}>
											{transaction?.id} ( {transaction.status} )
										</option>
									);
								})}
						</select>
					</div>

					<label htmlFor="">Description</label>
					<div className="form-floating">
						<textarea
							className="form-control"
							placeholder="Leave a description here"
							value={description}
							onChange={(e) => setDescription(e.target.value)}></textarea>
					</div>
					<div className="mb-3 mt-2 text-center">
						<button type="submit" className="btn btn-primary submit_support">
							Submit
						</button>
					</div>
				</form>
			</div>
			<div>
			{prevTickets?.map((ticket) => {
								if (ticket.resolved === "pending") {
									return (
										<div className="claimReward panding">
											<div className="icon_right">
											<i class="fa fa-arrow-circle-o-down"></i>
											</div>
											<div className="content_center">
												<h5 title={ticket.id}>
													<b>{ticket.id}</b>
												</h5>
												<p  className="px-2">{new Date(ticket.created_at).toLocaleDateString()}</p>
											</div>
											<div className="amount_get">
												<p>${ticket.amount}</p>
											</div>
											<div className="geat_claim_reward_right">
												<p className="px-2">Pending</p>
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
												<h5 title={ticket.id}>
													<b>{ticket.id}</b>
												</h5>
												<p  className="px-2">{new Date(ticket.created_at).toLocaleDateString()}</p>
											</div>
											<div className="geat_claim_reward_right">
												<p>Confirmed</p>
											</div>
										</div>
									);
								}
							})}
				</div>
		</>
	);
}

export default Support;
