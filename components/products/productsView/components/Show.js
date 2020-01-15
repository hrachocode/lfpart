import React from 'react';
import { connect } from 'react-redux';
import ProductsHOC from '../../ProductsHOC';
import { setShowCount } from '../../store/action';

const Show = (props) => { 
    const {openList, setStyle, count} = props;

    const handleClick = (count, event) => {
        if(count){props.setShowCount(count);}
        setStyle(event);
    }

    return(
        <div className="show-container">
            <div className="show" onClick={(event)=>handleClick(undefined, event)}>
                <p>Ցուցադրել:</p>
                <span>{count}</span>
                <span className="view-arrow"/>
            </div>
            {openList && 
            <div className="view-list">
                <span onClick={(event)=>handleClick(15, event)}>15</span>
                <span onClick={(event)=>handleClick(30, event)}>30</span>
                <span onClick={(event)=>handleClick(45, event)}>45</span>
            </div>}
        </div>
    )
}

const mapStateToProps = state => ({
    count : state.products.count
})

const mapDispatchToProps = {
    setShowCount
}

export default ProductsHOC(connect(mapStateToProps, mapDispatchToProps)(Show));

