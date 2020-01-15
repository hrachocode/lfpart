import React from 'react';
import { connect } from 'react-redux';
import { setBrowserWidth } from '../browserWidth/store/action'

class BrowserWidth extends React.Component{
    state = {
        mobile : false,
    }

    updateDimensions = () => {
        if(document.body.clientWidth<800 && !this.state.mobile){
            this.setState({mobile : true});
            this.props.setBrowserWidth(document.body.clientWidth);
        }
        if(document.body.clientWidth>800 && this.state.mobile){
            this.setState({mobile : false});
            this.props.setBrowserWidth(document.body.clientWidth);
        }
    }

    componentDidMount = () => {
        this.props.setBrowserWidth(document.body.clientWidth);
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount = () => {
        window.removeEventListener("resize", this.updateDimensions);
    }

    render(){
        return null;
    }
}

const mapDispatchToProps = {
    setBrowserWidth
}

export default connect(null, mapDispatchToProps)(BrowserWidth);