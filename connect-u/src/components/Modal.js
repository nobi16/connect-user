import React from 'react'

function Modal(props) {
    return (
        <div className="row">
            <div className="col-5 me-0 my-1">
                <img src={props.photo} alt="<?= $row['name'] ?>" className="businessimg" />
            </div>
            <div className="card col-7 p-2 my-1 ms-0">
                <h5 className="card-title fw-bolder">{props.name}
                    <span className="card-text float-end">
                        <i className="fa fa-star rating-star" aria-hidden="true">
                            <span className="rating">{props.rating}</span>
                        </i>
                    </span>
                </h5>
                <span className="card-text">{props.info}</span>
                <button className="col-12 btn btn-sm my-button-light btn-block mt-auto" onClick={() => setShow(true)}>info</button>
            </div>
        </div>
    )
}

export default Modal