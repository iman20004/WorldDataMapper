import React, { useState } from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';
import { useHistory, useParams } from "react-router-dom";
import flagImg from '../Images/flag.png';

const RegionEntry = (props) => {
    const { data } = props;
    const mapId = props.data._id;
    let history = useHistory();
 
    const handleOpen = async (e) => {
        //props.handleSetActiveRegion(props.data);
        //props.setRoute(props.data);
        let arr = props.route
        arr.push(mapId, props.data.name);
        props.setRoute(arr);
        history.push("/home/region/" + mapId);
    };

    const handleEditLand = async (e) => {
        //props.handleSetActiveRegion(props.data);
        history.push("/home/regionviewer/" + props.data._id);
    };

    return (
        <WRow className='table-entry'>
            <WCol size="2">
                {
                    <div className='region-first'>
                        <i className="material-icons close-landmark">close</i>
                        <div className="table-text" onClick={handleOpen}>
                            {data.name}
                        </div>
                    </div>
                }
            </WCol>

            <WCol size="2">
                {
                    <div className="table-text">
                        {data.capital}
                    </div>
                }
            </WCol>

            <WCol size="2">
                {
                    <div className="table-text">
                        {data.leader}
                    </div>
                }
            </WCol>

            <WCol size="2">
                {
                    <div className="table-text">
                        <img src={flagImg} className="flag-spreadsheet" />
                    </div>
                }
            </WCol>
            <WCol size="4" onClick={handleEditLand}>
                {
                    <div className="table-text" >
                        {data.landmarks}
                    </div>
                }

            </WCol>
        </WRow>
    );
};

export default RegionEntry;