import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const NavigationList = () => {

    const dispatch = useDispatch();

    let title = useSelector(state => state.authReducer.title)
    let isAuthorized = useSelector(state => state.authReducer.isAuthorized)

    if (localStorage.getItem('user')) {
        dispatch({type:'auth'})
    }
   
    return (
        <div>
            {
            isAuthorized
            ?
            <ul className='header-nav'>
                <Link to='/' id="HOME_PAGE"><li>HOME</li></Link>
                <Link to='/reportTheft' id="REPORTTHEFT_PAGE"><li>REPORT THEFT</li></Link>
                <Link to='/allTheft' id="ALLTHEFT_PAGE"><li>ALL THEFT</li></Link>
                <Link to='/responsibleEmployees' id="RESPONSIBLEEMPLOYEES_PAGE"><li>RESPONSIBLE EMPLOYEES</li></Link>
                <Link to='/registration' id="REGISTRATION_PAGE"><li>REGISTRATION</li></Link>
                <Link to='/authorization' id="AUTHORIZATION_PAGE"><li>{title}</li></Link>
            </ul>
            :
            <ul className='header-nav'>
                <Link to='/' id="HOME_PAGE"><li>HOME</li></Link>
                <Link to='/reportTheft' id="REPORTTHEFT_PAGE"><li>REPORT THEFT</li></Link>
                <Link to='/registration' id="REGISTRATION_PAGE"><li>REGISTRATION</li></Link>
                <Link to='/authorization' id="AUTHORIZATION_PAGE"><li>{title}</li></Link>
            </ul>
            }
        </div>
        
    );
        
};

export default NavigationList;