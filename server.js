// Require our dependencies
var express = require('express'),
    exphbs = require('express-handlebars'),
    http = require('http'),
    routes = require('./routes');

// Create an express instance and set a port variable
var app = express();

// openshift vars
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var ipAddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

// Set handlebars as the templating engine
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Disable etag headers on responses
app.disable('etag');

// Index Route
app.get('/', routes.index);

app.get('/sub', routes.sub); // callback from IG initial subscription
app.post('/sub', routes.pub); // callback for new media

// Set /public as our static content dir
app.use("/", express.static(__dirname + "/public/"));

// start our server
var server = http.createServer(app).listen(port, ipAddress, function() {
    console.log('listening on IP: ' + ipAddress + ' Port: ' + port);
})
