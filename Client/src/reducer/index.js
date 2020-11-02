import { combineReducers } from "redux";
import actionTypes from "../actionTypes/actionTypes";

const initialState = {
    locationData:{}
}

const weather = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.WEATHER_DATA:
            const payload = action.payload;
            return {...state, locationData:payload}
        default:
            return state;
    }
}

export default combineReducers({
    weather
  });