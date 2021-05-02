import React from 'react';
import RegionHeader from './RegionHeader';
import RegionContents from './RegionContents';

const Region = (props) => {

    return (
        <div className='table ' >
            <RegionHeader
                createNewRegion={props.createNewRegion}
                activeRegion={props.activeRegion}
                handleSetActiveRegion={props.handleSetActiveRegion}
            />
            <RegionContents
                activeRegion={props.activeRegion}
                subRegions={props.subRegions}
                handleSetActiveRegion={props.handleSetActiveRegion}
            />
        </div>
    );
};

export default Region;

