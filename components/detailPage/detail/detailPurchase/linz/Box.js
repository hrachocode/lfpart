import React from 'react';
import { connect } from 'react-redux';
import { setEyeCount } from '../store/action';

class Box extends React.Component{

    state = {
        boxCount : [],
        listOpen : false,
    }

    count = 1;
    
    shouldComponentUpdate(prevProps, prevState){
        let {direction, legendName} = this.props;
        direction = direction.replace(' ', '');
        if(prevProps[direction+legendName]!==this.props[direction+legendName] || prevState.listOpen!==this.state.listOpen || prevProps.direction!==this.props.direction){
            return true;
        }
        return false; 
    }

    handleClick = e => e.target.closest('.select-button')!==this.buttonRef.current ? this.setState({listOpen : false}) : null;

    linzCountChange = (elem, type) => {
        let {legendName, direction, setEyeCount} = this.props;
        direction = direction.replace(' ', '');
        this.setState({listOpen : false});
        if(type==='box'){
            if(elem==='plus'){
                this.count += 1;
            }
            if(elem==='minus' && this.count!==1){
                this.count -= 1;
            }
            return setEyeCount({
                count : this.count,
                name : [direction + legendName]
            })
        }
        setEyeCount({
            count : elem,
            name : [direction + legendName]
        });
    }

    componentDidMount(){
        const {boxCount} = this.state;
        const {initailValue, count, lastValue} = this.props;
        this.buttonRef = React.createRef();
        document.addEventListener('click', this.handleClick);
        for(let i=initailValue; count<0 ? i>=lastValue : i<=lastValue; i+=count){
            boxCount.push(i);
        }
        this.setState({
            eyeCount : initailValue,
            boxCount
        });
    }

    componentWillUnmount(){
        document.removeEventListener('click', this.handleClick);
    }

    render(){
        const {boxCount, listOpen} = this.state;
        let {detal, direction, className, legendName} = this.props;
        let elemDetal = detal ? detal : '';
        direction = direction.replace(' ', '');

        return legendName==="Boxes" || legendName==="Count"  ?
            <div className="select-container">
                <p>{legendName!=="Count" && this.props.direction}</p>
                <div className="count-set-button">
                    <button onClick={()=>this.linzCountChange('minus', 'box')}>-</button>
                    <span>{this.props[direction+legendName]}</span>   
                    <button onClick={()=>this.linzCountChange('plus', 'box')}>+</button>
                </div> 
            </div> : 
            <div className="select-container">
                <p>{this.props.direction}</p>
                <div className="select-button" ref={this.buttonRef} onClick={()=>this.setState({listOpen : !listOpen})}>
                    <span>{this.props[direction+legendName]+detal}</span>   
                </div>
                {listOpen && <div className="dropdown-list">
                    <div className={className}>
                        {boxCount.map(elem=>
                        <span key={elem}
                            onClick={()=>this.linzCountChange(elem)}
                        >{elem+elemDetal}</span>
                        )}
                    </div>
                </div>}
            </div>
        } 
}

const mapStateToProps = state => ({
    leftCYL : state.linzCount.leftCYL,
    rightCYL : state.linzCount.rightCYL,
    leftAxis : state.linzCount.leftAxis,
    rightAxis : state.linzCount.rightAxis,
    leftBoxes : state.linzCount.leftBoxes,
    rightBoxes : state.linzCount.rightBoxes,
    BothEyesCYL : state.linzCount.BothEyesCYL,
    BothEyesAxis : state.linzCount.BothEyesAxis,
    BothEyesBoxes : state.linzCount.BothEyesBoxes,
    glassCount : state.linzCount.glassCount,
})

const mapDispatchToProps = {
    setEyeCount
}

export default connect(mapStateToProps, mapDispatchToProps)(Box);