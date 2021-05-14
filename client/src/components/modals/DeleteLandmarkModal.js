import React from 'react';
import { WModal, WMHeader, WMMain, WButton } from 'wt-frontend';

const DeleteLandmarkModal = (props) => {


    const handleDelete = async (e) => {
        props.deleteLandmark(props.deleteLandRegion, props.deleteLand);
        props.setShowDeleteLandmark({}, '', false);
    }

    return (
        <WModal className="map-modal" cover="true" visible={props.setShowDeleteLandmark}>
            <WMHeader  className="modal-header" onClose={() => props.setShowDeleteLandmark({}, '', false)}>
                Delete Landmark?
			</WMHeader >

            <WMMain>
                <WButton className="modal-button cancel-button" onClick={() => props.setShowDeleteLandmark({}, '', false)} wType="texted">
                    Cancel
				</WButton>
                <label className="col-spacer">&nbsp;</label>
                <WButton className="modal-button" onClick={handleDelete} clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="danger">
                    Delete
				</WButton>
            </WMMain>

        </WModal >
    );
}

export default DeleteLandmarkModal;
