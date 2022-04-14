import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { connect, useSelector } from "react-redux"
import { listAllBusiness } from "../reduxstore/actions/businesssActions"
import Tabs from "./Categorylist";
import businesslogo from "../images/ot.jpg"
import fav from "../images/heart.png"
import "../css/local.css"
import { distance } from './Location';

function Home({ businessData, fetchbusiness, search }) {
	const navigate = useNavigate();


	var [cat, setCat] = useState([]);
	let [business, setBusiness] = useState([])
	const [selectedCat, setselectedCat] = useState("Saloon")
	const [filterDatas, setFilterDatas] = useState(business);
	const [longitude, setlongitude] = useState('');
	const [latitude, setlatitude] = useState('');
	const [originalFilterData, setOriginalFilterData] = useState([])
	const [category, setcategory] = useState("All");
	const [perPage, setPerPage] = useState(3);
	const [activepage, setActivepage] = useState(1);
	const [pagelength, setPagelength] = useState(0);

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
		}
	}
	console.log(filterDatas);

	useEffect(() => {
		// gettng main data
		let bus = localStorage.getItem("All_businesses")
		let bus2 = JSON.parse(bus)
		setBusiness(bus2)
		setFilterDatas(bus2)
		setOriginalFilterData(bus2)
		if (!!bus2) {
			let bs = findUnique(bus2, d => d.category)
			setCat(bs);
		}
		// serch part
		if (search == "") {
			setcategory("All");
			setFilterDatas(bus2)
			// setFilterDatas(filterDatas)
		} else {
			const data = filterDatas.filter((data) => {
				return data.name.toLowerCase().includes(search.toLowerCase())
			})
			setFilterDatas(data)
		}

	}, [businessData, search]);
	
	useEffect(() => {
        // if (product) {
          let pcount = Math.ceil(filterDatas.length / perPage);
        // console.log(products.length);
        // console.log(products);
        setPagelength(pcount)
        // }
      }, [filterDatas])

	// filter by distane 
	const filterDistance = (dist) => {

		// let arrs = [];
		// filterDatas.map((data) => {
		// // business.map((data) => {
		// 	if (data.distance <= dist) {
		// 		// console.log(data);
		// 		arrs.push(data)
		// 	}
		// })
		const arrs = originalFilterData.filter((data) => {
			return data.distance <= dist
		})
		setFilterDatas(arrs)
		console.log(filterDatas);
	}

	return businessData.loading ? (
		<div style={{ height: '100vh', width: '100%' }}>Loading!!!</div>
	) : businessData.message ? (
		<div style={{ height: '100vh', width: '100%' }}>{businessData.message}</div>
	) : (
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
							<li class="dropdown-item" onClick={() => filterDistance(0.5)}>0.5km</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="container deskContent mt-3">
				<div className="row">
					{/* all business are here */}
					{filterDatas &&
						filterDatas.map((e,i) => {
							if (i < ((activepage * perPage)) && i > (((activepage - 1) * perPage) - 1)) {
							{/* console.log(e) */}
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
														{/* {distance(latitude, e.longitude, longitude, e.latitude, "K", e._id)} */}
														{e.distance}
														km</span>
												</i>
											</span>
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
			<div className="container-fluid phoneContent">
				<div className="row">
					{filterDatas && filterDatas.map((e,i) => {
						if (i < ((activepage * perPage)) && i > (((activepage - 1) * perPage) - 1)) {
						return (
							<>
								<div className="card col-5 my-1 my-link"
									onClick={() => navigate('/service', { state: { bid: e._id, mobile: e.mobile, lng: e.longitude, lat: e.latitude, name: e.name } })}>
									<img src={e.photo} alt={e.name} className="businessimg" />
								</div>
								<div className="card my-link col-7 my-1 py-1" key={e._id}
									onClick={() => navigate('/service', { state: { bid: e._id, mobile: e.mobile, lng: e.longitude, lat: e.latitude, name: e.name } })}>

									<h6 className="card-title fw-bolder">{e.name}</h6>
									<p className="card-text">{!!e.info ? (e.info.length > 25 ? e.info.substring(0, 25) + '...' : e.info) : ""}</p>
									<span className="card-text float-end">
										<i className="fa fa-star rating-star float-start" aria-hidden="true">
											<span className="rating">{Math.round(e.rating).toFixed(2)}</span>
										</i>
										<i className="fa fa-map-marker fa-lg secondary float-end" aria-hidden="true">
											<span className="rating">{e.distance}km</span>
										</i>
									</span>
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
		</>
	)
}
const mapState = state => {
	return {
		businessData: state.businessList
	}
}

const mapDispatch = dispatch => {
	return {
		fetchbusiness: () => dispatch(listAllBusiness())
	}
}
export default connect(mapState, mapDispatch)(Home)
