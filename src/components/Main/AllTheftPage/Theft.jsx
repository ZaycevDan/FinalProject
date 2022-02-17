import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const Theft = () => {
    let [theft, setTheft] = useState([])
    const [load, setLoad] = useState(false)
    const params = useParams()
    const token = 'Bearer ' + localStorage.getItem('token')
    const [editTheft, setEditTheft] = useState([])
    let [change, setNewChange] = useState([])
    const [employees, setEmployees] = useState([])
    let [currentEmployee, setCurrentEmployee] = useState('')
    let currentTheft = {}

    useEffect(() => {
        theft = []   
        getTheft()   
    }, [change])

    useEffect(() => {
        getEmployees()
    }, [])

    async function getTheft() {

        setLoad(true)

        const url = 'https://sf-final-project.herokuapp.com/api/cases/' + params.id
        const options = {
            headers: {
                'Authorization': token,
                'Content-type': 'application/json',
                }
            }
            
        await fetch(url, options)
        .then((response) => {
            const result = response.json();
            return result
        })
        .then(data => {
            setTheft(...theft, data.data)
            currentTheft = data.data.officer
        })
        
        change = false
        setLoad(false)
        
    }

    const handleChange = (e) => {
        const fieldName = e.target.name
        if (fieldName === 'status') {
            setEditTheft({...editTheft, [fieldName]: e.target.value})
            setTheft({...theft, [fieldName]: e.target.value})
        }
        setEditTheft({...editTheft, [fieldName]: e.target.value}) 

        if (fieldName === 'officer') {
            setEditTheft({...editTheft, [fieldName]: e.target.value})
            currentEmployee = employees.filter(employee => employee._id === e.target.value)[0].firstName
            setCurrentEmployee(currentEmployee)
        }
    }

    async function setChange(e) {
        e.preventDefault()

        if (editTheft.status !== 'done') {
            editTheft.resolution = "-"
        }


        const url = 'https://sf-final-project.herokuapp.com/api/cases/' + params.id
        const options = {
            method: 'PUT',
            body: JSON.stringify(editTheft),
            headers: {
                'Authorization': token,
                'Content-type': 'application/json;charset=utf-8'
            }
        }
        await fetch(url, options)
        .then((response) => {
            const result = response.json();
            return result
        })
        setNewChange([change = true])
    }

    async function getEmployees() {
            const options = {
                headers: {
                    'Authorization': token,
                    'Content-type': 'application/json',
                    }
                }
    
            await fetch('https://sf-final-project.herokuapp.com/api/officers/', options)
            .then((response) => {
                const result = response.json();
                return result
            })
            .then((data) => {
                setEmployees(...employees, data.officers)
                if (currentTheft) {
                    currentEmployee = data.officers.filter(employee => employee._id === currentTheft)[0].firstName
                    setCurrentEmployee(currentEmployee)
                }            
            })
        } 
        
    

    return (
       
            <div>
                <h1 className='allTheft_title'>THEFT INFO:</h1>
                {
                    load
                    ? <h2 style={{fontSize: '20px', textAlign: 'center'}} >Loading.....</h2>  
                    : 
                    <form className='Theft__list'  onSubmit={setChange}>
                        <div className='Theft__list_item'>
                            clientId: {theft.clientId}
                        </div>
                        <div className='Theft__list_item'>
                            ownerFullName: {theft.ownerFullName}
                            <input className='Theft__item_input' name='ownerFullName' onChange={handleChange} type="text" placeholder='Enter a new value and press Edit' />
                        </div>
                        <div className='Theft__list_item'>
                            licenseNumber: {theft.licenseNumber}
                            <input className='Theft__item_input' name='licenseNumber' onChange={handleChange} type="text" placeholder='Enter a new value and press Edit' />
                        </div>

                        <div className='Theft__item_select_wrap'>
                            color: {theft.color}
                            <select name="color" id="color" onChange={handleChange} 
                            value={editTheft.color || theft.color}
                            className='Theft__item_select'>
                                <option value="black">Black</option>
                                <option value="yellow">Yellow</option>
                                <option value="red">Red</option>
                                <option value="blue">Blue</option>
                            </select>
                        </div>

                        <div className='Theft__item_select_wrap'>
                            type: {theft.type}
                            <select name="type" id="type" onChange={handleChange} 
                            value={editTheft.type || theft.type}
                            className='Theft__item_select'>
                                <option value="general">General</option>
                                <option value="sport">Sport</option>
                            </select>
                        </div>

                        <div className='Theft__item_select_wrap'>
                            status: {theft.status}
                            <select name="status" id="status" onChange={handleChange} 
                            value={editTheft.status || theft.status}
                            className='Theft__item_select'>
                                <option value="new">New</option>
                                <option value="in_progress">In_progress</option>
                                <option value="done">Done</option>
                            </select>
                        </div>

                        <div className='Theft__item_select_wrap'>
                            officer: {theft.officer === null ? '-' : currentEmployee}
                            <select name="officer" id="officer" onChange={handleChange} 
                            value={editTheft.officer || (theft.officer === null ? '' : theft.officer)}
                            className='Theft__item_select'>
                                {
                                    employees.filter(employee => employee.approved)
                                    .map(employee => <option key={employee._id} value={employee._id}>{employee.firstName}</option>)
                                }
                            </select>
                        </div>
                        
                        {
                            (theft.status === 'done')
                            ? <div className='Theft__list_item'>
                            resolution: {theft.resolution || editTheft.resolution}
                            <input required className='Theft__item_input' name='resolution' onChange={handleChange} type="text" placeholder='Enter a new value and press Edit' />
                            </div>
                            : <div className='Theft__list_item' style={{color: 'gray'}}>
                            resolution: {theft.resolution}
                            <input disabled className='Theft__item_input' name='resolution' onChange={handleChange} type="text" placeholder='You need the status to be DONE' />
                            </div> 
                        }

                        <div className='Theft__list_item'>
                            description: {theft.description}
                            <input className='Theft__item_input' name='description' onChange={handleChange} type="text" placeholder='Enter a new value and press Edit' />
                        </div>
                        <div className='Theft__list_item'>
                            createdAt: {theft.createdAt}
                        </div>
                        <div className='Theft__list_item'>
                            updatedAt: {theft.updatedAt}
                        </div>
                        <input className='Theft__btn_edit input_submit' type="submit" value="Edit" />
                    </form>                     
                        
                }                
            </div>
                
        
    );
};

export default Theft;