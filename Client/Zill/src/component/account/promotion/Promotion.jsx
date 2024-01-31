import { useContext, useState } from 'react'
import { Link } from "react-router-dom";


import './style.css'
import { UserContext } from '../../../context/userContext';


function Promotion() {

    const { user } = useContext(UserContext)

    return (
        <>
            <div className="Promotion">

                <div className="paymentTotalUpgrade">
                    <h5 className="pagleTitle">Commission</h5>
                    <h3>${user.commission ?? 0}</h3>
                    <p className="paymentTotal">today's total commission</p>
                    <p className="Upgrade">Upgrade the level to increase commission income</p>
                </div>

                <div className="directSubordinates">
                    <div className="list-group">
                        <p className="list-group-item list-group-item-action active" aria-current="true">
                            <i className='fa fa-user'></i> Direct subordinates
                             </p>
                        <p className="list-group-item list-group-item-action spanGroup"><span>{user.total_refferals}</span> Total Referals</p>
                        <p className="list-group-item list-group-item-action spanGroup"><span>${user.commission}</span>Total commission earned</p>
                    </div>
                    <div className="Invitation">
                            <Link className="InvitationLink" onClick={(e) => {
                                e.preventDefault()
                                navigator.clipboard.writeText(`${window.location.origin}/#/register?invite_code=${user.refferal_code}`)
                            }}>INVITATION LINK <i class="fa fa-copy" onClick={() => {
                                navigator.clipboard.writeText(user.refferal_code)
                            }}></i></Link>
                        </div>
                    <div className="copyInvitation">
                        
                        <ul>
                            <li><p>Copy invitation </p><p>{user.refferal_code} <i style={{ cursor: "pointer" }} class="fa fa-copy" onClick={() => {
                                navigator.clipboard.writeText(user.refferal_code)
                            }}></i></p></li>
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