import React from 'react';
import NavigationList from './NavigationList';
import './Header.css'

const Header = () => {
    return (
        <header className='header'>
            <NavigationList />
        </header>
    );
};

export default Header;