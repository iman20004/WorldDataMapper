import React from 'react';
import { WButton, WRow, WCol } from 'wt-frontend';

const RegionHeader = (props) => {
    const buttonStyle = props.subRegions !== undefined && props.subRegions.length > 0 ? ' table-header-section ' : 'table-header-section-disabled ';
    const clickDisabled = () => { };

    
    const handleAddRegion = async (e) => {
        props.createNewRegion(props.activeRegion)
    };

    const handleSort = (field) => {
        props.sortRegions(props.activeRegion, field, props.subRegions);
    };

    const redoOptions = {
        className: !props.canRedo ? ' table-header-button-disabled ' : 'table-header-button ',
        onClick: !props.canRedo   ? clickDisabled : props.redo, 
        wType: "texted", 
        clickAnimation: !props.canRedo ? "" : "ripple-light"
    }

    const undoOptions = {
        className: !props.canUndo ? ' table-header-button-disabled ' : 'table-header-button',
        onClick: !props.canUndo  ? clickDisabled : props.undo,
        wType: "texted", 
        clickAnimation: !props.canUndo ? "" : "ripple-light"
    }

    return (
        <>
            <WRow className='table-header-intro'>
                <WCol size="4">
                    <WButton className='table-header-button ' id='add-button' wType="texted" clickAnimation="ripple-light" onClick={handleAddRegion} >
                        <i className="material-icons">add_circle</i>
                    </WButton>
                    <WButton {...undoOptions} >
                        <i className="material-icons ">undo</i>
                    </WButton>
                    <WButton {...redoOptions} >
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
                    <WButton className={`${buttonStyle}`} wType="texted" onClick={() => handleSort('name')}>
                        <div className='table-header-name' >Name</div>
                        <div className='table-header-spacer'></div>
                        <i className="material-icons">arrow_downward</i>
                    </WButton>
                </WCol>

                <WCol size="2">
                    <WButton className={`${buttonStyle}`} wType="texted" onClick={() => handleSort('capital')}>
                        <div>Capital</div>
                        <div className='table-header-spacer'></div>
                        <i className="material-icons">arrow_downward</i>
                    </WButton>
                </WCol>

                <WCol size="2">
                    <WButton className={`${buttonStyle}`} wType="texted" onClick={() => handleSort('leader')}>
                        <div>Leader</div>
                        <div className='table-header-spacer'></div>
                        <i className="material-icons">arrow_downward</i>
                    </WButton>
                </WCol>

                <WCol size="2">
                    <WButton className='table-header-section-disabled flag-label' wType="texted" >
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