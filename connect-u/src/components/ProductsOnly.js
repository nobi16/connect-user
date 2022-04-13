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
import { listAllProduct, listBusinessProducts } from '../reduxstore/actions/productsActions';
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';


function ProductsOnly({ search }) {
    const [show, setShow] = useState(false);
    const [name, setname] = useState("");
    const [rating, setrating] = useState("");
    const [price, setprice] = useState("");
    const [image, setimage] = useState('');
    const [info, setinfo] = useState("");
    const [id, setid] = useState('');
    const [count, setcount] = useState("")
    const [originalFilterData, setOriginalFilterData] = useState([])
    const [value, setvalue] = useState(true);
    const [pList, setpList] = useState([])
    const [perPage, setPerPage] = useState(3);
    const [activepage, setActivepage] = useState(1);
    const [pagelength, setPagelength] = useState(0);
    const productsList = useSelector((state) => state.productsList);
    const { products } = productsList;

    const productUpdate = useSelector((state) => state.productUpdate);
    const { success: successsPUpdate } = productUpdate;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listAllProduct()).then(() => {
            let products = localStorage.getItem("product");
            products = JSON.parse(products);
            setOriginalFilterData(products);
            setpList(products);
        }).catch((err) => alert(err))

        // .then(() => {
        //     setOriginalFilterData(products);
        // }).catch((err) => alert(err))
        // setTimeout(() => {
        //     setOriginalFilterData(products)
        // }, 1000);


    }, [successsPUpdate]);
    useEffect(() => {
        // if (product) {
        let pcount = Math.ceil(originalFilterData.length / perPage);
        // console.log(products.length);
        // console.log(products);
        setPagelength(pcount)
        // }
    }, [originalFilterData])

    useEffect(() => {
        // console.log(search.toLowerCase());
        if (search == "") {
            setOriginalFilterData(products)
            // setFilterDatas(filterDatas)
        } else {
            const data = pList.filter((data) => {
                return data.name.toLowerCase().includes(search.toLowerCase())
            })
            setOriginalFilterData(data)
        }

    }, [search]);


    // setTimeout(() => {
    //     setOriginalFilterData(products)
    // }, 1000);

    return (
        <>
            <div className="container deskContent">
                <div className="row">
                    {originalFilterData && originalFilterData.map((service, i) => {
                        if (i < ((activepage * perPage)) && i > (((activepage - 1) * perPage) - 1)) {
                            {/* {products && products.map((service, i) => { */ }
                            return (
                                <div className="col-12 col-sm-6 col-md-4 col-lg-3 my-2 " key={i}>
                                    <div className="card border my-border rounded-card-20">
                                        <img src={service.photo} alt="<?= $row['name'] ?>" className="card-img-top img-fluid" width="100px" height="280px" />
                                        <div className="card-body">
                                            <h5 className="card-title fw-bolder">{service.name}
                                                <span className="card-text float-end">
                                                    <i className="fa fa-star rating-star" aria-hidden="true">
                                                        <span className="rating">{Math.round(service.rating).toFixed(1)}</span>
                                                    </i>
                                                </span>
                                            </h5>
                                            <p className="card-text">{!!service.info ? (service.info.length > 25 ? service.info.substring(0, 25) + '...' : service.info) : ""}</p>
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
                                                }}
                                            >info</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
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
            <div className="container phoneContent mt-3" >
                {products && products.map((product, i) => {
                    if (i < ((activepage * perPage)) && i > (((activepage - 1) * perPage) - 1)) {
                        return (
                            <div className="row">
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
                                    <span className="card-text">{!!product.info ? (product.info.length > 25 ? product.info.substring(0, 25) + '...' : product.info) : ""}</span>
                                    <button className="col-12 btn btn-sm my-button-light btn-block mt-auto" onClick={() => setShow(true)}>info</button>
                                </div>
                            </div>
                        )
                    }
                })
                }
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
                    onHide={() => setShow(false)}
                    id={id}
                    name={name}
                    price={price}
                    rating={rating}
                    info={info}
                    src={image}
                    show={show}
                    count={count}
                    toggleItem={"Products"}
                /> : null
            }
        </>
    )
}


export default ProductsOnly;