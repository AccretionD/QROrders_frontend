
'use strict';

let React = require('react');
let Reflux = require('reflux');

let basketStore = require('../../stores/basket-store');
let actions = require('../../actions/app-actions');
//let socketStore = require('../../stores/socket-store');
let AddToBasket = require('../basket/add-to-basket.js');
let RemoveFromBasket = require('../basket/remove-from-basket.js');
var Popup = require('react-popup');

/** Render popup */
React.render(
	<Popup closeHtml="×" />,
	document.getElementById('popupContainer')
);

var requestOrder = document.getElementById('customButtons');

require('./basket.css');
/*
requestOrder.addEventListener('click', function () {
	Popup.create({
		title: null,
		content: 'This popup uses the create method directly to get more control. This popup demonstrates custom buttons.',
		buttons: {
			left: ['cancel'],
			right: [{
				text: 'Save',
				className: 'success',
				action: function () {*/
					/** This popup will be displayed after this one has closed */
				//	Popup.alert('Another popup yada yada');

					/** Close this popup. Close will always close the current visible one, if one is visible */
				/*	Popup.close();
				}
			}]
		}
	});
});*/

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


console.log('props basket deepTranfering rocking',this.props.children);
var table=this.props.children;

    let clickHandler = () => {
/** Custom buttons */
Popup.create({
		title: null,
		content: '¿Esta seguro?',
		buttons: {
			left: ['No'],
			right: [{
				text: 'Si',
				className: 'success',
				action: function () {
					/** This popup will be displayed after this one has closed */
					//Popup.alert('Another popup yada yada');
					 actions.checkOut(table);
					/** Close this popup. Close will always close the current visible one, if one is visible */
					Popup.close();
				}
			}]
		}
	});     
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

          <button onClick={clickHandler} id="customButtons" className="appBasket-checkout pure-u-1-2">Pedir</button>

	
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
