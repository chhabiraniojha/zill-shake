import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios, { AxiosError } from "axios";

import "./style.css";
import { UserContext } from "../../../context/userContext";

function Promotion() {
	const { user } = useContext(UserContext);

	const [totalCommission, setTotalCommission] = useState(0);
	const [todaysCommission, setTodaysCommission] = useState(0);
	const [lifetimeCommission, setLifetimeCommission] = useState(0);

	useEffect(() => {
		axios
			.get(`${import.meta.env.VITE_BASE_URL}/api/user/todays-commission`, { withCredentials: true })
			.then(({ data }) => {
				setTodaysCommission(data.result.reduce((acc, item) => acc + (parseFloat(item?.totalCommission) || 0), 0));
			})
			.catch((err) => {
				console.log(err);
			});

		axios
			.get(`${import.meta.env.VITE_BASE_URL}/api/user/total-commission`, { withCredentials: true })
			.then(({ data }) => {
				setTotalCommission(data?.totalCommission ?? 0);
			})
			.catch((err) => {
				console.log(err);
			});

		axios
			.get(`${import.meta.env.VITE_BASE_URL}/api/user/life-time-commission`, { withCredentials: true })
			.then(({ data }) => {
				setLifetimeCommission(data?.totalCommission ?? 0);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<>
			<div className="Promotion">
				<div className="paymentTotalUpgrade">
					<h5 className="pagleTitle">Commission</h5>
					<h3>${todaysCommission}</h3>
					<p className="paymentTotal">today's total commission</p>
					<p className="Upgrade">Upgrade the level to increase commission income</p>
				</div>

				<div className="directSubordinates">
					<div className="list-group">
						<p className="list-group-item list-group-item-action active" aria-current="true">
							<i className="fa fa-user"></i> Direct subordinates
						</p>
						<p className="list-group-item list-group-item-action spanGroup">
							<span>{user?.total_refferals}</span> Total Referals
						</p>
						<p className="list-group-item list-group-item-action spanGroup">
							<span>${lifetimeCommission}</span>Total commission earned
						</p>
					</div>
					<div className="Invitation">
						<Link
							className="InvitationLink"
							onClick={(e) => {
								e.preventDefault();
								navigator.clipboard.writeText(`${window.location.origin}/#/register?invite_code=${user?.refferal_code}`);
								e.target.innerText = "Copied";
								setTimeout(() => {
									e.target.innerHTML = `INVITATION LINK <i class="fa fa-copy"></i>`;
								}, 1000);
							}}>
							INVITATION LINK <i class="fa fa-copy"></i>
						</Link>
					</div>
					<div className="copyInvitation">
						<ul>
							<li>
								<p>Copy invitation </p>
								<p>
									{user?.refferal_code}{" "}
									<i
										style={{ cursor: "pointer" }}
										class="fa fa-copy"
										onClick={(e) => {
											navigator.clipboard.writeText(user?.refferal_code);
											e.target.innerText = " Copied ";
											setTimeout(() => {
												e.target.innerHTML = ``;
											}, 1000);
										}}></i>
								</p>
							</li>
							<li>
								<Link to="/subordinate-data">
									<p>Subordinate data </p>
									<p>
										<i class="fa fa-angle-double-right"></i>
									</p>
								</Link>
							</li>
							<li>
								<Link to="/commission-details">
									<p>Commission detail </p>
									<p>
										<i class="fa fa-angle-double-right"></i>
									</p>
								</Link>
							</li>
							<li>
								<Link to="/support">
									<p>Agent line customer service </p>
									<p>
										<i class="fa fa-angle-double-right"></i>
									</p>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}

export default Promotion;
