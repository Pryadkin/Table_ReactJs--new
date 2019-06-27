import React from 'react'
import Table from 'react-bootstrap/Table'
import './Table.css'
// import sort from '../sort/sort';
// import sort from '../sort/sort';

// import TableRow from './TableRow'
// import ContextMenu from '../Components/ContextMenu'

 

export default props => {    
   // console.log(props.state.onDoubleClick)
   

   return (
      <Table striped bordered hover variant="dark">
         <thead>
            <tr>
               <th onClick={() => props.onSort(props.state.columns[0])}>ID
                  <small>{props.state.columnsName === props.state.columns[0]? props.state.sortType : null}</small>
               </th>
               <th onClick={() => props.onSort(props.state.columns[1])}>First Name
                  <small>{props.state.columnsName === props.state.columns[1]? props.state.sortType : null}</small>
               </th>
               <th onClick={() => props.onSort(props.state.columns[2])}>Last Name
                  <small>{props.state.columnsName === props.state.columns[2]? props.state.sortType : null}</small>
               </th>
               <th onClick={() => props.onSort(props.state.columns[3])}>Email
                  <small>{props.state.columnsName === props.state.columns[3]? props.state.sortType : null}</small>
               </th>
               <th onClick={() => props.onSort(props.state.columns[4])}>Phone
                  <small>{props.state.columnsName === props.state.columns[4]? props.state.sortType : null}</small>
               </th>               
            </tr>
         </thead>
         <tbody onChange={e => props.onChange(e)} onClick={e => props.onClick(e)}>
            {props.state.data.map((i, index) => {

               // (Click) при выборе нескольких элементов, их id помещаются в массив и осуществляется поиск через indexOf
               let colorTableRow = null;  // color on the row             
               if (i.id === props.state.arrowId[props.state.arrowId.indexOf(i.id)]) {
                  colorTableRow = 'table-warning'
               }              

               


               return( 
               <tr key={index} className={colorTableRow}>
                  <td>{i[props.state.columns[0]]}</td>
                  <td onDoubleClick={(e) => props.onDoubleClick(e, '1')}>
                     {  i.id === props.state.id && props.state.currentColumn === '1'
                        ? <input value={i[props.state.columns[1]]}/> 
                        : i[props.state.columns[1]]  }
                  </td>
                  <td onDoubleClick={(e) => props.onDoubleClick(e, '2')}>
                     {  i.id === props.state.id && props.state.currentColumn === '2'
                        ? <input value={i[props.state.columns[2]]}/> 
                        : i[props.state.columns[2]]  }
                  </td>
                  <td onDoubleClick={(e) => props.onDoubleClick(e, '3')}>
                     {  i.id === props.state.id && props.state.currentColumn === '3'
                        ? <input value={i[props.state.columns[3]]}/> 
                        : i[props.state.columns[3]]  }
                  </td>
                  <td onDoubleClick={(e) => props.onDoubleClick(e, '4')}>
                     {  i.id === props.state.id && props.state.currentColumn === '4'
                        ? <input value={i[props.state.columns[4]]}/> 
                        : i[props.state.columns[4]]  }
                  </td>                  
               </tr>   
               )
            })}                  
         </tbody>
      </Table>
   )
   

}

