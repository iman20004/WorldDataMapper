import React        from 'react';
import MapEntry   from './MapEntry';

const MapContents = (props) => {

    //const entries = props.activeList ? props.activeList.items : null;
    return (
        props.maps ? <div className=' map-body-list'>
            {
                props.maps.map((entry, index) => (
                    <MapEntry
                        data={entry} key={entry._id}
                        setShowDeleteMap={props.setShowDeleteMap}
                        //setDeleteMap={props.setDeleteMap}
                    />
                ))
            }

            </div>
            : <div className='map-body-list' />
    );
};

export default MapContents;