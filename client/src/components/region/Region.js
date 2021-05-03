import React from 'react';
import RegionHeader from './RegionHeader';
import RegionContents from './RegionContents';
import { useParams} from "react-router-dom";

const Region = (props) => {
    const { id } = useParams();

    let region = props.regions.find(reg => reg._id === id);
    let subregions = props.regions.filter(reg => reg.parentId === id)

    return (
        <div className='table ' >
            <RegionHeader
                createNewRegion={props.createNewRegion}
                activeRegion={region}
                //activeRegion={props.activeRegion}
                //handleSetActiveRegion={props.handleSetActiveRegion}
            />
            <RegionContents
                activeRegion={region}
                subRegions={subregions}
                setRoute={props.setRoute}
                route={props.route}
                //activeRegion={props.activeRegion}
                //subRegions={props.subRegions}
                //handleSetActiveRegion={props.handleSetActiveRegion}
            />
        </div>
    );
};

export default Region;

