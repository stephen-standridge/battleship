import {expect, assert} from 'chai';
import {filter, each} from 'lodash';
import {spy} from 'sinon'
import Battleship from '../source/Battleship';

describe('Battleship', ()=>{
	let battleship, control, exampleRow1, exampleRow2;
	before(()=>{
		battleship = new Battleship();
		exampleRow1 = { 
			cells: [1, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined ], 
			indices: [0,1,2,3,4,5,6,7,8]
		};
		exampleRow2 = {
			cells: [1, undefined, 1, undefined, undefined, 1, undefined, undefined, 1 ], 
			indices: [0,1,2,3,4,5,6,7,8]			
		}
	})
	describe('#automagic placement', ()=>{
		it('should place all 17 ship parts', ()=>{
			let shipsPlaced = filter( battleship.cells, (cell)=> cell == 'ship' )
			expect( shipsPlaced.length ).to.equal( 17 )
		})
	})
	describe('#getContiguousSpaceFrom', ()=>{
		it('return an array of indices that correspond to contiguous undefined within a grid row', ()=>{
			control = battleship.getContiguousSpaceFrom( exampleRow1, 3 )
			assert.deepEqual( control, [[1,2,3], [2,3,4], [6,7,8]])
		})
	})
	describe('#chooseRandomColOrRow', ()=>{
		it('should return an array of contiguous space if the rolled col or row has some', ()=>{
			spy( battleship, 'chooseRandomColOrRow' )
			control = battleship.chooseRandomColOrRow( [ exampleRow1, exampleRow2 ], 3, 0 )
			assert.deepEqual( control, [[1,2,3], [2,3,4], [6,7,8]])
			assert( battleship.chooseRandomColOrRow.calledOnce )

			battleship.chooseRandomColOrRow.restore()	
		})
		it('should reroll and succeed if it doesnt initially', ()=>{
			spy( battleship, 'chooseRandomColOrRow' )
			control = battleship.chooseRandomColOrRow( [ exampleRow1, exampleRow2 ], 3, 1 )
			assert.deepEqual( control, [[1,2,3], [2,3,4], [6,7,8]])
			assert( battleship.chooseRandomColOrRow.calledTwice )

			battleship.chooseRandomColOrRow.restore()					
		})		
	})
})