import React        from 'react';
import MapEntry   from './MapEntry';

const MapContents = (props) => {

    return (
        props.maps ? <div className=' map-body-list'>
            {
                props.maps.map((entry, index) => (
                    <MapEntry
                        data={entry} key={entry._id}
                        setShowDeleteMap={props.setShowDeleteMap}
                        setShowMapEdit={props.setShowMapEdit}
                        setRoute={props.setRoute}
                        //handleSetActiveMap={props.handleSetActiveMap}
                        //handleSetActiveRegion={props.handleSetActiveRegion}
                    />
                ))
            }

            </div>
            : <div className='map-body-list' />
    );
};

export default MapContents;