import React from 'react'
// import { ModalHeader } from "react-bootstrap/ModalHeader";
import Modal from "react-bootstrap/Modal";

// import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
import serviceimg from "../images/ot.jpg"
import "../css/local.css"
import ReactStars from 'react-stars'
import { updateServiceRatingAction } from '../reduxstore/actions/servicesActions';
import { useDispatch } from 'react-redux';
import { updateProductRatingAction } from '../reduxstore/actions/productsActions';

function Serviceinfo({ show, onHide, name, price, rating, info, src, mobile, id, count, toggleItem }) {

    const dispatch = useDispatch();

    const ratingChanged = (rating, b_rating, count) => {
        let updateCount = count + 1;
        let updateRating = (rating + (b_rating*count)) / updateCount;
        dispatch(updateServiceRatingAction(id, updateRating, updateCount))
    }

    const ratingChanged2 = (rating, b_rating, count) => {
        let updateCount = count + 1;
        let updateRating = (rating + (b_rating*count)) / updateCount;
        dispatch(updateProductRatingAction(id, updateRating, updateCount))
    }

    return (

        <>
            {/* {console.log(movieInfo)}; */}
            <Modal
                // {...props}
                show={show}
                onClick={onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {/* {movieInfo.movieinfo.title} */} {name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row deskContent">
                        <div className="offset-2 col-8 col-sm-8 col-md-5 offset-lg-1">
                            <img src={src} className="serviceinfo-image" alt="service" />

                        </div>
                        <div className="offset-2 col-8 col-sm-8 col-md-5 offset-lg-0">
                            <span>
                                {/* {movieInfo.movieinfo.overview} */}{info}
                            </span><br /><br />
                            {/* <span className="card-text">
                                <i className="fa fa-star rating-star" aria-hidden="true">
                                    <span className="rating">{rating}</span>
                                </i>
                            </span>&nbsp;&nbsp; */}
                            <span className="card-text float">
                                {/* <input className="rating" type="text" name="" placeholder="rate us"/> */}
                                <span className="text-center">
                                    {toggleItem == "Services" ? <ReactStars
                                        count={5}
                                        value={rating}
                                        onChange={(e) => ratingChanged(e, rating, count)}
                                        size={24}
                                        color2={'#ffd700'} /> :
                                        <ReactStars
                                            count={5}
                                            value={rating}
                                            onChange={(e) => ratingChanged2(e, rating, count)}
                                            size={24}
                                            color2={'#ffd700'} />
                                    }
                                    ({count})
                                </span>
                            </span>

                        </div>
                        <div className="offset-2 col-8 offset-sm-0 col-sm-8 col-md-4 offset-lg-1">
                            <p className="text-secondary text-center ps-lg-5">price {price}</p>
                        </div>
                        <div className="offset-2 col-8 col-sm-8 col-md-5 offset-lg-0 col-lg-6">
                            <a href={`https://wa.me/${mobile}`} target="_blank" className="btn btn-sm btn-outline-success float-lg-end">
                                <span className="fs-4"><i class="fa fa-whatsapp"> Contact</i></span>
                            </a>
                        </div>

                    </div>

                    <div className="row phoneContent">
                        <div className="col-8 col-sm-8 col-md-5">
                            <img src={src} className="serviceinfo-image" alt="service" />

                        </div>
                        <div className="offset-2 col-8 offset-sm-0 col-sm-8 col-md-4 offset-lg-1">
                            <p className="text-secondary text-center ps-lg-5">price ${price}</p>
                        </div>
                        <div className="col-8 col-sm-8 col-md-5">
                            <span>
                            </span><br /><br />
                            {/* <span className="card-text">

                                <i className="fa fa-star rating-star" aria-hidden="true">
                                    <span className="rating ps-2">4.5</span>
                                </i>
                            </span>&nbsp;&nbsp; */}
                            <span className="card-text">
                                <span className="text-center">
                                    {toggleItem == "Services" ? <ReactStars
                                        count={5}
                                        value={rating}
                                        onChange={(e) => ratingChanged(e, rating, count)}
                                        size={24}
                                        color2={'#ffd700'} /> :

                                        <ReactStars
                                            count={5}
                                            value={rating}
                                            onChange={(e) => ratingChanged2(e, rating, count)}
                                            size={24}
                                            color2={'#ffd700'} />
                                    }
                                    ({count})

                                </span>
                            </span>
                        </div>
                        <div className="float-end">
                            <a href="tel:0123456789" target="_blank" className="btn btn-sm btn-outline-success float-start">
                                <span className="fs-4"><i class="fa fa-phone"> Contact</i></span>
                            </a>
                            <a href={`https://wa.me/${mobile}`} target="_blank" className="btn btn-sm btn-outline-success float-end">
                                <span className="fs-4"><i class="fa fa-whatsapp"> Contact</i></span>
                            </a>
                        </div>

                    </div>
                    {/* <img src={`https://image.tmdb.org/t/p/w500${movieInfo.movieinfo.backdrop_path}`} className="" alt={movieInfo.movieinfo.title} /> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn-info" onClick={onHide}>Ok</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}


export default Serviceinfo