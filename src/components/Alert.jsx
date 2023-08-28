import React, { useEffect } from 'react'

const Alert = ({msg,type,removeAlert,list}) => {

    useEffect(()=>{
        let timer = setTimeout(()=>{
            removeAlert();
        },2000);
        return () => {
            clearTimeout(timer);
        }
    },[list]);
  
    return (
        <section className='alertContainer'>
          <div className={`alert alert-${type}`}>{msg}</div>
        </section>
    )
}

export default Alert