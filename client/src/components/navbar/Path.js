import React from 'react';
import { WNavItem } from 'wt-frontend';
import { useHistory } from "react-router-dom";



const Path = (props) => {
    let history = useHistory();
    //const ancestorRegions = props.route.reverse();

    const handleNavgation = (reg) => {
        props.activeViewer(false, {}, []);
        history.push("/home/region/"+reg._id);
        props.reload();
    }

    return (
        props.route !== undefined && props.route.length >0 ? <div className='navbar-links'>{
            props.route.map(ancestor => (
                <div className='path-header'>
                    <WNavItem className='route-header' onClick={()=>handleNavgation(ancestor)}>{ancestor.name}</WNavItem>
                    <i className="material-icons small">keyboard_arrow_right</i>
                </div>
            ))
        }
        </div> 
        : <div className='empty-path'></div>
    );

};

export default Path;
