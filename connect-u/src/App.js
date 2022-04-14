import React, { useEffect, useState } from 'react'
import bg from "./img/bg.png";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Services from "./components/Services";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useDispatch } from 'react-redux';
import { listAllBusiness } from './reduxstore/actions/businesssActions';
import { listAllServices } from './reduxstore/actions/servicesActions';
import { listAllProduct } from './reduxstore/actions/productsActions';
import AllServices from './components/AllServices';
import ProductsOnly from './components/ProductsOnly';

function App() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [latitude, setlatitude] = useState(0)
  const [longitude, setlongitude] = useState(0);
  useEffect(() => {

    const location = window.navigator && window.navigator.geolocation;
    if (location) {
      location.getCurrentPosition(
        (position) => {
          setlatitude(position.coords.latitude);
          setlongitude(position.coords.longitude);
          // debugger
          dispatch(listAllBusiness(position.coords.latitude, position.coords.longitude));

        }
      );
    }

    // dispatch(listAllServices());
    // dispatch(listAllProduct());


  }, [])


  // console.log(search);

  function find(s) {
    setSearch(s);
  }

  // var [h,setH]=useState(" ");
  // useEffect(() => {
  //   if (document.body.clientHeight < window.innerHeight) {
  //     console.log("helllo");
  //     setH="100vh"
  //   }
  //   else
  //   {
  //     console.log("h");
  //     setH="100%"
  //   }
  // }, [h]);
  return (
    <div style={{ backgroundImage: `url(${bg})` }}>
      {/* <div style={{background: `linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(0,212,255,1) 0%, rgba(9,98,121,1) 100%)`}}> */}
      <Router>
        <Navbar find={find} />
        <Routes>
          <Route
            exact
            path="/"
            element={<Home search={search} />}
          ></Route>
          <Route
            exact
            path="/service"
            element={<AllServices search={search} />}
          ></Route>
          <Route
            exact
            path="/products"
            element={<ProductsOnly search={search} />}
          ></Route>
        </Routes>
      </Router>
      {/* <Navbar/> */}
      {/* <Services /> */}
      {/* <Home/> */}
    </div>
  );
}

export default App;
