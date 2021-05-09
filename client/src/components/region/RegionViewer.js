import React from 'react';
import { WButton, WRow, WCol } from 'wt-frontend';
import flagImg from '../Images/flag.png';
import Landmarks from './Landmarks';
import { useHistory, useParams } from "react-router-dom";

const RegionViewer = (props) => {
    let history = useHistory();
    const { id } = useParams();

    let region = props.regions.find(reg => reg._id === id);
    let parentReg = props.regions.find(reg => reg._id === region.parentId);

    let numChildren = 0
    if (region.childrenIds !== null) {
        numChildren = region.childrenIds.length;
    }

    const navigateBack = async (e) => {
        //props.handleSetActiveRegion(props.activeRegion.parentId);
        props.activeViewer(false, {}, []);
        history.push("/home/region/"+region.parentId);
    };

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
                            <div>{region.name}</div>
                        </div>
                        <div className='info-col-spacer'></div>
                        <div className='info-rows'>
                            <div>Parent Region: </div>
                            <div className='info-spacer'></div>
                            <div  className='viewer-parent' onClick={navigateBack}>{parentReg.name}</div>
                            <i className="material-icons edit-button">edit</i>
                        </div>
                        <div className='info-col-spacer'></div>
                        <div className='info-rows'>
                            <div>Region Capital: </div>
                            <div className='info-spacer'></div>
                            <div>{region.capital}</div>
                        </div>
                        <div className='info-col-spacer'></div>
                        <div className='info-rows'>
                            <div>Region Leader: </div>
                            <div className='info-spacer'></div>
                            <div>{region.leader}</div>
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
                            region.landmarks.map((entry) => (
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