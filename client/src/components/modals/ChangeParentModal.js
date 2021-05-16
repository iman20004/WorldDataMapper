import React, { useState } 				                from 'react';
import { WModal, WMHeader, WMMain, WButton, WInput }    from 'wt-frontend';

const ChangeParentModal = (props) => {
    const [name, setName] = useState('');
    const [showErr, displayErrorMsg] = useState(false);
    const errorMsg = "Please only move region to Current Parent's Siblings!";
    

    const parent = props.regions.find(reg => reg._id === props.regionToMove.parentId);
    const possibleParents = props.regions.filter(reg => reg.parentId === parent.parentId);

	
	const updateInput = (e) => {
        setName(e.target.value);
	};

    const handleEditMap = async (e) => {
        if (!name) {
			displayErrorMsg(true);
			return;
		}
        //props.setShowChangeParent(false);
        //props.editMap(props.editMapId, name)  
    };
    
    const handlekeyDown = async (e) => {
        if (e.keyCode === 13) {
            if (!e.target.value) {
                displayErrorMsg(true);
                return;
            }
            //props.setShowChangeParent(false);
            //props.editMap(props.editMapId, e.target.value);
        }
    };

    return (
        <WModal className="map-modal" cover="true" visible={props.setShowChangeParent}>
            <WMHeader  className="modal-header" onClose={() => props.setShowChangeParent(false)}>
                <div>Move Region to Different Parent? </div>
                <div className='modal-sidenote'>Only current parents siblings allowed!</div>
			</WMHeader >

            <WMMain>
                <WInput 
					className="modal-input" onBlur={updateInput} name="mapName" labelText="New Parent Name" labelAnimation="fixed"
                    barAnimation="solid" wType="outlined" inputType="text" onKeyDown={(e) => handlekeyDown(e)} 
				/>
                <div className="modal-spacer">&nbsp;</div>
                <WButton className="modal-button cancel-button" onClick={() => props.setShowChangeParent(false)} wType="texted">
                    Cancel
				</WButton>
                <label className="col-spacer">&nbsp;</label>
                <WButton className="modal-button" onClick={handleEditMap} clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="danger">
                    Rename
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
