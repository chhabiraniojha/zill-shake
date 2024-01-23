import { useState } from 'react'
import { Link } from "react-router-dom";
import Free from "../../assets/img/mamberShipe/free.png"
import Silver from "../../assets/img/mamberShipe/silver.png"
import Gold from "../../assets/img/mamberShipe/gold.png"
import Diamond from "../../assets/img/mamberShipe/diamond.png"
import Platinum from "../../assets/img/mamberShipe/platinum.png"
import Vip from "../../assets/img/mamberShipe/vip.png"
import Lock from "../../assets/img/mamberShipe/lock.png"
import './style.css'


function profileAccount() {

    return (
        <>
            <div className="profileAccount">
                <div className="accountPOf">
                    <div className="profileIcon">
                        <i class='fa fa-user'></i>
                    </div>
                    <div className="accountText">

                        <p className="usd">UID | 321456 </p>
                        <p className="joinDate">Last login: <span>2024-01-21 17:25:31</span></p>
                    </div>

                </div>
            </div>

            <div className="totel_amount">
                <p>Total balance <b>₹ 0. 00</b></p>
            </div>

            <div className="mamber">
                <p className="User_mamber ">
                    <img className="pad_mamber" src={Free} />
                    <img className="lock_mamber" src={Lock} />
                </p>
                <p className="User_mamber active">
                    <img className="pad_mamber" src={Silver} />
                    <img  className="lock_mamber" src={Lock} />
                </p>
                <p className="User_mamber active">
                    <img className="pad_mamber" src={Gold} />
                    <img  className="lock_mamber" src={Lock} />
                </p>
                <p className="User_mamber active">
                    <img className="pad_mamber" src={Diamond} />
                    <img  className="lock_mamber" src={Lock} />
                </p>
                <p className="User_mamber active">
                    <img className="pad_mamber" src={Platinum} />
                    <img  className="lock_mamber" src={Lock} />
                </p>
                <p className="User_mamber active">
                    <img className="pad_mamber" src={Vip} />
                    <img className="lock_mamber" src={Lock} />
                </p>
            </div>

            <div className="Logout">
                <button><i class="fa fa-sign-out"></i> Log Out</button>
            </div>


        </>
    )
}

export default profileAccount