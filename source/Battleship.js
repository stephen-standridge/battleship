import Grid from './Grid.js';
import { each, map, filter, slice, some, reduce } from 'lodash';

class Battleship extends Grid{
	constructor( size=[], ships ){
		super( size[0], size[1] )
		this.ships = ships || [5,4,3,3,2];
		each( this.ships, this.randomizeShipPlacement.bind(this) )
		this.total = reduce( this.ships, (a,b)=>{ return a+b }, 0)
	}
	get size(){
		return [10, 10]
	}
	set ships( s ){
		this._ships = s
	}
	get ships(){
		return this._ships;
	}
	shoot( index ){
		if( this.cells[index] == 'ship' ){
			this.cells[index] = 'hit'
			this.total -= 1;
			return 'hit'
		} else {
			this.cells[index] = 'missed'
			return 'missed'
		}
	}
	colOrRow( roll ){
		return roll ? 'col' : 'row'
	}
	rollForIndex( max ){
		let rawRoll = Math.floor( Math.random() * max );
		return Math.min( rawRoll, max - 1 );
	}
	randomizeColOrRowPlacement( shipLength, nextRoll ){
		//chooses column or row alignment for the ship
		//re-chooses if it the ship won't fit in any
		let roll = nextRoll == undefined ? Math.round(Math.random()) : nextRoll ;
		let colOrRow = this.colOrRow( roll );
		let retrievedColumnsOrRows = this[ `${colOrRow}s` ]();

		let emptyCellIndices = this.chooseRandomColOrRow( retrievedColumnsOrRows, shipLength );
		if( emptyCellIndices.length < 1 ){
			return this.randomizeColOrRowPlacement( shipLength, !roll )
		}
		return emptyCellIndices
	}
	chooseRandomColOrRow( possibilities, shipLength, nextRoll ){
		//chooses a column or row randomly from the set of possibilities
		//returns the indices for contiguous empty spaces big enough for the ship
		//re-chooses if the ship won't fit any

		let roll = nextRoll == undefined ? this.rollForIndex( possibilities.length ) : nextRoll;
		let possibility = possibilities[ roll ];
		let contiguousIndices = this.getContiguousSpaceFrom( possibility, shipLength )

		if( contiguousIndices.length ) {
			return contiguousIndices
		} else {
			possibilities.splice( roll, 1 )
			return this.chooseRandomColOrRow( possibilities, shipLength )
		}
	}
	getContiguousSpaceFrom( possibility, shipLength ){
		return filter( map( possibility.cells, (entry, index)=>{
			//creates an array of the next shipLength cells
			//returns indices that correspond to contiguous undefined cells

			if( index + shipLength > possibility.cells.length ){ return }

			let contiguousSet = slice( possibility.cells, index, index + shipLength )
			if( some( contiguousSet, (item)=> item !== undefined ) ){ return }

			let contiguousIndices = slice( possibility.indices, index, index + shipLength )

			return contiguousIndices
		} ), (entry)=> entry )
	}
	randomizeShipPlacement( shipLength ){
		let possibleIndices = this.randomizeColOrRowPlacement( shipLength );
		let roll = this.rollForIndex( possibleIndices.length )

		let chosenIndices = possibleIndices[ roll ];

		this.placeShipCells( chosenIndices )
	}
	placeShipCells(indices){
		each( indices, ( index )=> this.cells[index] = 'ship' )
	}
	
}
export default Battleship;