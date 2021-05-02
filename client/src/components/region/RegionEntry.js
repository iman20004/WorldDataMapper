import React, { useState } from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';
import { useHistory, useParams} from "react-router-dom";

const RegionEntry = (props) => {
    const { data } = props;
    const mapId = props.data._id;
    let history = useHistory();
    /*
    let routeArray = [];
    let parentId = props.data.parentId
    if (parentId) {
        routeArray.push(parentId)
        console.log("very nice iman you can do it")
        console.log(routeArray)
        //while(parentId)
    }*/

    const handleOpen = async (e) => {
        props.handleSetActiveRegion(props.data);
        history.push("/home/"+mapId);
    };

    const handleEditLand = async (e) => {
        props.handleSetActiveRegion(props.data);
        history.push("/home/regionviewer/"+props.data._id);
        console.log(props.data.name)
    };

    return (
        <WRow className='table-entry'>
            <WCol size="3">
                {
                    <div className="table-text" onClick={handleOpen}>
                        {data.name}
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
                        flag
                    </div>
                }
            </WCol>
            <WCol size="3" onClick={handleEditLand}>
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