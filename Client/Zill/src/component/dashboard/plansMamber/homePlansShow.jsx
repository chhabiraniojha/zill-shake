import { Link, useNavigate } from "react-router-dom";
import Bronze from "../../../assets/img/mamberShipe/bronze.png";
import Copper from "../../../assets/img/mamberShipe/copper.png";
import Silver from "../../../assets/img/mamberShipe/silver.png";
import Gold from "../../../assets/img/mamberShipe/gold.png";
import Diamond from "../../../assets/img/mamberShipe/diamond.png";
import Platinum from "../../../assets/img/mamberShipe/platinum.png";
import Vip from "../../../assets/img/mamberShipe/vip.png";

import "./style.css";
import { useContext, useCallback, useState } from "react";
import { UserContext } from "../../../context/userContext";
import WarningModal from "./warningPlanBuy";

function homePlansShow() {
	const [showWarning, setShowWarning] = useState(false);
	const [selectedPlan, setSelectedPlan] = useState(null);

	const { plans, user, orders } = useContext(UserContext);

	const navigate = useNavigate();

	const isPlanActive = useCallback((plan) => plans.filter((currentValue) => currentValue.plan_id === plan)?.[0], [plans]);

	const getTerminatePlanStatus = (plan) => orders?.filter((currentValue) => currentValue.plan === plan && currentValue.tag === "terminate")?.[0]?.status;

	return (
		<>
			<div className="planeShow">
				<div className="planeShowPade">
					<div
						className={`right_pade ${isPlanActive("bronze") ? "" : "active"}`}
						style={{ cursor: "pointer" }}
						onClick={() => !isPlanActive("bronze") && navigate("/qrcode?plan=bronze")}>
						<div className="pade_plane">
							<img src={Bronze} />
						</div>

						<h4 className="Free_h4">Bronze</h4>
						<div className="planButton">
							<button className="earnIntErst">
								<Link className="pade_plane" to="/claim-reward/bronze">
									Earn Interest
								</Link>
							</button>
							<button
								className="TerminatePlan"
								onClick={() => {
									setSelectedPlan("bronze");
									setShowWarning(true);
								}}
								disabled={getTerminatePlanStatus("bronze")}>
							{getTerminatePlanStatus("vip") ? getTerminatePlanStatus('vip') === 'pending' ? 'Terminating' : 'Terminated' : "Terminate Plan"}
							</button>
						</div>
						<div className="lockPlan">
							<i className="fa fa-lock"></i>
							<p className="unlockPlan">Unlock Plan</p>
						</div>
					</div>
					<div
						className={`left_pade ${isPlanActive("copper") ? "" : "active"}`}
						style={{ cursor: "pointer" }}
						onClick={() => !isPlanActive("copper") && navigate("/qrcode?plan=copper")}>
						<div className="pade_plane">
							<img src={Copper} />
						</div>
						<h4 className="pade_h4">Copper</h4>
						<div className="planButton">
							<button className="earnIntErst">
								<Link className="pade_plane" to="/claim-reward/copper">
									Earn Interest
								</Link>
							</button>
							<button
								className="TerminatePlan"
								onClick={() => {
									setSelectedPlan("copper");
									setShowWarning(true);
								}}
								disabled={getTerminatePlanStatus("copper")}>
							{getTerminatePlanStatus("copper") ? getTerminatePlanStatus('copper') === 'pending' ? 'Terminating' : 'Terminated' : "Terminate Plan"}
							</button>
						</div>
						<div className="lockPlan ">
							<i className="fa fa-lock"></i>
							<p className="unlockPlan">Unlock Plan</p>
						</div>
					</div>
					<div
						className={`right_pade ${isPlanActive("silver") ? "" : "active"}`}
						style={{ cursor: "pointer" }}
						onClick={() => !isPlanActive("silver") && navigate("/qrcode?plan=silver")}>
						<div className="pade_plane">
							<img src={Silver} />
						</div>
						<h4 className="pade_h4">Silver</h4>
						<div className="planButton">
							<button className="earnIntErst">
								<Link className="pade_plane" to="/claim-reward/silver">
									Earn Interest
								</Link>
							</button>
							<button
								className="TerminatePlan"
								onClick={() => {
									setSelectedPlan("silver");
									setShowWarning(true);
								}}
								disabled={getTerminatePlanStatus("silver")}>
							{getTerminatePlanStatus("silver") ? getTerminatePlanStatus('silver') === 'pending' ? 'Terminating' : 'Terminated' : "Terminate Plan"}
							</button>
						</div>
						<div className="lockPlan">
							<i className="fa fa-lock"></i>
							<p className="unlockPlan">Unlock Plan</p>
						</div>
					</div>
					<div
						className={`left_pade ${isPlanActive("gold") ? "" : "active"}`}
						style={{ cursor: "pointer" }}
						onClick={() => !isPlanActive("gold") && navigate("/qrcode?plan=gold")}>
						<div className="pade_plane">
							<img src={Gold} />
						</div>
						<h4 className="pade_h4">Gold</h4>
						<div className="planButton">
							<button className="earnIntErst">
								<Link className="pade_plane" to="/claim-reward/gold">
									Earn Interest
								</Link>
							</button>
							<button
								className="TerminatePlan"
								onClick={() => {
									setSelectedPlan("gold");
									setShowWarning(true);
								}}
								disabled={getTerminatePlanStatus("gold")}>
							{getTerminatePlanStatus("gold") ? getTerminatePlanStatus('gold') === 'pending' ? 'Terminating' : 'Terminated' : "Terminate Plan"}
							</button>
						</div>
						<div className="lockPlan">
							<i className="fa fa-lock"></i>
							<p className="unlockPlan">Unlock Plan</p>
						</div>
					</div>
					<div
						className={`left_pade ${isPlanActive("diamond") ? "" : "active"}`}
						style={{ cursor: "pointer" }}
						onClick={() => !isPlanActive("diamond") && navigate("/qrcode?plan=diamond")}>
						<div className="pade_plane">
							<img src={Diamond} />
						</div>
						<h4 className="pade_h4">Diamond</h4>
						<div className="planButton">
							<button className="earnIntErst">
								<Link className="pade_plane" to="/claim-reward/diamond">
									Earn Interest
								</Link>
							</button>
							<button
								className="TerminatePlan"
								onClick={() => {
									setSelectedPlan("diamond");
									setShowWarning(true);
								}}
								disabled={getTerminatePlanStatus("diamond")}>
							{getTerminatePlanStatus("diamond") ? getTerminatePlanStatus('diamond') === 'pending' ? 'Terminating' : 'Terminated' : "Terminate Plan"}
							</button>
						</div>
						<div className="lockPlan">
							<i className="fa fa-lock"></i>
							<p className="unlockPlan">Unlock Plan</p>
						</div>
					</div>
					<div
						className={`right_pade ${isPlanActive("platinum") ? "" : "active"}`}
						style={{ cursor: "pointer" }}
						onClick={() => !isPlanActive("platinum") && navigate("/qrcode?plan=platinum")}>
						<div className="pade_plane">
							<img src={Platinum} />
						</div>
						<h4 className="pade_h4">Platinum</h4>
						<div className="planButton">
							<button className="earnIntErst">
								<Link className="pade_plane" to="/claim-reward/platinum">
									Earn Interest
								</Link>
							</button>
							<button
								className="TerminatePlan"
								onClick={() => {
									setSelectedPlan("platinum");
									setShowWarning(true);
								}}
								disabled={getTerminatePlanStatus("platinum")}>
							{getTerminatePlanStatus("platinum") ? getTerminatePlanStatus('platinum') === 'pending' ? 'Terminating' : 'Terminated' : "Terminate Plan"}
							</button>
						</div>
						<div className="lockPlan">
							<i className="fa fa-lock"></i>
							<p className="unlockPlan">Unlock Plan</p>
						</div>
					</div>
				</div>

				<div
					className={`planeShowFree Vip ${isPlanActive("vip") ? "" : "active"}`}
					style={{ cursor: "pointer" }}
					onClick={() => !isPlanActive("vip") && navigate("/qrcode?plan=vip")}>
					<div className="pade_plane">
						<img src={Vip} />
					</div>
					<h4 className="pade_h4">Vip</h4>
					<div className="planButton">
						<button className="earnIntErst">
							<Link className="pade_plane" to="/claim-reward/vip">
								Earn Interest
							</Link>
						</button>
						<button
							className="TerminatePlan"
							onClick={() => {
								setSelectedPlan("vip");
								setShowWarning(true);
							}}
							disabled={getTerminatePlanStatus("vip")}>
							{getTerminatePlanStatus("vip") ? getTerminatePlanStatus('vip') === 'pending' ? 'Terminating' : 'Terminated' : "Terminate Plan"}
						</button>
					</div>
					<div className="lockPlan">
						<i className="fa fa-lock"></i>
						<p className="unlockPlan">Unlock Plan</p>
					</div>
				</div>
				<WarningModal
					showWarning={showWarning}
					handleShowWarning={() => {
						setShowWarning(false);
						setSelectedPlan("");
					}}
					selectedPlan={selectedPlan}
				/>
			</div>
		</>
	);
}

export default homePlansShow;
