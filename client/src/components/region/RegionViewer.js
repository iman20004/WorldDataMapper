import React from 'react';
import { WButton, WRow, WCol } from 'wt-frontend';
import flagImg from '../Images/flag.png';
import Landmarks from './Landmarks';

const RegionViewer = (props) => {
    console.log(props.activeRegion.childrenIds)
    let numChildren = 0
    if (props.activeRegion.childrenIds !== null) {
        numChildren = props.activeRegion.childrenIds.length;
    }

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
                            <div>{props.activeRegion.name}</div>
                        </div>
                        <div className='info-col-spacer'></div>
                        <div className='info-rows'>
                            <div>Parent Region: </div>
                            <div className='info-spacer'></div>
                            <div>Put parent name here</div>
                            <i className="material-icons edit-button">edit</i>
                        </div>
                        <div className='info-col-spacer'></div>
                        <div className='info-rows'>
                            <div>Region Capital: </div>
                            <div className='info-spacer'></div>
                            <div>{props.activeRegion.capital}</div>
                        </div>
                        <div className='info-col-spacer'></div>
                        <div className='info-rows'>
                            <div>Region Leader: </div>
                            <div className='info-spacer'></div>
                            <div>{props.activeRegion.leader}</div>
                        </div>
                        <div className='info-col-spacer'></div>
                        <div className='info-rows'>
                            <div># of Subregion: </div>
                            <div className='info-spacer'></div>
                            <div>{numChildren}</div>
                        </div>
                    </div>

                </div>
                <div className="region-right">
                    <div className='landmarks-label'>Region Landmarks:</div>
                    <div className='info-col-spacer'></div>
                    <div className='landmark-box'>
                        {
                            props.activeRegion.landmarks.map((entry) => (
                                <Landmarks
                                    landmark={entry}
                                />
                            ))
                        }
                    </div>
                    <div className='add-box'>
                        <i className="material-icons viewer-add">add</i>
                        <div className='new-landmark-box'>New Landmark Here</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegionViewer;