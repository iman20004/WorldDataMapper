import React, { useState } 				                from 'react';
import { WModal, WMHeader, WMMain, WButton, WInput }    from 'wt-frontend';

const MapEdit = (props) => {
    const [name, setName] = useState('');
    const [showErr, displayErrorMsg] = useState(false);
	const errorMsg = "All Maps must have a name.";
	
	const updateInput = (e) => {
        setName(e.target.value);
	};

    const handleEditMap = async (e) => {
        if (!name) {
			displayErrorMsg(true);
			return;
		}
        props.setShowMapEdit(false);
        props.editMap(props.editMapId, name)
	};

    return (
        <WModal className="delete-modal" cover="true" visible={props.setShowMapEdit}>
            <WMHeader  className="modal-header" onClose={() => props.setShowMapEdit(false)}>
                Rename Map?
			</WMHeader >

            <WMMain>
                <WInput 
					className="" onBlur={updateInput} name="mapName" labelText="New Name" labelAnimation="fixed"
                    barAnimation="solid" wType="outlined" inputType="text" 
				/>
                <WButton className="modal-button cancel-button" onClick={() => props.setShowMapEdit(false)} wType="texted">
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

export default MapEdit;
