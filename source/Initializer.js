import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board.jsx';

export function initialize( sizeArray, shipArray ){
	ReactDOM.render( React.createElement(Board, { size: sizeArray, ships:shipArray }), document.getElementById('board'))
}