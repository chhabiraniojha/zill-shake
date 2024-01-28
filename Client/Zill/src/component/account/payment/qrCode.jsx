
import QrCode from "../../../assets/img/qrcode.jpeg"
import './style.css'


function Wallet() {

    return (
        <>

            <div className="main">
                <div className="back"></div>
                <div id="tip11" className="center tip"><span>This address only supports recharge USDT-TRC20,Other currencies are not supported</span></div>
                <div id="tip21" className="center tip"><span>The credited amount is calculated according to the actual recharge amount</span></div>
                <div className="code center">
                    <div id="qrcode" ><img src={QrCode} style={{ display: "block" }} /></div>
                    <div id="usdtAmount" style={{ display: "block" }} >
                        <div className="code-font1" id="usdtAmountSpan">50USDT</div>
                        <form>

                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">After paying the USDT submit your transaction hash </label>
                                <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Transaction hash here..." />
                            </div>

                            <button type="submit" className="btn btn-success mb-2">Submit</button>
                        </form>
                    </div>
                </div>
                <div className="label">USDT-TRC20：</div>
                <div className="label-content">
                    <span>Tron（USDT-TRC20）</span>
                </div>
                <div className="label" style={{ marginTop: "25px;" }} >USDT Address：</div>
                <div className="address">
                    <span style={{ fontSize: "12px" }} id="tronAddress">0xCeED22695f478bcac129BAb19db57C6dC3E8aDf3</span>
                    <input id="demoInput" value="sss" style={{ opacity: "0", position: "absolute" }} readonly="" />
                    <i className="fa fa-copy"></i>
                </div>
            </div>

        </>
    )
}

export default Wallet