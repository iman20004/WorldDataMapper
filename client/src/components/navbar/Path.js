import React from 'react';
import { WNavItem } from 'wt-frontend';
import { useHistory } from "react-router-dom";



const Path = (props) => {
    let history = useHistory();
    //const ancestorRegions = props.route.reverse();

    const handleNavgation = (reg) => {
        history.push("/home/region/"+reg._id);
    }

    return (
        props.route !== undefined ? <div className='navbar-links'>{
            props.route.map(ancestor => (
                <div>
                <WNavItem onClick={()=>handleNavgation(ancestor)}>{ancestor.name}</WNavItem>
                <i className="material-icons small">arrow_forward</i>
                </div>
            ))
        }
        </div> 
        : <div></div>
    );

};

export default Path;
