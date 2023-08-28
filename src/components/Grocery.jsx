import React, { useEffect, useState } from 'react'
import '../styles/grocery.css';
import List from './List';
import Alert from './Alert';


const getStoredItems = () => {
    let list = window.localStorage.getItem('list');

    if(list){
        return JSON.parse(list);
    }
    return [];
}

const Grocery = () => {
    const[name,setName] = useState('');
    const[list,setList] = useState(getStoredItems());
    const[editId,setEditId] = useState(null);
    const[isEditing,setIsEditing] = useState(false); 
    const[alert,setAlert] = useState({show:false,msg:'',type:''})


    const showAlert = (show=false,type,msg) => {
        setAlert({show,type,msg});     
    }

    const removeAlert = ()=>{
        showAlert(false,'','');
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(name === ''){
            showAlert(true,'danger','Please enter a name');
        }else if(isEditing && name){
            setList(list.map(item => {
                    if(item.id === editId){
                        return { ...item, title:name };
                    }
                    return item;
            }))
            setEditId(null);
            setIsEditing(false);
            setName('');
            showAlert(true,'success','Changes updated successfully');
        }else{
            let newItems = {
                id : new Date().getTime(),
                title : name 
            }
            let newList = [...list,newItems];
            setList(newList);
            setName('');
            showAlert(true,'success','Item added successfully');
        }
    }

    const removeItems = (id) => {
        setList((list) => list.filter(item => item.id !== id));
        showAlert(true,'danger','Item deleted successfully');
    }

    const editItems = (id) => {
        let editItem = list.find(item => item.id === id);
        setEditId(id);
        setName(editItem.title);
        setIsEditing(true);
    }

    useEffect(()=>{
        window.localStorage.setItem('list', JSON.stringify(list));
    },[list]);

    return (
    <main>
        {alert.show && <Alert {...alert} removeAlert={removeAlert} list={list}/>}

        <h2 className='title'>Grocery Items</h2>

        <form onSubmit={handleSubmit}>      
            <input type='text' className='itemName' placeholder='Enter Item Name...'
            value={name}  onChange={(e)=>setName(e.target.value)}/>

            <button type='submit'>{isEditing ? 'Update' : 'Submit'}</button>
        </form>

        <section>
            <div className='listContainer'>
               {list && list.map((item) => {
                return(
                    <List {...item} key={item.id} removeItems={removeItems} editItems={editItems}/>
                )
               })}
               {list.length===0 && <div className='noItems'>No items added in the list !</div>}
            </div>
        </section>
    </main>
    )
}

export default Grocery