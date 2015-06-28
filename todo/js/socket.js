var io = require('socket.io-client');
var socket = io('http://localhost:8080');
socket.on('connect', function(){
console.log('connected!!!!!!!!!!!!! ')});
module.exports = socket;
