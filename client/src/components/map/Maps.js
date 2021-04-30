import React            from 'react';
import MapContents    from './MapContents';
import { WButton } from 'wt-frontend';


const Maps = (props) => {

return (
        <div className='map-table ' >
            <div className='map-table-header '> 
                Your Maps
            </div>
            <div className="map-table-body">
                <MapContents
                    maps={props.maps}
                />
                <div className="map-body-new">
                    <WButton className='map-create-button' onClick={props.createNewMap} clickAnimation="ripple-light" hoverAnimation="darken">
                        Create New Map
                    </WButton>
                </div>
            </div>
        </div>
    );
};

export default Maps;