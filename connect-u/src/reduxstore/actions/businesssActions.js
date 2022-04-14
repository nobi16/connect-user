import {
  BUSINESS_CREATE_FAIL,
  BUSINESS_CREATE_REQUEST,
  BUSINESS_CREATE_SUCCESS,
  BUSINESS_DELETE_FAIL,
  BUSINESS_DELETE_REQUEST,
  BUSINESS_DELETE_SUCCESS,
  BUSINESS_LIST_FAIL,
  BUSINESS_LIST_REQUEST,
  BUSINESS_LIST_SUCCESS,
  BUSINESS_UPDATE_FAIL,
  BUSINESS_UPDATE_REQUEST,
  BUSINESS_UPDATE_SUCCESS,
} from "../constants/businessConstants.js";
import axios from "axios";
import { distance } from "../../components/Location.js";

export const listBusiness = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: BUSINESS_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/business`, config);

    await localStorage.setItem("Own_businesses", JSON.stringify(data))
    dispatch({
      type: BUSINESS_LIST_SUCCESS,
      payload: data,
    });

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BUSINESS_LIST_FAIL,
      payload: message,
    });
  }
};

export const listOneBusiness = (bid) => async (dispatch, getState) => {
  try {
    // localStorage.removeItem("one_businesses");

    dispatch({
      type: BUSINESS_LIST_REQUEST,
    });


    const config = {
      headers: {
        "Content-Type": "application/json"
      },
    };

    const { data } = await axios.get(`/api/business/${bid}`, config);
    await localStorage.setItem("one_businesses", JSON.stringify(data))
    await dispatch({
      type: BUSINESS_LIST_SUCCESS,
      payload: data,
    });

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BUSINESS_LIST_FAIL,
      payload: message,
    });
  }
};


export const listAllBusiness = (latitude, longitude) => async (dispatch, getState) => {
  // debugger
  try {
    dispatch({
      type: BUSINESS_LIST_REQUEST,
    });


    const config = {
      headers: {
        "Content-Type": "application/json"
      },
    };

    const { data } = await axios.get(`/api/business/getallbusiness`, config);

    let arr = []
    data.map((business) => {
      business.distance = distance(latitude, business.longitude, longitude, business.latitude, "K")
      arr.push(business)
    })
    arr = JSON.stringify(arr)

    await localStorage.setItem("All_businesses", (arr))
    dispatch({
      type: BUSINESS_LIST_SUCCESS,
      payload: data,
    });

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BUSINESS_LIST_FAIL,
      payload: message,
    });
  }
};



export const createBusinessAction = (name, category, mobile, photo, longitude, latitude) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: BUSINESS_CREATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    debugger

    const { data } = await axios.post(
      "/api/business/createbusiness",
      { name, category, mobile, photo, longitude, latitude },
      config
    );

    dispatch({
      type: BUSINESS_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BUSINESS_CREATE_FAIL,
      payload: message,
    });
  }
};



export const deleteBusinessAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BUSINESS_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/business/${id}`, config);

    dispatch({
      type: BUSINESS_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BUSINESS_DELETE_FAIL,
      payload: message,
    });
  }
};

export const updateBusinessAction = (id, name, category, mobile, photo, longitude, latitude) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: BUSINESS_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/business/${id}`,
      { name, category, mobile, photo, longitude, latitude },
      config
    );

    dispatch({
      type: BUSINESS_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BUSINESS_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const updateBusinessRatingAction = (rating, bid, count) => async (
  dispatch,
) => {
  try {
    console.log(rating);
    dispatch({
      type: BUSINESS_UPDATE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json"
      },
    };

    const { data } = await axios.put(
      `/api/business`,
      { rating, bid, count },
      config
    );

    dispatch({
      type: BUSINESS_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BUSINESS_UPDATE_FAIL,
      payload: message,
    });
  }
};
