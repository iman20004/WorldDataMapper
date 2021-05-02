import React from 'react';
import { WButton, WRow, WCol } from 'wt-frontend';
import flagImg from '../Images/flag.png';

const RegionViewer = (props) => {

    return (
        <div className='region-table ' >
            <div className="viewer-header">
                <WButton wType="texted" >
                    <i className="material-icons large viewer-buttons">undo</i>
                </WButton>
                <WButton wType="texted" >
                    <i className="material-icons large viewer-buttons">redo</i>
                </WButton>
            </div>
            <div className="region-body">
                <div className="region-left">
                    <img src={flagImg} className="flag-viewer" />
                    <div className='info-viewer'>
                        <div className='info-rows'>
                            <div>Region Name: </div>
                            <div className='info-spacer'></div>
                            <div>North America</div>
                        </div>
                        <div className='info-col-spacer'></div>
                        <div className='info-rows'> 
                            <div>Parent Region: </div>
                            <div className='info-spacer'></div>
                            <div>North America</div>
                            <i className="material-icons edit-button">edit</i>
                        </div>
                        <div className='info-col-spacer'></div>
                        <div className='info-rows'>
                            <div>Region Capital: </div>
                            <div className='info-spacer'></div>
                            <div>North America</div>
                        </div>
                        <div className='info-col-spacer'></div>
                        <div className='info-rows'>
                            <div>Region Leader: </div>
                            <div className='info-spacer'></div>
                            <div>North America</div>
                        </div>
                        <div className='info-col-spacer'></div>
                        <div className='info-rows'>
                            <div># of Subregion: </div>
                            <div className='info-spacer'></div>
                            <div>50</div>
                        </div>
                    </div>

                </div>
                <div className="region-right">
                    <div className='landmarks-label'>Region Landmarks:</div>
                    <div className='info-col-spacer'></div>
                    <div className='landmark-box'></div>
                    <div className='add-box'>
                        <i className="material-icons ">add</i>
                        <div className='new-landmark-box'>New Landmark Here</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegionViewer;