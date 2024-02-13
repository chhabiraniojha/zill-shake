import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Zill Money Logo.png"
import "./style.css";

function Header() {
	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light bg-light header_bar fixed-top">
				<Link class="navbar-brand" href="#">
					<img src={logo} width="30" height="30" alt="" />
                    <span className="mx-2" style={{color: "#e7a628", fontWeight:"1200", fontFamily:"serif",fontSize:"20px"}}>Zill Money</span>
				</Link>{" "}
				<div className="navbar_right_but">
					<Link to="/">
						<i class="fa fa-bell"></i>
					</Link>
				</div>
			</nav>
		</>
	);
}

export default Header;
