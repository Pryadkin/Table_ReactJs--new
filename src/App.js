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

  setValueCurrentColumn(e) {
    // console.log(e.target.innerText)
    // console.log(e.target.parentNode.firstChild.innerText)
    const cloneData = [...this.state.data];

    this.state.data.forEach((i, index) => {      
      if (i.id === +e.target.parentNode.firstChild.innerText) {  // получаем id выбранного элемента (i.id)
        
        if (this.state.data[index].id === i.id) { // получаем позицию строки выбранного элемента (index)
          console.log(i.id)
          cloneData[index][this.state.columns[this.state.currentColumn]] = e.target.value;
          
        }        
      }
    })
    // console.log([this.state.columns[this.state.currentColumn]])
  }

  onDoubleClick = (e, colNum) => {
    
    this.setState({
      id: +e.target.parentNode.firstChild.innerText,
      currentColumn: colNum,
    })   
  }
  
  onChange = (e) => {   
    const cloneData = [...this.state.data];
    
    this.state.data.forEach((i, index) => {      
      if (i.id === +e.target.parentNode.parentNode.firstChild.innerText) {  // проверка строки на id
        if (this.state.data[index].id === i.id) { // проверка строки на позицию (index)
          cloneData[index][this.state.columns[this.state.currentColumn]] = e.target.value;
          this.setState({
            data: cloneData,
          })
        }        
      }
    }) 
  }

  onClick = (e) => {
    this.setValueCurrentColumn(e)
    // console.log(e.target.parentNode.firstChild.innerText)
    const cloneData = [...this.state.data]

    if (this.state.data.id === e.target.parentNode.firstChild.innerText) {
      cloneData.id = '##';
      this.setState({
        id: '##'
      })
    }
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
          onClick={this.onClick}
        />
      </div>
    )
  }
}

export default App
