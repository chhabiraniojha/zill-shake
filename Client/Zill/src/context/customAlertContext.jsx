import { createContext, useEffect, useState } from "react";
import ErrorPopup from "../component/alerts/errorPopups";
import SuccessModal from "../component/modals/successModal";
import LoadingModal from "../component/modals/loadingModal";

const CustomAlertContext = createContext();

const CustomAlertProvider = ({ children }) => {
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState("");
	const [type, setType] = useState("");
	const [timer, setTimer] = useState(null);

	useEffect(() => {
		if (open) {
			setTimer(
				setTimeout(() => {
					setOpen(false);
					setType("");
				}, 3000)
			);
		} else {
			clearTimeout(timer);
		}
	}, [open, setOpen]);

	return (
		<CustomAlertContext.Provider value={{ open, setOpen, message, setMessage, type, setType }}>
			{children}
			{open && type === "error" && <ErrorPopup message={message} onClose={() => setOpen(false)} />}
			{open && type === "success" && <SuccessModal open={true} message={message} onClose={() => setOpen(false)} />}
			{open && type === "loading" && <LoadingModal open={true} onClose={() => setOpen(false)} />}
		</CustomAlertContext.Provider>
	);
};

export { CustomAlertProvider, CustomAlertContext };
