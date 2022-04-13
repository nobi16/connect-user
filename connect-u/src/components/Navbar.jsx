import React, { useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom";
import { } from 'react-router-dom'

import logo from "../img/logo.png"

import "../css/local.css"

function Navbar({ val, find }) {
    const [serchText, setserchText] = useState("");
    const [activeNav, setactiveNav] = useState("Home");
    const location = useLocation();
    // const history = useHistory();
    // const match = useRouteMatch("/home");
    //   const match = useRouteMatch("write-the-url-you-want-to-match-here");
    useEffect(() => {
        if (location.pathname == "/service")
            setactiveNav("Service")
        else if (location.pathname == "/product")
            setactiveNav("Product")
        else if (location.pathname == "/")
            setactiveNav("Home")
    }, [location])


    const changeCat = (nav) => {
        setactiveNav(nav)
    }

    val = serchText;
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light ps-5 pe-5" style={{ background: "#00d4ff" }}>
                {/* <nav className="navbar navbar-expand-lg navbar-light ps-5 pe-5" style={{background: `linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(0,212,255,1) 0%, rgba(9,98,121,1) 100%)`}}> */}
                <img src={logo} alt="" className="my-logo pe-5" />
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav my-dark">
                        <li className="nav-item">
                            <Link className={activeNav == "Home" ? "nav-link active fw-bolder" : "nav-link"} onClick={() => changeCat("Home")} aria-current="page" to="/" activeclassname="active">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item my-dark">
                            <Link className={activeNav == "Service" ? "nav-link active fw-bolder" : "nav-link"} onClick={() => changeCat("Service")} to="/service" activeclassname="active">
                                Service
                            </Link>
                        </li>
                        <li className="nav-item my-dark">
                            <Link className={activeNav == "Product" ? "nav-link active fw-bolder" : "nav-link"} onClick={() => changeCat("Product")} to="/products" activeclassname="active">
                                Products
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="form-floating mysearchbar col-12 col-lg-2">
                    <input className="form-control" type="search" placeholder="" aria-label="Search" onChange={(e) => find(e.target.value)} />
                    <label htmlFor="">Search</label>
                </div>
                {/* <button className="btn btn-primary ms-lg-2 col-12 col-lg-1" >search</button> */}
            </nav>

        </>
    )
}

export default Navbar