'use strict';

var React                  = require('react'),
    Popup                  = require('react-popup');

/** Render popup */
React.render(
	<Popup closeHtml="×" />,
	document.getElementById('popupContainer')
);
