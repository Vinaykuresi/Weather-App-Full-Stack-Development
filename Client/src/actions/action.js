import actionTypes from "../actionTypes/actionTypes";

function weatherReport(weatherData){
    return (dispatch) => dispatch({ type: actionTypes.WEATHER_DATA, payload:weatherData });
}

export default weatherReport;