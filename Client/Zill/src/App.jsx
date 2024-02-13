import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import Header from "./component/navbar/header";
import Footer from "./component/footer/Footer";
import Registr from "./component/profileForm/registration";
import Login from "./component/profileForm/login";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
// import "bootstrap/dist/js/bootstrap.min.js";
import Home from "./component/dashboard/home";
import ClaimReward from "./component/dashboard/claimReward";
import ResetPassword from "./component/profileForm/resetPassword";
import ProfileAccount from "./component/account/profileAccount";
import Wallet from "./component/account/payment/wallet";
import Promotion from "./component/account/promotion/Promotion";
import Subordinatedata from "./component/account/promotion/Subordinatedata/Subordinatedata";
import Order from "./component/account/order/order";
import QrCode from "./component/account/payment/qrCode";
import "./App.css";
import { ToastContainer } from "react-toastify";
import UserProvider from "./context/userContext";
import "react-toastify/dist/ReactToastify.css";
import TerminationForm from "./component/account/plan/terminatePlanForm";
import axios from "axios";
import {CustomAlertProvider} from "./context/customAlertContext";
import Support from "./component/support/support";
import CommissionDetails from "./component/commission-details/page";

function App() {
	const [userAuthenticated, setUserAuthenticated] = useState(true);
	const [loading, setLoading] = useState(false);

	const location = useLocation();

	useEffect(() => {
		setLoading(true);
		axios
			.get(`${import.meta.env.VITE_BASE_URL}/api/user/me`, { withCredentials: true })
			.then((res) => {
				setUserAuthenticated(true);
			})
			.catch((err) => {
				setUserAuthenticated(false);
				if (location.pathname !== "/login" && location.pathname !== "/register" && location.pathname !== "/" && location.pathname !== "/reset-password") {
					window.location.href = "/#/login";
				}
			})
			.finally(() => {
				setLoading(false);
			});
	}, [location]);



	return (
		<CustomAlertProvider>
			<UserProvider>
				<Header />
				{!loading ? (
					<Routes>
						<Route exact path="/" element={<Home auth={userAuthenticated} />} />
						{userAuthenticated && (
							<>
								<Route exact path="/claim-reward/:plan" element={<ClaimReward />} />
								<Route exact path="/Profile-account" element={<ProfileAccount />} />
								<Route exact path="/wallet" element={<Wallet />} />
								<Route exact path="/promotion" element={<Promotion />} />
								<Route exact path="/qrcode" element={<QrCode />} />
								<Route exact path="/order" element={<Order />} />
								<Route exact path="/subordinate-data" element={<Subordinatedata />} />
								<Route exact path="/terminate" element={<TerminationForm />} />
								<Route exact path="/support" element={<Support />} />
							</>
						)}
						<Route exact path="/reset-password" element={<ResetPassword />} />
						<Route exact path="/register" element={<Registr />} />
						<Route exact path="/login" element={<Login />} />
						<Route exact path='/commission-details' element={<CommissionDetails />} />
					</Routes>
				) : (
					<div className="loading-wait-text">Wait Checking Auth Validation...</div>
				)}
				<Footer />
				{/* <ToastContainer limit={2} /> */}
			</UserProvider>
		</CustomAlertProvider>
	);
}

export default App;
