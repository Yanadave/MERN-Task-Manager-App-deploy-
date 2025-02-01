import { API_URL } from "./utils"

export const CreateTask = async(taskobj)=>{
    const url = `${API_URL}/tasks`;
    const options = {
        method: 'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(taskobj)
    };
    try {
        const result = await fetch(url,options)
        const data = await result.json();
        return data ;
    } catch (err) {
        return err;
    }
}

export const GetAllTasks = async()=>{
    const url = `${API_URL}/tasks`;
    const options = {
        method: 'GET',
        headers:{
            'content-type':'application/json'
        }
    };
    try {
        const result = await fetch(url,options)
        const data = await result.json();
        return data ;
    } catch (err) {
        return err;
    }
}

// delete operation krne ke liye

export const DeleteTasksById = async(id)=>{
    const url = `${API_URL}/tasks/${id}`;
    const options = {
        method: 'DELETE',
        headers:{
            'content-type':'application/json'
        }
    };
    try {
        const result = await fetch(url,options)
        const data = await result.json();
        return data ;
    } catch (err) {
        return err;
    }
}

export const UpdateTasksById = async(id,reqBody)=>{
    const url = `${API_URL}/tasks/${id}`;
    const options = {
        method: 'PUT',
        headers:{
            'content-type':'application/json'
        },
        body: JSON.stringify(reqBody)
    };
    try {
        const result = await fetch(url,options)
        const data = await result.json();
        return data ;
    } catch (err) {
        return err;
    }
}