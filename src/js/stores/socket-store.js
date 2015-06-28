'use strict';
let Reflux = require('reflux');
let actions = require('../actions/app-actions');
let socket = require('../socket');

let SocketStore = Reflux.createStore({

  init() {
    console.log(actions);
    //this.listenTo(actions.checkOut, this.onCheckOut);
    var self = this;
  },

  onCheckOut(pos) {
	  console.log("socket-store.js pos",pos);
    socket.emit('checkout', pos);
  }

});

module.exports = SocketStore;
