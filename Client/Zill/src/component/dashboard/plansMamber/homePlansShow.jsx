import { Link } from "react-router-dom";
import Bronze from "../../../assets/img/mamberShipe/bronze.png"
import Copper from "../../../assets/img/mamberShipe/copper.png"
import Silver from "../../../assets/img/mamberShipe/silver.png"
import Gold from "../../../assets/img/mamberShipe/gold.png"
import Diamond from "../../../assets/img/mamberShipe/diamond.png"
import Platinum from "../../../assets/img/mamberShipe/platinum.png"
import Vip from "../../../assets/img/mamberShipe/vip.png"

import './style.css'


function homePlansShow() {

    return (
        <>

            <div className="planeShow">

                <div className="planeShowPade">
                    <div className="left_pade active">
                        <div className="pade_plane"><img src={Bronze} /></div>

                        <h4 className="Free_h4">Bronze</h4>
                        <div className="planButton">
                            <button className="earnIntErst"><Link className="pade_plane" to="/claim-reward">Earn Interest</Link></button>
                            <button className="TerminatePlan">Terminate Plan</button>
                        </div>
                        <div className="lockPlan">
                            <i className="fa fa-lock"></i>
                            <p className="unlockPlan">Unlock Plan</p>
                        </div>
                    </div>
                    <div className="left_pade ">
                        <div className="pade_plane"><img src={Copper} /></div>
                        <h4 className="pade_h4">Copper</h4>
                        <div className="planButton">
                            <button className="earnIntErst"><Link className="pade_plane" to="/claim-reward">Earn Interest</Link></button>
                            <button className="TerminatePlan">Terminate Plan</button>
                        </div>
                        <div className="lockPlan ">
                            <i className="fa fa-lock"></i>
                            <p className="unlockPlan">Unlock Plan</p>
                        </div>
                    </div>
                    <div className="right_pade active">
                        <div className="pade_plane"><img src={Silver} /></div>
                        <h4 className="pade_h4">Silver</h4>
                        <div className="planButton">
                            <button className="earnIntErst"><Link className="pade_plane" to="/claim-reward">Earn Interest</Link></button>
                            <button className="TerminatePlan">Terminate Plan</button>
                        </div>
                        <div className="lockPlan">
                            <i className="fa fa-lock"></i>
                            <p className="unlockPlan">Unlock Plan</p>
                        </div>
                    </div>
                    <div className="right_pade">
                        <div className="pade_plane"><img src={Gold} /></div>
                        <h4 className="pade_h4">Gold</h4>
                        <div className="planButton">
                            <button className="earnIntErst"><Link className="pade_plane" to="/claim-reward">Earn Interest</Link></button>
                            <button className="TerminatePlan">Terminate Plan</button>
                        </div>
                        <div className="lockPlan">
                            <i className="fa fa-lock"></i>
                            <p className="unlockPlan">Unlock Plan</p>
                        </div>
                    </div>
                    <div className="left_pade">
                        <div className="pade_plane"><img src={Diamond} /></div>
                        <h4 className="pade_h4">Diamond</h4>
                        <div className="planButton">
                            <button className="earnIntErst"><Link className="pade_plane" to="/claim-reward">Earn Interest</Link></button>
                            <button className="TerminatePlan">Terminate Plan</button>
                        </div>
                        <div className="lockPlan">
                            <i className="fa fa-lock"></i>
                            <p className="unlockPlan">Unlock Plan</p>
                        </div>
                    </div>
                    <div className="right_pade">
                        <div className="pade_plane"><img src={Platinum} /></div>
                        <h4 className="pade_h4">Platinum</h4>
                        <div className="planButton">
                            <button className="earnIntErst"><Link className="pade_plane" to="/claim-reward">Earn Interest</Link></button>
                            <button className="TerminatePlan">Terminate Plan</button>
                        </div>
                        <div className="lockPlan">
                            <i className="fa fa-lock"></i>
                            <p className="unlockPlan">Unlock Plan</p>
                        </div>
                    </div>
                </div>

                <div className="planeShowFree Vip active">
                    <div className="pade_plane"><img src={Vip} /></div>
                    <h4 className="pade_h4">Vip</h4>
                    <div className="planButton">
                        <button className="earnIntErst"><Link className="pade_plane" to="/claim-reward">Earn Interest</Link></button>
                        <button className="TerminatePlan">Terminate Plan</button>
                    </div>
                    <div className="lockPlan">
                        <i className="fa fa-lock"></i>
                        <p className="unlockPlan">Unlock Plan</p>
                    </div>
                </div>
            </div>







        </>
    )
}

export default homePlansShow