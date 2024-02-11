import { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Header() {
	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light bg-light header_bar fixed-top">
				<Link class="navbar-brand" href="#">
					<img src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" width="30" height="30" alt="" />
                    <span className="mx-2">Zill money</span>
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
