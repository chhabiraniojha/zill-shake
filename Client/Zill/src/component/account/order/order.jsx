import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import axios, { AxiosError } from "axios";
import { UserContext } from "../../../context/userContext";

function order() {

	const { orders } = useContext(UserContext);

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
							{orders?.map((order) => {
								if (order.status === "pending") {
									return (
										<div className="claimReward panding">
											<div className="icon_right">
												<i class="fa fa-arrow-circle-o-down"></i>
											</div>
											<div className="content_center">
												<h5>
													<b>{order.id}</b> {order.amount}
												</h5>
												<p>{new Date(order.created_at).toDateString()}</p>
											</div>
											<div className="amount_get">
												<p>${order.amount}</p>
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
													<b>{order.id}</b>{order.amount}
												</h5>
												<p>{new Date(order.created_at).toDateString()}</p>
											</div>
											<div className="amount_get">
												<p>${order.amount}</p>
											</div>
											<div className="geat_claim_reward_right">
												<p>Confirmed</p>
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
		</>
	);
}

export default order;
