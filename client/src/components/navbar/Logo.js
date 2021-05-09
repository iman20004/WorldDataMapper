import React from 'react';
import { useHistory } from "react-router-dom";


const Logo = (props) => {
    let history = useHistory();
    const clickDisabled = () => { };

    const handleHome = async (e) => {
        props.activeViewer(false, {}, []);
        props.setRoute([]);
        history.push("/home/maps");
        //props.handleSetActiveRegion({});
        //props.handleSetActiveMap({})
    };


    return (
        <div className={props.auth? 'logo logo-hover' : 'logo'} onClick={props.auth? handleHome: clickDisabled}>
            The World Data Mapper
        </div>
    );
};

export default Logo;