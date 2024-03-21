import { useState } from 'react'
import { Link } from "react-router-dom";
import Banner0 from "../../assets/img/slider/Banner0.png"
import Banner1 from "../../assets/img/slider/Banner1.png"
import Banner2 from "../../assets/img/slider/Banner2.png"
import './style.css'
import { Carousel } from 'react-bootstrap';

function Slider() {

    return (
        <div className='Slider_banner'>
        <Carousel interval={2000}>
        <Carousel.Item>
        <img
                className="d-block w-100"
                src={Banner0}
                alt="First slide"
            />
        </Carousel.Item>
        <Carousel.Item>
            <img
                className="d-block w-100"
                src={Banner1}
                alt="First slide"
            />
        </Carousel.Item>
        <Carousel.Item>
        <img
                className="d-block w-100"
                src={Banner2}
                alt="First slide"
            />
        </Carousel.Item>
      </Carousel>
      </div>
    )
}

export default Slider
