import { Link } from "react-router-dom";
import Bronze from "../../../assets/img/mamberShipe/bronze.png"
import Copper from "../../../assets/img/mamberShipe/copper.png"
import Silver from "../../../assets/img/mamberShipe/silver.png"
import Gold from "../../../assets/img/mamberShipe/gold.png"
import Diamond from "../../../assets/img/mamberShipe/diamond.png"
import Platinum from "../../../assets/img/mamberShipe/platinum.png"
import Vip from "../../../assets/img/mamberShipe/vip.png"

import './style.css'
import { useContext, useCallback } from "react";
import { UserContext } from "../../../context/userContext";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";


function homePlansShow() {

    const { plans } = useContext(UserContext)

	const isPlanActive = useCallback((plan) => plans.includes(plan), [plans]);

    const terminatePlan = async (plan) => {
        try {
            const res = await axios.delete('http://localhost:3000/api/user/plans', {
                data: {
                    plan_id: plan
                },
                withCredentials: true
            })
            toast.success(res.data.message)
        } catch (error) {
            if(error instanceof AxiosError) {
                toast.error(error.response.data.message)
            }
        }
    }
    return (
        <>

            <div className="planeShow">

                <div className="planeShowPade">
                    <div className={`right_pade ${plans.includes('bronze') ? '' : 'active'}`}>
                        <div className="pade_plane"><img src={Bronze} /></div>

                        <h4 className="Free_h4">Bronze</h4>
                        <div className="planButton">
                            <button className="earnIntErst"><Link className="pade_plane" to="/claim-reward">Earn Interest</Link></button>
                            <button className="TerminatePlan" onClick={() => terminatePlan('bronze')}>Terminate Plan</button>
                        </div>
                        <div className="lockPlan">
                            <i className="fa fa-lock"></i>
                            <p className="unlockPlan">Unlock Plan</p>
                        </div>
                    </div>
                    <div className={`left_pade ${plans.includes('copper') ? '' : 'active'}`}>
                        <div className="pade_plane"><img src={Copper} /></div>
                        <h4 className="pade_h4">Copper</h4>
                        <div className="planButton">
                            <button className="earnIntErst"><Link className="pade_plane" to="/claim-reward">Earn Interest</Link></button>
                            <button className="TerminatePlan" onClick={() => terminatePlan('copper')}>Terminate Plan</button>
                        </div>
                        <div className="lockPlan ">
                            <i className="fa fa-lock"></i>
                            <p className="unlockPlan">Unlock Plan</p>
                        </div>
                    </div>
                    <div className={`right_pade ${plans.includes('silver') ? '' : 'active'}`}>
                        <div className="pade_plane"><img src={Silver} /></div>
                        <h4 className="pade_h4">Silver</h4>
                        <div className="planButton">
                            <button className="earnIntErst"><Link className="pade_plane" to="/claim-reward">Earn Interest</Link></button>
                            <button className="TerminatePlan" onClick={() => terminatePlan('silver')}>Terminate Plan</button>
                        </div>
                        <div className="lockPlan">
                            <i className="fa fa-lock"></i>
                            <p className="unlockPlan">Unlock Plan</p>
                        </div>
                    </div>
                    <div className={`left_pade ${plans.includes('gold') ? '' : 'active'}`}>
                        <div className="pade_plane"><img src={Gold} /></div>
                        <h4 className="pade_h4">Gold</h4>
                        <div className="planButton">
                            <button className="earnIntErst"><Link className="pade_plane" to="/claim-reward">Earn Interest</Link></button>
                            <button className="TerminatePlan" onClick={() => terminatePlan('gold')}>Terminate Plan</button>
                        </div>
                        <div className="lockPlan">
                            <i className="fa fa-lock"></i>
                            <p className="unlockPlan">Unlock Plan</p>
                        </div>
                    </div>
                    <div className={`left_pade ${plans.includes('diamond') ? '' : 'active'}`}>
                        <div className="pade_plane"><img src={Diamond} /></div>
                        <h4 className="pade_h4">Diamond</h4>
                        <div className="planButton">
                            <button className="earnIntErst"><Link className="pade_plane" to="/claim-reward">Earn Interest</Link></button>
                            <button className="TerminatePlan" onClick={() => terminatePlan('diamond')}>Terminate Plan</button>
                        </div>
                        <div className="lockPlan">
                            <i className="fa fa-lock"></i>
                            <p className="unlockPlan">Unlock Plan</p>
                        </div>
                    </div>
                    <div className={`right_pade ${plans.includes('platinum') ? '' : 'active'}`}>
                        <div className="pade_plane"><img src={Platinum} /></div>
                        <h4 className="pade_h4">Platinum</h4>
                        <div className="planButton">
                            <button className="earnIntErst"><Link className="pade_plane" to="/claim-reward">Earn Interest</Link></button>
                            <button className="TerminatePlan" onClick={() => terminatePlan('platinum')}>Terminate Plan</button>
                        </div>
                        <div className="lockPlan">
                            <i className="fa fa-lock"></i>
                            <p className="unlockPlan">Unlock Plan</p>
                        </div>
                    </div>
                </div>

                <div className={`planeShowFree Vip ${plans.includes('vip') ? '' : 'active'}`}>
                    <div className="pade_plane"><img src={Vip} /></div>
                    <h4 className="pade_h4">Vip</h4>
                    <div className="planButton">
                        <button className="earnIntErst"><Link className="pade_plane" to="/claim-reward">Earn Interest</Link></button>
                        <button className="TerminatePlan" onClick={() => terminatePlan('vip')}>Terminate Plan</button>
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