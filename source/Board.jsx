import React from 'react';
import Battleship from './Battleship.js';
import {map} from 'lodash'

const Board = React.createClass({
	getInitialState() {
	    return {
        boards: [],
        player: 1,
        screen: 'start',
				paused: false,
				message: '',
				cheat: false	        
	    };
	},
	startTurn(){
		this.setState(( prevState )=>{
			prevState.screen = 'play'
			return prevState
		})
	},
	componentDidMount() {
	   this.newGame()  
	},
	startGame(){
		this.setState(( prevState )=>{
			prevState.screen = 'switch'
			return prevState
		})
	},	
	newGame(){
		let board1 = new Battleship(this.props.size, this.props.ships)
		let board2 = new Battleship(this.props.size, this.props.ships)
		this.setState({
			boards: [ board1, board2 ],
			player: 0,
			screen: 'start',
			paused: false,
			message: '',
			cheat: false
		})
	},	
	cheat(){
		this.setState(( prevState )=>{
			prevState.cheat = !prevState.cheat;
			return prevState
		})				
	},
	completeTurn(){
		this.setState(( prevState )=>{
			if( prevState.boards[prevState.player].total == 0 ){
				prevState.screen = 'victory'
				return prevState
			}
			prevState.message = ''
			prevState.paused = false
			prevState.screen = 'switch'
			prevState.player = (prevState.player + 1) % prevState.boards.length;		
			return prevState
		})		
	},
	pauseTurn(){
		this.setState((prevState)=>{
			prevState.paused = true;
			return prevState
		})
	},
	shoot( index ){
		if( this.state.paused ){ return }
		this.setState(( prevState )=>{
			prevState.message = prevState.boards[prevState.player].shoot( index )
			return prevState
		})
		this.pauseTurn()
	},
	render(){
		return (
		<div className='game-wrapper'>
			<div className="board-container">
				{this.renderScreen()}
				{this.renderCells()}
			</div>
			{this.renderMeta()}
		</div>
		)
	},
	cellClasses( type, cheat ){
		switch( type ){
			case 'hit':
				return 'hit cell'
			case 'missed':
				return 'missed cell'
			case 'ship':
				if( !cheat ){ 
					return 'unknown cell'
				}
				return 'cheat cell'
			default:
				return 'unknown cell'
		}
	},
	screenText( type ){
		switch( type ){
			case 'start':
				return 'This is a game of battleship, grab a second player then click start!'
			case 'switch':
				return `Your turn, player ${this.state.player + 1}`
			case 'victory':
				return `Congratulations, player ${this.state.player + 1 }; you won!`
		}
	},
	messageText( type ){
		switch( type ){
			case 'hit':
				return 'You hit a ship! Good Job.'
			case 'missed':
				return `You missed all the ships.`
			default:
				return `Aim true.`
		}
	},	
	buttonFor( type ){
		switch( type ){
			case 'start':
				return (
					<div className={`button button--start`} onClick={this.startGame}> 
						Start
					</div>
				)
			case 'switch':
				return (
					<div className={`button button--switch`} onClick={this.startTurn}> 
						Ready
					</div>
				)
			case 'victory':
				return (
					<div className={`button button--victory`} onClick={this.newGame}> 
						New Game
					</div>
				)
		}
	},
	renderMeta(){
		if(this.state.screen !== 'play'){ return }
		return (
			<div className="meta-container">
				<div className="message"> {this.messageText(this.state.message)} </div>
				<div className='button button--change-players' onClick={this.completeTurn}> Switch Players </div>
				<div className="cheat--button" onClick={this.cheat}> (cheat) </div>				
			</div>
		)
	},
	renderScreen(){
		if(this.state.screen === 'play'){ return }
		return ( 
			<div className={`${this.state.screen} screen`}>
				<div className="screen__text"> {this.screenText(this.state.screen)} </div>
				{ this.buttonFor( this.state.screen ) }
			</div> )
	},
	renderCells(){
		if(this.state.screen !== 'play'){ return }
		let cells = this.state.boards[this.state.player].cells;
		let cellSize = (400 / Math.sqrt(cells.length) ) -2; //subtract two for border
		let styles = {
			width: `${cellSize}px`, 
			height: `${cellSize}px`,
		}
		return(
			<div className="cells">
				{map( cells, ( cell, index )=>{
					return (
						<div 
							className={this.cellClasses(cell, this.state.cheat)} 
							key={index} 
							onClick={()=> this.shoot(index) }
							style={ styles }/>
					)
				})}
			</div>
		)
	}
})

export default Board