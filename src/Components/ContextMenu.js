import React from 'react'

export default props => (
   <ul className='contextMenu' style={{ left: `${props.left}px`, top: `${props.top}px` }}>
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