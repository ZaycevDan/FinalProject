import React, { useState } from 'react';
import './Registration.css'

const Registration = () => { 

    const [registrationData, setregistrationData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        clientId: ''
    });

    const handleChange = (e) => {
        const fieldName = e.target.name
        setregistrationData({...registrationData, [fieldName]: e.target.value})
    }

    async function signUp(e) {
        e.preventDefault()

        const options = {
            method: 'POST',
            body: JSON.stringify(registrationData),
            headers: {
                'Content-type': 'application/json;charset=utf-8'
            }
        }       

        await fetch('https://sf-final-project.herokuapp.com/api/auth/sign_up', options)
        .then(response => response.json())
        .then(json => localStorage.setItem('newEmployee', JSON.stringify(json)))
        .then(json => {
            const status = JSON.parse(localStorage.getItem('newEmployee'))
            if(status.status === 'OK') {
                alert('New employee has been added!')
            } else if (status.status === 'ERR') {
                alert(status.message)
            }
        })
        
        setregistrationData({
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            clientId: ''})
    }

    return (
        <form className='Registration' onSubmit={signUp}>
            <h1 className='Registration-title'>REGISTRATION</h1>
            <input required type="email" name="email" id="email" placeholder='Enter email' onChange={handleChange} value={registrationData.email} />
            <input type="text" name="firstName" id="firstName" placeholder='Enter firstName' onChange={handleChange} value={registrationData.firstName} />
            <input type="text" name="lastName" id="lastName" placeholder='Enter lastName' onChange={handleChange} value={registrationData.lastName} />
            <input required type="password" name="password" id="password" placeholder='Enter password' onChange={handleChange} value={registrationData.password} />
            <input required type="text" name="clientId" id="clientId" placeholder='Enter clientId' onChange={handleChange} value={registrationData.clientId} />
            <input className='input_submit' type="submit" value="Register" />
        </form>
    );
};

export default Registration;