import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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
import 'react-toastify/dist/ReactToastify.css';


function App() {
	return (
		<UserProvider>
				<Header />

				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/register" element={<Registr />} />
					<Route exact path="/login" element={<Login />} />
					<Route exact path="/claim-reward" element={<ClaimReward />} />
					<Route exact path="/reset-password" element={<ResetPassword />} />
					<Route exact path="/Profile-account" element={<ProfileAccount />} />
					<Route exact path="/wallet" element={<Wallet />} />
					<Route exact path="/promotion" element={<Promotion />} />
					<Route exact path="/qrcode" element={<QrCode />} />
					<Route exact path="/order" element={<Order />} />
					<Route exact path="/subordinate-data" element={<Subordinatedata />} />
				</Routes>
				<Footer />
			<ToastContainer/>
		</UserProvider>
	);
}

export default App;
