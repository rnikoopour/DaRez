var crypto = require('crypto')

module.exports = {
    generateSalt: function (length) {
	var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
	var salt = ''

	if (!length) {
	    length = 10
	}

	for (var i = 0; i < length; i++) {
	    salt += chars[Math.floor(Math.random() * chars.length)]
	}

	return salt
    },
    securePassword: function (password) {
	password =  crypto.createHash('sha256').update(password).digest('hex')
	return password
    }
}
