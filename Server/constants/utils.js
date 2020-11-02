const url = require('url');
const config = require('./config');

module.exports = {
  generateWebAppURL: function(locationConfigType, locationConfigData) {
    const baseUrlConfig = config.baseUrl;
    const APIkey = config.APIkey;
    const queryConfig = config.query;

    let requestQuery = { appid: APIkey };

    if (locationConfigType == 'name') {
      requestQuery[queryConfig[locationConfigType]] = locationConfigData.city+','+locationConfigData.country;
    }else if(locationConfigType == 'zipcode'){
      requestQuery[queryConfig[locationConfigType]] = locationConfigData.zipcode+','+locationConfigData.country;
    }
    else if(locationConfigType == 'id'){
      requestQuery[queryConfig[locationConfigType]] = locationConfigData.id;
    }
     else {
      if (locationConfigData.latitude) {
        requestQuery[queryConfig.coordinates.latitude] = locationConfigData.latitude;
      }
      if (locationConfigData.longitude) {
        requestQuery[queryConfig.coordinates.longitude] = locationConfigData.longitude;
      }
    }
    // console.log(requestQuery)
    return url.format({
      protocol: baseUrlConfig.protocol,
      hostname: baseUrlConfig.hostname,
      pathname: baseUrlConfig.path,
      query: requestQuery,
    });
  },
};
