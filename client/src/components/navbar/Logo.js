import React from 'react';
import { useHistory } from "react-router-dom";


const Logo = (props) => {
    let history = useHistory();
    const clickDisabled = () => { };
    


    const handleHome = async (e) => {
        props.handleSetActiveRegion({});
        //props.handleSetActiveMap({})
        history.push("/home/maps");
    };


    return (
        <div className={props.auth? 'logo logo-hover' : 'logo'} onClick={props.auth? handleHome: clickDisabled}>
            The World Data Mapper
        </div>
    );
};

export default Logo;