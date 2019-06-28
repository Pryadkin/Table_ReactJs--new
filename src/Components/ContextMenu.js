import React from 'react'

export default props => {
   return (
      <ul className='contextMenu' style={{ left: `${props.state.contextMenuleft}px`, top: `${props.state.contextMenuTop}px` }}>
         <li className={'contextMenu__rename'}>Переименовать
            <ul className={'contextMenu__columns'}>
               <li onClick={e => props.onClick(e, '1')}>First Name</li>
               <li onClick={e => props.onClick(e, '2')}>Last Name</li>
               <li onClick={e => props.onClick(e, '3')}>Email</li>
               <li onClick={e => props.onClick(e, '4')}>Phone</li>
            </ul>
         </li>
      </ul>
   )
}