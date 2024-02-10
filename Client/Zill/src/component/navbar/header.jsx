import { useState } from 'react'
import { Link } from "react-router-dom";
import './style.css'


function Header() {

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light header_bar fixed-top">
                <Link to="/" className="navbar-brand">Navbar</Link>
                <div className="navbar_right_but">
                    <Link to="/"><i class="fa fa-bell"></i></Link>
                </div>
            </nav>
        </>
    )
}

export default Header