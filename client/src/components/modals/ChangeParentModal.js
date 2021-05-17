import React, { useState } from 'react';
import { WModal, WMHeader, WMMain, WButton, WInput } from 'wt-frontend';

const ChangeParentModal = (props) => {
    const [name, setName] = useState('');
    const [showErr, displayErrorMsg] = useState(false);
    const errorMsg = "Please select one option";


    const parent = props.regions.find(reg => reg._id === props.regionToMove.parentId);
    const possibleParents1 = props.regions.filter(reg => reg.parentId === parent.parentId);
    const possibleParents = possibleParents1.filter(reg => reg._id !== props.regionToMove.parentId)
    console.log(possibleParents)


    const updateInput = (parentID) => {
        console.log(parentID)
        setName(parentID);
    };

    const handleEditMap = async (e) => {
        if (!name) {
            displayErrorMsg(true);
            return;
        }
        props.setShowChangeParent({}, false);
        console.log(name)
        //props.editMap(props.editMapId, name)  
    };

    return (
        <WModal className="map-modal" cover="true" visible={props.setShowChangeParent}>
            <WMHeader className="modal-header" onClose={() => props.setShowChangeParent({}, false)}>
                <div>Move Region to Different Parent? </div>
                <div className='modal-sidenote'>Please select new parent below</div>
            </WMHeader >

            <WMMain>
                <div className='parents-box'>
                    {
                        possibleParents.length > 0 ? 

                        possibleParents.map((entry) => (
                            <div className='per-parent'>
                                <input type="checkbox" id="myCheck" onClick={() => updateInput(entry._id)}></input>
                                <div className='parent-names'>{entry.name}</div>
                            </div>
                        ))
                         :
                        <div className='no-option'> No options available</div>
                    }
                </div>
                <div className="modal-spacer">&nbsp;</div>
                <WButton className="modal-button cancel-button" onClick={() => props.setShowChangeParent({}, false)} wType="texted">
                    Cancel
				</WButton>
                <label className="col-spacer">&nbsp;</label>
                <WButton className="modal-button" onClick={handleEditMap} clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="danger">
                    Change
				</WButton>

                {
                    showErr ? <div className='modal-error'>
                        {errorMsg}
                    </div>
                        : <div className='modal-error'>&nbsp;</div>
                }
            </WMMain>

        </WModal >
    );
}

export default ChangeParentModal;
