import React from 'react';
import { WNavItem } from 'wt-frontend';
import { useHistory } from "react-router-dom";



const Path = (props) => {
    let history = useHistory();

    let ancestorRegions = props.route.slice(0, props.route.length-1);

    const handleNavgation = (reg) => {
        if (reg.root === true) {
            history.push("/home/maps")
        } else {
            history.push("/home/region/"+reg._id);
        }
    }

    return (
        props.route !== undefined ? <div className='navbar-links'>{
            ancestorRegions.map(ancestor => (
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
