import React, { useState, useEffect } from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';
import { useHistory } from "react-router-dom";
import flagImg from '../Images/flag.png';

const RegionEntry = (props) => {
    const { data } = props;
    const mapId = props.data._id;
    let history = useHistory();

    //let lands = data.landmarks.join(", ");
    let lands = '';
    for (let i = 0; i<data.landmarks.length; i++) {
        let landmarkToDisplay = data.landmarks[i].split(' - ')[0];
        if ( i !== 0 ) {
            landmarkToDisplay = ', ' + landmarkToDisplay  ;
        }
        lands += landmarkToDisplay;
    }

    const [editingName, toggleNameEdit] = useState(Boolean(props.activeIndex && props.activeField === 'name'));
    const [editingCapital, toggleCapitalEdit] = useState(Boolean(props.activeIndex && props.activeField === 'capital'));
    const [editingLeader, toggleLeaderEdit] = useState(Boolean(props.activeIndex && props.activeField === 'leader'));

    useEffect(() => {
        toggleCapitalEdit(Boolean(props.activeIndex && props.activeField === 'capital'))
        toggleNameEdit(Boolean(props.activeIndex && props.activeField === 'name'))
        toggleLeaderEdit(Boolean(props.activeIndex && props.activeField === 'leader'))

    }, [props.activeIndex, props.activeField])


    const disabledButton = () => { }


    const handleOpen = async (e) => {
        //props.handleSetActiveRegion(props.data);
        //props.editMap(mapId, props.data.name);
        props.setActiveField('');
        props.setActiveIndex(-1);
        history.push("/home/region/" + mapId);
        props.reload();
    };

    const handleEditLand = async (e) => {
        //props.handleSetActiveRegion(props.data);
        props.activeViewer(true, props.data, props.regions);
        history.push("/home/regionviewer/" + props.data._id);
        props.reload();
    };

    const handleNameEdit = async (e) => {
        toggleNameEdit(false);
        const newName = e.target.value ? e.target.value : 'Untitled';
        const prevName = data.name;
        if (newName !== prevName) {
            props.editRegion(data._id, 'name', newName, prevName);
        }
    };

    const handleCapitalEdit = async (e) => {
        toggleCapitalEdit(false);
        const newCapital = e.target.value ? e.target.value : 'No Capital';
        const prevCapital = data.capital;
        if (newCapital !== prevCapital) {
            props.editRegion(data._id, 'capital', newCapital, prevCapital);
        }
    };

    const handleLeaderEdit = async (e) => {
        toggleLeaderEdit(false);
        const newLeader = e.target.value ? e.target.value : 'No Leader';
        const prevLeader = data.leader;
        if (newLeader !== prevLeader) {
            props.editRegion(data._id, 'leader', newLeader, prevLeader);
        }
    };

    const handlekeyDownName = async (e) => {
        if (e.keyCode === 13) {
            handleNameEdit(e);
        } else if (e.keyCode === 39) {
            toggleCapitalEdit(true);
        } else if (e.keyCode === 38) {
            handleNameEdit(e);
            props.setActiveField('name');
            props.setActiveIndex(props.index - 1);
        } else if (e.keyCode === 40) {
            handleNameEdit(e);
            props.setActiveField('name');
            props.setActiveIndex(props.index + 1);
        }
    };

    const handlekeyDownCapital = async (e) => {
        if (e.keyCode === 13) {
            handleCapitalEdit(e);
        } else if (e.keyCode === 37) {
            toggleNameEdit(true);
        } else if (e.keyCode === 39) {
            toggleLeaderEdit(true);
        } else if (e.keyCode === 38) {
            handleCapitalEdit(e);
            props.setActiveField('capital');
            props.setActiveIndex(props.index - 1);
        } else if (e.keyCode === 40) {
            handleCapitalEdit(e);
            props.setActiveField('capital');
            props.setActiveIndex(props.index + 1);
        }
    };

    const handlekeyDownLeader = async (e) => {
        if (e.keyCode === 13) {
            handleLeaderEdit(e);
        } else if (e.keyCode === 37) {
            toggleCapitalEdit(true);
        } else if (e.keyCode === 38) {
            handleLeaderEdit(e);
            props.setActiveField('leader');
            props.setActiveIndex(props.index - 1);
        } else if (e.keyCode === 40) {
            handleLeaderEdit(e);
            props.setActiveField('leader');
            props.setActiveIndex(props.index + 1);
        }
    };

    return (
        <WRow className='table-entry'>
            <WCol size="2">
                {
                    <div className='region-first'>
                        <i onClick={() => props.setShowDeleteRegion(props.data, props.index)} className="material-icons close-landmark">close</i>
                        {
                            editingName || data.name === ''
                                ? <WInput
                                    className='table-input' onBlur={handleNameEdit}
                                    //onKeyDown={(e) => { if (e.keyCode === 13) handleNameEdit(e) }}
                                    onKeyDown={(e) => handlekeyDownName(e)}
                                    autoFocus={true} defaultValue={data.name} type='text'
                                    inputClass="table-input-class"
                                />
                                : <div className="table-text"
                                    onClick={(e) => handleOpen(e)}>
                                    {data.name}
                                </div>
                        }
                    </div>
                }

            </WCol>

            <WCol size="2">
                {
                    editingCapital || data.capital === ''
                        ? <WInput
                            className='table-input' onBlur={handleCapitalEdit}
                            //onKeyDown={(e) => { if (e.keyCode === 13) handleCapitalEdit(e) }}
                            onKeyDown={(e) => handlekeyDownCapital(e)}
                            autoFocus={true} defaultValue={data.capital} type='text'
                            inputClass="table-input-class"
                        />
                        : <div className="table-text"
                            onClick={() => toggleCapitalEdit(!editingCapital)}>
                            {data.capital}
                        </div>
                }

            </WCol>

            <WCol size="2">
                {
                    editingLeader || data.leader === ''
                        ? <WInput
                            className='table-input' onBlur={handleLeaderEdit}
                            //onKeyDown={(e) => { if (e.keyCode === 13) handleLeaderEdit(e) }}
                            onKeyDown={(e) => handlekeyDownLeader(e)}
                            autoFocus={true} defaultValue={data.leader} type='text'
                            inputClass="table-input-class"
                        />
                        : <div className="table-text"
                            onClick={() => toggleLeaderEdit(!editingLeader)}>
                            {data.leader}
                        </div>
                }
            </WCol>

            <WCol size="2">
                {
                    <div className="table-text">
                        <img src={flagImg} className="flag-spreadsheet" />
                    </div>
                }
            </WCol>
            <WCol className='landmarks_list' size="4" onClick={(e) => handleEditLand(e)}>
                {
                    lands.length === 0 ? <div className='table-text'>None</div>
                    : <div className='table-text'>{lands}</div>
                }
            </WCol>
        </WRow>
    );
};

export default RegionEntry;