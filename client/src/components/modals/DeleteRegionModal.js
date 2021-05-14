import React from 'react';
import { WModal, WMHeader, WMMain, WButton } from 'wt-frontend';

const DeleteRegionModal = (props) => {


    const handleDelete = async (e) => {
        props.deleteRegion(props.regionToDelete, props.deleteIndex);
        props.setShowDeleteRegion({}, -1, false);
    }

    return (
        <WModal className="map-modal" cover="true" visible={props.setShowDeleteRegion}>
            <WMHeader  className="modal-header" onClose={() => props.setShowDeleteRegion('',false)}>
                Delete Region And Its Subregions?
			</WMHeader >

            <WMMain>
                <WButton className="modal-button cancel-button" onClick={() => props.setShowDeleteRegion('',false)} wType="texted">
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

export default DeleteRegionModal;
