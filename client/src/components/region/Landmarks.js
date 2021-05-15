import React, { useState } from 'react';

const Landmarks = (props) => {
    const disabledButton = () => { }

    let childLandmark = props.landmark.includes("-");


    return (
        <div className='landmark-entry'>
            <div className='info-spacer'></div>
            <i className={childLandmark ? "material-icons close-landmark-disabled" : "material-icons close-landmark"}
            onClick={childLandmark ? disabledButton : () => props.setShowDeleteLandmark(props.region, props.landmark)}>
                close
            </i>
            <div className='info-spacer'></div>
            <div className={childLandmark ? "landmark-text-disabled" : 'landmark-text'}
            onClick={childLandmark ? disabledButton : () => props.setShowEditLandmark(props.region, props.landmark)}>
                {props.landmark}
            </div>
        </div>
    );
};

export default Landmarks;