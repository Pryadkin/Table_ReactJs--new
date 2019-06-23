import React, { Component } from 'react';
import './App.css';
import Json from './user.json';
import 'bootstrap/dist/css/bootstrap.min.css'
import TableComp from './Table/Table'
// import Loader from './Loader/Loader'
// import Table from './Table/Table'
import sort from './sort/sort'


class App extends Component {
  state = {
    data: [],
    columns: [],
    sortType: 'abc',
  }

  componentDidMount() {
    const dataClone = [...Json]; 
    const columnsClone = Object.keys(dataClone[0]);   

    sort(dataClone, 'id' , 'abs');
    
    this.setState({
      data: dataClone,
      columns: columnsClone,
    })       
      
  }
      
    
  onSort = (data, columns, direct) => {
    console.log(columns, direct)
    // sort(this.state.data, e.target.innerText, 'abs')
  }
  

  render() {
    return(
      <div>
        <TableComp 
          state={this.state}
          onSort={this.onSort}
        />
      </div>
    )
  }
}

export default App
