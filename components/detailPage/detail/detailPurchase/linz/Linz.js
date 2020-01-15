import React from 'react';
import { connect } from 'react-redux';
import { setBothEye } from '../store/action';
import Eye from './Eye';
import Box from './Box';
import Colors from './Colors';

const Linz = props =>{ 
    const {bothEye, setBothEye, colors} = props;
    let {quantity} = props;
    quantity = quantity > 100 ? 100 : quantity;

    const createBox = (legendName, initailValue, count, lastValue, detal) => (
        <fieldset>
            <legend>{legendName}</legend>
            <div className="direction">
                {!bothEye ? 
                <React.Fragment>
                    <Box className="box-drop-down" legendName={legendName} initailValue={initailValue} count={count} lastValue={lastValue} detal={detal}  direction="left"/>
                    <Box className="box-drop-down" legendName={legendName} initailValue={initailValue} count={count} lastValue={lastValue} detal={detal}  direction="right" />
                </React.Fragment>
                : <Box className="box-drop-down" legendName={legendName} initailValue={initailValue} count={count} lastValue={lastValue} detal={detal}  direction="Both Eyes"/>
                }
            </div>
        </fieldset>
    )

    return(
        <React.Fragment>
            <div id="chechbox-prescription">
                <input type="checkbox" onChange={()=>setBothEye(!bothEye)}/>Same prescription for both eyes
            </div>
            <section id="product-selects">
                <fieldset>
                    <legend>Eye</legend>
                    <div className="direction" id="eye">
                        {!bothEye && <Eye id="eye-left" direction="left" {...props}/>}
                        <Eye id="eye-right" direction={bothEye ? "Both Eyes" : "right"} {...props}/>
                    </div>
                </fieldset>
                {/* {createBox("CYL", -0.75, -0.5, -2.25, "")} */}
                {/* {createBox("Axis", 10, 10, 180, '°')} */}
                {createBox("Boxes", 1, 1, quantity, "")}
                <fieldset>
                    <legend>Colors</legend>
                    <div className="direction" id="colors">
                        <Colors direction="Both Eyes" colors={colors} {...props}/>
                    </div>
                </fieldset>
            </section>
        </React.Fragment>
    )
}

const mapStateToProps = state => ({
    bothEye : state.linzCount.bothEye,
})

const mapDispatchToProps = {
    setBothEye
}

export default connect(mapStateToProps, mapDispatchToProps)(Linz);