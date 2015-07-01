'use strict';

let request = require('superagent');
let Reflux = require('reflux');
let actions = require('../actions/app-actions');
let _ = require('lodash');

let BasketStore = Reflux.createStore({

  init() {
      this.data = {
        basketItems: []
      };
      //this.listenToMany(actions);
      this.listenTo(actions.addItem, this.onAddItem);
      this.listenTo(actions.removeItem, this.onRemoveItem);
      this.listenTo(actions.checkOut, this.onCheckOut);
    },

  onCheckOut(table) {
	var ldata=this.data.basketItems;
	for (var i=0;i<ldata.length;i++){
   		ldata[i].table=table;
		console.log(ldata[i]);
	}

	request.post('/chef')
  	.send({c:ldata})
  	.end(function(err, res){
		console.log('did it again',res);
  	});


/*$.ajax({
   type: "POST",
   data: {c:this.data.basketItems},
   url: "http://localhost:3030/chef",
   success: function(msg){
       console.log('WHOOOOOOHOOOOOO!!!! ');
   }
});
*/
  	
  }

,
    onAddItem(item) {
      if (!item.inBasket) {
        item.qty = 1;
        item.inBasket = true;
        this.data.basketItems.push(item);
      } else {
        let itemToIncrease = _.find(this.data.basketItems, { 'id': item.id, 'type': item.type });
        let itemIndex = this.data.basketItems.indexOf(itemToIncrease);
        this.data.basketItems[itemIndex].qty++;
      }
    },

    onRemoveItem(item){
      let itemToRemove = _.find(this.data.basketItems, { 'id': item.id, 'type': item.type });
      let itemIndex = this.data.basketItems.indexOf(itemToRemove);
      if(this.isInBasket(item) && this.data.basketItems[itemIndex].qty>1) {
        this.data.basketItems[itemIndex].qty--;
      } else {
        if (typeof itemToRemove === 'object') {
          itemToRemove.inBasket = false;
          this.data.basketItems.splice(itemIndex, 1);
        }
      }
    },

    getBasketTotals() {
      var qty = 0,
        total = 0;
      this.data.basketItems.forEach(function(basketItem) {
        qty += basketItem.qty;
        total += basketItem.qty * basketItem.price;
      });
      return {
        'qty': qty,
        'total': total
      };
    },

    getBasketData() {
      return this.data.basketItems;
    },

    getBasketQty(item) {
      var basketItem = _.find(this.data.basketItems, { 'id': item.id, 'type': item.type });
      if (typeof basketItem === 'object') {
        return basketItem.qty;
      } else {
        return 0;
      }
    },

    isInBasket(item) {
      var basketItem = _.find(this.data.basketItems, { 'id': item.id, 'type': item.type });
      if (typeof basketItem === 'object') {
        return true;
      } else {
        return false;
      }
    },

    getInitialState() {
      return this.data;
    }
});

module.exports = BasketStore;
