import React from 'react';
import { useHistory } from "react-router-dom";


const Path = (props) => {
    let history = useHistory();
    const clickDisabled = () => { };

    const handleNavigation = async (e) => {
        //props.handleSetActiveRegion({});
        //props.handleSetActiveMap({})
        //history.push("/home/maps");
    };

    return (
        <div>The World </div>
    );

};

export default Path;