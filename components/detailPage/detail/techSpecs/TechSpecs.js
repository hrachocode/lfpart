import React from 'react';
import './TechSpecs.css';

class TechSpecs extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            buttonActive : false,
        }
        this.buttonRef = React.createRef();
    }

    productTextInfo = buttonActive => {
        if(buttonActive===1){
            return(
                <p>
                    Product DNA. Multiflection coatings guard lenses against scratches, smudges & intense sunlight. All UA Eyewear defends against 100% of harmful UVA/B/C rays 
                    ArmourFusion® Frames are built with high grade injected polyamide for maximum strength & durability
                    Three-Point Grip ensures a comfortable & secure fit
                    Screwless cam-lock hinges allow temples to lock securely into place for a sturdy & extremely lightweight fit
                    All Under Armour Eyewear is protected for life against manufacturer defects
                    WARNING: This product can expose you to chemicals including Nickel (Metallic) which is known to the State of California to cause cancer, and Bisphenol A (BPA) which is known to the State of California to cause birth defects or other reproductive harm. For more information go to www.P65Warnings.ca.gov
                </p>
            )
        }
    
        if(buttonActive===2){
            return(
                <p>
                   ArmourFusion® Frames are built with high grade injected polyamide for maximum strength & durability
                    Three-Point Grip ensures a comfortable & secure fit
                    Screwless cam-lock hinges allow temples to lock securely into place for a sturdy & extremely lightweight fit
                    All Under Armour Eyewear is protected for life against manufacturer defects
                </p>
            )
        }
        return null;
    }

    componentWillUpdate(nextProps, nextState){
        let buttons = this.buttonRef.current.childNodes;
        if(nextState.buttonActive===this.state.buttonActive && this.state.buttonActive){
            buttons[0].classList.remove("button-dark");
            buttons[1].classList.remove("button-dark");
            return this.setState({buttonActive : false})
        }
        if(nextState.buttonActive===1){
            buttons[0].classList.add("button-dark");
            buttons[1].classList.remove("button-dark");
        }
        if(nextState.buttonActive===2){
            buttons[1].classList.add("button-dark");
            buttons[0].classList.remove("button-dark");
        }
    }

    render(){
       const {buttonActive} = this.state;

        return (
            <React.Fragment>
                <div ref={this.buttonRef} id="product-buttons-info">
                    <button className="button-static" onClick={()=>this.setState({buttonActive : 1})}>Տվյալներ</button>
                    <button className="button-static" onClick={()=>this.setState({buttonActive : 2})}>Տեխնիկական նկարագրություն</button>
                </div>
                {buttonActive && this.productTextInfo(buttonActive)}
            </React.Fragment>
        )
    }
}

export default TechSpecs;