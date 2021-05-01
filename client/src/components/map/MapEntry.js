import React, { useState } from 'react';
import { WButton } from 'wt-frontend';

const MapEntry = (props) => {

    return (
        <div className='map-entry'>
            <div className='map-name-label'>
                {props.data.name}
            </div>
            <WButton className='map-delete-button' onClick={props.setShowDeleteMap} clickAnimation="ripple-light" hoverAnimation="darken">
                <i className="material-icons">delete</i>
            </WButton>
            <WButton className='map-edit-button' onClick={props.setShowMapEdit} clickAnimation="ripple-light" hoverAnimation="darken">
                <i className="material-icons">edit</i>
            </WButton>
          
        </div>
    );
};

export default MapEntry;