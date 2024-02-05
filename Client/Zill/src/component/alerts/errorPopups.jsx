import { Fragment } from "react";
import "./errorPopups.css";

const ErrorPopup = ({ message, onClose }) => {
	return (
		<div className="error_popup_container" onClick={onClose}>
			<div className="error_popup ">
				<i className="fa fa-warning"></i>
				<div className="error_popup_text">{message}</div>
			</div>
		</div>
	);
};

export default ErrorPopup;
