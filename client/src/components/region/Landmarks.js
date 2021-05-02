import React, { useState } from 'react';




const Landmarks = (props) => {
    const { data } = props;

    return (
        <div className='landmark-entry'>
            <div className='info-spacer'></div>
            <i className="material-icons close-landmark">close</i>
            <div className='info-spacer'></div>
            <div className='landmark-text'>{props.landmark}</div>
        </div>
    );
};

export default Landmarks;