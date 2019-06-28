import React, { Component } from 'react';
import './App.css';
import Json from './user.json';
import 'bootstrap/dist/css/bootstrap.min.css'
import TableComp from './Table/Table'
import sort from './sort/sort'
import ContextMenu from './Components/ContextMenu'

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
    currentColumn: null, // Работатет по принципу: если клик произошел по той же строчке, то оставить выделение, инече снять.
    currentRow: null,
    contextMenu: false,    
    contextMenuTop: null, 
    contextMenuleft: null, 
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
    const id = +e.target.parentNode.firstChild.innerText; 

    if (e.ctrlKey) {
      
      if (arr.indexOf(id) !== -1) {
        arr.splice(arr.indexOf(id), 1)
      } else {
        arr.push(id); 
      }        
           
    } else {
      arr = [];
      arr[0] = id;
    }

    this.setValueCurrentElement(e, item => {
      let column = this.state.currentColumn;

      if (e.target !== this.state.data) {
        column = null;
      }    

      this.setState({
        currentColumn: column,
        id: +item.parentNode.firstChild.innerText,
        arrowId: arr,
        contextMenu: null,
      })

    }) 
    // console.log(this.state.id)
  }


  onDoubleClick = (e, colNum) => {   
    console.log(colNum)
    this.setState({
      id: +e.target.parentNode.firstChild.innerText,
      currentColumn: colNum,
      onDoubleClick: e.target,
      contextMenu: null,
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
    e.preventDefault();
    const id = +e.target.parentNode.firstChild.innerText; 

    // Создание массива id для выделенных элементов
    if (e.ctrlKey) {
      
      if (arr.indexOf(id) !== -1) {
        arr.splice(arr.indexOf(id), 1)
      }
      arr.push(id); 
           
           
    } else {
      arr = [];
      arr[0] = id;
    }  

    this.setValueCurrentElement(e, item => {
      let column = this.state.currentColumn;
      
      if (e.target !== this.state.data) {
        column = null;
      }    
      
      this.setState({
        currentColumn: column,
        id: +item.parentNode.firstChild.innerText,
        arrowId: arr,
        contextMenu: true,
        contextMenuTop: e.pageY, 
        contextMenuleft: e.pageX, 
      })

    }) 
  }

  

  

  render() {
    // console.log(this.state)
    
   

    return(
      <div onContextMenu={e => this.onContextMenu(e)}>
        <TableComp 
          state={this.state}
          onSort={this.onSort}
          onDoubleClick={this.onDoubleClick}
          onChange={this.onChange}
          onClick={this.onClick}          
        />

        {
          this.state.contextMenu 
          ? <ContextMenu 
            state={this.state}
            onClick={(e, numCol) => this.onDoubleClick(e, numCol)}
            autoFocus={true}
          /> 
          : null
        }

      </div>
    )
  }
}

export default App
