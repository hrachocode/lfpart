import React from 'react';
import Hoc from './Hoc'

const Show = ({open, changeState}) => {

    console.log(changeState);

    return(
        <div>
            {open && <h1>Hello</h1>}
            <button onClick={changeState}></button>
        </div>
    )
}

export default Hoc(Show);