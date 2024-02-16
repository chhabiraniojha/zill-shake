import { useCallback, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { CustomAlertContext } from "../../context/customAlertContext";

function Registr() {
	const [searchParam, setSearchParam] = useSearchParams();

	const [form, setForm] = useState({
		phone: "",
		password: "",
		confirmPassword: "",
		invite_code: searchParam.get("invite_code") ?? "",
	});
	const [seePassword, setSeePassword] = useState(false);
	const [seeConfirmPassword, setSeeConfirmPassword] = useState(false);
	const [error, setError] = useState({
		field: "",
		message: "",
	});
	const [isLoading, setIsLoading] = useState(false); // Add isLoading state

	const handleInput = (e) => {

        if(e.target.name === "phone" && isNaN(e.target.value)) return;
        if(e.target.name === 'invite_code' && isNaN(e.target.value)) return;

		setError({
			field: "",
			message: "",
		});
		const { target } = e;
		const { name, value } = target;
		setForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const { setMessage, setOpen, setType } = useContext(CustomAlertContext);

	const navigate = useNavigate();

	const handleSubmit = useCallback(
		async (e) => {
			e.preventDefault();

			if (form.phone === "") {
				setType("error");
				setMessage("wrong phone number");
				setOpen(true);
				setError({
					field: "phone",
					message: "Phone number is required",
				});
				return;
			}

			if (form.phone.length < 10) {
				setType("error");
				setMessage("wrong phone number");
				setOpen(true);
				setError({
					field: "phone",
					message: "phone should be atleast 10 characters long",
				});
				return;
			}

			if (form.phone.length > 10) {
				setType("error");
				setMessage("wrong phone number");
				setOpen(true);
				setError({
					field: "phone",
					message: "phone should be atmost 10 characters long",
				});
				return;
			}

			if (form.password === "") {
				setType("error");
				setMessage("Password is required");
				setOpen(true);
				setError({
					field: "password",
					message: "Password is required",
				});
				return;
			}

			if (form.password.length < 8) {
				setType("error");
				setMessage("Password must be 8 characters long and should contain at least one letter and one number");
				setOpen(true);
				setError({
					field: "password",
					message: "password must be 8 characters long and should contain at least one letter and one number",
				});
				return;
			}

			if (!/[a-zA-Z]/.test(form.password)) {
				setType("error");
				setMessage("password should be 8 characters long and should contain at least one letter and one number");
				setOpen(true);
				setError({
					field: "password",
					message: "password should be 8 characters long and should contain at least one letter and one number",
				});
				return;
			}

			if (!/\d/.test(form.password)) {
				setType("error");
				setMessage("password should be 8 characters long and should contain at least one letter and one number");
				setOpen(true);
				setError({
					field: "password",
					message: "password should be 8 characters long and should contain at least one letter and one number",
				});
				return;
			}

			if (form.confirmPassword === "") {
				setType("error");
				setMessage("Confirm Password is required");
				setOpen(true);
				setError({
					field: "confirmPassword",
					message: "Confirm Password is required",
				});
				return;
			}

			if (form.password !== form.confirmPassword) {
				setType("error");
				setMessage("Password and Confirm Password should be same");
				setOpen(true);
				setError({
					field: "confirmPassword",
					message: "Password and Confirm Password should be same",
				});
				return;
			}

			if (form.invite_code === 0 || form.invite_code === "" || !form.invite_code) {
				setType("error");
				setMessage("Invite code is required");
				setOpen(true);
				setError({
					field: "invite_code",
					message: "Invite code is required",
				});
				return;
			}

			try {
				setIsLoading(true); // Set isLoading to true
				const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/register`, form, { withCredentials: true });
				setType("success");
				setMessage("Successfully registered");
				setOpen(true);
				navigate("/login");
			} catch (error) {
				if (error instanceof AxiosError) {
					setType("error");
					setMessage(error?.response?.data?.message);
					setOpen(true);
				} else {
					setType("error");
					setMessage("Something went wrong");
					setOpen(true);
				}
			} finally {
				setIsLoading(false); // Set isLoading to false
			}
		},
		[form, setMessage, setOpen, setType]
	);

	return (
		<>
			<div className="Registr_ct">
				<h3>Register</h3>
				<p>Please register by phone number</p>
				<div className="register_phone">
					<i className="fa fa-mobile"></i>
					<p>Register your phone</p>
				</div>
				<form onSubmit={handleSubmit}>
					<div className="form_dv">
						<label htmlFor="phone">
							<b>
								<i className="fa fa-mobile"></i> Phone Number
							</b>
						</label>
						<span>
							<p>+91</p>
							<input
								type="text"
								placeholder="Please enter the phone number"
								name="phone"
								value={form.phone}
								onChange={handleInput}
							/>
						</span>
						{error.field === "phone" && <p style={{ color: "red" }}>{error.message}</p>}
					</div>
					<div className="form_dv password_input_container">
						<label htmlFor="password">
							<b>
								<i className="fa fa-unlock-alt"></i> Set Password
							</b>
						</label>
						<input
							type={seePassword ? "text" : "password"}
							className="password_input"
							placeholder="Please enter Set password"
							name="password"
							value={form.password}
							onChange={handleInput}
						/>
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
						{error.field === "password" && <p style={{ color: "red" }}>{error.message}</p>}
					</div>
					<div className="form_dv password_input_container">
						<label htmlFor="confirmPassword">
							<b>
								<i className="fa fa-unlock-alt"></i> Confirm Password
							</b>
						</label>
						<input
							type={seeConfirmPassword ? "text" : "password"}
							placeholder="Enter Password Confirm Password"
							name="confirmPassword"
							value={form.confirmPassword}
							onChange={handleInput}
						/>
						{seeConfirmPassword ? (
							<img
								width="20"
								height="20"
								className="password_input_eye"
								src="https://img.icons8.com/ios-glyphs/30/000000/visible--v1.png"
								alt="visible--v1"
								onClick={() => setSeeConfirmPassword(!seeConfirmPassword)}
							/>
						) : (
							<img
								width="20"
								height="20"
								onClick={() => setSeeConfirmPassword(!seeConfirmPassword)}
								className="password_input_eye"
								src="https://img.icons8.com/ios-glyphs/30/blind.png"
								alt="blind"
							/>
						)}
						{error.field === "confirmPassword" && <p style={{ color: "red" }}>{error.message}</p>}
					</div>
					<div className="form_dv">
						<label htmlFor="invite_code">
							<b>
								<i className="fa fa-user-plus"></i> Invite Code
							</b>
						</label>
						<input type="text" name="invite_code" placeholder="Enter Invite Code" value={form.invite_code} onChange={handleInput} />
						{error.field === "invite_code" && <p style={{ color: "red" }}>{error.message}</p>}
					</div>
					<button type="submit" className="clearfix" disabled={isLoading}>
						{isLoading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Sign Up"}
					</button>
				</form>
				<div className="I_have_an_account">
					I have an account{" "}
					<Link to={"/login"} className="clearfixcode">
						Login
					</Link>
				</div>
			</div>
		</>
	);
}

export default Registr;
