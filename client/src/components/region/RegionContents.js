import React from 'react';
import RegionEntry from './RegionEntry';

const RegionContents = (props) => {
    let regions = props.subRegions;

    return (
        regions !== undefined && regions.length > 0 ? <div className=' table-entries container-primary'>
            {
                regions.map((entry) => (
                    <RegionEntry
                        data={entry} key={entry._id} 
                        setRoute={props.setRoute}
                        route={props.route}
                        //handleSetActiveRegion={props.handleSetActiveRegion}
                    />
                ))
            }
            </div>
            : <div className='container-primary' >
                <h2 className="nothing-msg"> No Further Subregions!</h2> : <></>                   
            </div>
    );
};

export default RegionContents;
