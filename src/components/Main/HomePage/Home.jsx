import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'
import bike from './img/bike.svg'

const Home = () => {
    return (
        <div className='Home'>
            <h1 className="Home-title">HOME</h1>

            <p className='Home-description'>Hello.
            If you are on our site, then your bike has been stolen. 
            No problem! We will do our best to find your bike and punish the criminals.</p>

            <img className='Home__image-bike' src={bike} alt="bike" />

            <p className='Home-description'>Please report the theft of your bike on the dedicated page <Link className='Home__link_toReportTheft' to='/reportTheft'>"REPORT THEFT"</Link></p>
        </div>
    );
};

export default Home;