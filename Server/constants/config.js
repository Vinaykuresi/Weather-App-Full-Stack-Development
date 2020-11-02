module.exports = {
    baseUrl: {
      protocol: 'http',
      hostname: 'api.openweathermap.org',
      path: '/data/2.5/weather',
    },
  
    query: {
      name: 'q',
      id: 'id',
      coordinates: {
        latitude: 'lat',
        longitude: 'lon',
      },
      zipcode: 'zip',
    },
  
    APIkey: 'ec3ae3558272f4aacf3470407b5d57ad',
  };
  