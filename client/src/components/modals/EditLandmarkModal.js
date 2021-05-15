import React, { useState } 				                from 'react';
import { WModal, WMHeader, WMMain, WButton, WInput }    from 'wt-frontend';

const EditLandmarkModal = (props) => {
    const [landmarkName, setLandmarkName] = useState('');
    const [showErr, displayErrorMsg] = useState(false);
	const errorMsg = "All Maps must have a name.";
	
	const updateInput = (e) => {
        setLandmarkName(e.target.value);
	};

    const handleEditMap = async (e) => {
        if (!landmarkName) {
			displayErrorMsg(true);
			return;
		}
        props.setShowEditLandmark({}, '', false);
        props.editLandmark(props.editRegion, props.oldLand, landmarkName)
	};

    const handlekeyDown = async (e) => {
        if (e.keyCode === 13) {
            if (!e.target.value) {
                displayErrorMsg(true);
                return;
            }
            props.setShowEditLandmark({}, '', false);
            props.editLandmark(props.editRegion, props.oldLand, e.target.value);
        }
    };

    return (
        <WModal className="map-modal" cover="true" visible={props.setShowEditLandmark}>
            <WMHeader  className="modal-header" onClose={() => props.setShowEditLandmark({}, '', false)}>
                Edit Landmark Name
			</WMHeader >

            <WMMain>
                <WInput 
					className="modal-input" onBlur={updateInput} name="mapName" labelText="New Name" labelAnimation="fixed"
                    barAnimation="solid" wType="outlined" inputType="text" onKeyDown={(e) => handlekeyDown(e)} 
				/>
                <div className="modal-spacer">&nbsp;</div>
                <WButton className="modal-button cancel-button" onClick={() => props.setShowEditLandmark({}, '', false)} wType="texted">
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

export default EditLandmarkModal;
