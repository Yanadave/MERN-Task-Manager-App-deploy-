import React, { useEffect, useState } from 'react'
import {FaCheck, FaPencilAlt, FaPlus, FaSearch, FaTrash} from 'react-icons/fa';
import {ToastContainer} from 'react-toastify';
import { CreateTask, DeleteTasksById, GetAllTasks, UpdateTasksById } from './api';
import { notify } from './utils';

function TaskManager() {

    const[input,setInput] = useState('');
    const[tasks,setTasks] = useState([]);
    const[copyTasks,setCopyTasks]= useState([]);
    const [updateTask, setUpdateTask] = useState(null);


    const handleTask = ()=>{
        if(updateTask && input){
            // update api call
            console.log('update api call');
            const obj ={
                taskname:input,
                isDone: updateTask.isDone,
                _id: updateTask._id
            }
            handleUpdateItem(obj);
        }
        else if(updateTask==null && input){
            console.log('create api call')
            // create api call 
            handleAddTask();
        }
        setInput('');
    }

    useEffect(()=>{
        if(updateTask){
            setInput(updateTask.taskname);
        }
    },[updateTask])

    const handleAddTask = async()=>{
        const obj ={
            taskname:input,
            isDone: false
        }
        try {
            const {success,message}=
             await CreateTask(obj);
             if(success)
             {
                // show success toast
                notify(message,'success')
             }else{
                // show error toast
                notify(message,'error')
            }
            
            fetchAllTasks();
           
        } catch (err) {
            console.error(err);
            notify('failed to create task','error')
        }
    }

    const fetchAllTasks = async()=>{
        try {
            const {data}=
             await GetAllTasks();
            setTasks(data)
            setCopyTasks(data)
           
        } catch (err) {
            console.error(err);
            notify('failed to create task','error')
        }
    }
    useEffect(()=>{
        fetchAllTasks()
    },[])

    const handleDeleteTasks = async(id)=>{
        try {
            const {success,message}= await DeleteTasksById(id);
            if(success)
            {
                // show success toast
                 notify(message,'success')
            }else{
                // show error toast
                notify(message,'error')
            }
            fetchAllTasks()   
           
        } catch (err) {
            console.error(err);
            notify('failed to create task','error')
        }
    }

    const handleCheckAndUncheck = async(item)=>{
        const {_id, isDone,taskname} = item;
        const obj = {
            taskname,
            isDone: !isDone
        }
        try {
            const {success,message}= await UpdateTasksById(_id,obj);
            if(success)
            {
                // show success toast
                 notify(message,'success')
            }else{
                // show error toast
                notify(message,'error')
            }
            fetchAllTasks()   
           
        } catch (err) {
            console.error(err);
            notify('failed to create task','error')
        }
    }

    const handleUpdateItem =async (item)=>{
        const {_id, isDone,taskname} = item;
        const obj = {
            taskname,
            isDone: isDone
        }
        try {
            const {success,message}= await UpdateTasksById(_id,obj);
            if(success)
            {
                // show success toast
                 notify(message,'success')
            }else{
                // show error toast
                notify(message,'error')
            }
            fetchAllTasks()   
           
        } catch (err) {
            console.error(err);
            notify('failed to create task','error')
        }

    }

    const handleSearch = (e)=>{
        const term = e.target.value.toLowerCase();
        const oldTasks = [...copyTasks];
        const results = oldTasks.filter((item)=> item.taskname.toLowerCase().includes(term));
        setTasks(results);
        
    }
  return (
    <div className='d-flex flex-column align-items-center w-50 m-auto mt-5'>
        <h1 className='mb-4'>Task Manager App</h1>
        
        {/* input and search box */}
        <div className='d-flex justify-content-between align-items-center mb-4 w-100'>
            
            <div className='input-group flex-group-1 me-2'>
                
                <input type='text' 
                value={input}
                onChange={(e)=> setInput(e.target.value)}
                className='form-control me-2'
                placeholder='Add new Task' />

                <button 
                onClick={handleTask}
                    className='btn btn-success btn-sm me-2'>
                    <FaPlus className='m-2'/>
                </button>
            </div>
            
            <div className='input-group flex-group-1'>
                <span
                 className='input-group-text'
                >
                    <FaSearch/>
                </span>
                <input 
                onChange={handleSearch}
                type='text'
                className='form-control' 
                placeholder='Search Tasks'/>
           
            </div>
        </div>
        
        {/* list of items */}
        <div className='d-flex flex-column w-100'>
            {
                tasks.map((item)=>(
                    <div key={item._id} className='m-2 p-2 border bg-light w-100 rounded-3 d-flex justify-content-between align-itmes-center'>

                <span className={item.isDone ? 'text-decoration-line-through': ''}>{item.taskname}</span>

                <div>
                    <button 
                    onClick={()=>handleCheckAndUncheck(item)}
                    className='btn btn-success btn-sm me-2'
                    type='button'>
                    <FaCheck/>
                    </button>
                    <button 
                    onClick={() => setUpdateTask(item)}
                    className='btn btn-primary btn-sm me-2'
                    type='button'>
                    <FaPencilAlt/>
                    </button>
                    <button 
                    onClick={()=>handleDeleteTasks(item._id)}
                    className='btn btn-danger btn-sm me-2'
                    type='button'>
                    <FaTrash/>
                    </button>
                </div>
            </div>
                ))
            }

        </div>

        {/* toastify wale component ko render krege */}
        <ToastContainer
            position='top-right'
            autoClose={3000}
            hideProgressBar={false}
        />
    </div>
  )
}

export default TaskManager