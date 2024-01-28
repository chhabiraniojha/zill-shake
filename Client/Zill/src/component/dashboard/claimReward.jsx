import { Link } from "react-router-dom";

import './style.css'


function claimReward() {

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/"><i className="fa fa-angle-double-left"></i> Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Bronze</li>
                </ol>
            </nav>
            <h4 className="claimRewardManeDvPlane">Bronze</h4>
            <div className="claimRewardManeDv">
                <div className="claimReward Claimeded">
                    <div className="icon_right">
                        <i class="fa fa-quote-left"></i>
                    </div>
                    <div className="content_center">
                        <h5>Task 1</h5>
                        <p>coines successfully acquir</p>
                    </div>
                    <div className="geat_claim_reward_right">
                        <p>Claimed</p>
                    </div>
                </div>
                <div className="claimReward Claimeded">
                    <div className="icon_right">
                        <i class="fa fa-quote-left"></i>
                    </div>
                    <div className="content_center">
                        <h5>Task 1</h5>
                        <p>coines successfully acquir</p>
                    </div>
                    <div className="geat_claim_reward_right">
                        <p>Claimed</p>
                    </div>
                </div>
                <div className="claimReward panding">
                    <div className="icon_right">
                        <i class="fa fa-quote-left"></i>
                    </div>
                    <div className="content_center">
                        <h5>Task 2</h5>
                        <p>You're done 0 out of 419</p>
                    </div>
                    <div className="geat_claim_reward_right">
                        <Link to=""><p><i class="fa fa-quote-left"></i> 419</p></Link>
                    </div>
                </div>
                <div className="claimReward panding">
                    <div className="icon_right">
                        <i class="fa fa-quote-left"></i>
                    </div>
                    <div className="content_center">
                        <h5>Task 2</h5>
                        <p>You're done 0 out of 419</p>
                    </div>
                    <div className="geat_claim_reward_right">
                        <Link to=""><p><i class="fa fa-quote-left"></i> 419</p></Link>
                    </div>
                </div>
                <div className="claimReward panding">
                    <div className="icon_right">
                        <i class="fa fa-quote-left"></i>
                    </div>
                    <div className="content_center">
                        <h5>Task 2</h5>
                        <p>You're done 0 out of 419</p>
                    </div>
                    <div className="geat_claim_reward_right">
                        <Link to=""><p><i class="fa fa-quote-left"></i> 419</p></Link>
                    </div>
                </div>
                <div className="claimReward Claimeded">
                    <div className="icon_right">
                        <i class="fa fa-quote-left"></i>
                    </div>
                    <div className="content_center">
                        <h5>Task 1</h5>
                        <p>coines successfully acquir</p>
                    </div>
                    <div className="geat_claim_reward_right">
                        <p>Claimed</p>
                    </div>
                </div>
                <div className="claimReward panding">
                    <div className="icon_right">
                        <i class="fa fa-quote-left"></i>
                    </div>
                    <div className="content_center">
                        <h5>Task 2</h5>
                        <p>You're done 0 out of 419</p>
                    </div>
                    <div className="geat_claim_reward_right">
                        <Link to=""><p><i class="fa fa-quote-left"></i> 419</p></Link>
                    </div>
                </div>
                <div className="claimReward Claimeded">
                    <div className="icon_right">
                        <i class="fa fa-quote-left"></i>
                    </div>
                    <div className="content_center">
                        <h5>Task 1</h5>
                        <p>coines successfully acquir</p>
                    </div>
                    <div className="geat_claim_reward_right">
                        <p>Claimed</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default claimReward