import React from 'react';
import { connect } from 'react-redux';
import { setEyeCount } from '../store/action';

class Eye extends React.Component{
    state={
        listOpen : false,
        negativeCount : [],
        positiveCount : [],
    }

    handleClick = e => e.target.closest('.select-button')!==this.buttonRef.current ? this.setState({listOpen : false}) : null;

    shouldComponentUpdate(prevProps, prevState){
        let {direction, legendName} = this.props;
        if(prevProps[direction+legendName]!==this.props[direction+legendName] || prevState.listOpen!==this.state.listOpen || prevProps.direction!==this.props.direction){
            return true;
        }
        return false; 
    }

    componentDidMount(){
        const {negativeCount, positiveCount} = this.state;
        const {left_eye_minus, left_eye_plus, right_eye_minus, right_eye_plus, direction} = this.props;
        this.buttonRef = React.createRef();
        document.addEventListener('click', this.handleClick);
        
        let counter = direction==='left' ? {negative : -left_eye_minus, positive : left_eye_plus} : {negative : -right_eye_minus, positive : right_eye_plus}
        let count = 0.25;
        for(let i=-count; i>=counter.negative; i-=count){
            negativeCount.push(i);
            if(i===-6){
                count = 0.5;
            }
        }
        count = 0.25;
        for(let i=count; i<=counter.positive; i+=count){
            positiveCount.push(i);
            if(i===6){
                count = 0.5;
            }
        }
        this.setState({
            negativeCount,
            positiveCount
        });
    }

    onClick = elem => {
        let {direction} = this.props;
        direction = direction.replace(' ', '');
        this.setState({
            listOpen : false
        });
        this.props.setEyeCount({
            count : elem,
            name :[direction + 'Eye']
        })
    }

    componentWillUnmount(){
        document.removeEventListener('click', this.handleClick);
    }

    render(){
        const {listOpen, negativeCount, positiveCount} = this.state;
        let {id, direction} = this.props;
        direction = direction.replace(' ', ''); 

        return(
                <div className="select-container" id={id}>
                    <p>{this.props.direction}</p>
                    <div className="select-button" ref={this.buttonRef} onClick={()=>this.setState({listOpen : !listOpen})}>
                        <span>{this.props[direction+'Eye']>0 ? '+'+this.props[direction+'Eye'] : this.props[direction+'Eye']}</span>   
                    </div>
                    {listOpen && <div className="dropdown-list">
                    <span onClick={()=>this.setState({
                            eyeCount : 0,
                            listOpen : false
                        })}
                    >0</span>
                    <div>
                        <div>
                            {negativeCount.map(elem=>
                            <span key={elem}
                                onClick={()=>this.onClick(elem)}
                            >{elem}</span>
                            )}
                        </div>
                        <div>
                            {positiveCount.map(elem=>
                            <span key={elem}
                                onClick={()=>this.onClick(elem)}
                            >+{elem}</span>
                            )}
                        </div>
                    </div>
                </div>}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    leftEye : state.linzCount.leftEye,
    rightEye : state.linzCount.rightEye,
    BothEyesEye : state.linzCount.BothEyesEye
})

const mapDispatchToProps = {
    setEyeCount
}

export default connect(mapStateToProps, mapDispatchToProps)(Eye);