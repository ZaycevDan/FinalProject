import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ReportTheft.css'

const ReportTheft = () => {

    const dispatch = useDispatch
    let isAuthorized = useSelector(state => state.authReducer.isAuthorized)

    if (localStorage.getItem('user')) {
        dispatch({type:'auth'})
    }
   
    const [reportTheftData, setReportTheftData] = useState({
        licenseNumber: '',
        ownerFullName: '',
        type: 'general',
        clientId: '',
        color: 'black',
        date: '',
        description: '',
    });
    const token = 'Bearer ' + localStorage.getItem('token')
    const [employees, setEmployees] = useState([])

    
    useEffect(() => {
        if (isAuthorized) {
            getEmployees()
        }
    }, [])

    let url =''
    if (localStorage.getItem('user')) {
        url = 'https://sf-final-project.herokuapp.com/api/cases/'
    } else {
        url = 'https://sf-final-project.herokuapp.com/api/public/report'
    }

    const handleChange = (e) => {
        const fieldName = e.target.name
        setReportTheftData({...reportTheftData, [fieldName]: e.target.value})
    }

    const reportTheft = (e) => {
        e.preventDefault()

        const options = {
            method: 'POST',
            body: JSON.stringify(reportTheftData),
            headers: {
                'Authorization': token,
                'Content-type': 'application/json;charset=utf-8'
            }
        }  

        fetch(url, options)
        .then(response => response.json())
        .then(token => localStorage.setItem('case', JSON.stringify(token)))
        .then(token => {
            const status = JSON.parse(localStorage.getItem('case'))
            if(status.status === 'OK') {
                alert('New theft message has been added!')
            } else if (status.status === 'ERR') {
                alert(status.message)
            }
        })

        setReportTheftData({
            licenseNumber: '',
            ownerFullName: '',
            type: 'general',
            clientId: '',
            color: 'black',
            date: '',
            description: '',
        })
        
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
        })
    } 

    return (
        <div className='ReportTheft'>
            <h1 className='ReportTheft-title'>REPORT THEFT</h1>
            <form className='ReportTheft-form' onSubmit={reportTheft} >
                <input required type="text" name="licenseNumber" id="licenseNumber" placeholder='enter license number' onChange={handleChange} value={reportTheftData.licenseNumber} />
                <div className='choose_container'>
                    <p className='ReportTheft-form-choose'>Choose type of your bike:</p>
                    <select required 
                            name="type" 
                            id="type" 
                            onChange={handleChange}                             
                            value={reportTheftData.type}>
                        <option disabled="disabled">Type:</option>
                        <option value="general">General</option>
                        <option value="sport">Sport</option>
                    </select>
                </div>         
                <input required type="text" name="ownerFullName" id="ownerFullName" placeholder='enter Full Name' onChange={handleChange} value={reportTheftData.ownerFullName} />
                <input required type="text" name="clientId" id="clientId" placeholder='enter clientId' onChange={handleChange} value={reportTheftData.clientId} />
                <div className='choose_container'>
                    <p className='ReportTheft-form-choose'>Choose color of your bike:</p>
                    <select name="color" id="color" onChange={handleChange} value={reportTheftData.color}>
                        <option disabled="disabled">Color:</option>
                        <option value="black">Black</option>
                        <option value="yellow">Yellow</option>
                        <option value="red">Red</option>
                        <option value="blue">Blue</option>
                    </select>
                </div>
                <input type="date" name="date" id="date" onChange={handleChange} value={reportTheftData.date} />
                <textarea name="description" id="description" cols="5" rows="5" placeholder='enter additional information' onChange={handleChange} value={reportTheftData.description}></textarea>
                {
                    isAuthorized
                    ?
                    <div className='choose_container'>
                        <p className='ReportTheft-form-choose'>Choose officer for your theft:</p>
                        <select name="officer" id="officer" onChange={handleChange}>
                            <option value="">Officers:</option>
                            {
                            employees.filter(employee => employee.approved)
                            .map(employee => <option key={employee._id} value={employee._id}>{employee.firstName}</option>)
                            }
                        </select>
                    </div>
                    : 
                    <p className='choose_container'>You can also report the theft by calling: 06543563</p>
                }
                <input className='input_submit' type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default ReportTheft;