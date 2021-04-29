import React            from 'react';
import MapContents    from './MapContents';

const Maps = (props) => {
    return (
        <div className='table ' >
            <div classname= "map-header">
                Your Maps
            </div>
            <MapContents
            />
        </div>
    );
};

export default Maps;