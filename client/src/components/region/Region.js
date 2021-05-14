import React, { useState } from 'react';
import RegionHeader from './RegionHeader';
import RegionContents from './RegionContents';
import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { GET_DB_ANCESTORS } from '../../cache/queries'

const Region = (props) => {
    const { id } = useParams();

    let region = props.regions.find(reg => reg._id === id);
    //let subregions = props.regions.filter(reg => reg.parentId === id)

    let subRegions = [];
    if (region !== undefined) {
        for (let i = 0; i < region.childrenIds.length; i++) {
            let currentId = region.childrenIds[i];
            let child = props.regions.find(reg => reg._id === currentId);
            subRegions.push(child);
        }
    }

    const { loading, error, data, refetch } = useQuery(GET_DB_ANCESTORS, {
        variables: { _id: id },
    });

    if (loading) { console.log(loading, 'loading 2'); }
    if (error) { console.log(error, 'error 2'); }
    if (data) {
        props.setRoute(data.getAllAncestors);
    }

    const [activeIndex, setActiveIndex] = useState(-1);
    const [activeField, setActiveField] = useState('');

    return (
        <div className='table ' >
            <RegionHeader
                createNewRegion={props.createNewRegion}
                activeRegion={region}
                sortRegions={props.sortRegions}
                subRegions={subRegions}
                undo={props.undo} redo={props.redo}
                canUndo={props.canUndo} canRedo={props.canRedo}
            //activeRegion={props.activeRegion}
            //handleSetActiveRegion={props.handleSetActiveRegion}
            />
            <RegionContents
                activeRegion={region}
                subRegions={subRegions}
                activeViewer={props.activeViewer}
                reload={props.reload}
                editRegion={props.editRegion}
                setShowDeleteRegion={props.setShowDeleteRegion}
                setActiveField={setActiveField} activeField={activeField}
                setActiveIndex={setActiveIndex} activeIndex={activeIndex}
                //tps={props.tps}
            //refetch={props.reload}
            //refetch={refetch}
            //activeRegion={props.activeRegion}
            //subRegions={props.subRegions}
            //handleSetActiveRegion={props.handleSetActiveRegion}
            //setRoute={props.setRoute}
            //route={props.route}
            />
        </div>
    );
};

export default Region;

