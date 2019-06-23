import React from 'react'
import Table from 'react-bootstrap/Table'
import './Table.css'
// import sort from '../sort/sort';
// import sort from '../sort/sort';

// import TableRow from './TableRow'
// import ContextMenu from '../Components/ContextMenu'

 

export default props => {  
  
   
   // console.log(props.state.sortType)
   
   return (
      // console.log(props.state.data.id)
      <Table striped bordered hover variant="dark">
         <thead>
            <tr>
               <th>ID<small>{props.state.sortType === 'abc' 
                  ? props.onSort(props.state, props.state.columns[0], 'abc')
                  : props.onSort(props.state, props.state.columns[0], 'desc')
               }</small></th>
               <th onClick={() => {                 
                  // props.onSort(props.state.columns[1])                 
               }}>First Name<small>{'abc' ? 'cba' : 'abc'}</small></th>
               <th onClick={() => {
                  props.onSort(props.state.columns[2])
               }}>Last Name</th>
               <th onClick={() => {
                  props.onSort(props.state.columns[3])
               }}>Email</th>
               <th onClick={() => {
                  props.onSort(props.state.columns[4])
               }}>Phone</th>
            </tr>
         </thead>
         <tbody>
            {props.state.data.map((i, index) => {
               // console.log(i)
               return( 
               <tr key={index}>
                  <td>{i.id}</td>
                  <td>{i.firstName}</td>
                  <td>{i.lastName}</td>
                  <td>{i.email}</td>
                  <td>{i.phone}</td>
               </tr>
               )
            })}                  
         </tbody>
      </Table>
   )
   

}

