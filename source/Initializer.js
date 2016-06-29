import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board.jsx';

export function initialize(){
	ReactDOM.render( React.createElement(Board), document.getElementById('board'))
}