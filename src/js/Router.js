
'use strict';

let React = require('react');
let ReactCSSTransitionGroup = require('react/lib/ReactCSSTransitionGroup');
let Router = require('react-router');
let { Route, DefaultRoute, RouteHandler, Link } = Router;
require('./Router.css');

let Header = require('./components/header/header');
let Items = require('./components/products/items');
//let Basket = require('./components/basket/basket.js');
let Popup = require('./components/header/popup');

let Food = require('./components/page/page');

let App = React.createClass({
  mixins: [ Router.State ],

  render: function () {
    var table_id=this.props.params.params.id;	  
    let name = this.getRoutes().slice(0).reverse()[0].name;
	 
return (
      <div>
      <Header >
	{table_id}
      </Header>
       <div className='container'>
              <div className="food">

                <Items type="food" >

		</Items>
              </div>
          </div>

      </div>
    );
  }
});

/*let RedirectTo = React.createClass({
  statics: {
    willTransitionTo (transition, params) {
	  console.log("adsfasdf","asdfg"+params.id,params);
      //transition.redirect("food",{id:params.id});
      //transition.redirect('food', params);
      transition.redirect("food",{id:params.id})
    }
  },
  render () {}
});*/
let routes = (
<Route handler={App}  path="/">
   <Route handler={App}  path="/food/:id"/>
</Route>
);

//  <Route name="food" path="/food/:id"  handler={ Food } addHandlerKey={true}  />

/*
 let routes = (
<Route handler={Food}  path="/">
  <Route handler={ Food } path="/go/:id"/>
   <Route name="food" path="food/:id"  handler={ Food } addHandlerKey={true}  />

</Route>
);

let routes = (
  <Route handler={App} app="/oders">
    <DefaultRoute handler={RedirectTo} path="order"/>
      <Route name="food" handler={Food} addHandlerKey={true} />
      <Route handler={RedirectTo} path="orders" name="comments" />
  </Route>
);*/

Router.run(routes, function (Handler, state) {
  React.render(<Handler params={state} />, document.getElementById('app'));
});

module.exports = App;
