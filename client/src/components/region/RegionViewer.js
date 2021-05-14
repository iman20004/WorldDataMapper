import React, { useState } from 'react';
import { WButton, WInput } from 'wt-frontend';
import flagImg from '../Images/flag.png';
import Landmarks from './Landmarks';
import { useHistory, useParams } from "react-router-dom";

const RegionViewer = (props) => {
    let history = useHistory();
    const { id } = useParams();
    const clickDisabled = () => { };

    let region = props.regions.find(reg => reg._id === id);
    let parentReg = props.regions.find(reg => reg._id === region.parentId);

    let numChildren = 0
    // QUERY FOR ALL CHILDREN HERE!!!!!!!!!!!!!!!!

    const [editingLand, toggleLandEdit] = useState(false);
    const [newLand, setNewLand] = useState('');
    

    const navigateBack = async (e) => {
        //props.handleSetActiveRegion(props.activeRegion.parentId);
        props.activeViewer(false, {}, []);
        history.push("/home/region/" + region.parentId);
    };

    const handleKeyEnter = async (e) => {
        if (e.keyCode === 13) {
            toggleLandEdit(false);
            //call props function
        }

    };

    const handleLandInput = async (e) => {
        toggleLandEdit(false);

        if (e.target.value) {
            setNewLand(e.target.value);
        }
    };

    const handleAddLand = async () => {
        //call props function
        setNewLand('');

    };

    const redoOptions = {
        className: !props.canRedo ? ' table-header-button-disabled ' : 'table-header-button ',
        onClick: !props.canRedo   ? clickDisabled : props.redo, 
        wType: "texted", 
        clickAnimation: !props.canRedo ? "" : "ripple-light"
    }

    const undoOptions = {
        className: !props.canUndo ? ' table-header-button-disabled ' : 'table-header-button',
        onClick: !props.canUndo  ? clickDisabled : props.undo,
        wType: "texted", 
        clickAnimation: !props.canUndo ? "" : "ripple-light"
    }

    return (
        <div className='region-table ' >
            <div className="viewer-header">
                <WButton {...undoOptions} >
                    <i className="material-icons large">undo</i>
                </WButton>
                <WButton {...redoOptions} >
                    <i className="material-icons large">redo</i>
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
                            <div className='viewer-parent' onClick={navigateBack}>{parentReg.name}</div>
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
                            <div># of Sub Regions: </div>
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
                        <i className="material-icons viewer-add" onClick={handleAddLand}>add</i>
                        {
                            editingLand
                                ? <WInput
                                    className='table-input new-landmark-box' onBlur={(e) => handleLandInput(e)}
                                    //onKeyDown={(e) => { if (e.keyCode === 13) handleCapitalEdit(e) }}
                                    onKeyDown={(e) => handleKeyEnter(e)}
                                    autoFocus={true} placeholder='New Landmark Here' type='text'
                                    inputClass="table-input-class"
                                />
                                : <div className='new-landmark-box'
                                    onClick={() => toggleLandEdit(!editingLand)}>
                                    New Landmark Here
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegionViewer;
