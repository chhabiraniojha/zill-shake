import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import axios, { AxiosError } from "axios";
import { sendOtp, verifyOtp } from "../../services/otp";
import { CustomAlertContext } from "../../context/customAlertContext";
import { Button, Spinner } from "react-bootstrap";

function ResetPassword() {
	const [form, setForm] = useState({
		phone: "",
		password: "",
		confirmPassword: "",
	});
	const [otp, setOtp] = useState("");
	const [otpTimer, setOtpTimer] = useState('00:00');
	const otpTimerId = useRef(null)
	const [resendOtp, setResendOtp] = useState(false);
	const [seePassword, setSeePassword] = useState(false);
	const [seeConfirmPassword, setSeeConfirmPassword] = useState(false);
	const [otpLoading, setOtpLoading] = useState(false);
	const [formSubmitLoading, setFormSubmitLoading] = useState(false);
	const [error, setError] = useState({
		field: "",
		message: "",
	});

	const handleInput = (e) => {
		setError({ field: "", message: "" });
		const { target } = e;
		const { name, value } = target;
		if (name === "phone" && isNaN(value)) return;
		setForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleOtp = async () => {
		setOtpLoading(true);
		axios
			.post(`${import.meta.env.VITE_BASE_URL}/api/otp/send`, { phoneNumber: `+91${form.phone}` })
			.then((res) => {
				let second = 60 * 3;
				otpTimerId.current = setInterval(() => {
					second--
					let min = Math.floor(second / 60);
					let sec = second % 60;
					if (min <= 0 && sec <= 0) {
						clearInterval(otpTimerId.current);
						otpTimerId.current = null;
						setResendOtp(true);
						setOtpTimer('00:00');
						return;
					}
					setOtpTimer(`${min}:${sec}`);
				} , 1000);
			})
			.catch((error) => {
				console.error(error);
			}).finally(() => {
				setOtpLoading(false);
			});
	};

	const { setOpen, setType, setMessage } = useContext(CustomAlertContext);

	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (form.phone === "") {
			setError({ field: "phone", message: "Phone number is required" });
			return;
		}

		if (form.password === "") {
			setError({ field: "password", message: "Password is required" });
			return;
		}

		if (form.password && !/(?=.*[a-zA-Z])(?=.*[0-9])/.test(form.password)) {
			setError({ field: "password", message: "Password must contain at least one letter and one number" });
			return;
		}

		if (form.confirmPassword === "") {
			setError({ field: "confirmPassword", message: "Confirm password is required" });
			return;
		}

		if (form.password !== form.confirmPassword) {
			setError({ field: "confirmPassword", message: "Password and confirm password must be the same" });
			return;
		}

		if (otp === "") {
			setError({ field: "otp", message: "OTP is required" });
			return;
		}

		try {
			setFormSubmitLoading(true);
			const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/reset-password`, {
				phone: `+91${form.phone}`,
				password: form.password,
				otp,
			});
			setFormSubmitLoading(false);
			setType("success");
			setMessage("Password reset successfully");
			setOpen(true);
			navigate('/login')
		} catch (error) {
			if (error instanceof AxiosError) {
				console.error(error);
				setType("error");
				setMessage(error.response.data.message);
				setOpen(true);
			}
		}
	};

	useEffect(() => {
		if (error.message === "") return;
		setType("error");
		setMessage(error.message);
		setOpen(true);
	}, [error]);

	useEffect(() => {

		return () => {
			clearInterval(otpTimerId.current);
		}
	}, []);

	return (
		<>
			<form onSubmit={handleSubmit} className="Registr_ct">
				<h3>Forgot password</h3>
				<p>Please retrieve/change your password through your mobile phone number or email</p>
				<div className="register_phone">
					<i class="fa fa-mobile"></i>
					<p>Reset phone </p>
				</div>
				<div className="form_dv">
					<label for="Number">
						<b>
							<i class="fa fa-mobile"></i> Phone Number
						</b>
					</label>
					<span>
						<p>+91</p>
						<input name="phone" type="tel" placeholder="Please enter the phone number" value={form.phone} onChange={handleInput} />
						{error.field === "phone" && (
							<span className="error" style={{ color: "red" }}>
								{error.message}
							</span>
						)}
					</span>
				</div>
				<div className="form_dv password_input_container">
					<label for="psw">
						<b>
							<i class="fa fa-unlock-alt"></i> A new password
						</b>
					</label>
					<input type={seePassword ? 'text' : 'password'} placeholder="Please enter Set password" name="password" value={form.password} onChange={handleInput} />
					{seePassword ? (
							<img
								width="20"
								height="20"
								className="password_input_eye"
								src="https://img.icons8.com/ios-glyphs/30/000000/visible--v1.png"
								alt="visible--v1"
								onClick={() => setSeePassword(!seePassword)}
							/>
						) : (
							<img
								width="20"
								height="20"
								onClick={() => setSeePassword(!seePassword)}
								className="password_input_eye"
								src="https://img.icons8.com/ios-glyphs/30/blind.png"
								alt="blind"
							/>
						)}
					{error.field === "password" && (
						<span className="error" style={{ color: "red" }}>
							{error.message}
						</span>
					)}
				</div>

				<div className="form_dv password_input_container">
					<label for="psw">
						<b>
							<i class="fa fa-unlock-alt"></i> Confirm new password
						</b>
					</label>
					<input
						type={seeConfirmPassword ? 'text' : 'password'}
						placeholder="Enter Password"
						name="confirmPassword"
						onChange={handleInput}
						value={form.confirmPassword}
					/>
					{seeConfirmPassword ? (
							<img
								width="20"
								height="20"
								className="password_input_eye"
								src="https://img.icons8.com/ios-glyphs/30/000000/visible--v1.png"
								alt="visible--v1"
								onClick={() => setSeeConfirmPassword(!seePassword)}
							/>
						) : (
							<img
								width="20"
								height="20"
								onClick={() => setSeeConfirmPassword(!seePassword)}
								className="password_input_eye"
								src="https://img.icons8.com/ios-glyphs/30/blind.png"
								alt="blind"
							/>
						)}
					{error.field === "confirmPassword" && (
						<span className="error" style={{ color: "red" }}>
							{error.message}
						</span>
					)}
				</div>
				<div className="form_dv Verification error">
					<label for="email">
						<b>
							<i class="fa fa-shield"></i> Verification Code
						</b>
					</label>
					<span className="verifcode">
						<input
							type="phone"
							name="phone"
							placeholder="Please enter the confirmation code"
							value={otp}
							onChange={(e) => setOtp(e.target.value)}
						/>
					</span>
					{
						otpTimerId.current ? (
							<span>{otpTimer}</span>
						) : (
							<Button
								onClick={handleOtp}
								type="button"
								className="my-2"
								disabled={otpLoading}
							>
								{otpLoading && <Spinner size="sm" className="custom-spinner" />} send
							</Button>
						)
					}
				</div>
				{error.field === "otp" && (
					<span className="error" style={{ color: "red" }}>
						{error.message}
					</span>
				)}
				<button type="submit" className="clearfix">
					{formSubmitLoading && <Spinner size="sm"/>} Reset
				</button>
			</form>
		</>
	);
}

export default ResetPassword;
