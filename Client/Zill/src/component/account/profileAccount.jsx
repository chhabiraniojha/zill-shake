import { useCallback, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import axios from "axios";
import { CustomAlertContext } from "../../context/customAlertContext";

function profileAccount() {

	const { user, wallet, plans } = useContext(UserContext);

	const isPlanActive = useCallback((plan) => (plans?.filter((currentValue) => currentValue.plan_id === plan)?.[0]), [plans]);

	const navigation = useNavigate()

	const { setType, setMessage, setOpen } = useContext(CustomAlertContext)
	const logout = () => {
		axios.get('http://localhost:3000/api/auth/logout', { withCredentials: true })
		.then((res) => {
			setType('success')
			setMessage('logout successful')
			setOpen(true)
			window.location.href = '/'
		})
		.catch((err) => {
			console.log(err);
			setType('error')
			setMessage('logout failed')
			setOpen(true)
		});
	}

	return (	
		<>
			<div className="profileAccount">
				<div className="accountPOf">
					<div className="profileIcon">
						<i class="fa fa-user"></i>
					</div>
					<div className="accountText">
						<p className="usd">
							<b>UID</b> | {user?.id}{" "}
						</p>
						<p className="joinDate">
							Phone: <span>{user?.phone}</span>
						</p>
					</div>
				</div>
			</div>

			<div className="totel_amount">
				<p>
					Total balance <b>$ {Array.isArray(plans) && Number(plans.reduce((prev, currentValue) => prev + currentValue.amount, 0)).toFixed(2)}</b>
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

			<div className="Logout" onClick={logout}>
				<button>
					<i class="fa fa-sign-out"></i> Log Out
				</button>
			</div>
		</>
	);
}

export default profileAccount;
