import React from 'react';
import { connect } from 'react-redux';
import Box from './linz/Box';

const Glass = props => {
    return (
        <fieldset className="glass-field">
            <legend>Քանակ</legend>
            <div className="direction" id="glass-purchase">
                <Box className="box-drop-down" initailValue={1} count={1} lastValue={props.quantity} detal='' direction="glass" legendName="Count"/>
            </div>
        </fieldset>
    )
}

const mapStateToProps = state => ({
    bothEye : state.linzCount.bothEye,
})

export default connect(mapStateToProps)(Glass);