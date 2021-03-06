// 3rd Party
var DaRez = require('express')()
var bodyParser = require('body-parser')
var pmongo = require('promised-mongo')
// Custom
var server = require('./Server/server')
var DEBUG = require('./debug')

var db = pmongo('test', ['Users'])

// Set the Database for the server
server.db = db

DaRez.use(require('express-promise')())
DaRez.use(bodyParser.json())
DaRez.use(bodyParser.urlencoded({ extended: true }))

DaRez.post('/Register', function(req, res) {
    username = req.body.username
    password = req.body.password
    res.json({
	registered: server.register(username, password)
	    .then(function(wasUserAdded) {
		console.log(wasUserAdded)
		if (wasUserAdded) {
		    return true
		} else {
		    return false
		}
	    }, function (rejectionReason) {
		return false
	    })
    })
})

DaRez.post('/Login', function(req, res) {
    username = req.body.username
    password = req.body.password
    res.json({
	loggedin: server.login(username, password, req.ip)
	    .then(function (db_response) {
		// db_response[0] will be null if the db call failed
		if (db_response[0]) {
		    return true
		} else {
		    return false
		}
	    }, function (rejectionReason) {
		return false
	    })
    })
})

DaRez.post('/Logout', function(req, res) {
    username = req.body.username
    res.json({
	loggedout: server.logout(username, req.ip)
	    .then(function (dbResponse) {
		// dbResponse[0] is null if db call didn't work
		if (dbResponse[0]){
		    return true
		} else {
		    return false
		}
	    })
    })
})

DaRez.get('/Users', function(req, res) {
    res.json({
	users: server.getUsers().then(function (users) {
	    console.log(users)
	})
    })
})


DaRez.listen(9000)
