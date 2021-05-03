import React from 'react';
import PathObject from './PathObject';



const Path = (props) => {
    console.log('HELLO')
    console.log(props.route)

    props.route.forEach(ancestor => {
        console.log(ancestor.name);
    });

    return (
        <div> {
            props.route.forEach(ancestor => (
                <PathObject>
                    data={ancestor}
                </PathObject>
            ))
            }
        </div>
    );

};

export default Path;
