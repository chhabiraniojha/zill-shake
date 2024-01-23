import { useState } from 'react'
import { Link } from "react-router-dom";
import Banner1 from "../../assets/img/slider/Banner1.png"
import Banner2 from "../../assets/img/slider/Banner1.png"
import './style.css'


function slider() {

    return (
        <>

            <div id="carouselExampleIndicators" className="carousel slide Slider_banner" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    {/* <li data-target="#carouselExampleIndicators" data-slide-to="2"></li> */}
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="d-block w-100" src={Banner1} alt="First slide" />
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src={Banner2}alt="Second slide" />
                    </div>
                   
                </div>
                {/* <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a> */}
            </div>

        </>
    )
}

export default slider