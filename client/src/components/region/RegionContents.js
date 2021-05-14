import React from 'react';
import RegionEntry from './RegionEntry';

const RegionContents = (props) => {
    
    return (
        props.subRegions !== undefined && props.subRegions.length > 0 ? <div className=' table-entries container-primary'>
            {
                props.subRegions.map((entry, index) => (
                    <RegionEntry
                        data={entry} key={entry._id} 
                        index={index} regions={props.subRegions}
                        activeViewer={props.activeViewer}
                        reload={props.reload}
                        editRegion={props.editRegion}
                        setShowDeleteRegion={props.setShowDeleteRegion}
                        setActiveField={props.setActiveField}
                        setActiveIndex={props.setActiveIndex}
                        activeField={props.activeField} 
                        activeIndex={props.activeIndex === index}
                        //tps={props.tps}
                        //refetch={props.refetch}
                        //handleSetActiveRegion={props.handleSetActiveRegion}
                        //setRoute={props.setRoute}
                        //route={props.route}
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
