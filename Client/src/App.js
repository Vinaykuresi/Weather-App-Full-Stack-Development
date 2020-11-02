import { Provider } from "react-redux";
import React from "react"
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./component/Home"
import WeatherReport from "./component/WeatherReport"
import ErrorDisplay from "./component/ErrorDisplay"
import  store  from './store';

class App extends React.Component {
  render(){
    return (
    <Provider store={store}>
      <BrowserRouter>
        <React.Fragment>
          <Route exact path='/' component={Home} />
          <Route exact path='/weather-report' component={WeatherReport} />
          <Route exact path='/error' component={ErrorDisplay} />
        </React.Fragment>
      </BrowserRouter>
    </Provider>
  );
  }
}

export default App;
