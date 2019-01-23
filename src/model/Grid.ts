import { GRID_HEIGHT, GRID_WIDTH } from "../defs";
import uniq from 'lodash/uniq'
export class Grid {

    public cells: number[][]

    constructor(cells?: number[][]){
        if(!cells){
            cells = [] as number[][]
            for (let i = 0; i < GRID_HEIGHT; i++) {
                for (let j = 0; j < GRID_WIDTH; j++) {
                    if(j === 0){
                        cells.push([])
                    }
                    cells[i][j] = 0
                }
            }

            let cellsNotEmpties: { value: number, line: number, col: number}[] = [
                {
                    value: 9,
                    line: 2,
                    col: 3
                }
            ]
            cellsNotEmpties.forEach(elt => {
                (cells as number[][])[elt.line][elt.col] = elt.value
            })
        }

        this.cells = cells
    }

    isComplete(){
        let i = 0
        let s = 0

        const nbSquare = GRID_HEIGHT / 3 * GRID_WIDTH / 3

        if(this.isFull()){

            // check if line and cols are ok
            while (i < GRID_HEIGHT && this.colIsValid(i) && this.lineIsValid(i)) {
                i++
            }

            // check squares are valid
            if(i === GRID_HEIGHT){
                while(s < nbSquare){
                    s++
                }
            }

        }

        return this.isFull() && i === GRID_HEIGHT //&& s === nbSquare
    }

    isFull(){
        let i = 0

        while(i < GRID_HEIGHT * GRID_WIDTH && !!this.cells[Math.floor(i/GRID_HEIGHT)][i % GRID_WIDTH]){
            i++
        }

        return i === GRID_HEIGHT * GRID_WIDTH
    }

    lineIsValid(index: number){
        const notNull = this.cells[index].filter(e => !!e)
        let uniqAndNotNull = uniq(notNull)
        return notNull.length === uniqAndNotNull.length
    }

    colIsValid(index: number){
        let col: number[] = []
        this.cells.forEach(line => col.push(line[index]))
        const notNull = col.filter(e => !!e)
        let uniqAndNotNull = uniq(notNull)
        return notNull.length === uniqAndNotNull.length
    }


    updateCell(line: number, col: number, value: number){
        this.cells[line][col] = value
    }

    clone(){
        return new Grid(this.cells)
    }

    resolve(position = 0): boolean{
        let grille = this.cells
        if (position == 9*9)
            return true;
    
        let i = Math.floor(position / 9)
        let j = position % 9;
    
        if (grille[i][j] != 0)
            return this.resolve(position+1);
    
        for (let k=1; k <= 9; k++)
        {
            if (this.isPossible(i, j, k))
            {
                grille[i][j] = k;
    
                if ( this.resolve(position+1) )
                    return true;
            }
        }
        this.cells[i][j] = 0;
    
        return false;
    }

    isPossibleOnLine(lineIndex: number, value: number){
        const line = this.cells[lineIndex]
        return line.filter(cell => cell === value).length === 0
    }

    isPossibleOnCol(colIndex: number, value: number){
        // const col = this.cells.flatMap(line => line[colIndex])
        let col: number[] = []
        this.cells.forEach(line => col.push(line[colIndex]))

        return col.filter(cell => cell === value).length === 0
    }

    isPossibleOnSquare(line:number, col: number, value: number){
        const squareSize = 3 * 3
        let i = 0

        while(
            i < squareSize && 
            this.cells[(this.getSquareLine(line) * 3) + Math.floor(i / 3)][(this.getSquareCol(col) * 3) + (i % 3)] !== value
        ){
            i++
        }

        return i === squareSize
    }

    isPossible(line:number, col: number, value: number){
        return this.isPossibleOnCol(col, value) && this.isPossibleOnLine(line, value) && this.isPossibleOnSquare(line, col, value)
    }

    // return 0, 1, 2 
    getSquareCol(colIndex: number){
        return Math.floor(colIndex / 3)
    }

    // return 0, 1, 2 
    getSquareLine(lineIndex: number){
        return Math.floor(lineIndex / 3)
    }

}