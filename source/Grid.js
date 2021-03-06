import { each, times } from 'lodash'

class Grid {
	constructor( x, y ){
		this._colCount = x ? x : this.size[0];
		this._rowCount = y ? y : this.size[1];
		this.cells = [];
		this.cells.length = this._colCount * this._rowCount;
	}
	rowContains( index, row ){
		let rowIn = index / this._rowCount || 0;
		return Math.floor(rowIn) == row;
	}
	colContains( index, col ){
		let colIn = index % this._colCount
		return colIn == col;
	}
	rows(){
		//returns an array of cells organized by rows
		return this.sortBy( 'row' )
	}
	sortBy( colOrRow ){
		return times( this[`_${colOrRow}Count`], ( countIndex )=>{
			let indices = [], cells=[];
			each( this.cells, ( item, index )=>{
				if( this[`${colOrRow}Contains`]( index, countIndex ) ){
					indices.push( index )
					cells.push( item )
				}
			});
			return { cells, indices }
		})
	}
	cols(){
		//returns an array of cells organized by cols
		return this.sortBy( 'col' )
	}

}

export default Grid