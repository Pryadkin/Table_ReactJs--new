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
    sortType: 'abs',
    columnsName: null,
  }

  componentDidMount() {
    const dataClone = [...Json]; 
    const columnsClone = Object.keys(dataClone[0]);   

    sort(dataClone, 'id' , 'abs');
   
    this.setState({
      data: dataClone,
      columns: columnsClone,
      columnsName: columnsClone[0],
    })       
      
  }
      
    
  onSort = (columns) => {
    const dataSort = [...this.state.data]    
    let direction = null;
    
    if (columns === this.state.columnsName && this.state.sortType === 'abs') {
      direction = 'desc';
      // this.setState({sortType: direction})
    } else {
      direction = 'abs';
      // this.setState({sortType: direction})
    }
    
    // console.log(direction)
      sort(dataSort, columns, direction);
      // console.log(sort(dataSort, columns, 'desc'))
      this.setState({
        data: dataSort,
        sortType: direction,
        columnsName: columns,
      })
      
    // } else {      
    //   sort(dataSort, columns, 'abc');
    //   console.log(sort(dataSort, columns, 'abc'))
    //   this.setState({
    //     data: dataSort,
    //     sortType: 'abc'
    //   })
    // }
    
       
  }
  

  render() {
    // console.log(this.state.data)
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
