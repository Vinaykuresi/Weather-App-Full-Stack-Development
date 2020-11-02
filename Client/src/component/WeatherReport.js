import React from "react";
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import ThunderStormIcon from '../assets/weather_icons/01W.svg';
import RainIcon from '../assets/weather_icons/02W.svg';
import SnowIcon from '../assets/weather_icons/03W.svg';
import ClearIcon from '../assets/weather_icons/04W-DAY.svg';
import CloudsIcon from '../assets/weather_icons/05W.svg';
import NoLocationFound from '../assets/no-location.svg';

class WeatherReport extends React.Component {
    constructor(props) {
        super(props)
    }

    toHome = () => {
        window.location.href = "/"
    }

    render() {
        const load = Object.keys(this.props.data).length
        return (
            <div className='mainBody'>
                {load ?
                    <React.Fragment>
                        <div className='homeBtn'>
                            <button onClick={this.toHome}>Home</button>
                        </div>
                        <div className='weatherCardContainer'>
                            <div className='weatherCard'>
                                <img src={weatherIcon(this.props.data.weather[0].id)} alt='Weather icon' />
                                <div className='conditionsOverview'>
                                    <p>{Math.round(this.props.data.main.temp)}°</p>
                                    <p>{this.props.data.weather[0].description}</p>
                                </div>
                                <div className='conditionDetails'>
                                    <p>Humidity: {this.props.data.main.humidity}% </p>
                                    <p>Wind Speed: {this.props.data.wind.speed} mph </p>
                                </div>
                            </div>

                            <h4> Location | {this.props.data.name} </h4>
                        </div>
                    </React.Fragment>
                    :
                    <React.Fragment>
                    <div className='homeBtn'>
                            <button onClick={this.toHome}>Home</button>
                    </div>
                    </React.Fragment>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.weather.locationData,
    }
};

function weatherIcon(weatherId) {
    if (weatherId <= 232) {
        return ThunderStormIcon;
    } else if (weatherId >= 300 && weatherId <= 531) {
        return ThunderStormIcon;
    } else if (weatherId >= 300 && weatherId <= 531) {
        return RainIcon;
    } else if (weatherId >= 600 && weatherId <= 622) {
        return SnowIcon;
    }else if (weatherId >= 623 && weatherId < 800) {
        return SnowIcon;
    }else if (weatherId === 800) {
        return ClearIcon;
    } else if (weatherId >= 801 && weatherId <= 804) {
        return CloudsIcon;
    }
    return NoLocationFound;
}

export default withRouter(connect(mapStateToProps)(WeatherReport));
