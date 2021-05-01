import React from 'react';
import RegionHeader from './RegionHeader';
import RegionContents from './RegionContents';
import { useParams } from "react-router-dom";

const Region = (props) => {

    return (
        <div className='table ' >
            <RegionHeader
            />
            <RegionContents
            
            />
        </div>
    );
};

export default Region;

