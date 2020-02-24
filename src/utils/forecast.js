const request = require('request')

const forecast = (latitude, longitude, callback) => {
    //const url = 'https://api.darksky.net/forecast/c261e97ee2e774add8270fe1752a2252/37.8267,-122.4233'
    const url = 'https://api.darksky.net/forecast/c261e97ee2e774add8270fe1752a2252/'+ latitude + ',' + longitude

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            const val = body.currently
            const summary = body.daily.data[0].summary
            const daily = body.daily.data[0]
            callback( null, summary + ' It is currently ' + val.temperature + ' degrees out, Highest temperature is ' + daily.temperatureHigh + ' and Lowest is estimated to be ' + daily.temperatureLow +'. There is a ' + val.precipProbability + '% chance of rain')
        }
    })
} 

module.exports = forecast