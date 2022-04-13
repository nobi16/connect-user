import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import "../css/local.css"
import { distance } from './Location';
import { listAllBusiness } from '../reduxstore/actions/businesssActions';

function HomeMain({ search }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const businessList = useSelector((state) => state.businessList);
    const { loading, error, businesses } = businessList;

    var [cat, setCat] = useState([]);
    let [business, setBusiness] = useState([])
    const [selectedCat, setselectedCat] = useState("Saloon")
    const [filterDatas, setFilterDatas] = useState(business);
    const [longitude, setlongitude] = useState('');
    const [latitude, setlatitude] = useState('');
    const [originalFilterData, setOriginalFilterData] = useState([])
    const [category, setcategory] = useState("All");
    const [mainData, setmainData] = useState([]);
    const [copyData, setcopyData] = useState([]);

    function findUnique(arr, predicate) {
        var found = {};
        arr.forEach(d => {
            found[predicate(d)] = d;
        });
        return Object.keys(found).map(key => found[key]);
    }


    const filterItem = (cat) => {
        if (cat == "All") {
            setFilterDatas(business);
            setcategory("All");
        } else {
            setcategory(cat);
            let arr = [];
            business.filter((busines) => {
                if (busines.category === cat) {
                    arr.push(busines)
                }
            })
            setOriginalFilterData(arr)
            setFilterDatas(arr)
            console.log(business);
        }
    }

    useEffect(() => {
        dispatch(listAllBusiness()).then(() => {
            let arr = []
            businesses && businesses.map((business) => {
                console.log(business);
                business.distance = distance(latitude, business.longitude, longitude, business.latitude, "K")
                arr.push(business)
            })
            arr = JSON.stringify(arr)
            localStorage.setItem("All_businesses", arr)
        }).catch((err) => alert(err))

        // let bus = localStorage.getItem("All_businesses")
        // let bus2 = JSON.parse(bus)
        setmainData(arr)
        setcopyData(arr)
        // setOriginalFilterData(arr)
        if (!!arr) {
            let bs = findUnique(arr, d => d.category)
            setCat(bs);
        }

        // set distance in array
        // let arr = []
        // bus2.find((business) => {
        // 	business.distance = distance(latitude, business.longitude, longitude, business.latitude, "K")
        // 	arr.push(business)
        // })
        // arr = JSON.stringify(arr)
        // localStorage.setItem("All_businesses", arr)

        // get location info
        const location = window.navigator && window.navigator.geolocation;
        if (location) {
            location.getCurrentPosition(
                (position) => {
                    setlatitude(position.coords.latitude);
                    setlongitude(position.coords.longitude);
                },
                (error) => {
                    this.setState({
                        latitude: "err-latitude",
                        longitude: "err-longitude",
                    });
                }
            );
        }

        // serch part
        if (search == "") {
            setmainData(arr)
            // setFilterDatas(filterDatas)
        } else {
            const data = copyData.filter((data) => {
                return data.name.toLowerCase().includes(search.toLowerCase())
            })
            setmainData(data)
        }

    }, [history, search]);


    useEffect(() => {
        // set distance in array
        let arr = []
        business.map((business) => {
            business.distance = distance(latitude, business.longitude, longitude, business.latitude, "K")
            arr.push(business)
        })
        arr = JSON.stringify(arr)
        localStorage.setItem("All_businesses", arr)
        // setFilterDatas(arr)
        // setOriginalFilterData(arr)


    }, [])


    // useEffect(() => {
    // 	console.log(search.toLowerCase());
    // 	if (search == "") {
    // 		setFilterDatas(originalFilterData)
    // 		// setFilterDatas(filterDatas)
    // 	} else {
    // 		const data = originalFilterData.filter((data) => {
    // 			return data.name.toLowerCase().includes(search.toLowerCase())
    // 		})
    // 		setFilterDatas(data)
    // 	}
    // }, [search]);


    // filter by distane 
    const filterDistance = (dist) => {
        let arrs = [];
        originalFilterData.map((data) => {
            if (data.distance <= dist) {
                // console.log(data);
                arrs.push(data)
            }
        })
        setFilterDatas(arrs)
        // console.log(originalFilterData);
    }

    // useEffect(() => {
    // 	filterDistance()
    // }, [])



    return (
        <>

            {/* getting all unique category */}
            <div className="row">
                <div className="tabs mt-2 text-center my-dark ">
                    {cat && cat.length > 0 ? cat.map((e, i) => {
                        return (
                            <>
                                <button key={i} onClick={() => filterItem(e.category)} className={e.category == category ? "btn ms-1 my-button-dark" : "btn ms-1"}><h5>{e.category}</h5></button>
                            </>
                        )
                    }) : <div style={{ height: '100vh', width: '100%' }}>No cat Found</div>}
                    <button onClick={() => filterItem("All")} className={category == "All" ? "btn ms-1 my-button-dark" : "btn ms-1"}><h5>All</h5></button>
                    <div class="dropdown my-2">
                        <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Service near me
                        </button>
                        <ul class="dropdown-menu bg-info" aria-labelledby="dropdownMenuButton1">
                            <li class="dropdown-item" onClick={() => filterDistance(1)}>1km</li>
                            <li class="dropdown-item" onClick={() => filterDistance(1.0)}>1.0km</li>
                            <li class="dropdown-item" onClick={() => filterDistance(2)}>3km</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container deskContent mt-3">
                <div className="row">
                    {/* all business are here */}
                    {mainData &&
                        mainData.map((e) => {
                            console.log(e)
                            return (
                                <div className="col-7 col-sm-6 col-md-4 col-lg-3 my-2" key={e._id}
                                    onClick={() => navigate('/service', { state: { bid: e._id, mobile: e.mobile, lng: e.longitude, lat: e.latitude, name: e.name } })}>
                                    <div className="card border my-border rounded-card-20">
                                        <img src={e.photo} alt={e.name} className="card-img-top img-fluid" width="100px" height="280px" />
                                        <div className="card-body">
                                            <h5 className="card-title fw-bolder">{e.name}</h5>
                                            <p className="card-text">
                                                {!!e.info ? (e.info.length > 25 ? e.info.substring(0, 25) + '...' : e.info) : ""}
                                                {/* {e.info} */}
                                            </p>
                                            <span className="card-text float">
                                                <i className="fa fa-star rating-star" aria-hidden="true">
                                                    <span className="rating">{Math.round(e.rating).toFixed(2)}</span>
                                                </i>
                                            </span>
                                            <span className="card-text float-end">
                                                <i className="fa fa-map-marker fa-lg secondary" aria-hidden="true">
                                                    <span className="rating">
                                                        {distance(latitude, e.longitude, longitude, e.latitude, "K", e._id)}
                                                        {/* {e.distance} */}
                                                        km</span>
                                                </i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="container-fluid phoneContent">
                <div className="row">
                    {filterDatas.map((e) => {
                        return (
                            <>
                                <Link className="card col-5 my-1 my-link" to="/service">
                                    <img src={e.photo} alt={e.name} className="businessimg" />
                                </Link>
                                <Link className="card my-link col-7 my-1 py-1" to="/service">
                                    <h6 className="card-title fw-bolder">{e.name}</h6>
                                    <p className="card-text">{!!e.info ? (e.info.length > 25 ? e.info.substring(0, 25) + '...' : e.info) : ""}</p>
                                    <span className="card-text float-end">
                                        <i className="fa fa-star rating-star float-start" aria-hidden="true">
                                            <span className="rating">{Math.round(e.rating).toFixed(2)}</span>
                                        </i>
                                        <i className="fa fa-map-marker fa-lg secondary float-end" aria-hidden="true">
                                            <span className="rating">{distance(latitude, e.longitude, longitude, e.latitude, "K",)}km</span>
                                        </i>
                                    </span>
                                </Link>
                            </>
                        )
                    })}
                </div>
            </div>
        </>
    )
}


export default HomeMain
