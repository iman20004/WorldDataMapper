import React, { useState } from 'react';
import { WButton, WInput } from 'wt-frontend';
import flagImg from '../Images/Dummy_flag.png';
import Landmarks from './Landmarks';
import { useHistory, useParams } from "react-router-dom";
import { FragmentsOnCompositeTypesRule } from 'graphql';

const RegionViewer = (props) => {
    let history = useHistory();
    const { id } = useParams();
    const clickDisabled = () => { };

    let region = props.regions.find(reg => reg._id === id);
    let parentReg = props.regions.find(reg => reg._id === region.parentId);

    let numChildren = region.childrenIds.length;

    const [editingLand, toggleLandEdit] = useState(false);
    const [newLand, setNewLand] = useState('');


    const navigateBack = async (e) => {
        //props.handleSetActiveRegion(props.activeRegion.parentId);
        props.activeViewer(false, {}, []);
        history.push("/home/region/" + region.parentId);
        props.reload();
    };

    const handleKeyEnter = async (e) => {
        if (e.keyCode === 13) {
            toggleLandEdit(false);
            if (e.target.value){
                let duplicate = region.landmarks.includes(e.target.value)
                if (duplicate){
                    alert('Landmark with that name already exists! Please try with another name');
                } else {
                    props.addLandmark(region, e.target.value);
                }
            }
        }

    };

    const handleLandInput = async (e) => {
        toggleLandEdit(false);

        if (e.target.value) {
            setNewLand(e.target.value);
        }
    };

    const handleAddLand = async () => {
        props.addLandmark(region, newLand);
        setNewLand('');
    };

    const redoOptions = {
        className: !props.canRedo ? ' table-header-button-disabled ' : 'table-header-button ',
        onClick: !props.canRedo ? clickDisabled : props.redo,
        wType: "texted",
        clickAnimation: !props.canRedo ? "" : "ripple-light"
    }

    const undoOptions = {
        className: !props.canUndo ? ' table-header-button-disabled ' : 'table-header-button',
        onClick: !props.canUndo ? clickDisabled : props.undo,
        wType: "texted",
        clickAnimation: !props.canUndo ? "" : "ripple-light"
    }

    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    };
      
    const images = importAll(require.context('../Images/World', false, /\.(png)$/));

    return (
        <div className="region-body">
            <div className="region-left">
                <div className="viewer-header">
                    <WButton {...undoOptions} >
                        <i className="material-icons large">undo</i>
                    </WButton>
                    <WButton {...redoOptions} >
                        <i className="material-icons large">redo</i>
                    </WButton>
                </div>
                {
                        images[`${region.name} Flag.png`] === undefined ?
                        <img className="flag-spreadsheet" src={flagImg} alt="N/A" />
                        : <img className="flag-viewer" src={images[`${region.name} Flag.png`].default} alt="N/A" />
                    }
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
                        <i className="material-icons edit-button" onClick={() => props.setShowChangeParent(region)}>edit</i>
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
                                region={region}
                                setShowDeleteLandmark={props.setShowDeleteLandmark}
                                setShowEditLandmark={props.setShowEditLandmark}
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
    );
};

export default RegionViewer;
