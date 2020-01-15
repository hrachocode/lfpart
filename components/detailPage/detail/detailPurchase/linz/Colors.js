import React from 'react';
import { connect } from 'react-redux';
import { setEyeCount } from '../store/action';

class Colors extends React.Component{
    state={
        listOpen : false,
    }

    handleClick = e => e.target.closest('.select-button')!==this.buttonRef.current ? this.setState({listOpen : false}) : null;

    componentDidMount(){
        this.buttonRef = React.createRef();
        document.addEventListener('click', this.handleClick);
    }

    onClick = elem => {
        let {direction} = this.props;
        direction = direction.replace(' ', '');
        this.setState({
            listOpen : false
        });
        this.props.setEyeCount({
            count : elem,
            name : 'color'
     })
    }

    componentWillUnmount(){
        document.removeEventListener('click', this.handleClick);
    }

    render(){
        const {listOpen} = this.state;
        let {direction, colors, color} = this.props;
        direction = direction.replace(' ', ''); 

        return(
            <div className="select-container">
                <p>{this.props.direction}</p>
                <div className="select-button" ref={this.buttonRef} onClick={()=>this.setState({listOpen : !listOpen})}>
                    <span>{color}</span>   
                </div>
                {listOpen && <div className="dropdown-list">
                    <div className="box-drop-down">
                        {colors.map(elem=>
                            <span key={elem}
                                onClick={()=>this.onClick(elem)}
                            >{elem}</span>
                        )}
                    </div>
                </div>}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    color : state.linzCount.color,
})

const mapDispatchToProps = {
    setEyeCount
}

export default connect(mapStateToProps, mapDispatchToProps)(Colors);