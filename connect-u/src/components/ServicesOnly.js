import React, { useState, useEffect } from 'react'
import { Link, useLocation } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux"
import { listAllServices, listServices } from "../reduxstore/actions/servicesActions"
import businesslogo from "../images/ot.jpg"
import "../css/local.css"
import Serviceinfo from './Serviceinfo';
import Main from './Main';
import { listOneBusiness, updateBusinessRatingAction } from '../reduxstore/actions/businesssActions';
import ReactStars from 'react-stars'
import { listBusinessProducts } from '../reduxstore/actions/productsActions';
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';


function ServicesOnly({ search }) {
    const [show, setShow] = useState(false);
    const [business, setbusiness] = useState([])
    const [name, setname] = useState("");
    const [rating, setrating] = useState("");
    const [price, setprice] = useState("");
    const [image, setimage] = useState('');
    const [info, setinfo] = useState("");
    const [id, setid] = useState('');
    const [count, setcount] = useState("");
    const [mobile, setmobile] = useState("")
    const [originalFilterData, setOriginalFilterData] = useState([])
    const [value, setvalue] = useState(true);
    const [sList, setsList] = useState([])
    const [perPage, setPerPage] = useState(3);
    const [activepage, setActivepage] = useState(1);
    const [pagelength, setPagelength] = useState(0);
    const servicesList = useSelector((state) => state.servicesList);
    const { services } = servicesList;


    const serviceUpdate = useSelector((state) => state.serviceUpdate);
    const { success: successUpdates } = serviceUpdate;


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listAllServices()).then(() => {
            let services = localStorage.getItem("services");
            services = JSON.parse(services);
            setOriginalFilterData(services);
            setsList(services);
        }).catch((err) => alert(err))

        // let bus = localStorage.getItem("All_businesses")
        // let bus2 = JSON.parse(bus)
        // setbusiness(bus2);
        // dispatch(listAllServices());
    }, [successUpdates]);

    useEffect(() => {
        // if (product) {
          let pcount = Math.ceil(originalFilterData.length / perPage);
        // console.log(products.length);
        // console.log(products);
        setPagelength(pcount)
        // }
      }, [originalFilterData])
    useEffect(() => {
        if (search == "") {
            setOriginalFilterData(services)
            // setFilterDatas(filterDatas)
        } else {
            const data = sList.filter((data) => {
                return data.name.toLowerCase().includes(search.toLowerCase())
            })
            setOriginalFilterData(data)
        }
    }, [search]);


    const findNumber = (bid) => {
        // debugger
        business.map((businesss) => {
            if (businesss._id == bid) {
                setmobile(businesss.mobile)
            }
        });

    }
    console.log(mobile);
    // console.log(findNumber("62502d57348cf718932bdc07"));

    return (
        <>
            <div className="container deskContent">
                <div className="row">
                    {/* {services && services.map((service, i) => { */}
                    {originalFilterData && originalFilterData.map((service, i) => {
                        if (i < ((activepage * perPage)) && i > (((activepage - 1) * perPage) - 1)) {
                        return (
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3 my-2 ">
                                <div className="card border my-border rounded-card-20">
                                    <img src={service.photo} alt="<?= $row['name'] ?>" className="card-img-top img-fluid" width="100px" height="280px" />
                                    <div className="card-body">
                                        <h5 className="card-title fw-bolder">{service.name}
                                            <span className="card-text float-end">
                                                <i className="fa fa-star rating-star" aria-hidden="true">
                                                    <span className="rating">{Math.round(service.rating).toFixed(2)}</span>
                                                </i>
                                            </span>
                                        </h5>
                                        <p className="card-text">{service.info}</p>
                                        {/* <button onClick={() => { { setShow(true) }; { setImgpath(e.backdrop_path) }; { setMovie_info(e.overview) }; { setmovietitle(e.title) } }} className="btn btn-outline-info" >Info</button> */}
                                        <button className="col-12 btn my-button-light"
                                            onClick={() => {
                                                { findNumber(service.business_id) };
                                                { setimage(service.photo) };
                                                { setinfo(service.info) };
                                                { setname(service.name) }
                                                { setprice(service.price) }
                                                { setrating(service.rating) }
                                                { setid(service._id) }
                                                { setcount(service.count) }
                                                { setShow(true) };
                                            }}
                                        >info</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    })
                    }
                </div>
                <div className="text-center">
                    {Array.apply(null, Array(pagelength)).map(function (data, i) {
                        {/* console.log(i) */}
                        return (
                            <button
                                className="btn btn-outline-info me-1"
                                onClick={() => {
                                    setActivepage(i + 1);
                                }}
                                key={i}
                            >
                                {i + 1}
                            </button>
                        );
                    })}
                </div>

            </div>
            <div className="container-fluid phoneContent mt-3">
                <div className="row">
                    {services && services.map((service, i) => {
                        if (i < ((activepage * perPage)) && i > (((activepage - 1) * perPage) - 1)) {
                        return (
                            <>
                                <div className="col-5 me-0 my-1">
                                    <img src={service.photo} alt="<?= $row['name'] ?>" className="businessimg" />
                                </div>
                                <div className="card col-7 p-2 my-1 ms-0">
                                    <h5 className="card-title fw-bolder">{service.name}
                                        <span className="card-text float-end">
                                            <i className="fa fa-star rating-star" aria-hidden="true">
                                                <span className="rating">{Math.round(service.rating).toFixed(2)}</span>
                                            </i>
                                        </span>
                                    </h5>
                                    <span className="card-text">{service.info}</span>
                                    <button className="col-12 btn btn-sm my-button-light btn-block mt-auto"
                                        onClick={() => {
                                            { findNumber(service.business_id) };
                                            { setimage(service.photo) };
                                            { setinfo(service.info) };
                                            { setname(service.name) }
                                            { setprice(service.price) }
                                            { setrating(service.rating) }
                                            { setid(service._id) }
                                            { setcount(service.count) }
                                            { setShow(true) };
                                        }}
                                    >info</button>
                                </div>
                            </>
                        )}
                    })}

                </div>
                <div className="text-center">
                    {Array.apply(null, Array(pagelength)).map(function (data, i) {
                        {/* console.log(i) */}
                        return (
                            <button
                                className="btn btn-outline-info me-1"
                                onClick={() => {
                                    setActivepage(i + 1);
                                }}
                                key={i}
                            >
                                {i + 1}
                            </button>
                        );
                    })}
                </div>

            </div>
            {
                show ? <Serviceinfo
                    id={id}
                    name={name}
                    price={price}
                    rating={rating}
                    info={info}
                    src={image}
                    show={show}
                    count={count}
                    mobile={mobile}
                    toggleItem={"Services"}
                    onHide={() => setShow(false)}
                // detail={movie_info}
                // movietitle={movietitle}
                // imgpath={imgpath}
                /> : null
            }

            {/* {
                show ? <Serviceinfo
                    show={show}
                    onHide={() => setShow(false)}
                // detail={movie_info}
                // movietitle={movietitle}
                // imgpath={imgpath}
                /> : null
            } */}
        </>
    )
}


export default ServicesOnly