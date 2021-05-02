import React from 'react';
import { WButton, WRow, WCol } from 'wt-frontend';

const RegionViewer = (props) => {

    return (
        <div className='table ' >
            <div className="viewer-header">
                <WButton wType="texted" >
                    <i className="material-icons">undo</i>
                </WButton>
                <WButton wType="texted" >
                    <i className="material-icons">redo</i>
                </WButton>
            </div>
        </div>
    );
};

export default RegionViewer;