import React from 'react';
//import PathObject from './PathObject';
import { useHistory } from "react-router-dom";


const Path = (props) => {
    let history = useHistory();
    const clickDisabled = () => { };

    const handleNavigation = async (e) => {
        //props.handleSetActiveRegion({});
        //props.handleSetActiveMap({})
        //history.push("/home/maps");
    };



    const numRegions = props.route.length
    let ids = [];
    let names = [];
    for (let i =0; i < numRegions/2; i+=2){
        ids.push(props.route[0]);
        names.push(props.route[1]);
    }


    const handleNavigate = (e) => {
        history.push("/home/maps")
    }
    
    return (
        <div onClick={handleNavigate} >{props.route[1]}</div>
    );

};

export default Path;