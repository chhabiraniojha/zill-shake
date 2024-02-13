import { Link } from "react-router-dom";
import Slider from "./slider";
import HomePlansShow from "./plansMamber/homePlansShow";
import "./style.css";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

function Home({ auth }) {
	return (
		<>
			{!auth && (
				<div className="log_reg_but">
					<div class="welcome_game">
						<p className="Welcome">Welcome to Zill Money</p>
						<p className="Start_Your">Start Your Happy Journey</p>
					</div>
					<div className="reg_log_but">
						<Link className="reg_log_but_lin log_but" to="/login">
							Log In
						</Link>
						<Link className="reg_log_but_lin reg_but" to="/register">
							Register
						</Link>
					</div>
				</div>
			)}
			<Slider />
			<HomePlansShow />
		</>
	);
}

export default Home;
