import React from 'react';
import RegionHeader from './RegionHeader';
import RegionContents from './RegionContents';
import { useParams} from "react-router-dom";
import { useQuery } from '@apollo/client';
import { GET_DB_ANCESTORS } 	from '../../cache/queries'

const Region = (props) => {
    const { id } = useParams();

    let region = props.regions.find(reg => reg._id === id);
    let subregions = props.regions.filter(reg => reg.parentId === id)

    const { loading, error, data, refetch } = useQuery(GET_DB_ANCESTORS, {
        variables: { _id: id },
      });

	if (loading) { console.log(loading, 'loading hehehe'); }
	if (error) { console.log(error, 'error oh no'); }
	if (data) { 
        props.setRoute(data.getAllAncestors);
    }

    //let ancestors = region.root === true ? [] : 

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
                activeViewer={props.activeViewer}
                reload={props.reload}
                editMap={props.editMap}
                setShowDeleteRegion={props.setShowDeleteRegion}
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

