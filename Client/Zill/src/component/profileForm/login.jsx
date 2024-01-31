import { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import axios, { AxiosError } from "axios";
import { toast } from 'react-toastify';

function Login() {
	const [form, setForm] = useState({
		phone: "",
		password: "",
	});
	const [loading, setLoading] = useState(false)

	const handleInput = (e) => {
		const { target } = e;
		const { name, value } = target;
		setForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true)
			const res = await axios.post("http://localhost:3000/api/auth/login", form, { withCredentials: true });
			toast.success(res.data?.message)
		} catch (error) {
			console.log(error);
			if (error instanceof AxiosError) {
				toast.error(error?.response?.data?.message);
			}
		} finally {
			setLoading(false)
		}
	};

	return (
		<>
			<form className="Registr_ct Login_ct" onSubmit={handleSubmit}>
				<h3>Log in</h3>
				<p>Please log in with your phone number or email. If you forget your password, please contact customer service</p>
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
						<input name="phone" type="text" placeholder="Please enter the phone number" required onChange={handleInput} value={form.phone} />
					</span>
				</div>
				<div className="form_dv">
					<label for="psw">
						<b>
							<i class="fa fa-unlock-alt"></i> Password
						</b>
					</label>
					<input type="password" placeholder="Please enter Set password" name="password" required onChange={handleInput} value={form.password} />
				</div>

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
						<Link to="">
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
