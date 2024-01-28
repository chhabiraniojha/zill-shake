import { Link } from "react-router-dom";
import Bronze from "../../../assets/img/mamberShipe/bronze.png"
import Copper from "../../../assets/img/mamberShipe/copper.png"
import Silver from "../../../assets/img/mamberShipe/silver.png"
import Gold from "../../../assets/img/mamberShipe/gold.png"
import Diamond from "../../../assets/img/mamberShipe/diamond.png"
import Platinum from "../../../assets/img/mamberShipe/platinum.png"
import Vip from "../../../assets/img/mamberShipe/vip.png"

import './style.css'


function PlaneShow() {

    return (
        <>

            {/* <div className="planeShow">
                <div className="planeShowFree">
                    <Link className="pade_plane" to="/claim-reward"><img src={Free} /></Link>
                    <h4 className="Free_h4">Free</h4>
                    <p className="free_pragrafe">If you use this site regularly and would like to help keep the site on the Internet</p>
                    </div>
                <div className="planeShowPade">
                    <div className="left_pade">
                        <Link className="pade_plane" to="/claim-reward"><img src={Silver} /></Link>
                        <h4 className="pade_h4">Pade</h4>
                        <p className="pade_pragrafe">If you use this site regularly and would like to help keep the site on the Internet</p>
                    </div>
                    <div className="right_pade">
                        <Link className="pade_plane" to="/claim-reward"><img src={Gold} /></Link>
                        <h4 className="pade_h4">Pade</h4>
                        <p className="pade_pragrafe">If you use this site regularly and would like to help keep the site on the Internet</p>
                    </div>
                    <div className="left_pade">
                        <Link className="pade_plane" to=""><img src={Diamond} /></Link>
                        <h4 className="pade_h4">Pade</h4>
                        <p className="pade_pragrafe">If you use this site regularly and would like to help keep the site on the Internet</p>
                    </div>
                    <div className="right_pade">
                        <Link className="pade_plane" to=""><img src={Platinum} /></Link>
                        <h4 className="pade_h4">Pade</h4>
                        <p className="pade_pragrafe">If you use this site regularly and would like to help keep the site on the Internet</p>
                    </div>
                    <div className="center_pade">
                        <Link className="pade_plane" to=""><img src={Vip} /></Link>
                        <h4 className="pade_h4">Pade</h4>
                        <p className="pade_pragrafe">If you use this site regularly and would like to help keep the site on the Internet</p>
                    </div>
                </div>
            </div> */}


            <div className="planeShow">
                <div className="card-wrap one">
                    <div className="card-header">
                        <img src={Bronze} />
                        <h1>Bronze</h1>
                        <p className="mamber_amount" >$19</p>
                    </div>
                    <div className="card-content">
                        <p className="card-content-option true"><i class="fa fa-check"></i>  Lorem ipsum dolor</p>
                        <p className="card-content-option false"><i class="fa fa-check"></i>  Lorem ipsum dolor</p>
                    </div>
                    <div className="card-footer">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        <button className="card-footer-btn">learn more</button>
                    </div>
                </div>
                <div className="card-wrap two">
                    <div className="card-header">
                        <img src={Copper} />
                        <h1>Copper</h1>
                        <p className="mamber_amount" >$19</p>
                    </div>
                    <div className="card-content">
                        <p className="card-content-option true"><i class="fa fa-check"></i>  Lorem ipsum dolor</p>
                        <p className="card-content-option false"><i class="fa fa-check"></i>  Lorem ipsum dolor</p>
                    </div>
                    <div className="card-footer">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        <button className="card-footer-btn">learn more</button>
                    </div>
                </div>
                <div className="card-wrap three">
                    <div className="card-header">
                        <img src={Silver} />
                        <h1>Silver</h1>
                        <p className="mamber_amount" >$19</p>
                    </div>
                    <div className="card-content">
                        <p className="card-content-option true"><i class="fa fa-check"></i>  Lorem ipsum dolor</p>
                        <p className="card-content-option false"><i class="fa fa-check"></i>  Lorem ipsum dolor</p>
                    </div>
                    <div className="card-footer">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        <button className="card-footer-btn">learn more</button>
                    </div>
                </div>
                <div className="card-wrap three">
                    <div className="card-header">
                        <img src={Gold} />
                        <h1>gold</h1>
                        <p className="mamber_amount" >$19</p>
                    </div>
                    <div className="card-content">
                        <p className="card-content-option true"><i class="fa fa-check"></i>  Lorem ipsum dolor</p>
                        <p className="card-content-option false"><i class="fa fa-check"></i>  Lorem ipsum dolor</p>
                    </div>
                    <div className="card-footer">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        <button className="card-footer-btn">learn more</button>
                    </div>
                </div>
                <div className="card-wrap three">
                    <div className="card-header">
                        <img src={Diamond} />
                        <h1>Diamond</h1>
                        <p className="mamber_amount" >$19</p>
                    </div>
                    <div className="card-content">
                        <p className="card-content-option true"><i class="fa fa-check"></i>  Lorem ipsum dolor</p>
                        <p className="card-content-option false"><i class="fa fa-check"></i>  Lorem ipsum dolor</p>
                    </div>
                    <div className="card-footer">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        <button className="card-footer-btn">learn more</button>
                    </div>
                </div>
                <div className="card-wrap three">
                    <div className="card-header">
                        <img src={Platinum} />
                        <h1>Platinum</h1>
                        <p className="mamber_amount" >$19</p>
                    </div>
                    <div className="card-content">
                        <p className="card-content-option true"><i class="fa fa-check"></i>  Lorem ipsum dolor</p>
                        <p className="card-content-option false"><i class="fa fa-check"></i>  Lorem ipsum dolor</p>
                    </div>
                    <div className="card-footer">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        <button className="card-footer-btn">learn more</button>
                    </div>
                </div>
                <div className="card-wrap three">
                    <div className="card-header">
                        <img src={Vip} />
                        <h1>Vip</h1>
                        <p className="mamber_amount" >$19</p>
                    </div>
                    <div className="card-content">
                        <p className="card-content-option true"><i class="fa fa-check"></i>  Lorem ipsum dolor</p>
                        <p className="card-content-option false"><i class="fa fa-check"></i>  Lorem ipsum dolor</p>
                    </div>
                    <div className="card-footer">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        <button className="card-footer-btn">learn more</button>
                    </div>
                </div>
            </div>


        </>
    )
}

export default PlaneShow