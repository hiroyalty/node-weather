const request = require('request') 

//return the latitude and longitude information about an address
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaGlyb3lhbHR5IiwiYSI6ImNrNnA4ZmFiejFqYmYzZG52cWhvcnl2cnIifQ.pfh1JnrUB5jiumVT0GUsuQ&limit=1'
    
    request({ url, json: true }, (error, {body}) => { //response.body now just body: by destructuring
        if (error) {
            error = 'Unable to connect to the Geolocation service'
            callback(error, undefined)
        } else if (body.features.length === 0 || body.features == null) {
            error = 'Unable to find location. Try another search'
            callback(error, undefined)
        } else {
            callback(null, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode