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


function Services({ search }) {
    const location = useLocation();
    const [show, setShow] = useState(false);
    const [business, setbusiness] = useState()
    var [cat, setCat] = useState([]);
    // let [service, setService] = useState([])
    const [value, setvalue] = useState(true)
    const [toggleItem, setToggleItem] = useState("Products")
    const [data, setdata] = useState();
    const [name, setname] = useState("");
    const [rating, setrating] = useState("");
    const [price, setprice] = useState("");
    const [image, setimage] = useState('');
    const [info, setinfo] = useState("");
    const [mobile, setmobile] = useState('')
    const [id, setid] = useState('');
    const [count, setcount] = useState("");
    const [busines, setbusines] = useState({})
    const [perPage, setPerPage] = useState(3);
    const [activepage, setActivepage] = useState(1);
    const [pagelength, setPagelength] = useState(0);

    const servicesList = useSelector((state) => state.servicesList);
    const { services } = servicesList;

    const businessList = useSelector((state) => state.businessList);
    const { loading, error, businesses } = businessList;

    const businessUpdate = useSelector((state) => state.businessUpdate);
    const { success: successUpdate } = businessUpdate;

    const serviceUpdate = useSelector((state) => state.serviceUpdate);
    const { success: successUpdates } = serviceUpdate;

    const productUpdate = useSelector((state) => state.productUpdate);
    const { success: successsPUpdate } = productUpdate;


    const productsList = useSelector((state) => state.productsList);
    const { products } = productsList;


    const dispatch = useDispatch();

    // useEffect(() => {
    //     // localStorage.removeItem("one_businesses");

    // }, [])



    useEffect(() => {
        dispatch(listOneBusiness(location.state.bid)).then(() => {
            let bus = localStorage.getItem("one_businesses");
            let bus2 = JSON.parse(bus);
            setbusines(bus2);
        }).catch((err) => alert(err))

        dispatch(listServices(location.state.bid));
        // setdata(services);
        // console.log(data);
        if (toggleItem === "Products") {
            dispatch(listBusinessProducts(location.state.bid));
            // setdata(products);
            // console.log(data);
        }

        // debugger
    }, [successUpdate, successUpdates, successsPUpdate, toggleItem]);
    useEffect(() => {
        if (toggleItem === "Services" && services) {
            let pcount = Math.ceil(services.length / perPage);
            // console.log(products.length);
            // console.log(products);
            setPagelength(pcount)
        }
        else if(!!products) {
            let pcount = Math.ceil(products.length / perPage);
            // console.log(products.length);
            // console.log(products);
            setPagelength(pcount)
        }
    }, [services, products])
    // useEffect(() => {
    // //   setvalue(!value)
    // }, [])
    // window.location.reload(); 


    // useEffect(() => {
    //     // businesses ? setbusines(businesses) :
    // }, [business, successUpdates])
    // setTimeout(() => {
    //     setvalue(!value)
    // }, 2000);

    const mapStyles = {
        height: "50vh",
        width: "100%"
    };

    const defaultCenter = {
        // lat: 22.31544,
        // lng: 70.76747
        lat: location.state.lng,
        lng: location.state.lat
    }


    const ratingChanged = (rating, b_rating, bid, count) => {
        let updateCount = count + 1;
        let updateRating = (rating + b_rating) / 2;
        dispatch(updateBusinessRatingAction(updateRating, bid, updateCount))
    }

    return (
        <>
            {busines && <div className="container-fluid ">
                <div className="row">
                    <div className="col-12 business-card-opacity">
                        <div className="float-start deskContent">
                            <img src={busines.photo} alt="<?= $row['name'] ?>" className="businessimg p-2" />
                        </div>
                        <div className="float-start phoneContent">
                            <img src={busines.photo} alt="<?= $row['name'] ?>" className="businesslogo p-2" />
                        </div>
                        <h5 className="card-title text-center">{busines.name}</h5>
                        <div className="d-flex justify-content-around">
                            <div className="card-text businessContent">
                                {!!busines.info ? (busines.info.length > 100 ? busines.info.substring(0, 100) + '...' : busines.info) : ""}
                            </div>

                            <div className="card-text ">
                                <ReactStars
                                    count={5}
                                    value={busines.rating}
                                    onChange={(e) => ratingChanged(e, busines.rating, busines._id, busines.count)}
                                    size={24}
                                    color2={'#ffd700'} />
                                ({busines.count})
                                {/* <button className="btn btn-sm my-button-light rating-btn ms-3 ">Submit</button> */}
                            </div>
                        </div>
                    </div>
                    <div className='business-card-opacity'>
                        <button className="btn btn-outline-info btn-sm col-6">
                            <h6 onClick={() => setToggleItem("Products")}>Products</h6>
                        </button>
                        <button className="btn btn-outline-info btn-sm col-6">
                            <h6 onClick={() => setToggleItem("Services")}>Services</h6>
                        </button>
                    </div>
                </div>
            </div>}
            <div className="container deskContent">
                <div className="row">
                    {toggleItem == "Services" ?
                        services && services.map((service, i) => {
                            if (i < ((activepage * perPage)) && i > (((activepage - 1) * perPage) - 1)) {
                            return (
                                <div className="col-12 col-sm-6 col-md-4 col-lg-3 my-2 " key={i}>
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
                                            <button className="col-12 btn my-button-light"
                                                onClick={() => {
                                                    { setShow(true) };
                                                    { setimage(service.photo) };
                                                    { setinfo(service.info) };
                                                    { setname(service.name) }
                                                    { setprice(service.price) }
                                                    { setrating(service.rating) }
                                                    { setid(service._id) }
                                                    { setcount(service.count) }
                                                    { setmobile(location.state.mobile) }
                                                }}
                                            >info</button>

                                        </div>
                                    </div>
                                </div>
                            )}
                        }) : toggleItem == "Products" ?
                            products && products.map((product, i) => {
                                if (i < ((activepage * perPage)) && i > (((activepage - 1) * perPage) - 1)) {
                                return (
                                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 my-2 ">
                                        <div className="card border my-border rounded-card-20">
                                            <img src={product.photo} alt="<?= $row['name'] ?>" className="card-img-top img-fluid" width="100px" height="280px" />
                                            <div className="card-body">
                                                <h5 className="card-title fw-bolder">{product.name}
                                                    <span className="card-text float-end">
                                                        <i className="fa fa-star rating-star" aria-hidden="true">
                                                            <span className="rating">{Math.round(product.rating).toFixed(2)}</span>
                                                        </i>
                                                    </span>
                                                </h5>
                                                <p className="card-text">{product.info}</p>
                                                {/* <button onClick={() => { { setShow(true) }; { setImgpath(e.backdrop_path) }; { setMovie_info(e.overview) }; { setmovietitle(e.title) } }} className="btn btn-outline-info" >Info</button> */}
                                                <button className="col-12 btn my-button-light"
                                                    onClick={() => {
                                                        { setShow(true) };
                                                        { setimage(product.photo) };
                                                        { setinfo(product.info) };
                                                        { setname(product.name) }
                                                        { setprice(product.price) }
                                                        { setrating(product.rating) }
                                                        { setid(product._id) }
                                                        { setcount(product.count) }
                                                        { setmobile(location.state.mobile) }

                                                    }}
                                                >info</button>

                                            </div>
                                        </div>
                                    </div>
                                )}
                            }) : "Loading"
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

                <div className="row">
                    <div>
                        {/* <Main /> */}
                        <LoadScript
                            googleMapsApiKey='AIzaSyCX3_rFzce7sD2gW_RzqVZnkcmKHBmf7kk'>
                            <GoogleMap
                                mapContainerStyle={mapStyles}
                                zoom={15}
                                center={defaultCenter}
                            >
                                <Marker position={defaultCenter} />
                                <InfoWindow
                                    position={defaultCenter}
                                    clickable={true}>
                                    <p>{location.state.name}</p>
                                </InfoWindow>
                            </GoogleMap>
                        </LoadScript>
                    </div>
                </div>
            </div>
            <div className="container-fluid phoneContent mt-3">
                <div className="row">
                    {toggleItem == "Services" ?
                        services && services.map((service, i) => {
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
                                        <span className="card-text">
                                            {!!service.info ? (service.info.length > 25 ? service.info.substring(0, 25) + '...' : service.info) : ""}
                                        </span>
                                        <button className="col-12 btn btn-sm my-button-light btn-block mt-auto"
                                            onClick={() => {
                                                { setShow(true) };
                                                { setimage(service.photo) };
                                                { setinfo(service.info) };
                                                { setname(service.name) }
                                                { setprice(service.price) }
                                                { setrating(service.rating) }
                                                { setid(service._id) }
                                                { setcount(service.count) }
                                                { setmobile(location.state.mobile) }
                                            }}
                                        >info</button>
                                    </div>
                                </>
                            )}

                        })
                        : toggleItem == "Products" ?
                            products && products.map((product, i) => {
                                if (i < ((activepage * perPage)) && i > (((activepage - 1) * perPage) - 1)) {
                                return (
                                    <>
                                        <div className="col-5 me-0 my-1">
                                            <img src={product.photo} alt="<?= $row['name'] ?>" className="businessimg" />
                                        </div>
                                        <div className="card col-7 p-2 my-1 ms-0">
                                            <h5 className="card-title fw-bolder">{product.name}
                                                <span className="card-text float-end">
                                                    <i className="fa fa-star rating-star" aria-hidden="true">
                                                        <span className="rating">{Math.round(product.rating).toFixed(2)}</span>
                                                    </i>
                                                </span>
                                            </h5>
                                            <span className="card-text">
                                                {!!product.info ? (product.info.length > 25 ? product.info.substring(0, 25) + '...' : product.info) : ""}
                                            </span>
                                            <button className="col-12 btn btn-sm my-button-light btn-block mt-auto"
                                                onClick={() => {
                                                    { setShow(true) };
                                                    { setimage(product.photo) };
                                                    { setinfo(product.info) };
                                                    { setname(product.name) }
                                                    { setprice(product.price) }
                                                    { setrating(product.rating) }
                                                    { setid(product._id) }
                                                    { setcount(product.count) }
                                                    { setmobile(location.state.mobile) }

                                                }}
                                            >info</button>
                                        </div>
                                    </>
                                )}
                            }) : "loading"
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

                <div className="row mt-3">
                    <div >
                        {/* <Main /> */}
                        <LoadScript
                            googleMapsApiKey='AIzaSyCX3_rFzce7sD2gW_RzqVZnkcmKHBmf7kk'>
                            <GoogleMap
                                mapContainerStyle={mapStyles}
                                zoom={15}
                                center={defaultCenter}
                            >
                                <Marker position={defaultCenter} />
                                <InfoWindow
                                    position={defaultCenter}
                                    clickable={true}>
                                    <p>{location.state.name}</p>
                                </InfoWindow>
                            </GoogleMap>
                        </LoadScript>
                    </div>
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
                    mobile={mobile}
                    show={show}
                    count={count}
                    toggleItem={toggleItem}
                    onHide={() => setShow(false)}
                /> : null
            }
        </>
    )
}

export default Services