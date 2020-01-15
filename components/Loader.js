import React from 'react';

const Loader = props => {
    return(
        <div className="ui segment" id="ui-loader" style={props.style}>
            <div className="ui active inverted dimmer">
                <div className={`ui ${props.size && props.size} text loader`}/>
            </div>
        </div>
    )
}

export default Loader;