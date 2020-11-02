import React, { useState, useEffect } from "react";
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import '../App.css';
import axios from "axios";
import weatherReport from '../actions/action'
import city_id from "../cities/city_id.json"

const options = [
    {
        value: 'name',
        radioButtonLabel: 'City name',
    },
    {
        value: 'id',
        radioButtonLabel: 'City Id',
    },
    {
        value: 'coordinates',
        radioButtonLabel: 'City co-ordinates',
    },
    {
        value: 'zipcode',
        radioButtonLabel: 'City pincode',
    },
];

const countries = ["INDIA", "US"];

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locationType: "name",
            country: "IN",
            id: "",
            name: "",
            zipcode: "",
            longitude: "",
            latitude: "",
            locationData: {},
            checkId: false,
            typeError:{type:"",response:""}
        }
    }

    handleLocationType = (e) => {
        this.setState({
            locationType: e.target.value
        })
    }

    handleChange = (e) => {
        this.setState({
            country: e.target.value
        })
    }

    handleText = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleId = (data_id) => {
        this.setState({id:data_id})
    }

    fetchData = (data) => {
        axios(`https://agile-retreat-07797.herokuapp.com/api/get-weather`, {
            method: 'POST',
            crossdomain: true,
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            this.props.weatherReport(response.data)
            this.props.history.push('/weather-report')
        })
        .catch(error => {
            this.props.history.push('/error')
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({typeError:{type:"",response:""}})
        let loadData = {}
        if (this.state.locationType === "name") {
            new Promise((resolve, reject) => {
                resolve(city_id.filter(city => city.name.toLowerCase() === this.state.name))
            }).then(response => {
                if(response.length > 0){
                    loadData = {
                        locationType: "name",
                        locationData: {
                            city: this.state.name,
                            country: this.state.country
                        }
                    }
                    this.fetchData(loadData)
                    this.setState({name:""})
                }else{
                    this.setState({typeError:{type:"name", reason:"InValid City Name"}})
                    this.setState({name:""})
                }
            });
        }
        else if (this.state.locationType === "id") {
            let code = new RegExp('^\\d+$');
            if(code.test(this.state.id)){
                new Promise((resolve, reject) => {
                    resolve(city_id.filter(city => city.id == this.state.id))
                }).then(response => {
                    if(response.length > 0){
                        loadData = {
                            locationType: "id",
                            locationData: {
                                id: this.state.id
                            }
                        }
                        this.fetchData(loadData)
                        this.setState({id:""})
                    }else{
                        this.setState({typeError:{type:"id", reason:"InValid City ID, Please Check"}})
                        this.setState({id:""})
                    }
                });
            }
            else{
                this.setState({typeError:{type:"id", reason:"City ID, Should Contain Only Integers"}})
                this.setState({id:""})
            }
        }
        else if (this.state.locationType === "zipcode") {
            let code = new RegExp('^\\d+$');
            if(code.test(this.state.zipcode)){
                loadData = {
                    locationType: "zipcode",
                    locationData: {
                        zipcode: this.state.zipcode,
                        country: this.state.country
                    }
                }
                this.fetchData(loadData)
                this.setState({zipcode:""})
            }
            else{
                this.setState({typeError:{type:"zipcode", reason:"City PinCode, Should Contain Only Integers"}})
                this.setState({zipcode:""})
            }
        }
        else {
            if(!/^\s*$/.test(this.state.latitude) && !isNaN(this.state.latitude) && !/^\s*$/.test(this.state.longitude) && !isNaN(this.state.longitude)){
                loadData = {
                    locationType: "coordinates",
                    locationData: {
                        latitude: this.state.latitude,
                        longitude: this.state.longitude
                    }
                }
                this.fetchData(loadData)
                this.setState({latitude:"",longitude:""})
            }else{
                this.setState({typeError:{type:"coordinates", reason:"Latitude and Logitude Should be Decimal"}})
                this.setState({latitude:"",longitude:""})
            }
        }
    }

    handleDialog = (e) => {
        this.setState({typeError:{type:"",response:""}})
        if (!this.state.checkId) {
            document.getElementById("myModal").style.display = "block";
            this.setState({ checkId: true })
        }
        if (this.state.checkId) {
            document.getElementById("myModal").style.display = "none";
            this.setState({ checkId: false })
        }
    }

    render() {
        const selectedOption = options.map((value, index) => {
            return (
                <div key={index}>
                    <label>
                        <input key={index} type="radio" value={value.value} checked={this.state.locationType === value.value} onChange={this.handleLocationType} />
                        {value.radioButtonLabel}
                    </label>
                </div>
            )
        })
        return (
            <div className="App-header">
                <div className='header'>
                    <h2>Weather Forcast</h2>
                </div>
                <div className="instructions">
                    <p>Select below any radio button to get INDIA or US Weather Details</p>
                </div>
                <div id="myModal" className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={this.handleDialog}>&times;</span>
                        <Search storeId={this.handleId}/>
                        {this.state.id ? <div><span className="a">{this.state.id}</span><span className="b">Copied to your Input Box</span></div> : <></>}
                    </div>
                </div>
                <form className="weatherDetails">
                    <div className="container-fluid">
                        {selectedOption}
                        {/* <div>Selected locationType : {this.state.locationType}</div> */}
                        {this.state.locationType === "name" ?
                            <React.Fragment>
                                <select className="weather" value={this.state.value} onChange={this.handleChange}>
                                    {
                                        countries.map((country, index) => {
                                            return <option key={index} value={country}>{country}</option>
                                        })
                                    }
                                </select>
                                <br />
                                <input className="textInput" type="text" name="name" placeholder="Enter City Name" value={this.state.city} autoComplete="off" onChange={this.handleText} required />
                                {this.state.typeError.type ==="name" ? ( <h5 className="error" style={{ color: "red" }}>{this.state.typeError.reason}</h5> ) : ( "" )}
                            </React.Fragment>
                            :
                            <React.Fragment>
                                {this.state.locationType === "zipcode" ?
                                    <React.Fragment>
                                        <select className="weather" value={this.state.value} onChange={this.handleChange}>
                                            {
                                                countries.map((country, index) => {
                                                    return <option key={index} value={country}>{country}</option>
                                                })
                                            }
                                        </select>
                                        <br />
                                        <input className="textInput" type="text" name="zipcode" placeholder="Enter Postal Code" value={this.state.zipcode} autoComplete="off" onChange={this.handleText} required />
                                        {this.state.typeError.type ==="zipcode" ? ( <h5 className="error" style={{ color: "red" }}>{this.state.typeError.reason}</h5> ) : ( "" )}
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        {this.state.locationType === "coordinates" ?
                                            <React.Fragment>
                                                <span><input className="textInput" type="text" name="latitude" placeholder="Enter Latitude" value={this.state.latitude} autoComplete="off" onChange={this.handleText} required /></span>
                                                <br />
                                                <span><input className="textInput" type="text" name="longitude" placeholder="Enter Longitude" value={this.state.longitude} autoComplete="off" onChange={this.handleText} required /></span>
                                                {this.state.typeError.type ==="coordinates" ? ( <h5 className="error" style={{ color: "red" }}>{this.state.typeError.reason}</h5> ) : ( "" )}
                                            </React.Fragment>
                                            :
                                            <React.Fragment>
                                                <input className="textInput" type="text" name="id" placeholder="Enter City ID" value={this.state.id} autoComplete="off" onChange={this.handleText} required />
                                                {this.state.typeError.type ==="id" ? ( <h5 className="error" style={{ color: "red" }}>{this.state.typeError.reason}</h5> ) : ( "" )}
                                                <h6 onClick={this.handleDialog}>Don't know City ID! Click Here</h6>
                                            </React.Fragment>
                                        }
                                    </React.Fragment>
                                }
                            </React.Fragment>
                        }
                        <br />
                        <input className="submit" type="submit" value="Submit" onClick={this.handleSubmit}/>
                    </div>
                </form>
            </div>
        )
    }
}

function Search(props) {
    const [search, setSearch] = useState("")
    const [preview, setPreview] = useState([])
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [cityCode, setCityCode] = useState("")
    const [nearestMatchCity, setNearestMatchCity] = useState([])

    useEffect(() => {
        let data = city_id
            .map(city => {
                return {
                    id: city.id,
                    name: city.name
                }
            })
        setData(data)
        setIsLoading(false)
    }, [isLoading])

    useEffect(() => {
        document
            .querySelector(".search-list-container")
            .addEventListener("click", e => {
                setSearch(e.target.innerHTML.toLowerCase())
            });
    }, [search])

    useEffect(() => {
        document.querySelector(".search-list-container").innerHTML = "";
        if (preview.length > 0) {
            const list = preview.slice(0, 10).forEach(obj => {
                let node = document.createElement("li");
                node.className = "search-list-items";
                let textnode = document.createTextNode(obj.name);
                node.appendChild(textnode);
                document.querySelector(".search-list-container").appendChild(node);
            });
        }
    }, [preview])

    const searchFilter = () => {
        if (search) {
            setPreview(() => data.filter(city => city.name.toLowerCase().indexOf(search) > -1))
        }
    }

    const handleButtonClick = () => {
        const city_object = data.filter(city => city.name.toLowerCase() == search)
        if(city_object.length > 0){
            setCityCode(city_object[0].id)
            props.storeId(city_object[0].id)
        }
    }

    return (
        <div className="search">
            <input type="text" name="search" value={search} id="search-input" placeholder="Search..." autoComplete="off" onChange={({ target: { value } }) => setSearch(value)} onKeyUp={() => searchFilter()}
                onFocus={(e) => {
                    document.querySelector(".search-list").classList.remove("hidden");
                }}
                onBlur={() => {
                    setTimeout(() => {
                        document.querySelector(".search-list").classList.add("hidden");
                        setNearestMatchCity(preview)
                        setPreview([])
                    }, 1000);
                }}
            />
            <button className="submit" onClick={() => handleButtonClick()}>Get Code</button>
            <div className="search-list hidden">
                <ul className="search-list-container"></ul>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        weatherReport: (data) => dispatch(weatherReport(data)),
    }
};

export default withRouter(connect(null, mapDispatchToProps)(Home));