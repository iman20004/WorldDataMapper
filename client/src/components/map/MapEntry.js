import React, { useState } from 'react';
import { WButton } from 'wt-frontend';
import { useHistory, useParams} from "react-router-dom";

const MapEntry = (props) => {
    const mapId = props.data._id;
    const history = useHistory();
    //const { id } = useParams();

    const handleOpen = async (e) => {
        //props.handleSetActiveRegion(props.data)
        //props.setRoute(props.data);
        //props.handleSetActiveMap(props.data)
        //let arr = []
        //arr.push(props.data)
        //props.setRoute(arr);
        
        props.editMap(mapId, props.data.name);
        history.push("/home/region/"+mapId);
    };

    return (
        <div className='map-entry'>
            <div className='map-name-label' onClick={handleOpen}>
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