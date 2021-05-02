import React                from 'react';
import MapContents          from './MapContents';
import { WButton }          from 'wt-frontend';
import globeImg             from '../Images/globe.png';


const Maps = (props) => {

return (
        <div className='map-table ' >
            <div className='map-table-header '> 
                Your Maps
            </div>
            <div className="map-table-body">
                <MapContents
                    maps={props.maps}
                    setShowDeleteMap={props.setShowDeleteMap}
                    setShowMapEdit={props.setShowMapEdit}
                    handleSetActiveRegion={props.handleSetActiveRegion}
                    //handleSetActiveMap={props.handleSetActiveMap}
                />
                <div className="map-body-new">
                    <img src={globeImg} className="globe-maps"/>
                    <WButton className='map-create-button' onClick={props.setShowMapName} clickAnimation="ripple-light" hoverAnimation="darken">
                        Create New Map
                    </WButton>
                </div>
            </div>
        </div>
    );
};

export default Maps;