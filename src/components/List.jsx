import React from 'react'

const List = ({id,title,removeItems,editItems}) => {

  return (
   <article className='listItem'>

    <p className='itemListName'>{title}</p>
    
    <div className='buttonContainer'>
        <button className='edit' onClick={()=>editItems(id)}>Edit</button>
        <button className='delete' onClick={()=>removeItems(id)}>Delete</button>
    </div>

   </article>
  )

}

export default List