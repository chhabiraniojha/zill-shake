import { useState } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './style.css'
import { Link } from "react-router-dom";

function Footer() {

    return (
        <>

            <div className="footer_icon">
                <div className="fot_icon" >
                    <Link to="/">
                        <i class="fa fa-home"></i>
                        <p>Home</p>
                    </Link>
                </div>
                <div className="fot_icon">
                <Link to="/order">
                <i class="fa fa-first-order" aria-hidden="true"></i>
                    <p>Orders</p>
                    </Link>
                </div>
                <div className="fot_icon">
                    <Link to="/promotion">
                        <i class="fa fa-line-chart"></i>
                        <p>Promotion</p>
                    </Link>
                </div>
                <div className="fot_icon" >
                    <Link to="/wallet">
                        <i class="fa fa-credit-card"></i>
                        <p>Wallet</p>
                    </Link>
                </div>
                <div className="fot_icon" >
                    <Link to="/Profile-account">
                        <i class='fa fa-user'></i>
                        <p>Account</p>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Footer