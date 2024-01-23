import { useState } from 'react'
import { Link } from "react-router-dom";

import './style.css'


function Promotion() {

    return (
        <>
            <div className="Promotion">

                <div className="paymentTotalUpgrade">
                    <h5 className="pagleTitle">Commission</h5>
                    <h3>$200</h3>
                    <p className="paymentTotal">today's total commission</p>
                    <p className="Upgrade">Upgrade the level to increase commission income</p>
                </div>

                <div className="directSubordinates">
                    <div className="list-group">
                        <p className="list-group-item list-group-item-action active" aria-current="true">
                            <i className='fa fa-user'></i> Direct subordinates
                             </p>
                        <p className="list-group-item list-group-item-action spanGroup"><span>0</span> Total Referals</p>
                        <p className="list-group-item list-group-item-action spanGroup"><span>$200</span>Total commission earned</p>
                    </div>
                    <div className="Invitation">
                            <Link className="InvitationLink">INVITATION LINK <i class="fa fa-copy"></i></Link>
                        </div>
                    <div className="copyInvitation">
                        
                        <ul>
                            <li><p>Copy invitation </p><p>8888888888888888 <i class="fa fa-copy"></i></p></li>
                            <li><Link to="/subordinate-data"><p>Subordinate data </p><p><i class="fa fa-angle-double-right"></i></p></Link></li>
                            <li><p>Commission detail </p><p><i class="fa fa-angle-double-right"></i></p></li>
                            <li><p>Agent line customer service </p><p><i class="fa fa-angle-double-right"></i></p></li>
                        </ul>
                    </div>

                </div>
            </div>

        </>
    )
}

export default Promotion