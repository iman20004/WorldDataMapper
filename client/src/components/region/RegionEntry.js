import React, { useState } from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';

const RegionEntry = (props) => {
    const { data } = props;

    return (
        <WRow className='table-entry'>
            <WCol size="3">
                {
                    <div className="table-text">
                        name
                    </div>
                }
            </WCol>

            <WCol size="2">
                {
                    <div className="table-text">
                        capital
                    </div>
                }
            </WCol>

            <WCol size="2">
                {
                    <div className="table-text">
                        leader
                    </div>
                }
            </WCol>

            <WCol size="2">
                {
                    <div className="table-text">
                        flag
                    </div>
                }
            </WCol>
            <WCol size="3">
                
            </WCol>
        </WRow>
    );
};

export default RegionEntry;