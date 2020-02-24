const path = require('path')
const express = require('express') // Express is a function, can be cald to create a new app.
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ayo Famodun'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ayo Famodun'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'For help contact me',
        title: 'Help',
        name: 'Ayo Famodun'
    })
})

//adding routes
app.get('/weather', (req, res) => {
    // Require address
    if (!req.query.address) {
        return res.send({error: 'Please provide an address and Try Again!'})
    }
    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({location, 'forecast': forecastData, 'address': req.query.address })
        })
    })
})

app.get('/products', (req, res) => {
    // If we want to make 'search' query compulsory to load the request
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
        //return : either here as above to end the function and prevent error.
    }
    console.log(req.query)
    res.send({
        products: [req.query]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorText: 'help article not found',
        title: '404 Error',
        name: 'Ayo Famodun'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorText: 'Page not Found',
        title: '404 Error',
        name: 'Ayo Famodun'
    })
})

//publish
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})