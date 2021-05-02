import React from 'react';
import { WButton, WRow, WCol } from 'wt-frontend';
import {useParams, useHistory} from "react-router-dom";

const RegionHeader = (props) => {
    const { id } = useParams();
    let history = useHistory();
    
    const handleAddRegion = async (e) => {
        props.createNewRegion(props.activeRegion._id)
    };
    
    const handleHome = async (e) => {
        props.handleSetActiveRegion('');
        history.push("/home/maps")
	};


    return (
        <>
            <WRow className='table-header-intro'>
                <WCol size="4">
                    <WButton wType="texted" onClick={handleAddRegion} >
                        <i className="material-icons">add</i>
                    </WButton>
                    <WButton wType="texted" >
                        <i className="material-icons">undo</i>
                    </WButton>
                    <WButton wType="texted" >
                        <i className="material-icons">redo</i>
                    </WButton>
                </WCol>
                <WCol size="4">
                    <div>Region Name: {props.activeRegion.name}</div>
                </WCol>
                <WCol size="4">
                    <div onClick={handleHome}>Home</div>
                </WCol>
            </WRow>
            <WRow className="table-header">
                <WCol size="2">
                    <WButton className='table-header-section' wType="texted" >
                        <div>Name</div>
                        <div className='table-header-spacer'></div>
                        <i className="material-icons">arrow_downward</i>
                    </WButton>
                </WCol>

                <WCol size="2">
                    <WButton className='table-header-section' wType="texted" >
                        <div>Capital</div>
                        <div className='table-header-spacer'></div>
                        <i className="material-icons">arrow_downward</i>
                    </WButton>
                </WCol>

                <WCol size="2">
                    <WButton className='table-header-section' wType="texted" >
                        <div>Leader</div>
                        <div className='table-header-spacer'></div>
                        <i className="material-icons">arrow_downward</i>
                    </WButton>
                </WCol>

                <WCol size="2">
                    <WButton className='table-header-section' wType="texted" >
                        <div>Flag</div>
                        <div className='table-header-spacer'></div>
                        <i className="material-icons">arrow_downward</i>
                    </WButton>
                </WCol>

                <WCol size="4">
                    <WButton className='table-header-section' wType="texted" >
                        <div>Landmarks</div>
                        <div className='table-header-spacer'></div>
                        <i className="material-icons">arrow_downward</i>
                    </WButton>
                </WCol>
            </WRow>
        </>
    );
};

export default RegionHeader;