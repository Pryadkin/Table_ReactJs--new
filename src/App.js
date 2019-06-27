import React, { Component } from 'react';
import './App.css';
import Json from './user.json';
import 'bootstrap/dist/css/bootstrap.min.css'
import TableComp from './Table/Table'
// import Loader from './Loader/Loader'
// import Table from './Table/Table'
import sort from './sort/sort'

let arr = [];
class App extends Component {
  state = {
    data: [],
    columns: [],
    sortType: 'abs',
    columnsName: null,
    onDoubleClick: null,
    id: null,
    arrowId: [],
    currentColumn: null,
    currentRow: null,
    contextMenu: true,
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

  setValueCurrentElement(e, callback) {    
    this.state.data.forEach((item, index) => {      
      if (item.id === +e.target.parentNode.firstChild.innerText) {  // получаем id выбранного элемента (i.id)
        
        if (this.state.data[index].id === item.id) { // получаем позицию строки выбранного элемента (index)  

          const columnsClone = Object.keys(item) // получаем массив свойств объекта (наименований колонок)
          
          for (let i = 0; i < columnsClone.length; i++) {

            if (item[columnsClone[i]] === e.target.innerText) { // по свойствам определяем значения свойств объекта и сравниваем с целевым объектом DOM дерева
              const currentItem = item[columnsClone[i]];
              callback(e.target)           
            }
            
          }
          
        }     

      }
    }) /* forEach - end */
  }


  onClick = (e) => {       
     
    if (e.ctrlKey) {           
      arr.push(+e.target.parentNode.firstChild.innerText);      
    } else {
      arr = [];
      arr[0] = +e.target.parentNode.firstChild.innerText;
    }
        
    this.setValueCurrentElement(e, item => {
      let column = this.state.currentColumn;
      // console.log(item.parentNode.firstChild.innerText)
      if (e.target !== this.state.data) {
        column = null;
      }    

      this.setState({
        currentColumn: column,
        id: +item.parentNode.firstChild.innerText,
        arrowId: arr,
      })

    }) 
    // console.log(this.state.id)
  }


  onDoubleClick = (e, colNum) => {
    
    this.setState({
      id: +e.target.parentNode.firstChild.innerText,
      currentColumn: colNum,
      onDoubleClick: e.target,
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

  onContextMenu = (e) => {
    // e.preventDefault();    
  }

  

  render() {
    // console.log(this.state.arrowId)

   

    return(
      <div onContextMenu={e => this.onContextMenu(e)}>
        <TableComp 
          state={this.state}
          onSort={this.onSort}
          onDoubleClick={this.onDoubleClick}
          onChange={this.onChange}
          onClick={this.onClick}          
        />

        <div className='contextMenu'></div>

      </div>
    )
  }
}

export default App
