import React                from 'react';
import globeImg             from './Images/globe.png';

const Welcome = (props) => {
    return (
        <div id='welcome' >
            <img src={globeImg} className="globe-welcome"/>
            <div id='welcomeLabel'>Welcome To The World Data Mapper</div>
        </div>
    );
};

export default Welcome;