
'use strict';

let React = require('react');
let Reflux = require('reflux');

let basketStore = require('../../stores/basket-store');
let actions = require('../../actions/app-actions');
//let socketStore = require('../../stores/socket-store');
let AddToBasket = require('../basket/add-to-basket.js');
let RemoveFromBasket = require('../basket/remove-from-basket.js');

require('./basket.css');

let Basket = React.createClass({

  mixins: [Reflux.connect(basketStore), Reflux.ListenerMixin],

  getBasketTotals() {
    return basketStore.getBasketTotals();
  },

  getBasketData() {
    return basketStore.getBasketData();
  },

  onBasketChange() {
    this.setState(this.getBasketTotals());
  },

  componentDidMount() {
    this.setState(this.getBasketTotals());
    this.listenTo(actions.addItem, this.onBasketChange);
    this.listenTo(actions.removeItem, this.onBasketChange);
  },

  render() {

    let clickHandler = () => {
      actions.checkOut();
      console.log("list:",this.getBasketData());
     

    };

    var statusClassName = this.state.qty === 0 ? 'appBasket--is-empty ' : '';
    var list = this.getBasketData().map((item,n)=> {
      return (
        <li key={n} className="pure-g">
          <div className="pure-u-1-2">
            <span className="appBasket-itemDetails">
              {item.name} : £{item.price}.00
            </span>
            <span className="appBasket-qty">x {item.qty}</span>
            </div>

          <div className="pure-u-1-2 appBasket-controls">
            <AddToBasket text="+" item={item} />
            <RemoveFromBasket item={item} />
          </div>
        </li>);
    });
    return (
      <div className={"appBasket pure-u-3-5 pure-u-md-3-5 pure-u-lg-2-5 " + statusClassName}>
        <div className="pure-g">

          <button onClick={clickHandler} className="appBasket-checkout pure-u-1-2">Pedir</button>

	
          <div className="pure-u-1-2">
	    <span className="appBasket-nrItems"> x {this.state.qty}</span>
            <span className="appBasket-total">£{this.state.total}.00</span>
	   
          </div>
        </div>
        <ul className="basketList list-reset">{list}</ul>
      </div>	
    );
  }
});

module.exports = Basket;
