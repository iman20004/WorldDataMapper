import React from 'react';
import { useHistory } from "react-router-dom";


const PathObject = (props) => {
    let history = useHistory();
    console.log("hahahha")
    console.log(props.data)

    const handleNavigate = (e) => {
        history.push("/home/maps")
    }
    
    return (
        <div onClick={handleNavigate}> 
            {props.data.name}
        </div>
    );

};

export default PathObject;