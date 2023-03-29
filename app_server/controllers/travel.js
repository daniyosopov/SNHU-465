const { response } = require('express');
const request = require('request');
const apiOptions = {
    server: 'http://localhost:3000'
}

const renderTravelList = (req, res, responseBody) => {
    let message = null;
    let pageTitle = process.env.npm_package_description +' - Travel';
    if(!(responseBody instanceof Array)) {
        message = 'API lookup error';
        responseBody = [];
    } else{
        if(!responseBody.length){
            message = 'No trips eist in our database!';
        }
    }
    res.render('travel',
        {
        title: pageTitle,
        trips: responseBody,
        message
        }
    );
};

/* GET travel view */
const travelList = (req, res) => {
    const path = '/api/trips';
    const requestOpstions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
    };

    console.info('>> travelController.travelList calling ' + requestOpstions.url);

    request(
        requestOpstions,
        (err, { statusCode }, body) => {
            if(err){
                console.error(err);
            }
            renderTravelList(req, res, body);
        }
    )
}


   
   module.exports = {
    travelList
   };
   