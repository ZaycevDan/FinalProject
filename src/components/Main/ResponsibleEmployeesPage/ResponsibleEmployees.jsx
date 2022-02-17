import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ResponsibleEmployees.css'

const ResponsibleEmployees = () => {

    const [employees, setEmployees] = useState([])
    const [load, setLoad] = useState(false)
    const token = 'Bearer ' + localStorage.getItem('token')

    useEffect(() => {
        getAllEmployee()
    }, [])


    async function getAllEmployee() {

        setLoad(true)
 
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
        })
        setLoad(false)

    }

    async function deleteEmployee(e) {
        const id = e.target.id

        const url = 'https://sf-final-project.herokuapp.com/api/officers/' + id

        const options = {
            method: 'DELETE',
            headers: {
                'Authorization': token,
                'Content-type': 'application/json',
                _id: id,
                }
            }

        await fetch(url, options)
        .then((response) => {
            const result = response.json();
            return result
        })
        setEmployees(employees.filter(employee => employee._id !== id))
    }

    return (
        <div>
            <h1 className='ResponsibleEmployees_title'>LIST OF RESPONSIBLE EMPLOYEES:</h1>

            {
                load
                ? <h2 style={{fontSize: '20px', textAlign: 'center'}} >Loading.....</h2>
                :  (employees.length === 0)  
                    ? <h2 style={{fontSize: '20px', textAlign: 'center'}} >We dont have employees</h2>
                    : employees.map(employee => {
                        return (
                            <div key={employee._id} className='employees_container'>
                                <h2 className='employees_title'>FirstName: {employee.firstName}</h2>
                                <p className='employees_licenseNumber'>LastName: {employee.lastName} </p>
                                <Link className='employees_link' to={`/responsibleEmployees/${employee._id}`}>Open</Link>
                                <button id={employee._id} onClick={deleteEmployee} className='employees_delete'>Delete</button>
                                
                            </div>
                        )
                    })
            }
        </div>
    );
};

export default ResponsibleEmployees;