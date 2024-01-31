import { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Bronze from "../../assets/img/mamberShipe/bronze.png";
import Copper from "../../assets/img/mamberShipe/copper.png";
import Silver from "../../assets/img/mamberShipe/silver.png";
import Gold from "../../assets/img/mamberShipe/gold.png";
import Diamond from "../../assets/img/mamberShipe/diamond.png";
import Platinum from "../../assets/img/mamberShipe/platinum.png";
import Vip from "../../assets/img/mamberShipe/vip.png";
import Lock from "../../assets/img/mamberShipe/lock.png";
import PlansShow from "../../component/dashboard/plansMamber/planeShow";
import "./style.css";
import { UserContext } from "../../context/userContext";

function profileAccount() {

	const { user, wallet, plans } = useContext(UserContext);

	const isPlanActive = useCallback((plan) => plans.includes(plan), [plans]);

	useEffect(() => {
		console.log(user, wallet, plans);
	}, [user]);

	return (	
		<>
			<div className="profileAccount">
				<div className="accountPOf">
					<div className="profileIcon">
						<i class="fa fa-user"></i>
					</div>
					<div className="accountText">
						<p className="usd">
							<b>UID</b> | {user.id}{" "}
						</p>
						<p className="joinDate">
							Last login: <span>{new Date(user.last_login).toLocaleString()}</span>
						</p>
					</div>
				</div>
			</div>

			<div className="totel_amount">
				<p>
					Total balance <b>₹ {wallet.amount}</b>
				</p>
			</div>

			<h4 className="chooseBuyPlan">Your Activated plans</h4>
			{plans && (
				<div className="mamber">
					<p className={`User_mamber ${isPlanActive('bronze') ? "" : "active"}`}>
						<img className="pad_mamber" src={Bronze} />
						<img className="lock_mamber" src={Lock} />
						<span>Bronze</span>
					</p>
					<p className={`User_mamber ${isPlanActive('copper') ? "" : "active"}`}>
						<img className="pad_mamber" src={Copper} />
						<img className="lock_mamber" src={Lock} />
						<span>Copper</span>
					</p>
					<p className={`User_mamber ${isPlanActive('silver') ? "" : "active"}`}>
						<img className="pad_mamber" src={Silver} />
						<img className="lock_mamber" src={Lock} />
						<span>Silver</span>
					</p>
					<p className={`User_mamber ${isPlanActive('gold') ? "" : "active"}`}>
						<img className="pad_mamber" src={Gold} />
						<img className="lock_mamber" src={Lock} />
						<span>Gold</span>
					</p>
					<p className={`User_mamber ${isPlanActive('diamond') ? "" : "active"}`}>
						<img className="pad_mamber" src={Diamond} />
						<img className="lock_mamber" src={Lock} />
						<span>Diamond</span>
					</p>
					<p className={`User_mamber ${isPlanActive('platinum') ? "" : "active"}`}>
						<img className="pad_mamber" src={Platinum} />
						<img className="lock_mamber" src={Lock} />
						<span>Platinum</span>
					</p>
					<p className={`User_mamber ${isPlanActive('vip') ? "" : "active"}`}>
						<img className="pad_mamber" src={Vip} />
						<img className="lock_mamber" src={Lock} />
						<span>Vip</span>
					</p>
				</div>
			)}
			<h4 className="chooseBuyPlan">Choose and buy your plan</h4>
			<PlansShow />

			<div className="Logout">
				<button>
					<i class="fa fa-sign-out"></i> Log Out
				</button>
			</div>
		</>
	);
}

export default profileAccount;
