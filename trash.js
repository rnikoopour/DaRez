// 3rd Partyn
var Q = require('q')
var pmongo = require('promised-mongo')
// Custom
var server = require('./Server/server')


var db = pmongo('test', ['Users'])

console.log(process.cwd())


console.log(server)
server.Bar()
server.Bar()
