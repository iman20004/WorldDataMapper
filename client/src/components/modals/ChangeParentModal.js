import React, { useState } from 'react';
import { WModal, WMHeader, WMMain, WButton, WInput } from 'wt-frontend';

const ChangeParentModal = (props) => {
    const [parentID, setParentID] = useState('');
    const [showErr, displayErrorMsg] = useState(false);
    const errorMsg = "Please select one option";


    const parent = props.regions.find(reg => reg._id === props.regionToMove.parentId);
    const possibleParents1 = props.regions.filter(reg => reg.parentId === parent.parentId);
    const possibleParents = possibleParents1.filter(reg => reg._id !== props.regionToMove.parentId)
    console.log(possibleParents)


    const updateInput = (parentid, index) => {
        for (var i = 0; i < possibleParents.length; i++) {
            if (i === index){
                document.getElementById("myCheck" + i).checked = true;
            } else {
                document.getElementById("myCheck" + i).checked = false;
            }
        }
        setParentID(parentid);
    };

    const handleEditMap = async (e) => {
        if (!parentID) {
            displayErrorMsg(true);
            return;
        }
        props.setShowChangeParent({}, false);
        props.handleChangeParent(props.regionToMove, parentID)  
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

                            possibleParents.map((entry, index) => (
                                <div className='per-parent'>
                                    <input type="checkbox" id={"myCheck" + index} onClick={() => updateInput(entry._id, index)}></input>
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
