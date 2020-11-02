import React from "react";
import { withRouter } from 'react-router';

import NoLocationFound from '../assets/no-location.svg';

function ErrorDisplay(props) {
    const toHome = () => {
        window.location.href = "/"
    }
  return (
    <div className='weatherCardContainer'>
      <div className='weatherCardError'>
        <img src={NoLocationFound} alt='no location found'/>
        <p> Whoa! Looks like there was an error with your PinCode.</p>
        <button onClick={()=> toHome()}>Try Again</button>
      </div>
    </div>
  );
}

export default withRouter(ErrorDisplay);