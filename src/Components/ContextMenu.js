import React from 'react'

export default props => {
   return (
      <ul className='contextMenu' style={{ left: `${props.state.contextMenuleft}px`, top: `${props.state.contextMenuTop}px` }}>
         <li className={'contextMenu__rename'}>Переименовать
            <ul className={'contextMenu__columns'}>
               <li>ID</li>
               <li>First Name</li>
               <li>Last Name</li>
               <li>Email</li>
               <li>Phone</li>
            </ul>
         </li>
      </ul>
   )
}