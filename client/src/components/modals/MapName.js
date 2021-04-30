import React, { useState } 				                from 'react';
import { WModal, WMHeader, WMMain, WButton, WInput }    from 'wt-frontend';

const MapName = (props) => {
    const [name, setName] = useState('');
    const [showErr, displayErrorMsg] = useState(false);
	const errorMsg = "All Maps must have a name.";
	
	const updateInput = (e) => {
        setName(e.target.value);
	};

    const handleAddMap = async (e) => {
        if (!name) {
			displayErrorMsg(true);
			return;
		}

        props.setShowMapName(false);
        props.createNewMap(name)
	};

    return (
        <WModal className="delete-modal" cover="true" visible={props.setShowMapName}>
            <WMHeader  className="modal-header" onClose={() => props.setShowMapName(false)}>
                Please Provide Map Name
			</WMHeader >

            <WMMain>
                <WInput 
					className="" onBlur={updateInput} name="lastName" labelAnimation="up" 
					barAnimation="solid" labelText="Map Name" wType="outlined" inputType="text" 
				/>
                <WButton className="modal-button cancel-button" onClick={() => props.setShowMapName(false)} wType="texted">
                    Cancel
				</WButton>
                <label className="col-spacer">&nbsp;</label>
                <WButton className="modal-button" onClick={handleAddMap} clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="danger">
                    Create
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

export default MapName;
