import { Grid } from "../model/Grid";
import isEqual from 'lodash/isEqual'

let grid: Grid;
let solution = [
    [6,9,4,2,8,7,5,3,1],
    [3,5,7,9,1,6,4,8,2],
    [1,8,2,5,4,3,6,7,9],
    [8,1,6,4,9,5,7,2,3],
    [7,4,5,3,2,1,8,9,6],
    [2,3,9,6,7,8,1,4,5],
    [4,7,3,1,5,9,2,6,8],
    [9,2,1,8,6,4,3,5,7],
    [5,6,8,7,3,2,9,1,4]
]

describe('grid', () => {
    
    // uns a function before each of the tests in this file runs
    beforeEach(() => {
        grid = new Grid([
            [0,9,0,0,0,7,5,0,0],
            [3,0,7,0,1,0,4,8,0],
            [0,0,0,5,4,0,0,0,0],
            [8,0,6,0,9,0,0,2,0],
            [7,4,5,0,2,0,8,9,6],
            [0,3,0,0,7,0,1,0,5],
            [0,0,0,0,5,9,0,0,0],
            [0,2,1,0,6,0,3,0,7],
            [0,0,8,7,0,0,0,1,0]
        ])
    })

    describe('is possible', () => {

        test('is possible on line', () => {
            expect(grid.isPossibleOnLine(0, 1)).toBe(true)
        });
        test('is not possible on line', () => {
            expect(grid.isPossibleOnLine(0, 5)).toBe(false)
        });

        test('is possible on col', () => {
            expect(grid.isPossibleOnCol(0, 1)).toBe(true)
        });
        test('is not possible on col', () => {
            expect(grid.isPossibleOnCol(0, 3)).toBe(false)
        });

        test('is possible on square', () => {
            expect(grid.isPossibleOnSquare(0, 0, 1)).toBe(true)
        });
        test('is not possible on square', () => {
            expect(grid.isPossibleOnSquare(0, 0, 9)).toBe(false)
        });

        test('is possible', () => {
            expect(grid.isPossible(0, 0, 1)).toBe(true)
        });
        test('is not possible', () => {
            expect(grid.isPossible(0, 0, 9)).toBe(false)
        });

    })

    describe('resolve', () => {
        beforeEach(() => {
            grid.resolve()
        })

        test('is complete', () => {
            expect(grid.isComplete()).toBe(true)
        });

        test('is solution complete', () => {
            const exampleOfCompleteGrid = solution
            grid.cells = exampleOfCompleteGrid
            expect(grid.isComplete()).toBe(true)
        });

    })
})
