import React from 'react';
import { WButton, WRow, WCol } from 'wt-frontend';

const RegionHeader = (props) => {
    
    const handleAddRegion = async (e) => {
        props.createNewRegion(props.activeRegion._id)
    };

    return (
        <>
            <WRow className='table-header-intro'>
                <WCol size="4">
                    <WButton className='table-header-button ' id='add-button' wType="texted" onClick={handleAddRegion} >
                        <i className="material-icons">add_circle</i>
                    </WButton>
                    <WButton className='table-header-button ' wType="texted" >
                        <i className="material-icons ">undo</i>
                    </WButton>
                    <WButton className='table-header-button ' wType="texted" >
                        <i className="material-icons ">redo</i>
                    </WButton>
                </WCol>
                <WCol size="4">
                    <div className="name-displayer">
                        <div className='spreadsheet-header'>Region Name:</div>
                        <div className='table-header-spacer'></div>
                        <div className='region-name'>{props.activeRegion.name}</div>
                    </div>
                </WCol>
                <WCol size="4">
                    <div></div>
                </WCol>
            </WRow>
            <WRow className="table-header">
                <WCol size="2">
                    <WButton className='table-header-section' wType="texted" >
                        <div className='table-header-name' >Name</div>
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
                    <WButton className='table-header-land' wType="texted" >
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