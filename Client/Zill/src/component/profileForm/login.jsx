import { useState } from 'react'
import { Link } from "react-router-dom";
import './style.css'


function Login() {

    return (
        <>

            <div className="Registr_ct Login_ct">
                <h3>Log in</h3>
                <p>Please log in with your phone number or email. If you forget your password, please contact customer service</p>
                <div className="register_phone">
                    <i class="fa fa-mobile"></i>
                    <p>Login with Phone</p>
                </div>
                <div className="form_dv">
                    <label for="Number"><b><i class="fa fa-mobile"></i> Phone Number</b></label>
                    <span><p>+91</p><input type="text" placeholder="Please enter the phone number" required /></span>
                </div>
                <div className="form_dv">
                    <label for="psw"><b><i class='fa fa-unlock-alt'></i> Password</b></label>
                    <input type="password" placeholder="Please enter Set password" name="psw" required />
                </div>


                <Link type="submit" className="clearfix">Login</Link>
                <div className="I_have_an_account"><Link className="clearfixcode">Register</Link></div>
                <div className="servicesPot">
                    <div className="services_tot_pot">
                        <Link to="">
                            <i class='fa fa-unlock-alt'></i>
                            <p >Forgot password</p>
                        </Link>

                    </div>
                    <div className="services_tot_pot">
                        <Link to="">
                            <i class="fa fa-headphones"></i>
                            <p >Customer Service</p>
                        </Link>

                    </div>
                </div>
            </div>



        </>
    )
}

export default Login