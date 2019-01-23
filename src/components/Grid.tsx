import React, { Component } from 'react'
import { Grid as GridModel } from '../model/Grid';

interface GridProps {
    grid: GridModel
    handleModifyCell: Function
}
interface GridState {
}

export class Grid extends Component<GridProps, GridState> {

    constructor(props: GridProps) {
        super(props)
        this.state = {
        }  
    }

    render() {
        const { grid } = this.props
        return (
            <div className={'sudoku-grid'}>
                <table className={'grid-table'}>
                    <tbody>
                    {grid.cells.map( (line, i) => 
                        <tr key={i}>
                            {line.map( (cell, j) => 
                                <td key={i + '' + j}>
                                    <input 
                                        value={cell || ''} 
                                        onChange={(e) => this.props.handleModifyCell(i, j, parseInt(e.target.value))}
                                    />
                                </td>    
                            )}
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Grid