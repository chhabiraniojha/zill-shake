import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import axios, { AxiosError } from "axios";
import { UserContext } from "../../../context/userContext";
import { Button } from "react-bootstrap";

function order() {
	const [orders, setOrders] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		// orders
		setLoading(true)
		const query = new URLSearchParams({ page });
		axios
			.get(`${import.meta.env.VITE_BASE_URL}/api/user/orders?${query.toString()}`, { withCredentials: true })
			.then(({ data }) => {
				setOrders(data.result);
				setLoading(false);
				setTotalPages(data.totalPages);
			})
			.catch((err) => {
				if (err instanceof AxiosError) {
					console.log(err);
				}
			});
	}, [page]);

	return (
		<>
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
							Orders
						</button>
					</li>
					{/* <li className="nav-item" role="presentation">
                        <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">orders</button>
                    </li> */}
				</ul>
				<div className="tab-content" id="pills-tabContent">
					<div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
						<div className="claimRewardManeDv">
							{orders.length === 0 && <h5>No Orders</h5>}
							{loading && <h5>Loading...</h5>}
							{orders?.map((order) => {
								if (order.status === "pending") {
									return (
										<div className="claimReward panding">
											<div className="icon_right">
												<i class="fa fa-arrow-circle-o-down"></i>
											</div>
											<div className="content_center">
												<h5 title={order.id}>
													<b>{order.id.split("-").splice(0, 2).join("-")}...</b>
												</h5>
												<p className="px-2">{new Date(order.created_at).toLocaleDateString()}</p>
											</div>
											<div className="amount_get">
												<p>${order.amount}</p>
											</div>
											<div className="geat_claim_reward_right">
												<p className="px-2">Pending</p>
											</div>
										</div>
									);
								} else if (order.status === "confirm") {
									return (
										<div className="claimReward Claimeded">
											<div className="icon_right">
												<i class="fa fa-check"></i>
											</div>
											<div className="content_center">
												<h5 title={order.id}>
													<b>{order.id.split("-").splice(0, 2).join("-")}...</b>
												</h5>
												<p className="px-2">{new Date(order.created_at).toLocaleDateString()}</p>
											</div>
											<div className="amount_get">
												<p>${order.amount}</p>
											</div>
											<div className="geat_claim_reward_right">
												<p>Confirmed</p>
											</div>
										</div>
									);
								} else if (order.status === "pending" && order.tag==="terminate") {
									return (
										<div className="claimReward panding">
											<div className="icon_right">
												<i class="fa fa-arrow-circle-o-down"></i>
											</div>
											<div className="content_center">
												<h5 title={order.id}>
													<b>{order.id.split("-").splice(0, 2).join("-")}...</b>
												</h5>
												<p className="px-2">{new Date(order.created_at).toLocaleDateString()}</p>
											</div>
											<div className="amount_get">
												<p>${order.amount}</p>
											</div>
											<div className="geat_claim_reward_right">
												<p className="px-2">Terminating</p>
											</div>
										</div>
									);
								} else if (order.status === "terminated") {
									return (
										<div className="claimReward Claimeded">
											<div className="icon_right">
												<i class="fa fa-arrow-circle-o-down"></i>
											</div>
											<div className="content_center">
												<h5 title={order.id}>
													<b>{order.id.split("-").splice(0, 2).join("-")}...</b>
												</h5>
												<p className="px-2">{new Date(order.created_at).toLocaleDateString()}</p>
											</div>
											<div className="amount_get">
												<p>${order.amount}</p>
											</div>
											<div className="geat_claim_reward_right">
												<p className="px-2">Terminated</p>
											</div>
										</div>
									);
								}
							})}
						</div>
						<div style={{ display: "flex", gap: 2, justifyItems: "space-between" }}>
							<Button disabled={page <= 1} onClick={() => setPage((prev) => prev - 1)}>
								&larr; Previous
							</Button>
							<Button disabled={totalPages <= page} onClick={() => setPage((prev) => prev + 1)}>
								Next &rarr;
							</Button>
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
		</>
	);
}

export default order;
