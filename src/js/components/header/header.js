
let React = require('react');
let Basket = require('../basket/basket.js');

var Header =
  React.createClass({
    render:function(){
      return (
        <div className='container'>
        <div className="pure-g">
       <div id="popupContainer"> </div>  
          <header className="appHeader pure-u-1">
            <h1>
<img src="http://filomenu.com/images/filomenu.png" width="300" height="82" alt="Restaurante Café" />
</h1>
              { this.props.children }
          </header>
          <div className="fixed-container">
            <div className="container">
              <Basket className="pure-g" />
            </div>
          </div>
          </div>
        </div>
      );
    }
  });
module.exports = Header;
