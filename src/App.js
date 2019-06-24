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
    onDoubleClick: false,
    id: null,
    currentColumn: null,
    cellInputValue: null,
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
    } else {
      direction = 'abs';
    }    

    sort(dataSort, columns, direction);

    this.setState({
      data: dataSort,
      sortType: direction,
      columnsName: columns,
    })
  }


  onDoubleClick = (e, colNum) => {
    this.setState({
      id: +e.target.parentNode.firstChild.innerText,
      currentColumn: colNum,
    })   
  }
  
  onChange = (e) => {   
    const newData = [...this.state.data];
    
    this.state.data.forEach((i, index) => {      
      if (i.id === +e.target.parentNode.parentNode.firstChild.innerText) {  // проверка строки на id
        if (this.state.data[index].id === i.id) { // проверка строки на позицию (index)
          newData[index][this.state.columns[this.state.currentColumn]] = e.target.value;
          this.setState({
            data: newData,
          })
        }        
      }
    })
    

    
  }

  render() {
    // console.log(this.state.columns)
    return(
      <div>
        <TableComp 
          state={this.state}
          onSort={this.onSort}
          onDoubleClick={this.onDoubleClick}
          onChange={this.onChange}
        />
      </div>
    )
  }
}

export default App
