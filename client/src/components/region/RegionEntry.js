import React, { useState } from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';
import { useHistory } from "react-router-dom";
import flagImg from '../Images/flag.png';

const RegionEntry = (props) => {
    const { data } = props;
    const mapId = props.data._id;
    let history = useHistory();


    const [editingName, toggleNameEdit] = useState(false);
    const [editingCapital, toggleCapitalEdit] = useState(false);
    const [editingLeader, toggleLeaderEdit] = useState(false);

    const disabledButton = () => { }


    const handleOpen = async (e) => {
        //props.handleSetActiveRegion(props.data);
        //props.setRoute(props.data);
        //let arr = props.route
        //arr.push(props.data);
        //props.setRoute(arr);
        //props.editMap(mapId, props.data.name);
        history.push("/home/region/" + mapId);
        props.reload();
    };

    const handleEditLand = async (e) => {
        //props.handleSetActiveRegion(props.data);
        props.activeViewer(true, props.data, props.regions);
        history.push("/home/regionviewer/" + props.data._id);
    };

    const handleNameEdit = async (e) => {
        toggleNameEdit(false);
        const newName = e.target.value ? e.target.value : 'Untitled';
        const prevName = data.name;
        if (newName !== prevName) {
            props.editRegion(data._id, 'name', newName);
        }
    };

    const handleCapitalEdit = async (e) => {
        toggleCapitalEdit(false);
        const newCapital = e.target.value ? e.target.value : 'No Capital';
        const prevCapital = data.capital;
        if (newCapital !== prevCapital) {
            props.editRegion(data._id, 'capital', newCapital);
        }
    };

    const handleLeaderEdit = async (e) => {
        toggleLeaderEdit(false);
        const newLeader = e.target.value ? e.target.value : 'No Leader';
        const prevLeader = data.leader;
        if (newLeader !== prevLeader) {
            props.editRegion(data._id, 'leader', newLeader);
        }
    };

    const handlekeyDownName = async (e) => {
        if (e.keyCode === 13) {
            handleNameEdit(e)
        } else if (e.keyCode === 39){
            toggleCapitalEdit(true);
        }
    };

    const handlekeyDownCapital = async (e) => {
        if (e.keyCode === 13) {
            handleCapitalEdit(e)
        } else if (e.keyCode === 37){
            toggleNameEdit(true);
        } else if (e.keyCode === 39){
            toggleLeaderEdit(true);
        }
    };

    const handlekeyDownLeader = async (e) => {
        if (e.keyCode === 13) {
            handleLeaderEdit(e)
        } else if (e.keyCode === 37){
            toggleCapitalEdit(true);
        }
    };

    return (
        <WRow className='table-entry'>
            <WCol size="2">
                {
                    <div className='region-first'>
                        <i onClick={() => props.setShowDeleteRegion(mapId)} className="material-icons close-landmark">close</i>
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
                            onClick={() => handleOpen}>
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
            <WCol size="4" onClick={handleEditLand}>
                {
                    <div className="table-text" >
                        {data.landmarks}
                    </div>
                }

            </WCol>
        </WRow>
    );
};

export default RegionEntry;