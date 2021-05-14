import React from 'react';
import { WNavItem } from 'wt-frontend';
import { useHistory, useParams } from "react-router-dom";



const Arrows = (props) => {
    let history = useHistory();

    let currentIndex = props.subregions.indexOf(props.reg)
    const prev = props.subregions[currentIndex - 1];
    const next = props.subregions[currentIndex + 1];

    const prevDisabled = prev === undefined ? true : false;
    const nextDisabled = next === undefined ? true : false;
    const clickDisabled = () => { };

    const handleShowPrev = () => {
        props.activeViewer(true, prev, props.subregions );
        history.push("/home/regionviewer/" + prev._id);
        props.reload();
    }

    const handleShowNext = () => {
        props.activeViewer(true, next, props.subregions );
        history.push("/home/regionviewer/" + next._id);
        props.reload();
    }

    return (
        <div className="arrows">
            <i onClick={prevDisabled ? clickDisabled : handleShowPrev} className={prevDisabled ? "disbaled-button material-icons large" : "material-icons large"}>arrow_back</i>
            <div className='info-spacer'></div>
            <i onClick={nextDisabled ? clickDisabled : handleShowNext} className={nextDisabled ? "disbaled-button material-icons large" : "material-icons large"}>arrow_forward</i>
        </div>
    );

};

export default Arrows;
