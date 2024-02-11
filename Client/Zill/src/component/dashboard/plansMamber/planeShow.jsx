import { useState } from "react";
import { Link } from "react-router-dom";
import Bronze from "../../../assets/img/mamberShipe/bronze.png";
import Copper from "../../../assets/img/mamberShipe/copper.png";
import Silver from "../../../assets/img/mamberShipe/silver.png";
import Gold from "../../../assets/img/mamberShipe/gold.png";
import Diamond from "../../../assets/img/mamberShipe/diamond.png";
import Platinum from "../../../assets/img/mamberShipe/platinum.png";
import Vip from "../../../assets/img/mamberShipe/vip.png";
import { UserContext } from "../../../context/userContext";
import { useContext, useCallback, useEffect } from "react";

import "./style.css";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";
import WarningModal from "./warningPlanBuy";

function PlaneShow() {
	const [showWarning, setShowWarning] = useState(false);
	const [selectedPlan, setSelectedPlan] = useState("");

	const { user, wallet, plans, orders } = useContext(UserContext);

	const isPlanActive = useCallback((plan) => plans?.filter((currentValue) => currentValue.plan_id === plan)?.[0], [plans]);
	const getPlanDetails = (plan) => Boolean(plans?.filter((currentValue) => currentValue.plan_id === plan)?.[0]);
	const getBuyPlanStatus = (plan) => orders?.filter((currentValue) => currentValue.plan === plan && currentValue.tag === "buy")?.[0]?.status;
	const getTerminatePlanStatus = (plan) => orders?.filter((currentValue) => currentValue.plan === plan && currentValue.tag === "terminate")?.[0]?.status;

	useEffect(() => {

	}, [user, wallet, plans, orders]);

	const terminatePlan = (plan) => {
		setSelectedPlan(plan);
		setShowWarning(true);
	};

	return (
		<>
			<div className="planeShow">
				<div className="card-wrap one">
					<div className="card-header">
						<img src={Bronze} />
						<h1>Bronze</h1>
						<p className="mamber_amount">$8</p>
					</div>
					<div className="card-content">
						<p className="card-content-option true">
							<i class="fa fa-check"></i> Lorem ipsum dolor
						</p>
						<p className="card-content-option false">
							<i class="fa fa-check"></i> Lorem ipsum dolor
						</p>
					</div>
					<div className="card-footer">
						<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
						{isPlanActive("bronze") ? (
							<button
								className="card-footer-btn"
								disabled={getTerminatePlanStatus("bronze") === "pending"}
								onClick={() => {
									setSelectedPlan("bronze");
									setShowWarning(true);
								}}>
								{getTerminatePlanStatus("bronze") === "pending" ? "pending" : "Terminate"}
							</button>
						) : (
							<Link to={"/qrcode?plan=bronze"}>
								<button className="card-footer-btn" disabled={getBuyPlanStatus("bronze") === "pending"}>
									{getBuyPlanStatus("bronze") === "pending" ? "pending" : "Buy"}
								</button>
							</Link>
						)}
					</div>
				</div>
				<div className="card-wrap two">
					<div className="card-header">
						<img src={Copper} />
						<h1>Copper</h1>
						<p className="mamber_amount">$16</p>
					</div>
					<div className="card-content">
						<p className="card-content-option true">
							<i class="fa fa-check"></i> Lorem ipsum dolor
						</p>
						<p className="card-content-option false">
							<i class="fa fa-check"></i> Lorem ipsum dolor
						</p>
					</div>
					<div className="card-footer">
						<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
						{isPlanActive("copper") ? (
							<button
								onClick={() => {
									setSelectedPlan("copper");
									setShowWarning(true);
								}}
								className="card-footer-btn"
								disabled={getTerminatePlanStatus("copper") === "pending"}>
								{getTerminatePlanStatus("copper") === "pending" ? "Terminating" : "Terminate"}
							</button>
						) : (
							<Link to={"/qrcode?plan=copper"}>
								<button className="card-footer-btn" disabled={getBuyPlanStatus("copper") === "pending"}>
									{getBuyPlanStatus("copper") === "pending" ? "pending" : "Buy"}
								</button>
							</Link>
						)}
					</div>
				</div>
				<div className="card-wrap three">
					<div className="card-header">
						<img src={Silver} />
						<h1>Silver</h1>
						<p className="mamber_amount">$32</p>
					</div>
					<div className="card-content">
						<p className="card-content-option true">
							<i class="fa fa-check"></i> Lorem ipsum dolor
						</p>
						<p className="card-content-option false">
							<i class="fa fa-check"></i> Lorem ipsum dolor
						</p>
					</div>
					<div className="card-footer">
						<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
						{isPlanActive("silver") ? (
							<button
								onClick={() => {
									setSelectedPlan("silver");
									setShowWarning(true);
								}}
								className="card-footer-btn"
								disabled={getTerminatePlanStatus("silver") === "pending"}>
								{getTerminatePlanStatus("silver") === "pending" ? "Terminating" : "Terminate"}
							</button>
						) : (
							<Link to={"/qrcode?plan=silver"}>
								<button className="card-footer-btn" disabled={getBuyPlanStatus("silver") === "pending"}>
									{getBuyPlanStatus("silver") === "pending" ? "pending" : "Buy"}
								</button>
							</Link>
						)}
					</div>
				</div>
				<div className="card-wrap three">
					<div className="card-header">
						<img src={Gold} />
						<h1>gold</h1>
						<p className="mamber_amount">$64</p>
					</div>
					<div className="card-content">
						<p className="card-content-option true">
							<i class="fa fa-check"></i> Lorem ipsum dolor
						</p>
						<p className="card-content-option false">
							<i class="fa fa-check"></i> Lorem ipsum dolor
						</p>
					</div>
					<div className="card-footer">
						<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
						{isPlanActive("gold") ? (
							<button
								onClick={() => {
									setSelectedPlan("gold");
									setShowWarning(true);
								}}
								className="card-footer-btn"
								disabled={getTerminatePlanStatus("gold") === "pending"}>
								{getTerminatePlanStatus("gold") === "pending" ? "Terminating" : "Terminate"}
							</button>
						) : (
							<Link to={"/qrcode?plan=gold"}>
								<button className="card-footer-btn" disabled={getBuyPlanStatus("gold") === "pending"}>
									{getBuyPlanStatus("gold") === "pending" ? "pending" : "Buy"}
								</button>
							</Link>
						)}
					</div>
				</div>
				<div className="card-wrap three">
					<div className="card-header">
						<img src={Diamond} />
						<h1>Diamond</h1>
						<p className="mamber_amount">$128</p>
					</div>
					<div className="card-content">
						<p className="card-content-option true">
							<i class="fa fa-check"></i> Lorem ipsum dolor
						</p>
						<p className="card-content-option false">
							<i class="fa fa-check"></i> Lorem ipsum dolor
						</p>
					</div>
					<div className="card-footer">
						<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
						{isPlanActive("diamond") ? (
							<button
								onClick={() => {
									setSelectedPlan("diamond");
									setShowWarning(true);
								}}
								className="card-footer-btn"
								disabled={getTerminatePlanStatus("diamond") === "pending"}>
								{getTerminatePlanStatus("diamond") === "pending" ? "Terminating" : "Terminate"}
							</button>
						) : (
							<Link to={"/qrcode?plan=diamond"}>
								<button className="card-footer-btn" disabled={getBuyPlanStatus("diamond") === "pending"}>
									{getBuyPlanStatus("diamond") === "pending" ? "pending" : "Buy"}
								</button>
							</Link>
						)}
					</div>
				</div>
				<div className="card-wrap three">
					<div className="card-header">
						<img src={Platinum} />
						<h1>Platinum</h1>
						<p className="mamber_amount">$256</p>
					</div>
					<div className="card-content">
						<p className="card-content-option true">
							<i class="fa fa-check"></i> Lorem ipsum dolor
						</p>
						<p className="card-content-option false">
							<i class="fa fa-check"></i> Lorem ipsum dolor
						</p>
					</div>
					<div className="card-footer">
						<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
						{isPlanActive("platinum") ? (
							<button
								onClick={() => {
									setSelectedPlan("platinum");
									setShowWarning(true);
								}}
								className="card-footer-btn"
								disabled={getBuyPlanStatus("platinum") === "pending"}>
								{getTerminatePlanStatus("platinum") === "pending" ? "Terminating" : "Terminate"}
							</button>
						) : (
							<Link to={"/qrcode?plan=platinum"}>
								<button className="card-footer-btn" disabled={getBuyPlanStatus("platinum") === "pending"}>
									{getBuyPlanStatus("platinum") === "pending" ? "pending" : "Buy"}
								</button>
							</Link>
						)}
					</div>
				</div>
				<div className="card-wrap three">
					<div className="card-header">
						<img src={Vip} />
						<h1>Vip</h1>
						<p className="mamber_amount">$512</p>
					</div>
					<div className="card-content">
						<p className="card-content-option true">
							<i class="fa fa-check"></i> Lorem ipsum dolor
						</p>
						<p className="card-content-option false">
							<i class="fa fa-check"></i> Lorem ipsum dolor
						</p>
					</div>
					<div className="card-footer">
						<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
						{isPlanActive("vip") ? (
							<button
								onClick={() => {
									setSelectedPlan("vip");
									setShowWarning(true);
								}}
								className="card-footer-btn"
								disabled={getTerminatePlanStatus("vip") === "pending"}>
								{getTerminatePlanStatus("vip") === "pending" ? "Terminating" : "Terminate"}
							</button>
						) : (
							<Link to={"/qrcode?plan=vip"}>
								<button className="card-footer-btn" disabled={getBuyPlanStatus("vip") === "pending"}>
									{getBuyPlanStatus("vip") === "pending" ? "pending" : "Buy"}
								</button>
							</Link>
						)}
					</div>
				</div>
				<WarningModal
					selectedPlan={selectedPlan}
					handleShowWarning={(bool) => {
						setSelectedPlan("");
						setShowWarning(bool);
					}}
					showWarning={showWarning}
				/>
			</div>
		</>
	);
}

export default PlaneShow;
