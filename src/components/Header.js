import React from 'react';
import GoogleAuth from './GoogleAuth';

const Header = ({ isSignin }) => {
    console.log('header', isSignin)
    return (
        <div className="ui secondary pointing menu">
            
            <a href="/" className="item">
                EZvent
            </a>
            <div className="right menu">
                <a href="/" className="item">
                    Home
                </a>
                <GoogleAuth isSignin={isSignin} />
            </div>
        </div>
    );
};

export default Header;