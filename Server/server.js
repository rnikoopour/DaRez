var Q = require('q')
var serverSupport = require('./serverSupport')
var DEBUG = require('../debug')

var server = {
    db: null,
    register: function (desiredUsername, desiredPassword) {
	db = this.db
	return db.Users.find().toArray()
	    .then(function(usersFound) {
		var promise = Q.defer()
		if (!usersFound.length) {
		    newSalt = serverSupport.generateSalt()
		    desiredPassword = serverSupport.securePassword(desiredPassword + newSalt)
		    db.Users.save({
			username: desiredUsername,
			password: desiredPassword,
			salt: newSalt,
			status: null,
			ipAddr: null
		    }).then(promise.resolve(true))
		} else {
		    promise.reject('TAKEN')
		}
		return promise.promise
	    })
    },
    login: function(username, password, ip) {
	db = this.db
	// Have to find the user first to get the salt so we can check the password
	return db.Users.findOne({
	    username: username
	}).then(function(user) {
	    var promise = Q.defer()
	    if (user.password == serverSupport.securePassword(password + user.salt)) {
		promise.resolve(db.Users.findAndModify({
		    query: user,
		    update: { $set: {
			status: 'online',
			ipAddr: ip
		    }}
		}))
	    } else {
		promise.revoke("INVALID USERNAME/PASSWOD")
	    }
	    return promise.promise
	})
    },
    logout: function(username, ip){
	db = this.db
	return db.Users.findAndModify({
	    query: {
		username: username,
		ipAddr: ip,
		status: 'online'
	    },
	    update: { $set: {
		status: null,
		ipAddr: null
	    }}
	})
    },
    getUsers: function() {
	db = this.db
	return db.Users.findAll({
	    status: 'online'
	})
    }
}

module.exports = server
