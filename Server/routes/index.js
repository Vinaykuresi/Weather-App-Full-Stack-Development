const express = require('express');
var router = express.Router();
// const fetch = require('node-fetch');
var bodyParser = require('body-parser');
const axios = require('axios');
const generateWebAppURL = require('../constants/utils').generateWebAppURL;

router.use(bodyParser.urlencoded({ extended: true }));

// CREATES A NEW USER
router.post('/get-weather', function (req, res) {
    const requestBody = req.body;
    const apiUrl = generateWebAppURL(requestBody.locationType, requestBody.locationData);

    axios.get(apiUrl)
    .then(response => {
        res.status(200).send(response.data)
    })
    .catch(err => {
        res.status(404).send('error')
    });

})

module.exports = router;