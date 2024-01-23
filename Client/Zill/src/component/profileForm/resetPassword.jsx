import { useState } from 'react'
import { Link } from "react-router-dom";
import './style.css'


function ResetPassword() {

    return (
        <>

            <div className="Registr_ct">
                <h3>Forgot password</h3>
                <p>Please retrieve/change your password through your mobile phone number or email</p>
                <div className="register_phone">
                    <i class="fa fa-mobile"></i>
                    <p>Reset phone </p>
                </div>
                <div className="form_dv">
                    <label for="Number"><b><i class="fa fa-mobile"></i> Phone Number</b></label>
                    <span><p>+91</p><input type="text" placeholder="Please enter the phone number" required /></span>
                </div>
                <div className="form_dv">
                    <label for="psw"><b><i class='fa fa-unlock-alt'></i> A new password</b></label>
                    <input type="password" placeholder="Please enter Set password" name="psw" required />
                </div>

                <div className="form_dv">
                    <label for="psw"><b><i class='fa fa-unlock-alt'></i> Confirm new password</b></label>
                    <input type="password" placeholder="Enter Password ConFirm Password" name="psw" required />
                </div>
                <div className="form_dv Verification error">
                    <label for="email"><b><i class="fa fa-shield"></i> Verification Code</b></label>
                    <span className="verifcode">
                        <input type="phone" name="phone" placeholder="Please enter the confirmation code" required />
                        <button>Send</button>
                    </span>
                    <span className="error" style={{color: "red"}}>Did not receive verification code?</span>

                </div>

                <button type="submit" className="clearfix">Rseat</button>
            
            </div>



        </>
    )
}

export default ResetPassword