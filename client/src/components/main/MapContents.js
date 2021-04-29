import React        from 'react';
import MapEntry   from './MapEntry';

const MapContents = (props) => {

    const entries = props.activeList ? props.activeList.items : null;
    return (
        entries ? <div className=' table-entries container-primary'>
            {
                entries.map((entry, index) => (
                    <MapEntry
                        data={entry} key={entry.id}
                        index={index}
                    />
                ))
            }

            </div>
            : <div className='container-primary' />
    );
};

export default MapContents;