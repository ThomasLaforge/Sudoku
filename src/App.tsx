import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Grid from './components/Grid';
import { Grid as GridModel } from './model/Grid';

interface AppProps {
}
interface AppState {
  grid: GridModel
}

export class App extends Component<AppProps, AppState> {

  constructor(props: AppProps) {
      super(props)
      this.state = {
        grid: new GridModel([
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
      }
  }

  
  handleModifyCell = (line: number, col: number, value: number) => {
    console.log('input', line, col, value)
    let clone = this.state.grid.clone()
    try {
      clone.updateCell(line, col, value)
      this.setState({grid: clone})
    }
    catch(e){
      console.log('cant add this number')
    }
  }

  handleResolve = () => {
    let clone = this.state.grid.clone()
    clone.resolve()
    this.setState({ grid: clone })
  }

  render() {
    return (
      <div className="App">
        <Grid grid={this.state.grid} handleModifyCell={this.handleModifyCell} />
        <button onClick={this.handleResolve}>Resolve</button>
      </div>
    );
  }
}

export default App;