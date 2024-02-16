import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { CustomAlertContext } from "../../context/customAlertContext";

function Login() {
	const [form, setForm] = useState({
		phone: "",
		password: "",
	});
	const [seePassword, setSeePassword] = useState(false);
	const [error, setError] = useState({});
	const [loading, setLoading] = useState(false);

	const handleInput = (e) => {
		setError({
			field: "",
			message: "",
		});
		const { target } = e;
		const { name, value } = target;
		if(target.name === 'phone' && isNaN(value)) return;
		setForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const navigate = useNavigate();

    const { setMessage, setOpen, setType } = useContext(CustomAlertContext)

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {

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


			setLoading(true);
			const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/login`, form, { withCredentials: true });
			console.log(res)
			setType("success");
			setMessage(res.data.message);
			setOpen(true);
			navigate("/");
		} catch (error) {
			console.log(error);
			if (error instanceof AxiosError) {
				setType("error");
				setMessage(error.response?.data?.message);
				setOpen(true);
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<form className="Registr_ct Login_ct" onSubmit={handleSubmit}>
				<h3>Log in</h3>
				<p>Please log in with your phone number. If you forget your password, please tap on forgot password button</p>
				<div className="register_phone">
					<i class="fa fa-mobile"></i>
					<p>Login with Phone</p>
				</div>
				<div className="form_dv">
					<label for="Number">
						<b>
							<i class="fa fa-mobile"></i> Phone Number
						</b>
					</label>
					<span>
						<p>+91</p>
						<input name="phone" type="text" placeholder="Please enter the phone number" onChange={handleInput} value={form.phone} />
					</span>
					{
						error.field === 'phone' && <p style={{ color: 'red' }}>{error.message}</p>
					}
				</div>
				<div className="form_dv password_input_container">
					<label for="psw">
						<b>
							<i class="fa fa-unlock-alt"></i> Password
						</b>
					</label>
					<input type={seePassword ? 'text' : 'password'} placeholder="Please enter Set password" name="password" onChange={handleInput} value={form.password} />
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
				</div>
				{
					error.field === 'password' && <p style={{ color: 'red' }}>{error.message}</p>
				}
				<button type="submit" className="clearfix" disabled={loading}>
					Login
				</button>
				<div className="I_have_an_account">
					<Link className="clearfixcode" to="/register">
						Register
					</Link>
				</div>
				<div className="servicesPot">
					<div className="services_tot_pot">
						<Link to="/reset-password">
							<i class="fa fa-unlock-alt"></i>
							<p>Forgot password</p>
						</Link>
					</div>
					<div className="services_tot_pot">
						<Link to="/support">
							<i class="fa fa-headphones"></i>
							<p>Customer Service</p>
						</Link>
					</div>
				</div>
			</form>
		</>
	);
}

export default Login;
