import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux"
import { listAllBusiness, listBusiness } from "../reduxstore/actions/businesssActions"
import Tabs from "./Categorylist";
import businesslogo from "../images/ot.jpg"
import fav from "../images/heart.png"
// import "../css/local.css"

function Home2() {
    const dispatch = useDispatch();

    const businessList = useSelector((state) => state.businessList);
    const { loading, error, businesses } = businessList;

    const [filterData, setFilterData] = useState([])
    const [selectedCat, setselectedCat] = useState("Saloon")
    const [businesss, setbusinesss] = useState([])

    const uniqueCat = [
        ...new Set(
            businesses && businesses.map((business) => {
                return business.category
            })
        )
    ]

function myFun(business){
return business.category = selectedCat
}
// console.log(businesss);

    const updateList = businesss.filter(myFun)
    // console.log(updateList);
    // setFilterData(updateList);


    useEffect(() => {
        let bus = localStorage.getItem("All_businesses")
        let bus2 = JSON.parse(bus)
        setbusinesss(bus2)
        dispatch(listAllBusiness());
    }, []);

    return (
        <>

            <div className="row">
                <div className="tabs mt-2 text-center my-dark ">
                    {/* {cat.length > 0 ? cat.map(e => {
					// console.log(e.category);
					return (
						<>
							<button className="btn ms-1 my-button"><h5>{e.category}</h5></button>
						</>
					)
				}) : <div style={{ height: '100vh', width: '100%' }}>No cat Found</div>} */}
                </div>
                <Tabs className="bg">
                    {/* <div label="Category 1">
                        <div className="container deskContent">
                        </div>
                        <div className="container-fluid phoneContent">
                            <div className="row">
                                {businesses && businesses.map(e => {
                                    return (
                                        <><Link className=" card col-5 my-1 my-link" to="/service">
                                            <img src={e.photo} alt="<?= $row['name'] ?>" className="businessimg" />
                                        </Link><Link className="card my-link col-7 my-1" to="/service">
                                                <h6 className="card-title fw-bolder mt-1">{e.name}</h6>
                                                <p className="card-text">Beside Navneet House, Gurukul Rd,
                                                    Memnagar, Ahmedabad</p>
                                                <span className="card-text ">
                                                    <i className="fa fa-star rating-star float-start" aria-hidden="true">
                                                        <span className="rating">{e.rating}</span>
                                                    </i>
                                                    <i className="fa fa-map-marker fa-lg secondary float-end" aria-hidden="true">
                                                        <span className="rating">km</span>
                                                    </i>
                                                </span>

                                            </Link></>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                   

                    <div label="Category 22">

                    </div>
                    <div label="Category 3">
                    </div> */}
                    {

                        uniqueCat.map((cat, i) => {
                            return (
                                <div key={i} label={cat} >

                                </div>
                            )
                        })
                    }

                </Tabs>
            </div>

        </>
    )
}


export default Home2
