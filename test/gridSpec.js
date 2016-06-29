import {expect, assert} from 'chai';
import {each, map} from 'lodash';
import Grid from '../source/grid';

describe('Grid', ()=>{
	let grid, control;
	before(()=>{
		grid = new Grid( 5, 5 );
		expect( grid.cells.length ).to.equal(25)
		each( grid.cells, (item, index)=> grid.cells[index] = index+1 );
		assert.deepEqual( grid.cells, [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25] )
	})
	describe('#rows', ()=>{
		it('should return an array of rows with the correct indices', ()=>{
			let sortedByRows = [[0,1,2,3,4], [5,6,7,8,9], [10,11,12,13,14], [15,16,17,18,19], [20,21,22,23,24]];
			assert.deepEqual( map(grid.rows(), 'indices'), sortedByRows )
		})
		it('should return an array of rows with the correct cells', ()=>{
			let sortedByRows = [[1,2,3,4,5], [6,7,8,9,10], [11,12,13,14,15], [16,17,18,19,20], [21,22,23,24,25]];
			assert.deepEqual( map(grid.rows(), 'cells'), sortedByRows )
		})		
	})

	describe("#cols", ()=>{
		it('should return an array of column data with the correct cells', ()=>{
			let sortedByCols = [[1,6,11,16,21], [2,7,12,17,22], [3,8,13,18,23], [4,9,14,19,24], [5,10,15,20,25]];
			assert.deepEqual( map(grid.cols(), 'cells'), sortedByCols )
		})
		it('should return an array of column data with the correct indices', ()=>{
			let sortedByCols = [[0,5,10,15,20], [1,6,11,16,21], [2,7,12,17,22], [3,8,13,18,23], [4,9,14,19,24]];
			assert.deepEqual( map( grid.cols(), 'indices'), sortedByCols )
		})			
	})
})