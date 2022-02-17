import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Employee = () => {
    let [employee, setEmployee] = useState([])
    const [load, setLoad] = useState(false)
    const token = 'Bearer ' + localStorage.getItem('token')
    const params = useParams()
    const [editEmployee, setEditEmployee] = useState([])
    let [change, setNewChange] = useState([])

    useEffect(() => {
        employee = []   
        getEmployee()   
    }, [change])

    async function getEmployee() {

        setLoad(true)

        const url = 'https://sf-final-project.herokuapp.com/api/officers/' + params.id
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
            setEmployee(...employee, data.data)
            console.log()
        })
        
        change = false
        setLoad(false)
    }

    const handleChange = (e) => {
        const fieldName = e.target.name
        setEditEmployee({...editEmployee, [fieldName]: e.target.value}) 
    }

    async function setChange(e) {
        e.preventDefault()

        const url = 'https://sf-final-project.herokuapp.com/api/officers/' + params.id
        const options = {
            method: 'PUT',
            body: JSON.stringify(editEmployee),
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

    return (
        <div>
            <h1 className='ResponsibleEmployees_title'>EMPLOYEE INFO:</h1>
            {
                load
                ? <h2 style={{fontSize: '20px', textAlign: 'center'}} >Loading.....</h2>
                : 
                <form className='Employee__list'  onSubmit={setChange}>
                    <div className='Employee__list_item'>
                        clientId: {employee.clientId}
                    </div>
                    <div className='Employee__list_item'>
                        email: {employee.email}
                    </div>
                    <div className='Employee__list_item'>
                        firstName: {employee.firstName}
                        <input className='Employee__item_input' name='firstName' onChange={handleChange} type="text" placeholder='Enter a new value and press Edit' />
                    </div>
                    <div className='Employee__list_item'>
                        lastName: {employee.lastName}
                        <input className='Employee__item_input' name='lastName' onChange={handleChange} type="text" placeholder='Enter a new value and press Edit' />
                    </div>
                    <div className='Employee__item_select_wrap'>
                        approved: {
                            employee.approved
                            ? 'approved'
                            : 'disapprove'
                        }
                        <select name="approved" id="approved" onChange={handleChange} 
                        value={editEmployee.approved || employee.approved}
                        className='Employee__item_select'>
                            <option value="true">approved</option>
                            <option value="false">disapprove</option>
                        </select>
                    </div>
                    <input className='Employee__btn_edit input_submit' type="submit" value="Edit" />
                </form>
            }
        </div>
    );
};

export default Employee;