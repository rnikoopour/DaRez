var crypto = require('crypto')

module.exports = {
    GenerateSalt: function(length) {
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
    SecurePassword: function (password) {
	return crypto.createHash('sha256').digest(password)
    }
}
