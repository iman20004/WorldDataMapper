import React, { useState } from 'react';
import { WButton } from 'wt-frontend';
import { useHistory } from "react-router-dom";

const MapEntry = (props) => {
    const mapId = props.data._id;
    let history = useHistory();

    return (
        <div className='map-entry'>
            <div className='map-name-label' onClick={() => history.push("/home/maps/"+mapId)}>
                {props.data.name}
            </div>
            <WButton className='map-delete-button' onClick={() => props.setShowDeleteMap(mapId)} clickAnimation="ripple-light" hoverAnimation="darken">
                <i className="material-icons">delete</i>
            </WButton>
            <WButton className='map-edit-button' onClick={() => props.setShowMapEdit(mapId)} clickAnimation="ripple-light" hoverAnimation="darken">
                <i className="material-icons">edit</i>
            </WButton>
          
        </div>
    );
};

export default MapEntry;