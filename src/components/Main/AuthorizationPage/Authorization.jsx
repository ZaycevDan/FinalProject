import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Authorization.css'

const Authorization = () => {

    const dispatch = useDispatch()

    let isAuthorized = useSelector(state => state.authReducer.isAuthorized)

    const [authorizationData, setAuthorizationData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const fieldName = e.target.name
        setAuthorizationData({...authorizationData, [fieldName]: e.target.value})
    }

    async function signUp(e) {
        e.preventDefault()

        const options = {
            method: 'POST',
            body: JSON.stringify(authorizationData),
            headers: {
                'Content-type': 'application/json;charset=utf-8'
            }
        }
        await fetch('https://sf-final-project.herokuapp.com/api/auth/sign_in', options)
        .then(response => response.json())
        .then(user => localStorage.setItem('userInfo', JSON.stringify(user)))
        .then(user => {
            const status = JSON.parse(localStorage.getItem('userInfo'))
            if(status.status === 'OK') {      
                    alert('Authorization was successful')
                    dispatch({type: 'auth'})
                    authorizationData.email = ''
                    authorizationData.password = ''
            } else if (status.status === 'ERR') {
                alert(status.message)
                localStorage.clear() 
            }
        })
        .then(token => {
            const user = (JSON.parse(localStorage.getItem('userInfo')))
            localStorage.setItem('token', user.data.token)
        })
        .then(localStorage.setItem('user', JSON.stringify(authorizationData)))
    }

    const logOut = () => {
        localStorage.clear()
        dispatch({type: 'logOut'})  
    }

    return (
        <div className='Authorization_wrap'>
            {
                (!isAuthorized)
                ? 
                <form className='Authorization'  onSubmit={signUp}>
                    <h1 className='Authorization-title'>AUTHORAZATION</h1>
                    <input required type="email" name="email" id="email" placeholder='Enter email' onChange={handleChange} value={authorizationData.email} />
                    <input required type="password" name="password" id="password" placeholder='Enter password' onChange={handleChange} value={authorizationData.password} />
                    <input className='input_submit' type="submit" value="Register" />    
                </form>
                :
                <button className="Authorization_exit" onClick={logOut}>EXIT</button>
            }

        </div>
 
    );
};

export default Authorization;