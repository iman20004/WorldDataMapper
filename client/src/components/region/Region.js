import React, { useState } from 'react';
import RegionHeader from './RegionHeader';
import RegionContents from './RegionContents';
import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { GET_DB_ANCESTORS, GET_REGION_BY_ID, GET_CHILDREN } from '../../cache/queries'

const Region = (props) => {
    const { id } = useParams();

    
    let region = props.regions.find(reg => reg._id === id);
    
    let subRegions = [];
    if (region !== undefined) {
        for (let i = 0; i < region.childrenIds.length; i++) {
            let currentId = region.childrenIds[i];
            let child = props.regions.find(reg => reg._id === currentId);
            subRegions.push(child);
        }
    }

    /*
    let region = {};
    const { loading: loadings, error: errors, data: dataReg, refetch: refetchRegion } = useQuery(GET_REGION_BY_ID, {
        variables: { _id: id }, fetchPolicy:'no-cache'
    });

    if (loadings) { console.log(loadings, 'loading REG'); }
    if (errors) { console.log(errors, 'error REG'); }
    if (dataReg) {
        region = dataReg.getRegionById
    }
    
    
    let subRegions = [];
    const { loading: loadingss, error: errorss, data: dataChildren, refetch: refetchChildren } = useQuery(GET_CHILDREN, {
        variables: { _id: id }, fetchPolicy:'no-cache'
    });

    if (loadingss) { console.log(loadings, 'loading children'); }
    if (errorss) { console.log(errors, 'error children'); }
    if (dataChildren) {
        for (let child of dataChildren.getChildren) {
			subRegions.push(child)
		}
    }
    */

    const { loading, error, data, refetch } = useQuery(GET_DB_ANCESTORS, {
        variables: { _id: id }, fetchPolicy:'no-cache'
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
                //refetchReg={refetchRegion}
                //refetchChildren={refetchChildren}
                //load={reload}
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
                //images={images}
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

