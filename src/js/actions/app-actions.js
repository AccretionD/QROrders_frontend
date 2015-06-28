
'use strict';

let Reflux = require('reflux');

// REFLUX actions
let AppActions = Reflux.createActions(
  [
  'loadPage',
  'addItem',
  'removeItem',
  'pageChange',
  'checkOut'
  
  ]
);

module.exports = AppActions;
