import { useState } from 'react'
import { Link } from "react-router-dom";
import './style.css'


function Registr() {

    return (
        <>

            <div className="Registr_ct">
                <h3>Register</h3>
                <p>Please register by phone number or email</p>
                <div className="register_phone">
                    <i class="fa fa-mobile"></i>
                    <p>Registr your phone</p>
                </div>
                <div className="form_dv">
                    <label for="Number"><b><i class="fa fa-mobile"></i> Phone Number</b></label>
                    <span><p>+91</p><input type="text" placeholder="Please enter the phone number" required /></span>
                </div>
                <div className="form_dv">
                    <label for="psw"><b><i class='fa fa-unlock-alt'></i> Set Password</b></label>
                    <input type="password" placeholder="Please enter Set password" name="psw" required />
                </div>

                <div className="form_dv">
                    <label for="psw"><b><i class='fa fa-unlock-alt'></i> Confirm Password</b></label>
                    <input type="password" placeholder="Enter Password ConFirm Password" name="psw" required />
                </div>
                <div className="form_dv">
                    <label for="email"><b><i class="fa fa-user-plus"></i> Invite Code</b></label>
                    <input type="phone" name="phone" placeholder="Enter Password Invite Code" required />
                </div>

                <button type="submit" className="clearfix">Sign Up</button>
                <div className="I_have_an_account">I have an account <Link className="clearfixcode">Login</Link></div>
            </div>



        </>
    )
}

export default Registr